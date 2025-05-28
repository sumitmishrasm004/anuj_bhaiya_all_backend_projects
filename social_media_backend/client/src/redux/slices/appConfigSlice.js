import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async (body, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getMyInfo");
      console.log("api called data", response);
      return response.result;
    } catch (e) {
      console.log("error", e.message);
    } 
    // Handled loading in axiosClient file
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", body);
      console.log("api called data", response);
      return response.result;
    } catch (e) {
      console.log("error", e.message);
    } 
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast : (state, action) => {
      state.toastData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});

export default appConfigSlice.reducer;

export const { setLoading, showToast } = appConfigSlice.actions;
