import React, { useReducer } from "react";
import { mapObjectToWFHRequest } from "../utils/requestWfhTransformer";

const RequestWFHReducer = (prevState, action) => {
  switch (action.type) {
    case "QUOTA":
      return {
        ...prevState,
        quota: action.payload,
      };

    case "UPDATEQUOTA":
      return {
        ...prevState,
        quota: []
          .concat(
            action.payload,
            ...prevState.quota.filter((data) => data.id !== action.payload.id)
          )
          .sort((a, b) => (a.leave_type > b.leave_type ? 1 : -1)),
      };

    case "DELETE":
      return {
        ...prevState,
        requests: [
          ...prevState.requests.filter((data) => data.id !== action.payload),
        ],
      };

    case "CHANGE":
      return {
        ...prevState,
        requests: [...action.payload],
      };

    case "CHANGEPAST":
      return {
        ...prevState,
        pastrequests: [...action.payload],
      };

    case "ADD":
      return {
        ...prevState,
        requests: [].concat(
          mapObjectToWFHRequest(action.payload),
          ...prevState.requests
        ),
      };
    case "UPDATE":
      return {
        ...prevState,
        requests: [].concat(
          mapObjectToWFHRequest(action.payload),
          ...prevState.requests.filter((item) => item.id !== action.payload.id)
        ),
      };

    case "CANCEL":
      return {
        ...prevState,
        requests: [].concat(
          ...prevState.requests.filter((item) => item.id !== action.payload.id)
        ),
        pastrequests: [].concat(
          mapObjectToWFHRequest(action.payload),
          ...prevState.pastrequests.filter(
            (item) => item.id !== action.payload.id
          )
        ),
      };
  }
};

const RequestWFHContext = React.createContext();

const initialState = {
  requests: [],
  quota: [],
  pastrequests: [],
};

const useWFHRequest = () => {
  const [requestsWFH, dispatchWFHRequest] = useReducer(
    RequestWFHReducer,
    initialState
  );

  return {
    requestsWFH,
    dispatchWFHRequest,
  };
};

export { useWFHRequest, RequestWFHContext };
