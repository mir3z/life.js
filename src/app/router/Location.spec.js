import { expect } from "chai";
import { spy, stub } from "sinon";
import noop from "lodash/noop";

import { Location } from "./Location.js";

describe("Location", () => {

    it("returns current location", () => {
        const hash = "#/foo/bar?baz=500";
        const fakeWindow = {
            addEventListener: noop,
            location: { hash }
        };
        const loc = Location(fakeWindow, noop);

        expect(loc.current()).to.eql({
            path: "/foo/bar?baz=500",
            pathname: "/foo/bar",
            query: { baz: "500" }
        });
    });

    it("changes current location", () => {
        const fakeWindow = {
            addEventListener: noop,
            location: {
                assign: spy()
            }
        };

        Location(fakeWindow, noop).change("/baq/sraq", { a: 47 });

        expect(fakeWindow.location.assign).to.have.been.calledWith("#/baq/sraq?a=47");
    });

    it("calls onChange when URL hash is being changed", () => {
        let hashChangeHandler;
        const hash = "#/foo/baz";
        const onChange = spy();
        const fakeAddEventListener = (event, handler) => {
            hashChangeHandler = handler;
        };
        const fakeWindow = {
            addEventListener: stub().callsFake(fakeAddEventListener),
            location: { hash }
        };

        Location(fakeWindow, onChange);
        hashChangeHandler();

        expect(fakeWindow.addEventListener).to.have.been.calledWith("hashchange");
        expect(onChange).to.have.been.calledWith({
            path: "/foo/baz",
            pathname: "/foo/baz",
            query: { }
        })
    });
});