import { expect } from "chai";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    createViewportActions,
    ZOOM, MOVE, MOVE_BY, RESET, RESIZE, FIT
} from "./viewportActions.js";
import { TreeNode } from "../../core/TreeNode.js";

const mockStore = configureStore([thunk]);

describe("life / viewport actions", () => {

    it("zooms viewport", () => {
        const { zoom } = createViewportActions();
        const factor = 1.5;
        const pivot = { x: 0, y: 0 };

        expect(zoom(factor, pivot)).to.eql({ type: ZOOM, factor, pivot });
    });

    it("moves viewport", () => {
        const { move } = createViewportActions();
        const from = { x: 0, y: 0 };
        const to = { x: 1, y: 10 };

        expect(move(from, to)).to.eql({ type: MOVE, from, to });
    });

    it("moves viewport by given offset", () => {
        const { moveBy } = createViewportActions();
        const dx = 2;
        const dy = 5;

        expect(moveBy(dx, dy)).to.eql({ type: MOVE_BY, dx, dy });
    });

    it("resets viewport", () => {
        const { reset } = createViewportActions();

        expect(reset()).to.eql({ type: RESET });
    });

    it("resizes viewport", () => {
        const { resize } = createViewportActions();
        const width = 1.5;
        const height = 1.2;

        expect(resize(width, height)).to.eql({ type: RESIZE, width, height });
    });

    it("fits viewport to content boundaries", () => {
        const { fit } = createViewportActions();
        const world = { root: TreeNode.alive() };
        const store = mockStore({ life: { world } });

        expect(store.dispatch(fit())).to.eql({ type: FIT, area: { bottom: 7.5, left: -7.5, right: 7.5, top: -7.5 } });
    });
});