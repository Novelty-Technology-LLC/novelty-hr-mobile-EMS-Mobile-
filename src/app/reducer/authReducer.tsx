import React, { useReducer } from 'react';

const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };

    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };

    case 'STORE_USER':
      return {
        ...prevState,
        user: action.user && Object.assign(action.user),
      };

    case 'INVALID':
      return {
        ...prevState,
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
};

const useAuth = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export { useAuth, AuthContext };
