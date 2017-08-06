import { expect } from "chai";

import evolutionReducer from "./evolutionReducer";
import {
    EVOLUTION_STATE,
    NEXT_GENERATION,
    START_EVOLUTION,
    STOP_EVOLUTION,
    RESET_EVOLUTION
} from "../actions/evolutionActions";

describe("evolutionReducer", () => {

    it("returns stopped evolution by default", testReducer(
        undefined,
        undefined,
        { state: EVOLUTION_STATE.STOPPED, generation: 0 }
    ));

    it("increases generation number", testReducer(
        { generation: 10 },
        { type: NEXT_GENERATION },
        { generation: 11 }
    ));

    it("starts evolution", testReducer(
        { state: EVOLUTION_STATE.STOPPED },
        { type: START_EVOLUTION },
        { state: EVOLUTION_STATE.RUNNING }
    ));

    it("stops evolution", testReducer(
        { state: EVOLUTION_STATE.RUNNING },
        { type: STOP_EVOLUTION },
        { state: EVOLUTION_STATE.STOPPED }
    ));

    it("resets evolution", testReducer(
        { generation: 10, state: EVOLUTION_STATE.RUNNING },
        { type: RESET_EVOLUTION },
        { generation: 0, state: EVOLUTION_STATE.STOPPED }
    ));

    function testReducer(initialState, action, expectation) {
        return () => expect(evolutionReducer(initialState, action)).to.eql(expectation);
    }
});