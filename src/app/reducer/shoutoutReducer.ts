import { useReducer, createContext, Reducer } from "react";

interface ShoutoutState {
  shoutoutList: any[];
}

const initialState: ShoutoutState = {
  shoutoutList: [],
};

const shoutoutReducer = (
  prevState: ShoutoutState,
  action: any
): ShoutoutState => {
  switch (action.type) {
    case "SET_SHOUTOUT_LIST":
      return {
        ...prevState,
        shoutoutList: action.payload,
      };

    case "APPEND_SHOUTOUT":
      const newList = prevState.shoutoutList;
      if (newList.length > 2) {
        newList.pop();
      }
      newList.unshift(action.payload);
      return {
        ...prevState,
        shoutoutList: newList,
      };

    default:
      return prevState;
  }
};

export const ShoutoutContext = createContext<{
  shoutoutState: ShoutoutState;
  dispatchShoutout: any;
}>({
  shoutoutState: initialState,
  dispatchShoutout: null,
});

export const useShoutout = () => {
  const [shoutoutState, dispatchShoutout] = useReducer(
    shoutoutReducer,
    initialState
  );

  return { shoutoutState, dispatchShoutout };
};
