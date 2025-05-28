const Post = require("../models/Post");
const User = require("../models/User");
const { mapPostOutput } = require("../utils/Utils");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

const followOrUnfollowUserController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    console.log("userIdToFollow", userIdToFollow);

    const currentUserId = req.id;

    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(currentUserId);

    if (currentUserId == userIdToFollow) {
      return res.send(error(409, "Users cannot follow themselves"));
    }

    if (!userToFollow) {
      return res.send(error(404, "User to follow not found"));
    }

    if (currentUser.followings.includes(userIdToFollow)) {
      const followingIndex = currentUser.followings.indexOf(userIdToFollow);
      currentUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(currentUserId);
      userToFollow.followers.splice(followerIndex, 1);
    } else {
      currentUser.followings.push(userIdToFollow);
      userToFollow.followers.push(currentUserId);
    }
    await currentUser.save();
    await userToFollow.save();
    return res.send(success(200, { user: userToFollow }));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const getPostOfFollowing = async (req, res) => {
  try {
    const currentUserId = req.id;
    const currentUser = await User.findById(currentUserId).populate(
      "followings"
    );

    const fullPosts = await Post.find({
      owner: {
        $in: currentUser.followings,
      },
    }).populate("owner");
    const posts = fullPosts
      .map((item) => mapPostOutput(item, req.id))
      .reverse();

    const followingsIds = currentUser.followings.map((item) => item.id);
    followingsIds.push(req.id);
    const suggestions = await User.find({
      _id: {
        $nin: followingsIds,
      },
    });

    return res.send(success(200, { ...currentUser._doc, suggestions, posts }));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const getMyPostsController = async (req, res) => {
  try {
    const currentUserId = req.id;

    // const allUserPosts = await Post.find({
    //   owner: currentUserId,
    // });

    // If we want likes details means profile of person who like my posts
    // so populate is used to get all data of provided id
    const allUserPosts = await Post.find({
      owner: currentUserId,
    }).populate("likes");

    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const getUserPostsController = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.send(error(400, "userId is required"));
    }

    // const allUserPosts = await Post.find({
    //   owner: currentUserId,
    // });

    // If we want likes details means profile of person who like my posts
    // so populate is used to get all data of provided id
    const allUserPosts = await Post.find({
      owner: userId,
    }).populate("likes");

    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const deleteMyProfileController = async (req, res) => {
  try {
    const currentUserId = req.id;
    const currentUser = await User.findById(currentUserId);

    // delete all posts
    await Post.deleteMany({
      owner: currentUserId,
    });

    // remove myself from followers's following
    currentUser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);
      const index = follower.followings.indexOf(currentUserId);
      follower.followings.splice(index, 1);
      await follower.save();
    });

    // remove myself from followings's followers
    currentUser.followings.forEach(async (followingId) => {
      const following = await User.findById(followingId);
      const index = following.followers.indexOf(currentUserId);
      following.followers.splice(index, 1);
      await following.save();
    });

    // remove myself from all likes
    const allPosts = await Post.find();
    allPosts.forEach(async (post) => {
      const index = post.likes.indexOf(currentUserId);
      post.likes.splice(index, 1);
      await post.save();
    });
    await User.findByIdAndDelete(currentUserId);
    // await currentUser.remove();
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "user deleted"));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const getMyInfo = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    return res.send(success(200, { user }));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, userImg } = req.body;
    console.log("req.body", req.body);
    const user = await User.findById(req.id);
    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (userImg) {
      const cloudImg = await cloudinary.uploader.upload(userImg, {
        folder: "profileImg",
      });
      user.avatar = {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      };

      await user.save();
      return res.send(success(200, { user }));
    }
  } catch (e) {
    console.log("error");
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId).populate({
      path: "posts",
      populate: {
        path: "owner",
      },
    });

    const fullPosts = user.posts;
    const posts = fullPosts
      .map((item) => mapPostOutput(item, userId))
      .reverse();
    console.log("posts", posts);
    return res.send(success(200, { ...user._doc, posts }));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

module.exports = {
  followOrUnfollowUserController,
  getPostOfFollowing,
  getMyPostsController,
  getUserPostsController,
  deleteMyProfileController,
  getMyInfo,
  updateUserProfile,
  getUserProfile,

  /// TODO
  // getMyPost
  //   getUserPost
  // deleteMyProfile
};
