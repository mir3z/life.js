import React from "react";
import cls from "classnames";

import { Icon } from "./Icon.jsx";

import "./Button.scss";

export const Button = (props) => {
    const { className, theme, onClick, icon, label = "", disabled = false, tagName = "a", ...rest } = props;
    const Tag = tagName;
    const classNameString = cls(
        "button",
        className,
        theme && `theme-${ theme }`,
        disabled && "disabled"
    );

    return (
        <Tag className={ classNameString } { ...{ disabled, onClick, ...rest } }>
            { icon && <Icon glyph={ icon }/> }
            { label }
        </Tag>
    );
};

Button.Theme = {
    RED: "red",
    BLUE: "blue",
    LIGHT_BLUE: "lightblue",
    GREEN: "green",
    ORANGE: "orange"
};