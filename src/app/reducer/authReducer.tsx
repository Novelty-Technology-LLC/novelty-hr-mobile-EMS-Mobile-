import React, { useReducer } from "react";

const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case "Notification":
      return {
        ...prevState,
        notifdata: action.payload,
      };
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };

    case "RESET":
      return {
        ...prevState,
        isLoading: true,
      };

    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        user: null,
        isInvalid: false,
      };

    case "STORE_USER":
      return {
        ...prevState,
        isLoading: false,
        user: action.user && Object.assign(action.user),
      };

    case "INVALID":
      return {
        ...prevState,
        isLoading: false,
        isInvalid: true,
      };
  }
};

const AuthContext = React.createContext();

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: null,
  isInvalid: false,
  notifdata: null,
};

const useAuth = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export { useAuth, AuthContext };
