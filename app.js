var express    = require('express'),
    request    = require('request'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

    var commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        authRoutes       = require("./routes/auth");

//APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
//seedDB();

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

app.use(function(req,res,next) {
  res.locals.currentUser = req.user;
  next();
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

app.listen(3000, function(){
  console.log('the server has started')
});

// ====
// NOTES
// ====

// INDEX   /campground       GET
// NEW     /campground/new   GET
// NEW     /campground/:id/comments/new GET
// CREATE  /campgrounds      POST
// CREATE  /campgrounds/:id/comments    POST
// SHOW    /campground:id    GET
