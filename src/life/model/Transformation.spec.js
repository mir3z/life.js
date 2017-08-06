import { expect } from "chai";

import { Transformation } from "./Transformation";

describe("Transformation", () => {

    const IDENTITY_AS_ARRAY = [1, 0, 0, 1, 0, 0];

    it("creates identity transformation by default", () => {
        expect(Transformation().asArray()).to.eql(IDENTITY_AS_ARRAY);
    });

    it("creates transformation from matrix", () => {
        const fakeMatrix = {};
        const t = Transformation(fakeMatrix);

        expect(t.matrix).to.equal(fakeMatrix);
    });

    it("creates identity transformation", () => {
        expect(Transformation.identity().asArray()).to.eql(IDENTITY_AS_ARRAY);
    });

    it("converts transformation matrix to array", () => {
        const maybeArray = Transformation().asArray();

        expect(maybeArray).to.be.an("array");
        expect(maybeArray.length).to.eql(6);
    });

    it("creates transformation from matrix as array", () => {
        const matrixAsArray = [1, 2, 3, 4, 5, 6];

        expect(Transformation.fromArray(matrixAsArray).asArray()).to.eql(matrixAsArray);
    });

    it("performs scaling", () => {
        const t = Transformation.identity();
        const scaled = t.scale(2);

        expect(scaled.asArray()).to.eql([2, 0, 0, 2, 0, 0]);
        expect(t).is.not.equal(scaled);
    });

    it("performs translation", () => {
        const t = Transformation.identity();
        const translated = t.translate(2, 4);

        expect(translated.asArray()).to.eql([1, 0, 0, 1, 2, 4]);
        expect(t).is.not.equal(translated);
    });

    it("inverses transformation matrix", () => {
        const t = Transformation.fromArray([1, 1, 0, 1, 1, 1]);
        const inverted = t.invert();

        expect(inverted.asArray()).to.eql([1, -1, -0, 1, -1, 0]);
        expect(t).is.not.equal(inverted);
    });

    it("applies transformation to a point", () => {
        const p = { x: 1, y: 2 };
        const t = Transformation.identity().scale(3).translate(5, 3);

        expect(t.apply(p)).to.eql({ x: 18, y: 15 });
    });
});