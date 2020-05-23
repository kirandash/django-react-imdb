# Django React IMDB

## 1. Intro
### 1.1 Features of app
1. Store movies in DB (title and description)
2. See a list of movies
3. Create a new movie
4. Update existing movie
5. Remove movies from DB
6. Rate a movie (0-5 stars, limited one per user)
7. Register user and login
8. Authorize and restrict the app to login users only

### 1.2 Tech Stack
1. Django: For back end
    - Check popularity at https://hotframeworks.com/languages/python
2. Django REST framework: For REST APIs
3. Frontend: React
    - Check popularity at https://hotframeworks.com/languages/javascript
4. Programming language: Python for Django and JS for React.
5. HTML, CSS
6. IDE (Integrated Development Environment): 
    - PyCharm for Backend with Python: https://www.jetbrains.com/pycharm/download/#section=mac Download the free version
    - VSCode for React: https://code.visualstudio.com/download
    - Other options: Bracket, Atom, Sublime text

## 2. Django
### 2.1 Intro to Django
1. Most popular Python framework as of 2020. And 6th most popular overall. First release in 2005. Older than 14 years. Thus, will stay live for a long time.
    - https://hotframeworks.com
2. Can create an entire application using Django. Both Backend and Frontend.
3. Very easy to use as Django comes with many default features. Thus, Django is mostly preferred for applications with tighter deadlines. 
4. **Cons**: 
    - Not a minimal framework like Flask. As it comes with many built in features. So with Django, our project might have features that we don't even need.
    - lesser control over the functionality. Since many features are built in. It will behave as per Django providing lesser control to us.
5. In this app, we will use Django only for backend and React for frontend.

### 2.2 Explore 3 ways to Install Python
1. Only Python: https://www.python.org/downloads/. In our case: we will download this one. Let's see 2 more options:
2. Python distribution: A distribution is a version of Python that also comes pre-packaged with additional useful libraries
3. Distributions:
    - **Anaconda**: https://www.anaconda.com/products/individual
    - **Miniconda**: https://docs.conda.io/en/latest/miniconda.html : a smaller version of Anaconda without the additional packages
4. check version of installed python: `python --version` will return 2.7.16
    - `python3 --version`: will return 3.8.3
5. For Linting and debugging: Add Python extension by Microsoft in VSCode
6. Check path of installation: `which python` & `which python3`

### 2.3 Python package manager pip
1. In python to add any additional package we will use the package manager pip. It stands for pip installs package.
2. pip comes by default with python.
3. To install a package run: `pip install packagename`

### 2.4 Installing Virtual Environment
1. **Virtual Environment**: By default if we install any package it will install globally on our system. For example we want django in our project. To install django we need to run `pip install django`. But if I run that, it will install django on my system. But we don't want that. Since I can have multiple projects on my system and each project might need different version of django and different set of packages. Thus, We want to create a virtual python environment for our project. So that all the package requirements of our project will be installed in that virtual environment and not effect our global/system environment.
    - And once our project is finished, if we want the same project to run on a different machine, we don't need to send entire virtual environment to the new machine. All we have to do is create one file called requirements.txt which will hold list of all the packages. And use that file to install all packages for another virtual environment on a new system.
2. **Create venv** using: `python3 -m venv imdb_venv`: -m stands for make
3. **activate**: `. imdb_venv/bin/activate` or `source imdb_venv/bin/activate`. Once activated: terminal prompt will start with (imdb_venv)
4. **Deactivate**: `deactivate`

### 2.5 Install Django and djangorestframework
1. From venv: `pip install django` - installs django (latest: 3.0.6) and pytz library for timezone support
2. `pip install djangorestframework`. and add `rest_framework` to settings.py file.
3. Optional: If getting any warning, also upgrade pip `pip install --upgrade pip`.

### 2.6 Create Project
1. from venv: `django-admin startproject imdb` or `django-admin startproject imdb .` if you want it to be created in current directory
2. Rename main folder to `imddb_project` to avoid confusion with inside project folder with same name.
3. manage.py: has all the code for running scripts
4. Run server: `cd imdb_project` and `python manage.py runserver` no need to mention python3 again. Since venv was created with python3. we can directly use python.

