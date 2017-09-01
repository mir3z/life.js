import { expect } from "chai";
import { mock, spy } from "sinon";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    createActions,
    CATEGORY_EXPAND,
    CATEGORY_FOLD,
    SHOW_PATTERN_DETAILS,
    LIBRARY_FETCH_START,
    LIBRARY_FETCH_COMPLETED
} from "./index.js";

const mockStore = configureStore([thunk]);

describe("library actions", () => {

    it("expands pattern category", () => {
        const { expand } = createActions({});
        const idx = 123;

        expect(expand(idx)).to.eql({ type: CATEGORY_EXPAND, idx })
    });

    it("folds pattern category", () => {
        const { fold } = createActions({});
        const idx = 321;

        expect(fold(idx)).to.eql({ type: CATEGORY_FOLD, idx })
    });

    it("shows pattern details", () => {
        const { showPatternDetails } = createActions({});
        const pattern = {};

        expect(showPatternDetails(pattern)).to.eql({ type: SHOW_PATTERN_DETAILS, pattern });
    });

    it("imports a pattern from a file and navigates to the main view", () => {
        const fileName = "pattern.rle";
        const patternBlob = "binarydata";
        const pattern = {};
        const navigateToMainView = spy();
        const importFileMock = mock()
            .once()
            .withArgs(patternBlob)
            .returns(() => Promise.resolve(pattern));
        const api = {
            readPattern: mock()
                .once()
                .withArgs(fileName)
                .returns(Promise.resolve(patternBlob))
        };
        const store = mockStore();

        const { importFile } = createActions({ api, navigateToMainView, importFile: importFileMock });

        return store.dispatch(importFile(fileName))
            .then(result => {
                api.readPattern.verify();
                importFileMock.verify();
                expect(result).to.eql(pattern);
                expect(navigateToMainView).to.have.beenCalled;
            });
    });

    it("fetches the library", () => {
        const library = {};
        const api = {
            fetchLibrary: mock()
                .once()
                .withExactArgs()
                .returns(Promise.resolve({ library }))
        };
        const store = mockStore();

        const { fetchLibrary } = createActions({ api });

        return store.dispatch(fetchLibrary())
            .then(() => {
                expect(store.getActions()).to.eql([
                    { type: LIBRARY_FETCH_START },
                    { type: LIBRARY_FETCH_COMPLETED, library }
                ]);
            })
    });
});