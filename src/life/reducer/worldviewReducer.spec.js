import { expect } from "chai";

import { TreeNode } from "../../core/TreeNode";
import { Universe } from "../../core/Universe";

import worldviewReducer from "./worldviewReducer";
import { TOGGLE_CELL_STATE } from "../actions/worldviewActions";
import { RESET_EVOLUTION, NEXT_GENERATION } from "../actions/evolutionActions";

describe("worldviewReducer", () => {

    it("returns initial world by default", () => {
        const nextWorld = worldviewReducer();

        expect(nextWorld.root).to.be.an("object");
        expect(nextWorld.generation).to.eql(0);
    });

    it("returns world for the next generation", () => {
        const world = Universe.create();
        const nextWorld = worldviewReducer(world, { type: NEXT_GENERATION });

        expect(nextWorld.generation).to.eql(1);
    });

    it("resets world", () => {
        const world = TreeNode.ofGivenLevel(4);
        const nextWorld = worldviewReducer(world, { type: RESET_EVOLUTION });

        expect(nextWorld.root).to.be.an("object");
        expect(nextWorld.generation).to.eql(0);
    });

    it("toggles cell", () => {
        const x = 2;
        const y = 1;
        const world = Universe.create();
        const nextWorld = worldviewReducer(world, { type: TOGGLE_CELL_STATE, x, y });

        expect(Universe(nextWorld.root).read(x, y)).to.equal(true);
    });
});