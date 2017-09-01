import { expect } from "chai";
import { stub, spy, mock, assert } from "sinon";

import { canvasRendererFactory } from "./CanvasRenderer";
import { TreeNode } from "../../core/TreeNode";

describe("CanvasRenderer", () => {

    context("canvasRendererFactory", () => {
        it("returns a function accepting single argument", () => {
            const renderer = canvasRendererFactory(fakeCanvasContext());

            expect(renderer).to.be.a("function");
            expect(renderer.length).to.eql(1);
        });
    });

    it("automatically applies centering translation", () => {
        const transformationArray = [];
        const fakeViewTransformation = fakeTransformation({
            asArray: stub().returns(transformationArray)
        });
        const ctx = fakeCanvasContext();
        const renderer = canvasRendererFactory(ctx);

        renderer(fakeViewTransformation);

        assert.calledWith(fakeViewTransformation.translate, 250, 150);
        assert.calledWith(ctx.setTransform, ...transformationArray);
    });

    it("renders a cell", () => {
        const borderSize = 0.5;
        const cellSize = 10;
        const cellX = 5;
        const cellY = 6;
        const ctx = fakeCanvasContext();
        const renderer = canvasRendererFactory(ctx, { borderSize });

        renderer(fakeTransformation()).renderCell(cellSize, cellX, cellY);

        assert.calledWith(ctx.fillRect,
            cellX + borderSize,
            cellY + borderSize,
            cellSize - borderSize * 2,
            cellSize - borderSize * 2
        );
        expect(ctx.fillStyle).to.eql("#fff");
    });

    it("clears a canvas", () => {
        const ctx = fakeCanvasContext();
        const renderer = canvasRendererFactory(ctx);
        const identity = [1, 0, 0, 1, 0, 0];

        renderer(fakeTransformation()).clear();

        assert.calledWith(ctx.fillRect, 0, 0, ctx.canvas.width, ctx.canvas.height);
        assert.calledWith(ctx.setTransform, ...identity);
        assert.callOrder(ctx.save, ctx.setTransform, ctx.fillRect, ctx.restore)
    });

    it("returns cell's coordinates at given position", () => {
        const ctx = fakeCanvasContext();
        const renderer = canvasRendererFactory(ctx, { cellSize: 9 });
        const inPosition = { x: 5, y: 8 };
        const trans = fakeTransformation({
            apply: mock().withArgs(inPosition).returns({ x: 100, y: 200 })
        });

        const coord = renderer(trans).cellAt(inPosition);

        expect(coord).to.eql({ x: 11, y: 22 });
        trans.apply.verify();
    });

    describe("when repainting a world", () => {
        const cellSize = 5;
        const worldSize = 10;

        it("clears canvas", () => {
            const ctx = fakeCanvasContext();
            const renderer = canvasRendererFactory(ctx);
            const world = {
                getSize: stub().returns(worldSize)
            };

            const r = renderer(fakeTransformation());
            spy(r, "clear");
            stub(r, "renderNode");
            r.repaint(world);

            assert.called(r.clear);
        });

        it("renders the root node", () => {
            const ctx = fakeCanvasContext();
            const renderer = canvasRendererFactory(ctx, { cellSize });
            const world = {
                level: 2
            };

            const r = renderer(fakeTransformation());
            stub(r, "clear");
            stub(r, "renderNode");
            r.repaint(world);

            const size = Math.pow(2, world.level - 1) * cellSize;
            assert.calledWith(r.renderNode, world, 2 * size, -size, -size);
        });
    });

    describe("when rendering a node", () => {
        const cellSize = 12;
        const x = 5;
        const y = 7;
        const size = 8;
        const halfSize = size / 2;

        it("does nothing when node's population is 0", () => {
            const r = createRenderer();
            const node = TreeNode.dead();

            r.renderNode(node);

            assert.notCalled(r.renderCell);
            assert.calledOnce(r.renderNode);
        });

        it("renders a cell if node is a leaf node", () => {
            const r = createRenderer({ cellSize });
            const node = TreeNode.alive();

            r.renderNode(node, null, x, y);

            assert.calledWith(r.renderCell, cellSize, x, y);
            assert.calledOnce(r.renderNode);
        });

        it("renders nodes recursively if node is not a leaf node", () => {
            const r = createRenderer();
            const node = TreeNode.fromSubnodes(
                TreeNode.alive(),
                TreeNode.dead(),
                TreeNode.dead(),
                TreeNode.dead()
            );

            r.renderNode(node, size, x, y);

            assert.callCount(r.renderNode, 5);
            assert.calledWith(r.renderNode, node.nw, halfSize, x, y);
            assert.calledWith(r.renderNode, node.ne, halfSize, x + halfSize, y);
            assert.calledWith(r.renderNode, node.sw, halfSize, x, y + halfSize);
            assert.calledWith(r.renderNode, node.se, halfSize, x + halfSize, y + halfSize);
        });

        function createRenderer(options) {
            const ctx = fakeCanvasContext();
            const renderer = canvasRendererFactory(ctx, options);
            const r = renderer(fakeTransformation());

            spy(r, "renderNode");
            spy(r, "renderCell");

            return r;
        }
    });

    function fakeCanvasContext() {
        return {
            canvas: {
                width: 500,
                height: 300
            },
            save: spy(),
            restore: spy(),
            setTransform: spy(),
            fillRect: spy()
        };
    }

    function fakeTransformation(props) {
        return {
            translate: stub().returnsThis(),
            asArray: stub().returns([]),
            invert: stub().returnsThis(),
            ...props
        };
    }
});