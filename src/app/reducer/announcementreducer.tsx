import React from "react";
import { useReducer, createContext, Reducer } from "react";
const AnnouncementContext = React.createContext({});
const initialState: any = {
  announcementData: [],
};
const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "ADD_ANNOUNCEMENT":
      console.log(action.payload, "action.payload");

      return {
        ...state,
        announcementData: [action.payload, ...state.announcementData],
      };
    case "UPDATE_ANNOUNCEMENT":
      state.announcementData[action.payload.index] =
        action.payload.announcementData;

      return {
        ...state,
      };
    default:
      return state;
  }
};
const AnnouncementReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export { AnnouncementContext, AnnouncementReducer };
