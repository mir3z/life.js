import { expect } from "chai";
import { mock, stub } from "sinon";

import createApi from "./index.js";

describe("API", () => {
    it("fetches patterns library", () => {
        const library = {};
        const fetch = mock()
            .once()
            .withArgs("library.json", { method: "GET" })
            .returnsPromise()
            .resolves({
                ok: true,
                json: stub().returnsPromise().resolves(library)
            });

        const { fetchLibrary } = createApi(fetch);

        return fetchLibrary()
            .then(result => {
                fetch.verify();
                expect(result).to.equal(library);
            });
    });

    it("fetches a pattern", () => {
        const patternBlob = "";
        const file = "glider.rle";
        const fetch = mock()
            .once()
            .withArgs("patterns/glider.rle", { method: "GET" })
            .returnsPromise()
            .resolves({
                ok: true,
                blob: stub().returnsPromise().resolves(patternBlob)
            });

        const { readPattern } = createApi(fetch);

        return readPattern(file)
            .then(result => {
                fetch.verify();
                expect(result).to.equal(patternBlob);
            });
    });
});