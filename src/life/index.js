import { GLYPHS } from "../components/Icon.jsx";

import { canvasRendererFactory } from "./view/CanvasRenderer";
import createActions from "./actions";
import {
    connectWorldview,
    connectCanvas,
    connectControlPane,
    connectStatusBar,
    connectMetadataViewer
} from "./connect";
import { default as lifeReducer } from "./reducer";

import { configure as configureImport } from "./import";
import { createActions as createImportActions } from "../import-lib";
import { parseRLE } from "../core/parser";
import LifeImporter from "../core/LifeImporter";

export function configure(context) {
    const {
        registerView,
        registerNavigationItem,
        changeView,
        changeLocation,
        addRoute,
        createClock,
        createFileReader,
    } = context;

    const lifeImporter = LifeImporter({ createFileReader, parser: parseRLE });
    const navigateToLifeView = () => changeLocation(PATH);

    const actions = createActions({
        navigateToLifeView,
        clock: createClock(),
        ...createImportActions(lifeImporter)
    });

    const Canvas = connectCanvas(actions, canvasRendererFactory);
    const ControlPane = connectControlPane(actions);
    const StatusBar = connectStatusBar();
    const MetadataViewer = connectMetadataViewer();
    const Worldview = connectWorldview(actions, { Canvas, ControlPane, StatusBar, MetadataViewer });

    registerNavigationItem({
        label: "Life",
        path: PATH,
        data: {
            icon: GLYPHS.APPS
        }
    });

    registerView(WORLDVIEW_KEY, Worldview);
    addRoute(PATH, () => changeView(WORLDVIEW_KEY));

    configureImport({
        ...context,
        importFile: actions.importFile,
        importFromString: actions.importFromString
    });
}

export const PATH = "/life";
const WORLDVIEW_KEY = "worldview";
export { lifeReducer };