### 2.7 PyCharm
1. Launch project with pycharm. Select folder that contains both venv and project. It automatically activates venv. unlike vscode where we have to manually activate.
2. Launch terminal and run `python manage.py runserver`
3. Instead of doing that again and again, we can configure PyCharm to do that for us.
    - Add Configuration ---> Add script path, working directory path and parameters: runserver.
    
### 2.8 Create new App, run migrations
1. The project folder imdb is basically a container for all the apps that we can have on our website. Each module can be specified as an app which will perform a specific task.
2. Create app: `python manage.py startapp api` or `django-admin startapp api`
3. Add api to list of INSTALLED_APPS
4. create migrations: `python manage.py makemigrations`
5. Apply migrations: `python manage.py migrate`
6. check migration: `python manage.py showmigrations`

### 2.9 URLs, create superuser
1. Create api/urls.py file. Include it in main project urls file: imdb/urls.py
2. `python manage.py createsuperuser`

### 2.10 Create Models
1. api/models.py
    - Create Movie, Rating class
2. Register models to admin with `admin.site.register()`
3. `python manage.py makemigrations` and `python manage.py migrate`
4. Run or `python manage.py runserver`
5. Check at http://127.0.0.1:8000/admin/

### 2.11 Serializers using rest_framework
1. Create api/serializers.py file
    - Create MovieSerializer and RatingSerializer to convert Movie, Rating models into JSON. (using sesrializers.ModelSerializer from rest_framework)
2. api/views.py file: Create MovieViewSet, RatingViewSet using viewsets from rest_framework. To serve serialized data to endpoint
3. Add routes on api/urls.py file where our views will be available for access.
    - register viewsets on rest_framework routers
4. Test http://127.0.0.1:8000/api/movies/ in postman or browser for GET, POST, PUT & DELETE. Better to use postman since that will mimic an actual external source.
    - Note: while testing make sure to always add / at the end.
    - postman, for POST: enter url ---> select body ---> select form-data ---> enter title and description for key, value and submit. If one of them is not entered: it will throw an error: required field.
    - post couple of movies. Test. Test GET call. - post call will return data we posted
    - Test PUT at: http://127.0.0.1:8000/api/movies/2/ and enter key value pairs. check GET - response body will return updated data
    - Test DELETE. http://127.0.0.1:8000/api/movies/1/. Note: Delete does not have any response body.
5. Test http://127.0.0.1:8000/api/ratings/ - GET call
    - POST: enter key value pair. user and movie ids can be checked in admin. Try posting twice: it will throw the unique movie, user error.
    - PUT is also not allowed because of unique_together
    - Test POST with rating > 5 ex 10. will throw max value validation
    
### 2.12 Custom Method in MovieViewSet for rating movie
1. We will see how to customize ModelViewSets from rest_framework by overwriting with our own code
2. api/views.py - customize MovieViewSet to create a new end point to rate movie
    - create a new custom fn and decorate it as POST
    - Test in postman by hitting a POST call to http://127.0.0.1:8000/api/movies/3/rate_movie/ should return the response we added in views.py file.
    
### 2.13 Request Data for custom method rating movie
1. Check if stars is provided in request or not and accordingly modify response.
    - Test at : http://127.0.0.1:8000/api/movies/3/rate_movie/ by providing/not stars
2. For rating a movie - rating model needs 3 things: movie, user and stars. Get access to movie using pk.

### 2.14 Update and Create for custom method rating movie
1. For rating a movie - rating model needs 3 things: movie, user and stars. We have already added movie to custom method. Let's add user and stars as well.
    - Get stars from `request.data`
    - Get user from `request.user`
2. Create / update rating for a movie.
3. Send rating data along with message in response.

### 2.15 Add ratings info to movies API endpoint
1. Create a custom fn to include ratings info to movies API. Fn can created in view/serializer/model.
2. Create fn in Movie model in models.py
3. Add that fn to serializer
4. Test if new field `no_of_ratings` is added to the response body at: http://127.0.0.1:8000/api/movies/
    - Test by deleting ratings
5. Create another custom fn `avg_rating` in Movie model for avg rating.
6. Add fn to MovieSerializer
7. Test if new field `avg_rating` is added to the response body at: http://127.0.0.1:8000/api/movies/
8. Note: Ratings info could also have been fetched separately from ratings API but then we will have to do 2 API calls. So, we handled it in an optimized way to return both movie and ratings data with movies API.

