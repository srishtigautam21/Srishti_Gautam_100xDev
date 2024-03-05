const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  await User.create({
    username,
    password,
  });
  res.json({
    msg: "user created successfully",
  });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET);
    // console.log(token);
    res.json({ msg: "User has been successfully created", token: token });
  } else {
    res.json({ msg: "Incorrect email and password" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const response = await Course.find({});
    // console.log(response);
    res.status(200).json({
      course: response,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  await User.updateOne(
    { username: username },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    msg: "course bought successfully",
    courseId: courseId,
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({ username: username });
  // console.log(user);
  const purchasedCoursesId = user.purchasedCourses;
  // console.log(purchasedCoursesId);
  const courses = await Course.find({
    _id: {
      $in: purchasedCoursesId,
    },
  }).catch((e) => console.log(e));
  res.json({
    courses: courses,
  });
});

module.exports = router;
