import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import { Link } from "./Link.jsx";

describe("<Link />", () => {
    it("renders link with provided props", () => {
        const href = "http://www.example.com";
        const children = <div>a child</div>;
        const className = "my-link";
        const wrapper = render({ href, className, children });

        expect(wrapper).to.have.type("a");
        expect(wrapper).to.have.className(className);
        expect(wrapper).to.have.prop("href", href);
        expect(wrapper).to.contain(children);
    });

    function render(props) {
        return shallow(<Link { ...props } />);
    }
});