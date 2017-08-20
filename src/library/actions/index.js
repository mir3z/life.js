export const LIBRARY_FETCH_START = "library/fetch-start";
export const LIBRARY_FETCH_COMPLETED = "library/fetch-completed";
export const LIBRARY_FETCH_ERROR = "library/fetch-error";

export const CATEGORY_EXPAND = "library/category-expand";
export const CATEGORY_FOLD = "library/category-fold";
export const SHOW_PATTERN_DETAILS = "library/show-pattern-details";

export function createActions(api) {

    return {
        fetchLibrary() {
            return (dispatch) => {
                dispatch({ type: LIBRARY_FETCH_START });

                return api.fetchLibrary()
                    .then(({ library }) => dispatch({ type: LIBRARY_FETCH_COMPLETED, library }))
                    .catch(error => dispatch({ type: LIBRARY_FETCH_ERROR, error }));
            };
        },

        showPatternDetails(pattern) {
            return { type: SHOW_PATTERN_DETAILS, pattern };
        },

        expand(idx) {
            return { type: CATEGORY_EXPAND, idx };
        },

        fold(idx) {
            return { type: CATEGORY_FOLD, idx };
        }
    };
}