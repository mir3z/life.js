import { expect } from "chai";

import { TreeNode } from "../../core/TreeNode";

import worldviewReducer from "./worldviewReducer";
import { TOGGLE_CELL_STATE } from "../actions/worldviewActions";
import { RESET_EVOLUTION, NEXT_GENERATION } from "../actions/evolutionActions";

describe("worldviewReducer", () => {

    it("returns initial world by default", () => {
        const nextWorld = worldviewReducer();

        expect(nextWorld.level).to.eql(3);
        expect(nextWorld.population).to.eql(0);
    });

    it("returns world for the next generation", () => {
        const world = TreeNode.ofGivenLevel(3);
        const nextWorld = worldviewReducer(world, { type: NEXT_GENERATION });

        expect(nextWorld).to.not.equal(world);
    });

    it("resets world", () => {
        const world = TreeNode.ofGivenLevel(4);
        const nextWorld = worldviewReducer(world, { type: RESET_EVOLUTION });

        expect(nextWorld.level).to.eql(3);
        expect(nextWorld.population).to.eql(0);
    });

    it("toggles cell", () => {
        const x = 2;
        const y = 1;
        const world = TreeNode.ofGivenLevel(3);
        const nextWorld = worldviewReducer(world, { type: TOGGLE_CELL_STATE, x, y });

        expect(nextWorld.read(x, y)).to.equal(true);
    });
});