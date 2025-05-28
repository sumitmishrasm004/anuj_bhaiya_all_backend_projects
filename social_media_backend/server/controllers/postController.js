const Post = require("../models/Post");
const User = require("../models/User");
const { mapPostOutput } = require("../utils/Utils");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

// const getAllPostsContoller = async (req, res) => {
//   console.log("req.id", req.id);
//   //   return res.send("These are all posts");
//   return res.send(200, "These are all posts");
// };

const createPostController = async (req, res) => {
  try {
    const { caption, postImg } = req.body;

    if (!caption || !postImg) {
      return res.send(error(400, "Caption and postImg are required"));
    }
    console.log("caption", caption);
    console.log("postImg", postImg);
    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postImg",
    });
    console.log("cloudImg", cloudImg);
    const owner = req.id;

    const user = await User.findById(req.id);
    console.log("owner", owner, "caption", caption);
    console.log("user", user);
    const post = await Post.create({
      owner,
      caption,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });
    user.posts.push(post._id);
    await user.save();
    return res.send(success(200, post));
  } catch (e) {
    console.log("error", e);
    // return res.send(error(500, e.message));
  }
};

const likeAndUnlikePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const currentUserId = req.id;

    const post = await Post.findById(postId).populate('owner');

    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    if (post.likes.includes(currentUserId)) {
      const index = post.likes.indexOf(currentUserId);
      post.likes.splice(index, 1);
    } else {
      post.likes.push(currentUserId);
    }
    await post.save();
    return res.send(success(200, { post : mapPostOutput(post, req.id) }));
  } catch (e) {
    console.log("error", e.message);
    res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, updateCaption } = req.body;
    const currentUserId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    if (post.owner.toString() !== currentUserId) {
      return res.send(error(403, "Only owners can update their posts"));
    }

    if (updateCaption) {
      post.caption = updateCaption;
    }

    await post.save();

    return res.send(success(200, { post }));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const currentUserId = req.id;
    const currentUser = await User.findById(currentUserId);

    const post = await Post.findById(postId);
    // console.log("post", post);
    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    if (post.owner.toString() !== currentUserId) {
      return res.send(error(403, "Only owners can delete their posts"));
    }

    // Delete the post using findByIdAndDelete
    await Post.findByIdAndDelete(postId);

    const index = currentUser.posts.indexOf(postId);
    currentUser.posts.splice(index, 1);

    await currentUser.save();
    // await post.remove();

    return res.send(success(200, "Post deleted successfully"));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

module.exports = {
  // getAllPostsContoller,
  createPostController,
  likeAndUnlikePostController,
  updatePostController,
  deletePostController,
};
