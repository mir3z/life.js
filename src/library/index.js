import LifeImporter from "../core/LifeImporter";
import { parseRLE } from "../core/parser";

import { connectLibrary } from "./connect";
import { createActions } from "./actions";
import { default as libraryReducer } from "./reducer";

import { GLYPHS } from "../components/Icon.jsx";
import { createActions as createImportActions } from "../import-lib";

export function configure(context) {
    const {
        api, store, registerNavigationItem, registerView,
        navigateToMainView, changeView, addRoute, createFileReader
    } = context;

    const lifeImporter = LifeImporter({ createFileReader, parser: parseRLE });
    const importActions = createImportActions(lifeImporter);
    const actions = createActions({ api, importFile: importActions.importFile, navigateToMainView });
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