export const IMPORT_DONE = "import/done";

export function createImportActions({ lifeImporter, navigateToLifeView, fitViewport }) {

    function importLife(importStrategy) {
        return (...args) => {
            return dispatch => {
                return importStrategy(...args)
                    .then(({ universe, meta }) => {
                        dispatch({ type: IMPORT_DONE, root: universe.root, meta });
                        navigateToLifeView();
                        dispatch(fitViewport());
                        return universe;
                    });
            };
        };
    }

    return {
        importFile: importLife(lifeImporter.importFile),
        importFromString: importLife(lifeImporter.importFromString)
    };
}