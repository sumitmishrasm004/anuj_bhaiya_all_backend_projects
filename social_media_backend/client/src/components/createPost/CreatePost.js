import React, { useState } from "react";
import "./CreatePost.scss";
import Avatar from "../avatar/Avatar";
import backgroundDummyImg from "../../assets/nature.jpg";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postsSlice";

function CreatePost() {
  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  };

  const handlePostSubmit = async () => {
    try {
    //   dispatch(setLoading(true));
      const result = await axiosClient.post("/posts", {
        caption,
        postImg,
      });
      console.log("Post done", result);
      dispatch(getUserProfile({
        userId: myProfile?._id,
      }));
    } catch (error) {
      console.log("error", error);
    } finally {
    //   dispatch(setLoading(false));
      setCaption("");
      setPostImg("");
    }
  };

  return (
    <div className="CreatePost">
      <div className="left-part1">
        <Avatar src={myProfile?.avatar?.url} />
      </div>
      <div className="right-part1">
        <input
          value={caption}
          type="text"
          className="captionInput"
          placeholder="What's on your mind?"
          onChange={(e) => setCaption(e.target.value)}
        />
        {postImg && (
          <div className="img-container">
            <img src={postImg} alt="post-img" className="post-img" />
          </div>
        )}
        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImgChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
