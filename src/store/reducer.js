import {
    LOGIN,
    SIGHNOUT,
  } from './constants';
  
  const initialState = {
    isLoggedIn: false,
    userId: '',
   
  };
  
  export const inkartReducer = (state = initialState, action) => {
    //console.log('action.payload', action.payload);
    switch (action.type) {
      case LOGIN:
        //  const {userId,firstName, lastName, email,mobileNumber,profileImage} = action.payload;
        return {
          ...state,
          userId: action.payload.userId,
          isLoggedIn: true,
        };
      case SIGHNOUT:
        return {
          ...state,
          userId: '',
          isLoggedIn: false,
        };
     
      default:
        return state;
    }
  };
  