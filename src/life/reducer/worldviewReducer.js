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
            return { ...resetWorldview(), root: action.root };
    }

    return world;
}

function toggleCell({ root, generation }, { x, y }) {
    const nextUniverse = Universe(root, generation).toggleCell(x, y);
    return serialize(nextUniverse);
}

function nextGeneration({ root, generation }) {
    const nextUniverse = Universe(root, generation).evolve();
    return serialize(nextUniverse);
}

function superGeneration({ root, generation }) {
    const nextUniverse = Universe(root, generation).superEvolve();
    return serialize(nextUniverse);
}

function resetWorldview() {
    return serialize(Universe.create());
}

function serialize({ root, generation }) {
    return { root, generation };
}