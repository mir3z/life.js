import React from "react";
import { Button } from "../../components/Button.jsx";
import { EVOLUTION_STATE } from "../actions/evolutionActions";

import "./ControlPane.scss";

export const ControlPane = ({ evolutionState, resetEvolution, ...actions }) => {
    const resolveState = buttonKey => resolveButtonState(buttonKey, evolutionState, actions);

    return (
        <div className="control-pane">
            <Button { ...resolveState("step") } />
            <Button { ...resolveState("superStep") } />
            <Button { ...resolveState("playPause") } />
            <Button onClick={ resetEvolution } label="Reset" />
        </div>
    );
};

function resolveButtonState(buttonKey, evolutionState, actions) {
    const { RUNNING, STOPPED } = EVOLUTION_STATE;
    const { startEvolution, stopEvolution, nextGeneration, superGeneration } = actions;

    const states = {
        playPause: {
            [RUNNING]: {
                label: "Pause",
                onClick: stopEvolution
            },
            [STOPPED]: {
                label: "Play",
                onClick: startEvolution
            }
        },
        step: {
            [RUNNING]: {
                label: "Step",
                onClick: () => {},
                disabled: true
            },
            [STOPPED]: {
                label: "Step",
                onClick: nextGeneration,
                disabled: false
            }
        },
        superStep: {
            [RUNNING]: {
                label: "Super Step",
                onClick: () => {},
                disabled: true
            },
            [STOPPED]: {
                label: "Super Step",
                onClick: superGeneration,
                disabled: false
            }
        }
    };

    return states[buttonKey][evolutionState];
}