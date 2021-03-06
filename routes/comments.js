var express = require("express");
var middleware = require("../middleware");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var  Comment = require("../models/comment");


// ==================
// COMMENTS ROUTES
// ==================

router.get("/new", middleware.isLoggedIn, function(req,res) {
  //find camp by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err){
      console.log(err);
    } else {
      res.render("comments/new",{campground: campground, currentUser: req.user});
    }
  })
});

router.post("/", middleware.isLoggedIn, function(req, res) {
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
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save();
            console.log(comment)
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
          }
        })
    }
  })
});


//edit route
  router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

//Update comment

router.put("/:comment_id",middleware.checkCommentOwnership, (req,res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment) {
    if(err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});

//Comment Delete Route
router.delete("/:comment_id",middleware.checkCommentOwnership, (req,res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if(err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});



module.exports = router;

// ====
// END OF COMMENT ROUTES
// ====
