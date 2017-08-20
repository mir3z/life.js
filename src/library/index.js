import { GLYPHS } from "../components/Icon.jsx";
import { connectLibrary } from "./connect";
import { createActions } from "./actions";
import { default as libraryReducer } from "./reducer";

export function configure({ api, store, registerNavigationItem, registerView, changeView, addRoute }) {
    const actions = createActions(api);
    const LibraryView = connectLibrary(actions);

    registerNavigationItem({
        label: "Library",
        path: PATH,
        data: {
            icon: GLYPHS.FOLDER_OUTLINE
        }
    });

    registerView(LIBRARY_VIEW_KEY, LibraryView);

    addRoute(PATH, () => {
        store.dispatch(actions.fetchLibrary());
        changeView(LIBRARY_VIEW_KEY)
    });
}

export { libraryReducer };
export const PATH = "/library";
const LIBRARY_VIEW_KEY = "library";