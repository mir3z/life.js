import { combineReducers } from "redux";

import { CHANGE_VIEW, REGISTER_NAVIGATION_ITEM } from "./actions";

function viewsReducer(state = [], { type, views }) {
    if (type === CHANGE_VIEW) {
        return views;
    }

    return state;
}

function navigationReducer(state = [], { type, ...rest }) {
    if (type === REGISTER_NAVIGATION_ITEM) {
        return [ ...state, { ...rest } ];
    }

    return state;
}

export const appReducer = combineReducers({
    views: viewsReducer,
    navigation: navigationReducer
});