const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const { Course } = require("../db");
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  try {
    const response = await User.create({
      username: username,
      password: password,
    });
    res.json({
      msg: "User created successfully",
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses
  try {
    const response = await Course.find({});
    console.log(response);
    res.status(200).json({
      course: response,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
