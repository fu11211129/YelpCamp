# Project
This project is called YelpCamp, which is an website that provided the information of campgrounds.
there are three functionalities provided in this website, users can view campgrounds, add a new campgroud, get more information of one campgroud.

# Start the app
Open one terminal, and run "./mongod" to run mongodb.

Open another termianl, and run "node app.js", to start the app.

# Access this app
once the mongodb is started, and the "app.js" is running, the website can be accessed from 

https://web-dev-bootcamp-fu11211129.c9users.io/

# There are three endpoints
https://web-dev-bootcamp-fu11211129.c9users.io/campgrounds
which shows up all campgrounds

https://web-dev-bootcamp-fu11211129.c9users.io/campgrounds/new
which can create a new campgroud, and add it into database(mongodb)

https://web-dev-bootcamp-fu11211129.c9users.io/campgrounds/:id
which shows up an individual campground

# Code structure
```
YelpCamp
│   README.md
│
└───v1 (version number)
│   
│   └───models (the model used accross this app, called "campgroud")
│        └───campground.js
│   └───node_modules(npm modules)
│        │  
│   └───public(where the static resources reside in)
│        └───stylesheet (where the css files reside in)
│               └───main.css
│   └───views (where the web pages stored)
│        └───campgrounds (where the "campgrounds" pages stored)
│               └───index.ejs
|               └───new.ejs
|               └───show.ejs
│        └───partials (where the "partial" / templcate web pages stored)
│               └───footer.ejs
|               └───header.ejs
│        └───landing.ejs(entry point page)
|   └───app.js (the entry point of this app, handle all sorts of logistics)
|   └───package.json (config file)
|   └───seeds.js (data preparation file)
|
```


# Resource & techniques
(Front End) I used several css templates which I can used for my class project before.

(Back End) I used node.js, express

(DB) I used mongodb