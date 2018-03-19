var mongoose = require("mongoose");
// Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // ref = The name of Model
      //will be array of comment IDS
      ref: "Comment"
    }
  ]
});

// Model
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = mongoose.model("Campground", campgroundSchema);
