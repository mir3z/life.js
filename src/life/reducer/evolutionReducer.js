import {
    START_EVOLUTION,
    STOP_EVOLUTION,
    EVOLUTION_STATE,
    RESET_EVOLUTION,
    NEXT_GENERATION,
    UPDATE_GENERATION_NUMBER
} from "../actions/evolutionActions";

export default function evolutionReducer(evolution = resetEvolution(), action = {}) {
    switch (action.type) {
        case NEXT_GENERATION:
            return increaseGenerationNumber(evolution);

        case UPDATE_GENERATION_NUMBER:
            return updateGenerationNumber(evolution, action);

        case START_EVOLUTION:
            return startEvolution(evolution);

        case STOP_EVOLUTION:
            return stopEvolution(evolution);

        case RESET_EVOLUTION:
            return resetEvolution();
    }

    return evolution;
}


function increaseGenerationNumber(evolution = {}) {
    const { generation = 0 } = evolution;
    return { ...evolution, generation: generation + 1 };
}

function updateGenerationNumber(state = {}, { worldLevel }) {
    return { ...state, generation: state.generation + Math.pow(2, worldLevel - 2) };
}

function startEvolution(state) {
    return { ...state, state: EVOLUTION_STATE.RUNNING };
}

function stopEvolution(state) {
    return { ...state, state: EVOLUTION_STATE.STOPPED };
}

function resetEvolution() {
    return  {
        state: EVOLUTION_STATE.STOPPED,
        generation: 0
    };
}