import fs from "fs";
import { expect } from "chai";

import { parseRLE } from "./rle.js";

const FIXTURE_PATH = process.cwd() + "/test/fixtures/";

describe("RLE parser", () => {
    it("parses pattern size", () => {
        const output = parseRLE(loadGlider());

        expect(output.size).to.eql({ x: 5, y: 4 });
    });

    it("parses pattern rules", () => {
        const output = parseRLE(loadGlider());

        expect(output.rule).to.eql({ born: [3, 6], survive: [1, 2, 5] });
    });

    it("parses metadata", () => {
        const output = parseRLE(loadGlider());

        expect(output.meta).to.eql([
            { type: "NAME", value: "2x2 glider" },
            { type: "COMMENT", value: "A diagonal c/8 glider in the 2x2 (125/36) rule." },
            { type: "COMMENT", value: "www.conwaylife.com/wiki/index.php?title=2x2" }
        ]);
    });

    it("parses pattern", () => {
        const output = parseRLE(loadGlider());

        expect(output.pattern).to.eql([
            [ 1, 1, 1, 0, 0 ],
            [],
            [ 0, 0, 1, 0, 1 ],
            [ 0, 1 ]
        ]);
    });

    context("when parsing fails", () => {
        const load = () => parseRLE(loadInvalid());

        it("throws exception", () => {
            expect(load).to.throw("SyntaxError");
        });

        it("throw with properties", () => {
            try {
                load();
            } catch (e) {
                expect(e.message).to.eql(`Expected "," or newline but "X" found.`);
                expect(e.location).to.eql({
                    start: { offset: 40, line: 3, column: 1 },
                    end: { offset: 41, line: 3, column: 2 }
                });
            }
        });
    });

    const loadRLE = (file) => fs.readFileSync(FIXTURE_PATH + file, "utf8");
    const loadGlider = () => loadRLE("glider.rle");
    const loadInvalid = () => loadRLE("invalid.rle");
});