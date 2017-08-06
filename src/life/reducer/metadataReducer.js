import { IMPORT_DONE } from "../actions/importActions";
import { RESET_EVOLUTION } from "../actions/evolutionActions";

export default function metadataReducer(metadata = [], action) {

    switch (action.type) {
        case IMPORT_DONE:
            return action.meta;

        case RESET_EVOLUTION:
            return [];
    }

    return metadata;
}
