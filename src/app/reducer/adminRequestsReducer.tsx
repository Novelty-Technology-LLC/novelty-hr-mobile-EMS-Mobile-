import React, { useReducer } from 'react';

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
        adminrequests: [...action.payload.my],
        pastadminrequests: [...action.payload.past],
      };

    case 'UPDATE':
      return {
        ...prevState,
        adminrequests: [].concat(
          action.payload,
          ...prevState.adminrequests.filter(
            (item) => item.id !== action.payload.id
          )
        ),
      };

    case 'REPLY':
      return {
        ...prevState,
        adminrequests: [].concat(
          ...prevState.adminrequests.filter(
            (item) => item.id !== action.payload.id
          )
        ),
        pastadminrequests: [].concat(
          action.payload,
          ...prevState.pastadminrequests
        ),
      };
  }
};

const AdminRequestContext = React.createContext();

const initialState = {
  adminrequests: [],
  pastadminrequests: [],
};

const useAdmin = () => {
  const [adminrequests, dispatchAdmin] = useReducer(AdminReducer, initialState);

  return {
    adminrequests,
    dispatchAdmin,
  };
};

export { useAdmin, AdminRequestContext };
