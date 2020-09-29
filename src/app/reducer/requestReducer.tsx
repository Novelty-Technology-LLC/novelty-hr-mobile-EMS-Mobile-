import React, { useEffect, useReducer } from 'react';
import { mapObjectToRequest } from '../utils';

const RequestReducer = (prevState, action) => {
  switch (action.type) {
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
          ...prevState.requests,
          mapObjectToRequest(action.payload)
        ),
      };

    case 'UPDATE':
      return {
        ...prevState,
        requests: [].concat(
          ...prevState.requests.filter((item) => item.id !== action.payload.id),
          mapObjectToRequest(action.payload.data)
        ),
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
