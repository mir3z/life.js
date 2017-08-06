import React from "react";
import cls from "classnames";

import "./Dialog.scss";

export const Dialog = ({ className, children }) => (
    <div className={ cls("dialog", className) }>{ children }</div>
);

Dialog.Header = ({ children }) => (
    <div className="header">{ children }</div>
);

Dialog.Title = ({ children }) => (
    <Dialog.Header>
        <h2 className="title">{ children }</h2>
    </Dialog.Header>
);

Dialog.Body = ({ children }) => (
    <div className="body">{ children }</div>
);

Dialog.Footer = ({ children }) => (
    <div className="footer">{ children }</div>
);