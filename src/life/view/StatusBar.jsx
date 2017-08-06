import React from "react";
import cls from "classnames";

import "./StatusBar.scss";

export const StatusBar = ({ generation, population, zoom }) => (
    <div className="status-bar">
        <Entry label="Generation" className="gen">{ generation }</Entry>
        <Entry label="Population" className="pop">{ population }</Entry>
        <Entry label="Zoom" className="zoom">{ formatZoomLevel(zoom) }</Entry>
    </div>
);

class Entry extends React.PureComponent {
    render() {
        const { className, label, children } = this.props;

        return (
            <div className={ cls("entry", className) }>
                <span className="label">{ label }:</span>
                { children }
            </div>
        );
    }
}

function formatZoomLevel(zoom, fixedDecimal = 3) {
    const limit = 1 / Math.pow(10, fixedDecimal);

    return zoom < limit
        ? `< ${ limit }`
        : zoom.toFixed(fixedDecimal);
}