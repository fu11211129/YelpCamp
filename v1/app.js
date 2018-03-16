var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Once again Rusty wns cutest dog!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect('mongodb://localhost/yelp_camp_v5');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set(express.static(__dirname + '/public'));
seedDB();

app.get('/', function(req, res) {
    res.render('landing');
});

// =============================
// =====CAMPGROUNDS ROUTES======
// =============================

app.get('/campgrounds', function(req, res) {
    // retrieve all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    })
    //res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
    //res.send('you hit the post page');
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampground = {name: name, image: image, desc: desc};
    
    //campgrounds.push(newCampground);
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('campgrounds/index');
        }
    });
    
    //redirect back to campground page
    //res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
    res.render('campgrounds/new');
});

// show individual campground
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render('/campgrounds', {campground: foundCampground});
       }
    });
});

// =========================
// =====AUTH ROUTES=========
// =========================

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    var newUser = new User({
        username: req.body.username
    });
    
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/campgrounds');
        });
    });
});








// =========================
// =====COMMENT ROUTES======
// =========================

app.get('/campgrounds/:id/comments/new', function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
})

app.post('/campgrounds/:id/comments', function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.render('/campgrounds/index');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('yelpcamp started');
});