import React from "react";

import { Canvas } from "./Canvas.jsx";

export const Worldview = ({ Canvas, ControlPane, StatusBar, MetadataViewer }) => (
    <div className="worldview">
        <Canvas />
        <ControlPane />
        <MetadataViewer />
        <StatusBar />
    </div>
);
