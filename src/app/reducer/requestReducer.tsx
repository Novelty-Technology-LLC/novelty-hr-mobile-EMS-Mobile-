import React, { useEffect, useReducer } from 'react';
import { clockRunning } from 'react-native-reanimated';
import { getMyRequests } from '../services';

const RequestReducer = (prevState, action) => {
  switch (action.type) {
    case 'DELETE':
      return {
        ...prevState,
        requests: [
          ...prevState.requests.filter((data) => data.id !== action.payload),
        ],
      };
  }

  switch (action.type) {
    case 'CHANGE':
      return {
        ...prevState,
        requests: [...action.payload],
      };
  }
};

const RequestContext = React.createContext();

const initialState = {
  requests: [],
};

const useRequest = () => {
  const [requests, dispatchRequest] = useReducer(RequestReducer, initialState);

  return {
    requests,
    dispatchRequest,
  };
};

export { useRequest, RequestContext };
