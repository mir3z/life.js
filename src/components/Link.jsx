import React from "react";
import UrlPattern from "url-pattern";
import cls from "classnames";

import "./Link.scss";

export const Link = ({ className, href, children, ...rest }) => (
    <a className={ cls("link", className) } href={ href } { ...rest }>{ children }</a>
);

export function fragment(path, params = {}) {
    if (!path) {
        return "#";
    }

    const pattern = new UrlPattern(path);
    return "#" + pattern.stringify(params);
}
