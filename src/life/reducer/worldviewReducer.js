import { Universe } from "../../core/Universe";

import { TOGGLE_CELL_STATE } from "../actions/worldviewActions";
import { RESET_EVOLUTION, NEXT_GENERATION, SUPER_GENERATION } from "../actions/evolutionActions";
import { IMPORT_DONE } from "../actions/importActions";

export default function worldviewReducer(world = resetWorldview(), action = {}) {
    switch (action.type) {
        case TOGGLE_CELL_STATE:
            return toggleCell(world, action);

        case NEXT_GENERATION:
            return nextGeneration(world);

        case SUPER_GENERATION:
            return superGeneration(world);

        case RESET_EVOLUTION:
            return resetWorldview();

        case IMPORT_DONE:
            return action.root;
    }

    return world;
}

function toggleCell(world, { x, y }) {
    return Universe(world).toggleCell(x, y).root;
}

function nextGeneration(world) {
    return Universe(world).evolve().root;
}

function superGeneration(world) {
    // liczyc po expandowaniu
    return Universe(world).superEvolve().root;
}

function resetWorldview() {
    return Universe.create().root;
}