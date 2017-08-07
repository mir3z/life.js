import {
    START_EVOLUTION,
    STOP_EVOLUTION,
    EVOLUTION_STATE,
    RESET_EVOLUTION,
} from "../actions/evolutionActions";

export default function evolutionReducer(evolution = EVOLUTION_STATE.STOPPED, action = {}) {
    switch (action.type) {
        case START_EVOLUTION:
            return EVOLUTION_STATE.RUNNING;

        case STOP_EVOLUTION:
        case RESET_EVOLUTION:
            return EVOLUTION_STATE.STOPPED;
    }

    return evolution;
}