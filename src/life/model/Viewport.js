export function Viewport({ transformation, width, height }) {

    const transform = fn => Viewport({ transformation: fn(transformation), width, height });

    return {
        width,
        height,
        transformation,

        zoom(factor, pivot) {
            const center = transformation.invert().apply(pivot);

            return transform(t => t
                .translate(center.x, center.y)
                .scale(factor)
                .translate(-center.x, -center.y)
            );
        },

        move(ptFrom, ptTo) {
            const inverted = transformation.invert();
            const from = inverted.apply(ptFrom);
            const to = inverted.apply(ptTo);

            return transform(affine => affine.translate(to.x - from.x, to.y - from.y));
        },

        moveBy(dx, dy) {
            return transform(affine => affine.translate(dx, dy));
        },

        fit({ top, left, right, bottom }) {
            const dx = right - left;
            const dy = bottom - top;

            const size = Math.min(width / dx, height / dy) * 0.3;
            const zoom = Math.min(1, size);

            return this
                .moveBy(-dx / 2, -dy / 2)
                .zoom(zoom, { x: width / 2, y: height / 2 });
        }
    };
}
