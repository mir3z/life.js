import { connectImportView } from "./connect";
import { createImportActions } from "./actions";
import { GLYPHS } from "../../components/Icon.jsx";
import { importReducer } from "./reducer";

export function configure({ registerNavigationItem, registerView, addRoute, changeView, importFile, importFromString }) {
    const actions = createImportActions({ importFile, importFromString });
    const ImportView = connectImportView(actions);

    registerNavigationItem({
        label: "Import",
        path: PATH,
        data: {
            icon: GLYPHS.UPLOAD
        }
    });

    registerView("import", ImportView);
    addRoute(PATH, () => changeView("import"));
}

export const PATH = "/import";

export { importReducer };