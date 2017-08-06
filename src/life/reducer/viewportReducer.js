import { Transformation } from "../model/Transformation";
import { Viewport } from "../model/Viewport";

import { ZOOM, MOVE, MOVE_BY, RESET, RESIZE, FIT } from "../actions/viewportActions";
import { RESET_EVOLUTION } from "../actions/evolutionActions"

export default function viewportReducer(state = resetViewport(), action) {

    switch (action.type) {
        case ZOOM:
            return { ...state, matrix: zoom(state, action) };

        case MOVE:
            return { ...state, matrix: move(state, action) };

        case MOVE_BY:
            return { ...state, matrix: moveBy(state, action) };

        case RESET:
        case RESET_EVOLUTION:
            return { ...state, matrix: resetTransformation() };

        case RESIZE:
            return resize(state, action);

        case FIT:
            return { ...state, matrix: fit(action) };
    }

    return state;
}

function zoom(viewport, { factor, pivot }) {
    return createViewport(viewport)
        .zoom(factor, pivot)
        .transformation.asArray()
}

function move(viewport, { from, to }) {
    return createViewport(viewport)
        .move(from, to)
        .transformation.asArray();
}

function moveBy(viewport, { dx, dy }) {
    return createViewport(viewport)
        .moveBy(dx, dy)
        .transformation.asArray();
}

function resize(state, { width, height }) {
    return { ...state, width, height };
}

function fit({ area }) {
    return createViewport(resetViewport())
        .fit(area)
        .transformation.asArray();
}

function createViewport({ matrix, width, height }) {
    return Viewport({
        width,
        height,
        transformation: Transformation.fromArray(matrix),
    });
}

function resetViewport() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        matrix: resetTransformation()
    };
}

function resetTransformation() {
    return Transformation.identity().asArray();
}