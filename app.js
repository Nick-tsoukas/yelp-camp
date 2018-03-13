var express    = require('express'),
    request    = require('request'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
// Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

// Model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://cdn.pixabay.com/photo/2018/01/31/16/27/sea-3121435__180.jpg",
//     description: "This is a huge granite hill, no bathrooms, but it's beautiful"
//   },
//   function(err, campground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("New Campground Was Created");
//       console.log(campground);
//     }
//   });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render('landing');
});

// Index route gets all campgrounds
app.get("/campgrounds", function(req,res) {
  //get all campgrounds from DB
  //campgrounds is defined in callback : allcampgrounds
  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      //campgrounds is the new name of allCamgrounds
      res.render("index",{campgrounds: allCampgrounds})
    }
  });
});

//NEW show form to create new campground
app.get("/campgrounds/new",function(req,res){
  res.render("new.ejs");
});

// Create route - add new campground to db
app.post("/campgrounds", function(req,res) {
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
app.get("/campgrounds/:id", function(req, res){
  // find the campground with the provied id
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
})

app.listen(3000, function(){
  console.log('the server has started')
});
