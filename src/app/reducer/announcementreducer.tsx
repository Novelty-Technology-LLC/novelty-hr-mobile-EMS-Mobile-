import React from "react";
import { useReducer, createContext, Reducer } from "react";
const AnnouncementContext = React.createContext({});
const initialState: any = {
  announcementData: [],
  isLoading: true,
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "ON_REFRESH":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_ANNOUNCEMENT_DATA":
      return {
        ...state,
        announcementData: action?.payload?.announcementData,
        isLoading: false,
      };
    case "ADD_ANNOUNCEMENT":
      return {
        ...state,
        announcementData: [
          action.payload.announcementData,
          ...state.announcementData,
        ],
      };
    case "UPDATE_ANNOUNCEMENT":
      const updatedEmployees = state.announcementData.map((employee: any) => {
        if (employee.id === action.payload.index) {
          return action.payload.announcementData;
        }
        return employee;
      });

      return {
        ...state,
        announcementData: updatedEmployees,
      };
    // const oldData = state?.announcementData?.filter((item: any) => {
    //   return item.id !== action?.payload?.index;
    // });
    // const newData = [action?.state?.announcementData].concat(oldData);
    // return { ...state, announcementData: newData };
    case "DELETE_ANNOUNCEMENT_DATA":
      const deleteAnnouncemnttData = state?.announcementData?.filter(
        (item: any) => item.id !== action?.payload?.id
      );
      return {
        ...state,
        announcementData: deleteAnnouncemnttData,
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
