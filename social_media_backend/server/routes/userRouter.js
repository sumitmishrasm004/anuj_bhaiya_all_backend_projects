const requireUser = require("../middlewares/requireUser");
const {
  followOrUnfollowUserController,
  getPostOfFollowing,
  getMyPostsController,
  getUserPostsController,
  deleteMyProfileController,
  getMyInfo,
  updateUserProfile,
  getUserProfile,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/follow", requireUser, followOrUnfollowUserController);

router.get("/getFeedData", requireUser, getPostOfFollowing);

router.get("/getMyPosts", requireUser, getMyPostsController);

router.get("/getUserPosts", requireUser, getUserPostsController);

router.delete("/", requireUser, deleteMyProfileController);

router.get("/getMyInfo", requireUser, getMyInfo);

router.put("/", requireUser, updateUserProfile);

router.post("/getUserProfile", requireUser, getUserProfile)

module.exports = router;
