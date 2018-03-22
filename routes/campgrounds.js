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
router.get("/new", isLoggedIn, function(req,res){
  console.log('loading new ejs template')
  res.render("campgrounds/new");
});

// Create route - add new campground to db
router.post("/", isLoggedIn, function(req,res) {
  //get data from form and add to campgrounds array
  //redirect to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      console.log(newlyCreated)
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

//edit
router.get("/:id/edit",checkCampgroundOwnership,(req,res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});
//update

router.put("/:id",checkCampgroundOwnership, (req, res) => {
  // find and update then rediect
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err,updatedCampground) => {
    if(err) {
      res.redirect("/campgrounds")
    } else {
      console.log('updated')
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});

//Destroy routes
router.delete("/:id",checkCampgroundOwnership, (req,res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds")
    }
  })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if(err){
        res.redirect("back");
      } else {
        if(foundCampground.author.id.equals(req.user._id)) {
          next();
      } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}




module.exports = router;

// ====
// END OF CAMPGROUND ROUTES
// ====
