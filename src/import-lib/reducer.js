import { IMPORT_ERROR } from "./actions.js";

export function reducer(state = {}, action) {

    switch (action.type) {
        case IMPORT_ERROR:
            return { ...state, error: action.message }
    }

    return state;
}