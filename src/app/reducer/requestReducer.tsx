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
};

const RequestContext = React.createContext();

const initialState = {
  requests: [
    {
      id: 1,
      date: 'Oct 20-24 (4 days)',
      type: 'PAID TIME OFF',
      state: 'Approved',
      sender: 'Biren Gurung',
    },
    {
      id: 2,
      date: 'Oct 28 (1 day)',
      type: 'FLOATING',
      state: 'Pending',
      sender: 'Biren Gurung',
    },
    {
      id: 3,
      date: 'Oct 30 (1 day)',
      type: 'PAID TIME OFF',
      state: 'Denied',
      sender: 'Biren Gurung',
    },
  ],
};

const useRequest = () => {
  const [requests, dispatchRequest] = useReducer(RequestReducer, initialState);

  useEffect(() => {
    const getData = () => {
      getMyRequests(3)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    };

    getData();
  }, []);

  return {
    requests,
    dispatchRequest,
  };
};

export { useRequest, RequestContext };
