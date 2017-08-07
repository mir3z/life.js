import { Universe } from "../../core/Universe";

export const ZOOM = "life/viewport/zoom";
export const MOVE = "life/viewport/move";
export const MOVE_BY = "life/viewport/move-by";
export const RESET = "life/viewport/reset";
export const RESIZE = "life/viewport/resize";
export const FIT = "life/viewport/fit";

export function createViewportActions() {

    return {
        zoom: (factor, pivot) => ({ type: ZOOM, factor, pivot }),

        move: (from, to) => ({ type: MOVE, from, to }),

        moveBy: (dx, dy) => ({ type: MOVE_BY, dx, dy }),

        reset: () => ({ type: RESET }),

        resize: ({ width, height }) => ({ type: RESIZE, width, height }),

        fit: () => (dispatch, getState) => {
            const { life: { world } } = getState();
            const { top, left, right, bottom } = Universe(world.root).getBoundaries();
            const area = {
                top: top * 15,
                left: left * 15,
                right: (right + 1) * 15,
                bottom: (bottom + 1) * 15
            };


            dispatch({ type: FIT, area });
        }
    };
}