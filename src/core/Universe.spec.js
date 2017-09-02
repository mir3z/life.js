import { expect } from "chai";

import { TreeNode } from "./TreeNode.js";
import { Universe } from "./Universe.js";

describe("Universe", () => {
    beforeEach(() => {
        TreeNode.__cache.reset();
    });

    it("wraps root node", () => {
        const node = {};
        const generation = 1;

        const u = Universe(node, generation);

        expect(u.root).to.equal(node);
        expect(u.generation).to.eql(generation);
    });

    it("reads cell value", () => {
        const aliveOrDead = [
            { node: TreeNode.alive(), value: true },
            { node: TreeNode.dead(), value: false },
        ];

        aliveOrDead.forEach(({ node, value }) => {
            const u = Universe(node);
            expect(u.read(0, 0)).to.eql(value);
        });
    });

    it("calculates universe boundaries", () => {
        const node = TreeNode.fromSubnodes(
            TreeNode.alive(),
            TreeNode.alive(),
            TreeNode.alive(),
            TreeNode.alive()
        );
        const u = Universe(node);

        expect(u.getBoundaries()).to.eql({ top: -1, bottom: 0, left: -1, right: 0 });
    });
});