import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/getUserProfile", body);
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

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/posts/like", body);
      console.log("user profile", response);
      return response.result.post;
    } catch (e) {
      console.log("error", e.message);
      return Promise.reject(e);
    } 
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

const postsSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        console.log("post", post);
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});

export default postsSlice.reducer;
