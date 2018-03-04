var express    = require('express'),
    request    = require('request'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(    {name: "Granite Hill", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
//  function(err, campground) {
//    if(err){
//      console.log(err);
//    } else {
//      console.log("Newly created campground");
//      console.log(campground);
//    }
//  });

var campgrounds = [
  {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Granite Hill", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Yogi Bear", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Granite Hill", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Yogi Bear", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Granite Hill", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Yogi Bear", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Granite Hill", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
  {name: "Yogi Bear", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render('landing');
});

app.get("/campgrounds", function(req,res) {
  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds",{campgrounds: allCampgrounds})
    }
  });
});

app.get("/campgrounds/new",function(req,res){
  res.render("new.ejs");
});

app.post("/campgrounds", function(req,res) {
  //get data from form and add to campgrounds array
  //redirect to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image
  };
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.listen(3000, function(){
  console.log('the server has started')
});
