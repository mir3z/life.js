import { createEvolutionActions } from "./evolutionActions";
import { createWorldviewActions } from "./worldviewActions";
import { createViewportActions } from "./viewportActions";
import { createImportActions } from "./importActions";

export default function createActions({ clock, navigateToLifeView, importFile, importFromString }) {
    const evolutionActions = createEvolutionActions({ clock });
    const worldviewActions = createWorldviewActions();
    const viewportActions = createViewportActions();
    const importActions = createImportActions({
        importFile,
        importFromString,
        navigateToLifeView,
        fitViewport: viewportActions.fit
    });

    return {
        ...worldviewActions,
        ...importActions,
        ...viewportActions,
        ...evolutionActions
    };
}