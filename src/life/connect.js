import { connect } from "react-redux";

import { Worldview } from "./view/Worldview.jsx";
import { Canvas } from "./view/Canvas.jsx";
import { ControlPane } from "./view/ControlPane.jsx";
import { StatusBar } from "./view/StatusBar.jsx";
import { MetadataViewer } from "./view/MetadataViewer.jsx";

import { Transformation } from "./model/Transformation";

export function connectWorldview(actions, { Canvas, ControlPane, StatusBar, MetadataViewer }) {
    return connect(
        null,
        null,
        merger({ Canvas, ControlPane, StatusBar, MetadataViewer })
    )(Worldview);
}

export function connectCanvas(actions, canvasRendererFactory) {
    return connect(
        ({ life: { world, viewport } }) => ({
            world,
            viewport,
            transformation: Transformation.fromArray(viewport.matrix)
        }),
        actions,
        merger({
            canvasRendererFactory
        })
    )(Canvas);
}

export function connectControlPane(actions) {
    return connect(
        ({ life: { evolution: { state } } }) => ({ evolutionState: state }),
        actions
    )(ControlPane);
}

export function connectStatusBar() {
    function mapStateToProps({ life }) {
        const { world, evolution, viewport } = life;
        const { population } = world;
        const { generation } = evolution;
        const zoom = viewport.matrix[0];

        return {
            population,
            generation,
            zoom
        };
    }

    return connect(mapStateToProps)(StatusBar);
}

export function connectMetadataViewer() {
    function mapStateToProps({ life: { meta } }) {
        return { meta };
    }

    return connect(mapStateToProps)(MetadataViewer);
}

function merger(props) {
    return (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        ...props
    });
}