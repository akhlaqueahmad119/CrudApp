import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  allUserData: [],
};
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getAllUserData: (state, action) => {
      state.allUserData = action.payload;
    },
  },
});
export const { getAllUserData } = userSlice.actions;
export default userSlice.reducer;
 // Get API
export const fetchAllUserData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      dispatch(getAllUserData(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
//Post API
export const saveUserData = (data) => {
  return async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      console.log(response,"Post")
    } catch (error) {
      console.log(error);
    }
  };
};
//PUT API
export const editUserData = (id,data) => {
  return async () => {
    try {
      const response = await axios.put(`http://localhost:3000/users/${id}`, data);
      console.log(response,"Put")
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteUserData = (id) => {
  return async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      console.log(response,"Delete")
    } catch (error) {
      console.log(error);
    }
  };
};
