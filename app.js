  // INDEX   /campground       GET
  // NEW     /campground/new   GET
  // NEW     /campground/:id/comments/new GET
  // CREATE  /campgrounds      POST
  // CREATE  /campgrounds/:id/comments    POST
  // SHOW    /campground:id    GET

var express    = require('express'),
    request    = require('request'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    comment    = require("./models/comment"),
    seedDB     = require("./seeds");

//APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
seedDB();

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
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground)
      res.render("show", {campground: foundCampground});
    }
  });
})

app.listen(3000, function(){
  console.log('the server has started')
});
