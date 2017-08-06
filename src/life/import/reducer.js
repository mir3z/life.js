import { IMPORT_ERROR } from "./actions.js";

export function importReducer(state = {}, action) {

    switch (action.type) {
        case IMPORT_ERROR:
            return { ...state, error: action.message }
    }

    return state;
}