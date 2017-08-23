export const IMPORT_DONE = "import/done";
export const IMPORT_ERROR = "import/error";

export function createActions(lifeImporter) {

    function importLife(importStrategy) {
        return (...args) => {
            return dispatch => {
                return importStrategy(...args)
                    .then(imported => {
                        const { universe, meta } = imported;
                        dispatch({ type: IMPORT_DONE, root: universe.root, meta });
                        return imported;
                    })
                    .catch(e => {
                        const message = composeErrorMessage(e);
                        dispatch({ type: IMPORT_ERROR, message });
                        throw { message };
                    });
            };
        };
    }

    function composeErrorMessage(error) {
        const location = error.location
            ? `Line ${ error.location.start.line }, Column ${ error.location.start.column }: `
            : "";

        const message = error.message || "";

        return `${ location }${ message }` || error.toString();
    }

    return {
        importFile: importLife(lifeImporter.importFile),
        importFromString: importLife(lifeImporter.importFromString)
    };
}