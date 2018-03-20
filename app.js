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
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

//APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
seedDB();

//Passport Config -- hide the secret page to users that are not logged in
app.use(require("express-session")({
  secret:  "jones is the best",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      res.render("campgrounds/index",{campgrounds: allCampgrounds})
    }
  });
});

//NEW show form to create new campground
app.get("/campgrounds/new",function(req,res){
  console.log('loading new ejs template')
  res.render("campgrounds/new");
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
      console.log('foundCampground')
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
})

// ==================
// COMMENTS ROUTES
// ==================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res) {
  //find camp by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err){
      console.log(err);
    } else {
      res.render("comments/new",{campground: campground});
    }
  })
});

app.post("/campgrounds/:id/comments", function(req, res) {
  // lookup campground using // Id
  // create new comments
  // connect new comment to campground
  // redirect campground show page
  Campground.findById(req.params.id, function(err,campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds")
    } else {
        Comment.create(req.body.comment,function(err,comment){
          if(err){
            console.log(err);
          } else {
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
          }
        })
    }
  })
});


// show register form
app.get("/register", function(req, res){
   res.render("register");
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login");
});
// handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
  console.log('the server has started')
});
