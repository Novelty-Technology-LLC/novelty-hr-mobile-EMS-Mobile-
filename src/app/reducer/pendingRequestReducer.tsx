import React, { useReducer } from "react";

const initialState = {
  pending_wfh: 0,
  pending_leave: 0,
  total_pending_requests: 0,
  reload: false,
};

const PendingRequestReducer = (prevState: any, action: any) => {
  switch (action.type) {
    case "SET_PENDING_REQUEST":
      const total_pending_requests =
        action?.payload?.pending_wfh + action?.payload?.pending_leave;
      return { ...prevState, ...action.payload, total_pending_requests };
    case "SUBTRACT_PENDING_REQUEST":
      const { key } = action.payload;
      return { ...prevState, [key]: prevState[key] - 1 };
    case "RELOAD":
      return { ...prevState, reload: !prevState.reload };
  }
};

const PendingRequestContext = React.createContext();

const useRequest = () => {
  const [pendingRequests, dispatchPendingRequest] = useReducer(
    PendingRequestReducer,
    initialState
  );

  return {
    pendingRequests,
    dispatchPendingRequest,
  };
};

export { useRequest, PendingRequestContext };
