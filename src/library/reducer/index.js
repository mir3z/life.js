import { combineReducers } from "redux";
import {
    LIBRARY_FETCH_START, LIBRARY_FETCH_COMPLETED, LIBRARY_FETCH_ERROR,
    CATEGORY_EXPAND, CATEGORY_FOLD, SHOW_PATTERN_DETAILS
} from "../actions";

const libraryReducer = combineReducers({
    expanded: expandedReducer,
    categories: categoriesReducer,
    pattern: patternReducer
});
export default libraryReducer;

function expandedReducer(state = {}, action) {
    switch (action.type) {
        case CATEGORY_EXPAND:
            return expand(state, action.idx);

        case CATEGORY_FOLD:
            return fold(state, action.idx);
    }

    return state;
}

function categoriesReducer(state = { }, action) {
    switch (action.type) {
        case LIBRARY_FETCH_START:
            return { loading: true, error: false };

        case LIBRARY_FETCH_ERROR:
            return { loading: false, error: true };

        case LIBRARY_FETCH_COMPLETED:
            return action.library;
    }

    return state;
}

function patternReducer(state = {}, { type, pattern }) {
    switch (type) {
        case SHOW_PATTERN_DETAILS:
            return { ...pattern };
    }

    return state;
}

const expand = (state = {}, itemIdx) => {
    return { ...state, [itemIdx]: true };
};

const fold = (state = {}, itemIdx) => {
    const nextState = { ...state };
    delete nextState[itemIdx];
    return nextState;
};