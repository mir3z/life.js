import { expect } from "chai";

import evolutionReducer from "./evolutionReducer";
import {
    EVOLUTION_STATE,
    START_EVOLUTION,
    STOP_EVOLUTION,
    RESET_EVOLUTION
} from "../actions/evolutionActions";

describe("evolutionReducer", () => {

    it("returns stopped evolution by default", testReducer(
        undefined,
        undefined,
        EVOLUTION_STATE.STOPPED
    ));

    it("starts evolution", testReducer(
        { state: EVOLUTION_STATE.STOPPED },
        { type: START_EVOLUTION },
        EVOLUTION_STATE.RUNNING
    ));

    it("stops evolution", testReducer(
        { state: EVOLUTION_STATE.RUNNING },
        { type: STOP_EVOLUTION },
        EVOLUTION_STATE.STOPPED
    ));

    it("resets evolution", testReducer(
        { generation: 10, state: EVOLUTION_STATE.RUNNING },
        { type: RESET_EVOLUTION },
        EVOLUTION_STATE.STOPPED
    ));

    function testReducer(initialState, action, expectation) {
        return () => expect(evolutionReducer(initialState, action)).to.eql(expectation);
    }
});