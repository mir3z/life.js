import { expect } from "chai";

import { appReducer } from "./reducer.js";
import { changeView, registerNavigationItem } from "./actions.js";

describe("Application reducer", () => {

    it("returns initial state", () => {
        expect(appReducer(undefined, {})).to.eql({
            views: [],
            navigation: []
        })
    });

    it("handles changing view", () => {
        const fakeViews = ["view1", "view2"];
        const nextState = appReducer(undefined, changeView(...fakeViews));

        expect(nextState).to.eql({
            views: fakeViews,
            navigation: []
        });
    });

    it("handles registering navigation items", () => {
        const navItem = {
            label: "nav item 1",
            path: "#/foo/bar",
            data: { icon: "an-icon" }
        };

        const nextState = appReducer(undefined, registerNavigationItem(navItem));

        expect(nextState).to.eql({
            views: [],
            navigation: [navItem]
        })
    });
});