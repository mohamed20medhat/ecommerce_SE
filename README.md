# analysis 
- bussiness analysis section has been moved to analysis.md file 
- this readme file will go to the documentation and the steps for development

# Tools that we used || How to download
- nodejs + express + mongodb + ejs for frontend
- all the packages we used can be viewed in package.json
- to be able to use it locally. after downloading it type in the terminal `npm install` and all the dependencies will be installed. 
- notice that you need the database url to be able to connect to mongo atlas. but this is supposed to be secrete information. so it shouldn't be added to deployment directly. and was added to .env file and not allowed to be pushed to this repo
- for you user || viewer, who will need to test it on your local environment. you will need to create a file called .env. and put => `DATABASE_URL = "mongodb+srv://mohamed:IxZArmynqCQziqba@cluster0.tmwe8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"`

# Deployment
- the acutal site => [Bshop101](https://bshop101.herokuapp.com/)
- this website requires you to login when you try to access it. you must login as an admin to be able to edit or delete or add a product. 
- admin account => user : admin || password : admin
- to access as user => sign in normally like in anywebsite 
- we recommend accessing it as admin to be able to test the routes and the operations by yourself.
- hosted on heroku. and the database is hosted online on mongodb atlas


# Database 
- mongodb store the data in clusters that collections that contain documents
- we built 2 collections => one for user and one for products
- the product collection contain basic information about the product || the image after converting it to a binary || string and the image's type
- the user collection contain basic information about the user. name, email and password 

# Backend
- this is a nodejs project. so we used packages to enable us to do tasks. 
- like setting a server with express. 
- ejs to be built the front it. 
- jwt to handle authentication to create access tokens in a cookie
- 

# Frontend 
- built using ejs. using layouts => we built something like a component structure like in frontend frameworks
- used an api for filepond. a tool used to help us convert the image into binary without needing to download it on the backend. and the host won't allow changing the backend from the user side. so this was a good work around this behaviour
- 

