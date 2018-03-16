var mongoose = require('mongoose');

// model 'Campground'
var Campground = require('./models/campground');

// model 'Comment'
var Comment = require('./models/comment');

var data = [
    {   
        name: 'Salmon Creek', 
        image: 'https://images.unsplash.com/photo-1432817495152-77aa949fb1e2',
        description: 'blah blah blah'
    },
    {   
        name: 'Granite Hill', 
        image: 'https://images.unsplash.com/photo-1496080174650-637e3f22fa03',
        description: 'blah blah blah'
    },
    {   
        name: "Mountain Goat's Rest", 
        image: 'https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b',
        description: 'blah blah blah'
    }
];

function seedDB() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log('remove campgrounds');
        
        // add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('add a new campground');

                    Comment.create({text: 'this place is great!', author: ' liangjia fu'}, function(err, comment) {
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('create new comment');
                        }
                    });
                }
            });
        });
        
        // data.forEach(function(err, campground) {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         Comment.create()
        //     }
        // })
    });
    
    // add a few comments
}

module.exports = seedDB;