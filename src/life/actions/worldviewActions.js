export const TOGGLE_CELL_STATE = "life/worldview/toggle-cell-state";

export function createWorldviewActions() {
    return {
        toggleCellState: (x, y) => ({ type: TOGGLE_CELL_STATE, x, y })
    };
}
