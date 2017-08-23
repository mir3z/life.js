import { connectImportView } from "./connect";
import { GLYPHS } from "../../components/Icon.jsx";

export const PATH = "/import";

export function configure({ registerNavigationItem, registerView, addRoute, changeView, importFile, importFromString }) {
    const ImportView = connectImportView({ importFile, importFromString });

    registerNavigationItem({
        label: "Import",
        path: PATH,
        data: {
            icon: GLYPHS.UPLOAD
        }
    });

    registerView(VIEW_NAME, ImportView);
    addRoute(PATH, () => changeView(VIEW_NAME));
}

const VIEW_NAME = "import";