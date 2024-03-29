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
        past: action.payload.reset
          ? []
          : action.payload.past[0]
          ? [...action.payload.past]
          : [...prevState.past],
        selectedDate: action.payload.selectedDate
          ? action.payload.selectedDate
          : { ...prevState.selectedDate },
        historyDate: action.payload.historyDate
          ? action.payload.historyDate
          : { ...prevState.historyDate },
      };

    case 'SET_PAST':
      return {
        ...prevState,
        past: [...action.payload.past],
        historyDate: action.payload.historyDate
          ? action.payload.historyDate
          : { ...prevState.historyDate },
      };

    case 'RESET':
      return {
        ...prevState,
        past: [],
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
        };
      } else if (action.payload.past) {
        return {
          ...prevState,
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
  selectedDate: null,
  historyDate: null,
};

const useTimeLog = () => {
  const [timelogs, dispatchTimeLog] = useReducer(TimeLogReducer, initialState);

  return {
    timelogs,
    dispatchTimeLog,
  };
};

export { useTimeLog, TimeLogContext };
