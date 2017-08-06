export const START_EVOLUTION = "life/evolution/start";
export const STOP_EVOLUTION = "life/evolution/stop";
export const RESET_EVOLUTION = "life/evolution/reset";
export const NEXT_GENERATION = "life/evolution/next-generation";
export const SUPER_GENERATION = "life/evolution/super-generation";
export const UPDATE_GENERATION_NUMBER = "life/evolution/update-generation-number";

export const EVOLUTION_STATE = {
    RUNNING: "evolution-state-running",
    STOPPED: "evolution-state-stopped"
};

export function createEvolutionActions({ clock }) {
    const nextGeneration = () => ({ type: NEXT_GENERATION });

    return {
        nextGeneration,

        superGeneration() {
            return (dispatch, getState) => {
                dispatch({ type: SUPER_GENERATION });
                dispatch({ type: UPDATE_GENERATION_NUMBER, worldLevel: getWorld(getState()).level });
            }
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

        resetEvolution: () => ({ type: RESET_EVOLUTION })
    };
}

const getEvolutionState = ({ life: { evolution: { state } } }) => state;
const getWorld = ({ life: { world } }) => world;