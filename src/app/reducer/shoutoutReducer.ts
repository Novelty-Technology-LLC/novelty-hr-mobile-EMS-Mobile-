import { useReducer, createContext, Reducer } from "react";

interface ShoutoutState {
    needUpdate: -1 | 0 | 1
}

const initialState: ShoutoutState = {
    needUpdate: -1,
}

const shoutoutReducer = (prevState: ShoutoutState, action: any): ShoutoutState => {
    switch (action.type) {
        case 'UPDATE':
            let needUpdate = prevState.needUpdate;
            if (needUpdate != 0) {
                needUpdate = 0;
            } else {
                needUpdate = 1;
            }
            return {
                ...prevState,
                needUpdate,
            }

        default:
            return prevState;

    }
}

export const ShoutoutContext = createContext<{
    shoutoutState: ShoutoutState;
    dispatchShoutout: any;
}>({
    shoutoutState: initialState,
    dispatchShoutout: null,
});

export const useShoutout = () => {
    const [shoutoutState, dispatchShoutout] = useReducer(shoutoutReducer, initialState);

    return { shoutoutState, dispatchShoutout };
}