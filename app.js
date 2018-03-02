var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

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
  res.render('campgrounds',{campgrounds: campgrounds});
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
