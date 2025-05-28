const {
//   getAllPostsContoller,
  createPostController,
  likeAndUnlikePostController,
  updatePostController,
  deletePostController,
} = require("../controllers/postController");
const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");

// router.get("/all", requireUser, getAllPostsContoller);

// if request is "/" and post then its create the post
router.post("/", requireUser, createPostController);

router.post("/like", requireUser, likeAndUnlikePostController);

// if request is "/" and put then its update the post
router.put("/", requireUser, updatePostController);

router.delete("/", requireUser, deletePostController);

module.exports = router;
