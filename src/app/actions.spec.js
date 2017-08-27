import { expect } from "chai";

import {
    changeView, registerNavigationItem,
    CHANGE_VIEW, REGISTER_NAVIGATION_ITEM
} from "./actions.js";


describe("Application actions", () => {
    it("changes a view", () => {
        const fakeViews = ["view1", "view2", "view3"];
        const action = changeView(...fakeViews);

        expect(action).to.eql({
            type: CHANGE_VIEW,
            views: fakeViews
        })
    });

    it("registers navigation item", () => {
        const navItem = {
            label: "library",
            path: "#/library",
            data: {}
        };
        const action = registerNavigationItem(navItem);

        expect(action).to.eql({
            type: REGISTER_NAVIGATION_ITEM,
            ...navItem
        });
    });
});