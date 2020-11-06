import React, { useReducer } from 'react';

const TimeLogReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD':
      if (action.payload.present) {
        return {
          ...prevState,
          present: []
            .concat(action.payload.present, ...prevState.present)
            .sort((a, b) =>
              new Date(a.log_date) < new Date(b.log_date) ? 1 : -1
            ),
        };
      } else if (action.payload.past) {
        return {
          ...prevState,
          past: []
            .concat(action.payload.past, ...prevState.past)
            .sort((a, b) =>
              new Date(a.log_date) < new Date(b.log_date) ? 1 : -1
            ),
        };
      }

    case 'CHANGE':
      return {
        ...prevState,
        present: [...action.payload.present],
        past: [...action.payload.past],
      };

    case 'DELETE':
      return {
        ...prevState,
        present: [
          ...prevState.present.filter((data) => data.id !== action.payload),
        ],
        past: [...prevState.past.filter((data) => data.id !== action.payload)],
      };

    case 'EDIT':
      if (action.payload.present) {
        console.log(
          'ddd',
          [].concat(
            ...prevState.past.filter(
              (data) => data.id !== action.payload.present.id
            )
          ).length
        );
        return {
          ...prevState,
          present: []
            .concat(
              action.payload.present,
              ...prevState.present.filter(
                (data) => data.id !== action.payload.present.id
              )
            )
            .sort((a, b) =>
              new Date(a.log_date) < new Date(b.log_date) ? 1 : -1
            ),
          // past: [].concat(
          //   ...prevState.past.filter(
          //     (data) => data.id !== action.payload.present.id
          //   )
          // ),
        };
      } else if (action.payload.past) {
        return {
          ...prevState,
          // present: [].concat(
          //   ...prevState.present.filter(
          //     (data) => data.id !== action.payload.past.id
          //   )
          // ),
          past: []
            .concat(
              action.payload.past,
              ...prevState.past.filter(
                (data) => data.id !== action.payload.past.id
              )
            )
            .sort((a, b) =>
              new Date(a.log_date) < new Date(b.log_date) ? 1 : -1
            ),
        };
      }
  }
};

const TimeLogContext = React.createContext();

const initialState = {
  present: [],
  past: [],
};

const useTimeLog = () => {
  const [timelogs, dispatchTimeLog] = useReducer(TimeLogReducer, initialState);

  return {
    timelogs,
    dispatchTimeLog,
  };
};

export { useTimeLog, TimeLogContext };
