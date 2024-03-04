const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", (req, res) => {
  //This route is open to everyone
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  //check if the user already exists
  Admin.create({
    username: username,
    password: password,
  }).then(() => {
    res.json({ msg: "Admin created successfully" });
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  //This route is not open to all it checks for admin authentication first
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  const newCourse = await Course.create({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });
  console.log(newCourse);
  res.json({
    msg: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});
  res.status(200).json({
    course: response,
  });
});

module.exports = router;
