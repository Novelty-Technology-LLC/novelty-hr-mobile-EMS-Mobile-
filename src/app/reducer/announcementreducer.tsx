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
      const findIndex = state.announcementData.findIndex(
        (findItem: any) => +findItem.Id === +action.payload.index
      );
      state.announcementData[findIndex] = action.payload.announcementData;
      // console.log(action.payload, "action.payload");

      // const id = action.payload.index;
      // const index = state.announcementData.findIndex(
      //   (value: any) => value.id === id
      // );
      // const newItems = [...state.announcementData];
      // newItems[index] = action.payload.announcementData;
      return {
        ...state,
        announcementData: state.announcementData,
      };
    case "DELETE_ANNOUNCEMENT_DATA":
      const deleteAnnouncemnttData = state?.announcementData?.filter(
        (item: any) => item.id !== action.payload.id
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
