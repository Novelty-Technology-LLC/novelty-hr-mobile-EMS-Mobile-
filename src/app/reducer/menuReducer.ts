import { useReducer, createContext, Reducer } from 'react';

interface MenuState {
    items: any[]
}

const initialState: MenuState = {
    items: [],
}

const MenuReducer = (prevState: MenuState, action: any) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...prevState,
                items: action.payload,
            }

        case 'UPDATE_ITEM':
            const id = action.payload.id;
            const index = prevState.items.findIndex(value => value.id === id);
            const newItems = [...prevState.items];
            newItems[index].title = action.payload.value;

            return {
                ...prevState,
                items: newItems,
            }

        default:
            return prevState;
    }
}

export const MenuContext = createContext<{
    menu: MenuState,
    dispatchMenu: any
}>({
    menu: initialState,
    dispatchMenu: null
});

export const useMenu = () => {
    const [menu, dispatchMenu] = useReducer<Reducer<MenuState, any>>(MenuReducer, initialState);

    return { menu, dispatchMenu };
}