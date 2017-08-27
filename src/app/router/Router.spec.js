import { expect } from "chai";
import { spy } from "sinon";

import { Router } from "./Router.js";

describe("Router", () => {
    it("notifies when route has been accessed", () => {
        const route = "#/foo/bar/:id";
        const path = "#/foo/bar/123";
        const onEnter = spy();

        const r = Router();
        r.addRoute(route, onEnter);
        r.accept({ path });

        expect(onEnter).to.have.been.calledWith({ id: "123" }, path);
    });

    it("does nothing if path does not match any route", () => {
        const route = "#/aaa/bbb";
        const onEnter = spy();

        const r = Router();
        r.addRoute(route, onEnter);
        r.accept({ path: "#/aaa/ccc" });

        expect(onEnter).to.have.not.beenCalled;
    });
});