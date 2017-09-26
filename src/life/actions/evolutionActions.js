import { TreeNode } from "../../core/TreeNode.js";

export const START_EVOLUTION = "life/evolution/start";
export const STOP_EVOLUTION = "life/evolution/stop";
export const RESET_EVOLUTION = "life/evolution/reset";
export const NEXT_GENERATION = "life/evolution/next-generation";
export const SUPER_GENERATION = "life/evolution/super-generation";

export const EVOLUTION_STATE = {
    RUNNING: "evolution-state-running",
    STOPPED: "evolution-state-stopped"
};

export function createEvolutionActions({ clock }) {
    const nextGeneration = () => ({ type: NEXT_GENERATION });

    return {
        nextGeneration,

        superGeneration() {
            return { type: SUPER_GENERATION };
        },

        stopEvolution: () => ({ type: STOP_EVOLUTION }),

        startEvolution: () => {
            return (dispatch, getState) => {
                dispatch({ type: START_EVOLUTION });

                clock.start(() => {
                    const evolutionState = getEvolutionState(getState());

                    if (evolutionState === EVOLUTION_STATE.RUNNING) {
                        dispatch(nextGeneration());
                    } else {
                        clock.stop();
                    }
                });
            };
        },

        resetEvolution: () => {
            return (dispatch) => {
                TreeNode.__cache.reset();
                return dispatch({ type: RESET_EVOLUTION });
            };
        }
    };
}

const getEvolutionState = ({ life: { evolution } }) => evolution;
