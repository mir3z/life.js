import React from "react";
import cls from "classnames";
import noop from "lodash.noop";

import "./Icon.scss";

export const Icon = ({ glyph, onClick, className }) => (
    <span className={ cls("zmdi", "icon", className) } onClick={ onClick }>{ glyph }</span>
);
Icon.defaultProps = {
    onClick: noop
};

export const GLYPHS = {
    MENU: "\uf197",
    CLOSE: "\uf136",
    APPS: "\uf313",
    UPLOAD: "\uf22a",
    HELP_OUTLINE: "\uf1f5",
    CLOUD_UPLOAD: "\uf21e",
    ALERT_OCTAGON: "\uf1f2",
    INFO_OUTLINE: "\uf1f7"
};