import { mat2d } from "gl-matrix";

export function Transformation(matrix = mat2d.create()) {
    const map = fn => Transformation(fn(matrix));
    const toArray = matrix => [ matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5] ];
    const scaling = value => matrix => mat2d.scale(mat2d.create(), matrix, [ value, value ]);
    const translation = (x, y) => matrix => mat2d.translate(mat2d.create(), matrix, [ x, y ]);
    const inversion = () => matrix => mat2d.invert(mat2d.create(), matrix);

    return {
        matrix,

        scale: s => map(scaling(s)),
        translate: (dx, dy) => map(translation(dx, dy)),
        invert: () => map(inversion()),
        asArray: () => toArray(matrix),
        apply: ({ x, y }) => {
            const [ a, b, c, d, e, f ] = toArray(matrix);

            return {
                x: a * x + c * y + e,
                y: d * y + b * x + f
            };
        }
    };
}
Transformation.identity = () => Transformation(mat2d.create());

Transformation.fromArray = ([ a, b, c, d, e, f ]) => Transformation(mat2d.fromValues(a, b, c, d, e, f));