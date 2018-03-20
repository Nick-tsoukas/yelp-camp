var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")


// =================
// CAMPGROUND ROUTES
// =================

// Index route gets all campgrounds
router.get("/", function(req,res) {
  //passport will put data in req.user

  //get all campgrounds from DB
  //campgrounds is defined in callback : allcampgrounds
  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      //campgrounds is the new name of allCamgrounds
      res.render("campgrounds/index",{campgrounds: allCampgrounds, currentUser: req.user})
    }
  });
});

//NEW show form to create new campground
router.get("/new",function(req,res){
  console.log('loading new ejs template')
  res.render("campgrounds/new");
});

// Create route - add new campground to db
router.post("/", function(req,res) {
  //get data from form and add to campgrounds array
  //redirect to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: desc
  };
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});

// Show route - view information about one campground: is get request
router.get("/:id", function(req, res){
  // find the campground with the provied id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log('foundCampground')
      res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
    }
  });
});

module.exports = router;

// ====
// END OF CAMPGROUND ROUTES
// ====