### 2.16 Implement auth using Token Auth
1. Enable token auth using rest_framework.authtoken
    - Add it to INSTALLED_APPS in settings.py file
2. run migration with `python manage.py migrate`
    - It will apply authtoken migrations to our DB
3. Generate token for current user in admin.
    - http://127.0.0.1:8000/admin/authtoken/token/
4. Create a login api endpoint at project level: imdb/urls.py file
5. Test in postman
    - POST call for http://127.0.0.1:8000/auth/
    - on providing username and pwd, it wl return a token
    - later we can restrict our other APIs to work only if this token is passed in Headers
6. Add TokenAuthentication class in api/views.py for both movie and rating view set to handle/translate token received.
    - Now user will not be anonymous but kiran
    - remove hardcoded user data
    - Test http://127.0.0.1:8000/api/movies/5/rate_movie/ by sending `Authorization: Token tokendata` with POST call.
    
 ### 2.17 Create users API endpoints for GET, POST, DELETE methods
 1. Create UserViewSet in api/views.py file
 2. Create UserSerializer in api/serializers.py file
 3. Link UserViewSet to a url in api/urls.py file using which users can register. `router.register('users','UserViewSet')`
 4. Test - by calling http://127.0.0.1:8000/api/users/ with GET method. no need to pass any headers for this. Response should return username and hashed password.
 
 ### 2.18 Register user - hide pwd in GET call and hash it for POST
 1. Now with GET call any one can see the pwd. To avoid this: Add extra kwargs to UserSerializer for making pwd write only and mandatory.
    - Test http://127.0.0.1:8000/api/users/. Now pwd will not be returned.
 2. Test registration - http://127.0.0.1:8000/api/users/ with POST call.
    - If only username is sent, it wl throw pwd reqd error.
    - Provide both fields and on POST, it will be successful and return just id, username.
 3. But right now we are sending the password as a string. Thus, in admin if we check kiran2, password will show invalid formatting.
    - We must hash the password before sending it to POST call
    - To handle this overwrite the create method and pass validatedData while creating user. Thus password will be automatically validated and hashed.
    - Test by posting another user and then in admin http://127.0.0.1:8000/admin/auth/user/ for this user, password will show as hashed.
 4. Delete kiran2, since it has improper pwd hashing
    - http://127.0.0.1:8000/api/users/2/ DELETE method
    
 ### 2.19 Creating Token for User
 1. **Token Issue Fix:** 
    - If we check at http://127.0.0.1:8000/admin/authtoken/token/, we will see only one token that we manually created. Thus, Django is not creating token automatically when a new user is registered.
    - in api/serializers.py file for UserSerializer, modify create method to create token as well along with user.
    - Test by creating a new user kiran4 with POST: http://127.0.0.1:8000/api/users/
    - Check if token is created for kiran4 in admin/tokens section.
    - kiran3 does not have any token. Can create one manually.
 2. Check login at http://127.0.0.1:8000/auth/ by entering new user details and it should return the token.
 
### 2.20 Restricting MovieViewSet
1. Add REST_FRAMEWORK settings in settings.py file.
2. Add permission_classes IsAuthenticated to MovieViewSet in views.py file.
3. Now on calling GET on http://127.0.0.1:8000/api/movies/ will return authentication not provided.
4. Test again by sending `Authorization: Token tokendataforkiran4` with GET call
 
### 2.21 AllowAny, Restricting update and create for Ratings API
1. Add AllowAny for MovieViewSet and IsAuthenticated for RatingViewSet. This will make movies/ endpoint public while rating will stay private.
2. Test 
    - http://127.0.0.1:8000/api/movies/ will be available publicly
    - But with ratings: http://127.0.0.1:8000/api/ratings/ we must pass token `Authorization: Token tokendataforkiran4`
3. We already have rate_movie endpoint in MovieViewSet which handles POST and PUT for us. So we can disable the default create and update methods from RatingViewSet
    - Overwrite the update() and create() methods in RatingViewSet
    - Test PUT: http://127.0.0.1:8000/api/ratings/6/ - must return the error message 'You cant update rating like that'
    - Test POST: http://127.0.0.1:8000/api/ratings/
    - Test authentication as well by removing token from header
4. Add IsAuthenticated back for MovieViewSet because we need only authenticated users to leave rating at rate_movie/ 