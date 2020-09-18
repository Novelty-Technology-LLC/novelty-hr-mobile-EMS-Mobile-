import React, { useReducer } from 'react';

const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      let restore_token = action.token ? JSON.parse(action.token).token : null;

      return {
        ...prevState,
        userToken: restore_token,
        isLoading: false,
      };

    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

const AuthContext = React.createContext();

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const useAuth = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export { useAuth, AuthContext };
