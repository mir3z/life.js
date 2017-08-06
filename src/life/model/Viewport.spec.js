import { expect } from "chai";
import { spy, stub, mock, assert } from "sinon";

import { Viewport } from "./Viewport";

describe("Viewport", () => {
    
    it("creates a Viewport from Transformation", () => {
        const fakeTransformation = {};
        const v = Viewport(fakeTransformation);

        expect(v.transformation).to.equal(fakeTransformation);
    });

    it("performs a zoom operation", () => {
        const zoomFactor = 1.5;
        const zoomPivot = { x: 2, y: 6 };
        const centerPoint = { x: 6, y: 7 };

        const t4 = {};
        const t3 = {
            translate: mock().withArgs(-centerPoint.x, -centerPoint.y).returns(t4)
        };
        const t2 = {
            scale: mock().withArgs(zoomFactor).returns(t3)
        };
        const t1 = {
            translate: mock().withArgs(centerPoint.x, centerPoint.y).returns(t2),
            invert: stub().returnsThis(),
            apply: mock().withArgs(zoomPivot).returns(centerPoint)
        };

        const zoomed = Viewport(t1).zoom(zoomFactor, zoomPivot);

        expect(zoomed.transformation).to.equal(t4);
        assert.callOrder(t1.translate, t2.scale, t3.translate);
        t1.apply.verify();
        t1.translate.verify();
        t2.scale.verify();
    });

    it("performs move operation", () => {
        const ptFrom = { x: 4, y: 9 };
        const ptTo = { x: 6, y: 12 };

        const inv = {
            apply: mock().twice().callsFake(({ x, y }) => ({ x: x + 10, y: y + 20 }))
        };
        const t2 = {};
        const t1 = {
            translate: mock().withArgs(2, 3).returns(t2),
            invert: mock().returns(inv)
        };

        const moved = Viewport(t1).move(ptFrom, ptTo);

        expect(moved.transformation).to.equal(t2);
        t1.translate.verify();
        t1.invert.verify();
        inv.apply.verify();
    });

    it("performs moveBy operation", () => {
        const dx = 5;
        const dy = 7;
        const t2 = {};
        const t1 = {
            translate: mock().withArgs(dx, dy).returns(t2)
        };

        const moved = Viewport(t1).moveBy(dx, dy);

        expect(moved.transformation).to.equal(t2);
        t1.translate.verify();
    });
});