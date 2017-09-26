export function canvasRendererFactory(ctx, { cellSize = 15, borderSize = 0.8 } = {}) {
    const canvas = ctx.canvas;

    return (viewTransformation) => {
        const transformation = viewTransformation.translate(canvas.width / 2, canvas.height / 2);

        ctx.setTransform(...transformation.asArray());

        return {
            cellAt(point) {
                const pt = transformation.invert().apply(point);
                return {
                    x: Math.floor(pt.x / cellSize),
                    y: Math.floor(pt.y / cellSize)
                };
            },

            clear() {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);

                ctx.fillStyle = "#333";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.restore();

                return this;
            },

            repaint(world) {
                this.clear();

                const size = Math.pow(2, world.level - 1) * cellSize;

                this.renderNode(world, size * 2, -size, -size);

                return this;
            },

            renderNode(node, size, x, y) {
                if (node.population === 0) {
                    return this;
                }

                if (node.level === 0 && node.population) {
                    return this.renderCell(cellSize, x, y);
                }

                const qsize = size / 2;

                this.renderNode(node.nw, qsize, x, y);
                this.renderNode(node.ne, qsize, x + qsize, y);
                this.renderNode(node.sw, qsize, x, y + qsize);
                this.renderNode(node.se, qsize, x + qsize, y + qsize);

                return this;
            },

            renderCell(size, x, y) {
                ctx.fillStyle = "#fff";
                ctx.fillRect(x + borderSize, y + borderSize, size - borderSize * 2, size - borderSize * 2);

                return this;
            }
        };
    };
}
