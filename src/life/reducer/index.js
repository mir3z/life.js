import { combineReducers } from "redux";

import worldviewReducer from "./worldviewReducer";
import evolutionReducer from "./evolutionReducer";
import viewportReducer from "./viewportReducer";
import metadataReducer from "./metadataReducer";

export default combineReducers({
    world: worldviewReducer,
    meta: metadataReducer,
    evolution: evolutionReducer,
    viewport: viewportReducer
});
