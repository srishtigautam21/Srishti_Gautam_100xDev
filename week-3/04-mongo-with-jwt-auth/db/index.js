const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mongo:1999Sg@cluster0.gelbqey.mongodb.net/database2"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Schema definition here
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", //referes to the course table
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
