export const IMPORT_ERROR = "import/error";

export function createImportActions({ importFile, importFromString }) {

    function composeErrorMessage(error) {
        const location = error.location
            ? `Line ${ error.location.start.line }, Column ${ error.location.start.column }: `
            : "";

        const message = error.message || "";

        return `${ location }${ message }` || error.toString();
    }

    function importLife(importer) {
        return (...args) => {
            return dispatch => {
                return dispatch(importer(...args))
                    .catch(e => dispatch({ type: IMPORT_ERROR, message: composeErrorMessage(e) }));
            };
        };
    }

    return {
        importFile: importLife(importFile),
        importFromString: importLife(importFromString)
    };
}