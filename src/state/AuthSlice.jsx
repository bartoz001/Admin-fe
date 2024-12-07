import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: null,
  status: null,
  allusers: [],
  alladmins: [],
  movetouser: null,
  movetoadmin: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      const { name, email, password } = action.payload;
      state.user.name = name;
      state.user.email = email;
      state.user.password = password;
    },
    status(state, action) {
      state.status = action.payload;
    },    
    dletecurrentuser(state, action) {
      state.allusers = state.allusers.filter((user) => user._id !== action.payload);
      console.log(state.user._id, action.payload);
      if(state.user._id === action.payload){
        state.user = null;
        state.token = null;
      }
    },
    allusers(state, action) {
      state.allusers = action.payload;
    },
    adduser(state, action) {
      state.allusers.push(action.payload);
    },
    alladmins(state, action) {
      state.alladmins = action.payload;
    },
  

  },
});

export const { fetchUser, logout, adduser, allusers, alladmins, updateUser,dletecurrentuser ,  status } = authSlice.actions;
export default authSlice.reducer;
