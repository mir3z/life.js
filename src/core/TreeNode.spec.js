import { expect } from "chai";

import { TreeNode } from "./TreeNode.js";

describe("TreeNode", () => {
    beforeEach(() => {
        TreeNode.__cache.reset();
    });

    it("creates tree node", () => {
        const node = TreeNode();

        expect(node).to.eql(protoNode);
    });

    it("creates a node from subnodes", () => {
        const nw = {};
        const ne = {};
        const sw = {};
        const se = {};
        const node = TreeNode.fromSubnodes(nw, ne, sw, se);

        expect(node.nw).to.equal(nw);
        expect(node.ne).to.equal(ne);
        expect(node.sw).to.equal(sw);
        expect(node.se).to.equal(se);
    });

    it("creates living node", () => {
        const node = TreeNode.alive();

        expect(node).to.eql({
            ...protoNode,
            population: 1
        });
    });

    it("creates dead node", () => {
        const node = TreeNode.dead();

        expect(node).to.eql({
            ...protoNode,
            population: 0
        });
    });

    it("creates a node of given level", () => {
        const level = 3;
        const node = TreeNode.ofGivenLevel(level);

        expect(node.level).to.eql(level);
        expect(node.nw.nw.nw).to.exist;
        expect(node.nw.nw.nw.nw).not.to.exist;
    });

    const protoNode = {
        nw: undefined,
        ne: undefined,
        sw: undefined,
        se: undefined,
        level: 0,
        population: 0
    };
});