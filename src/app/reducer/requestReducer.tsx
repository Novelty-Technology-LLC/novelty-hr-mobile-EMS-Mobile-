import React, { useEffect, useReducer } from 'react';
import { mapObjectToRequest } from '../utils';

const RequestReducer = (prevState, action) => {
  switch (action.type) {
    case 'QUOTA':
      return {
        ...prevState,
       quota:action.payload
      }
    case 'DELETE':
      return {
        ...prevState,
        requests: [
          ...prevState.requests.filter((data) => data.id !== action.payload),
        ],
      };

    case 'CHANGE':
      return {
        ...prevState,
        requests: [...action.payload],
      };

    case 'ADD':
      return {
        ...prevState,
        requests: [].concat(
          mapObjectToRequest(action.payload),
          ...prevState.requests
        ),
      };
    case 'UPDATE':
      return {
        ...prevState,
        requests: [].concat(
          mapObjectToRequest(action.payload),
          ...prevState.requests.filter((item) => item.id !== action.payload.id)
        ),
      };
  }
};

const RequestContext = React.createContext();

const initialState = {
  requests: [],
  quota:[]
};

const useRequest = () => {
  const [requests, dispatchRequest] = useReducer(RequestReducer, initialState);

  return {
    requests,
    dispatchRequest,
  };
};

export { useRequest, RequestContext };
