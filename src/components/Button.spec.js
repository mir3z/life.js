import React from "react";
import { spy } from "sinon";
import { expect } from "chai";
import { shallow } from "enzyme";

import { Button } from "./Button.jsx";

describe("<Button />", () => {
    it("renders component with provided tag name", () => {
        const tagName = "div";
        const wrapper = render({ tagName });
        expect(wrapper).to.have.type(tagName);
    });

    it("adds class name if it's disabled", () => {
        expect(render({ disabled: true })).to.have.className("disabled");
    });

    it("calls onClick when clicked", () => {
        const onClick = spy();
        const wrapper = render({ onClick });

        wrapper.simulate("click");

        expect(onClick).to.have.beenCalled;
    });

    it("renders provided label", () => {
        const label = "a button";
        const wrapper = render({ label });

        expect(wrapper).to.have.text(label);
    });

    it("renders <Icon /> if provided", () => {
        const icon = "an icon";
        const wrapper = render({ icon }).find("Icon");

        expect(wrapper).to.exist;
        expect(wrapper).to.have.prop("glyph", icon);
    });

    it("adds class name according to provided theme", () => {
        const wrapper = render({ theme: Button.Theme.RED });

        expect(wrapper).to.have.className("theme-red");
    });

    function render(props) {
        return shallow(<Button { ...props } />);
    }
});