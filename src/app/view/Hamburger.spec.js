import React from "react";
import noop from "lodash/noop";
import { shallow } from "enzyme";
import { spy } from "sinon";
import { expect } from "chai";

import Hamburger, { HamburgerButton, HamburgerPanel } from "./Hamburger.jsx";

describe("<Hamburger />", () => {
    it("renders <HamburgerButton />", () => {
        const wrapper = render().find("HamburgerButton");

        expect(wrapper).to.exist;
        expect(wrapper).to.have.prop("onClick");
    });

    it("renders <HamburgerPanel />", () => {
        const wrapper = render({ items: [] });
        const panel = wrapper.find("HamburgerPanel");

        expect(panel).to.exist;
        expect(panel).to.have.props({
            items: wrapper.instance().props.items,
            active: wrapper.state("active"),
            onClose: wrapper.instance().togglePanel
        });
    });

    it("toggles <HamburgerPanel /> state when <HamburgerButton /> is clicked", () => {
        const wrapper = render();
        const button = wrapper.find("HamburgerButton");

        button.simulate("click");
        expect(wrapper.find("HamburgerPanel")).to.have.prop("active", true);

        button.simulate("click");
        expect(wrapper.find("HamburgerPanel")).to.have.prop("active", false);
    });

    function render(props) {
        return shallow(<Hamburger { ...props } />);
    }
});

describe("<HamburgerButton />", () => {
    it("calls onClick when clicked", () => {
        const onClick = spy();
        const wrapper = render({ onClick });

        wrapper.simulate("click");

        expect(onClick).to.have.beenCalled;
    });

    function render(props) {
        return shallow(<HamburgerButton { ...props } />);
    }
});

describe("<HamburgerPanel />", () => {
    it("renders <CloseIcon />", () => {
        const onClose = noop;
        const wrapper = render({ onClose }).find("CloseIcon");

        expect(wrapper).to.exist;
        expect(wrapper).to.have.prop("onClick", onClose);
    });

    it("renders navigation items", () => {
        const items = [{ title: "item1" }, { title: "item2" }];
        const wrapper = render({ items });

        expect(wrapper).to.have.exactly(items.length).descendants("NavItem");
    });

    it("sets class name if panel is active", () => {
        const activeClassName = "active";

        expect(render({ active: true })).to.have.className(activeClassName);
        expect(render({ active: false })).to.not.have.className(activeClassName);
    });

    function render(props) {
        return shallow(<HamburgerPanel { ...props } />);
    }
});