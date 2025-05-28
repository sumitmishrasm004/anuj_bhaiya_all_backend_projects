import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postsSlice";

export const getFeedData = createAsyncThunk(
  "user/getFeedData",
  async (body, thunkAPI) => {
    try {
      // thunkApi is also not needed
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getFeedData", body);
      console.log("user profile", response);
      return response.result;
    } catch (e) {
      console.log("error", e.message);
      return Promise.reject(e);
    }
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

export const followAndUnfollowUser = createAsyncThunk(
  "user/followAndUnfollow",
  async (body, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/follow", body);
      console.log("user profile", response);
      return response.result.user;
      // return body;
    } catch (e) {
      console.log("error", e.message);
      return Promise.reject(e);
    }
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        // console.log("post", post);
        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings.findIndex(
          (item) => item._id === user._id
        );
        if (index !== undefined && index !== -1) {
          state.feedData.followings.splice(index, 1);
        } else {
          state?.feedData?.followings.push(user);
        }
      });
  },
});

export default feedSlice.reducer;
