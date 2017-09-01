import { expect } from "chai";

import {
    LIBRARY_FETCH_START, LIBRARY_FETCH_COMPLETED, LIBRARY_FETCH_ERROR,
    CATEGORY_EXPAND, CATEGORY_FOLD
} from "../actions";
import { expandedReducer, categoriesReducer } from "./index.js";

describe("library / expanded reducer", () => {
    const state = { 14: true, 15: true };

    it("expands category", () => {
        const action = { type: CATEGORY_EXPAND, idx: 10 };

        expect(expandedReducer(state, action)).to.eql({ 14: true, 15: true, 10: true });
    });

    it("folds category", () => {
        const action = { type: CATEGORY_FOLD, idx: 15 };

        expect(expandedReducer(state, action)).to.eql({ 14: true });
    });
});

describe("library / categories reducer", () => {
    it("marks categories when fetching library starts", () => {
        const action = { type: LIBRARY_FETCH_START };
        expect(categoriesReducer({}, action)).to.eql({ loading: true, error: false });
    });

    it("marks categories when fetching error occurs", () => {
        const action = { type: LIBRARY_FETCH_ERROR };
        expect(categoriesReducer({}, action)).to.eql({ loading: false, error: true });
    });

    it("sets library when fetching completes", () => {
        const library = {};
        const action = { type: LIBRARY_FETCH_COMPLETED, library };
        expect(categoriesReducer({}, action)).to.equal(library);
    });
});