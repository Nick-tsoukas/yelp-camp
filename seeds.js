var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=552042ed8cfeb4a1e8e62ae2a75f661e&auto=format&fit=crop&w=2550&q=80",
    description: "A wonderful campground in the mountains"
  },
  {
    name: "Cat's Den",
    image: "https://images.unsplash.com/photo-1481934633871-fc3e3ba6f0e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c212bfd1cceb73041f42daa963b79185&auto=format&fit=crop&w=2550&q=80",
    description: "Cool spot with a ton of catnip"
  },
  {
    name: "Chole's Cave",
    image: "https://images.unsplash.com/photo-1515601915049-08c8836c2204?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=133c7e7a614c3a168bbaa5f456b13cc9&auto=format&fit=crop&w=2550&q=80",
    description: "Only Chole's favs"
  }
];

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    // if(err){
    //   console.log(err);
    // } else {
    //   console.log("removed campgrounds");
    //   data.forEach(function(seed){
    //     Campground.create(seed, function(err,campground){
    //       if(err){
    //         console.log(err);
    //       } else {
    //         console.log("created data");
    //         Comment.create(
    //           {
    //             text: "This place is great, but I with there was internet",
    //             author: "Homer"
    //           }, function(err,comment){
    //             if(err){
    //               console.log(err);
    //             } else {
    //               campground.comments.push(comment);
    //               campground.save();
    //               console.log("comment was created")
    //             }
    //
    //           });
    //       }
    //     });
    //   });
    // }
  });

}

module.exports = seedDB;
