import React, { useEffect, useReducer } from 'react';
import { mapObjectToRequest } from '../utils';

const AdminReducer = (prevState, action) => {
  switch (action.type) {
    case 'DELETE':
      return {
        ...prevState,
        adminrequests: [
          ...prevState.adminrequests.filter(
            (data) => data.id !== action.payload
          ),
        ],
      };

    case 'CHANGE':
      return {
        ...prevState,
        adminrequests: [...action.payload],
      };

    case 'UPDATE':
      return {
        ...prevState,
        adminrequests: [].concat(
          ...prevState.adminrequests.filter(
            (item) => item.id !== action.payload.id
          ),
          action.payload
        ),
      };
  }
};

const AdminRequestContext = React.createContext();

const initialState = {
  adminrequests: [],
};

const useAdmin = () => {
  const [adminrequests, dispatchAdmin] = useReducer(AdminReducer, initialState);

  return {
    adminrequests,
    dispatchAdmin,
  };
};

export { useAdmin, AdminRequestContext };
