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
    // console.log(response);
    res.status(200).json({
      course: response,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  ).catch((e) => console.log(e));
  res.json({
    msg: "Purchase complete",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username,
  });

  const purchasedCoursesId = user.purchasedCourses;

  const courses = await Course.find({
    _id: {
      $in: purchasedCoursesId,
    },
  }).catch((e) => console.log(e));

  res.json({ courses: courses });
});

module.exports = router;
