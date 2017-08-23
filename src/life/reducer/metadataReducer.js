import { IMPORT_DONE } from "../../import-lib";
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
