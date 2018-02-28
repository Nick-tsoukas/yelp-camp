var express = require('express');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render('landing');
});

app.get("/campgrounds", function(req,res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
    {name: "Granite Hill", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"},
    {name: "Yogi Bear", image: "https://www.campsitephotos.com/photo/camp/8736/Serrano_001.jpg"}
  ];
  res.render('campgrounds',{campgrounds: campgrounds});
});
app.listen(3000, function(){
  console.log('the server has started')
});
