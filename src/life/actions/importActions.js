export function createImportActions({ importFile, importFromString, navigateToLifeView, fitViewport }) {

    function importLife(importStrategy) {
        return (...args) => {
            return dispatch => {
                return dispatch(importStrategy(...args))
                    .then(imported => {
                        navigateToLifeView();
                        dispatch(fitViewport());
                        return imported;
                    });
            };
        };
    }

    return {
        importFile: importLife(importFile),
        importFromString: importLife(importFromString)
    };
}