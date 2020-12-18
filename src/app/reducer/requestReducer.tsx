import React, { useReducer } from 'react';
import { mapObjectToRequest } from '../utils';

const RequestReducer = (prevState, action) => {
  switch (action.type) {
    case 'QUOTA':
      return {
        ...prevState,
        quota: action.payload,
      };

    case 'UPDATEQUOTA':
      return {
        ...prevState,
        quota: []
          .concat(
            action.payload,
            ...prevState.quota.filter((data) => data.id !== action.payload.id)
          )
          .sort((a, b) => (a.leave_type > b.leave_type ? 1 : -1)),
      };

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

    case 'CHANGEPAST':
      return {
        ...prevState,
        pastrequests: [...action.payload],
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

    case 'CANCEL':
      return {
        ...prevState,
        requests: [].concat(
          ...prevState.requests.filter((item) => item.id !== action.payload.id)
        ),
        pastrequests: [].concat(
          mapObjectToRequest(action.payload),
          ...prevState.pastrequests.filter(
            (item) => item.id !== action.payload.id
          )
        ),
      };
  }
};

const RequestContext = React.createContext();

const initialState = {
  requests: [],
  quota: [],
  pastrequests: [],
  notifdata: null,
};

const useRequest = () => {
  const [requests, dispatchRequest] = useReducer(RequestReducer, initialState);

  return {
    requests,
    dispatchRequest,
  };
};

export { useRequest, RequestContext };
