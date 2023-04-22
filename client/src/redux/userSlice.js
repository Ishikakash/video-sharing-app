import { createSlice } from "@reduxjs/toolkit";

// redux = we are gonna write our initial states, in our application the initial state will be user, 
// we are not gonna have any user but when i click on sign in button we r gonna start fetching the data 
// and if its successful we are gonna update that user if its not we will show an error
const initialState = {
  currentUser: null,
  loading: false,   // when i click the login button it is gonna be true and if it is successful or if there is an error it is gonna be false again
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    /*// Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes */

      // when we click on sign in button we r gonna fire the login start func 
      // if we have a user we r gonna fire login success func 
      // and on error we r gonna fire login failure func
      
      // on login
    loginStart: (state) => {    // 1 reducer
      state.loading = true;     // we are starting fetching
    },
    // on founding user
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    // on founding error
    loginFailure: (state) => {
      state.loading = false;    // we have a result
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;