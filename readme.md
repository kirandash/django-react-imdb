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
2. `pip install djangorestframework`. Also upgrade pip `pip install --upgrade pip`

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