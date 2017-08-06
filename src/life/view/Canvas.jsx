import React from "react";
import cls from "classnames";
import debounce from "lodash.debounce";

import "./Canvas.scss";

export class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.mouse = Mouse();
        this.renderer = null;
        this.canvas = null;

        this.state = {
            state: STATE.DEFAULT
        };

        this.onResize = debounce((e) => {
            const window = e.target;
            const { viewport, resize } = this.props;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dx = (viewport.width - width) / 2;
            const dy = (viewport.height - height) / 2;

            resize({ width, height });
            this.moveBy(dx, dy);
        }, 100);

        this.handleKey = (e) => this.onKeyDown(e.key);
    }

    componentWillMount() {
        window.addEventListener("resize", this.onResize);
        window.addEventListener("keydown", this.handleKey);
    }

    componentDidMount() {
        this.repaint();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener("keydown", this.handleKey);
    }

    componentDidUpdate() {
        this.repaint();
    }

    onKeyDown(key) {
        const offset = KEY_MAP[key];

        if (offset) {
            this.moveBy(...offset);
            this.repaint();
        }

        switch (key) {
            case "Clear":
                this.reset();
                return this.repaint();

            case "+":
                this.zoomCenter(this.props.zoomIn);
                return this.repaint();

            case "-":
                this.zoomCenter(this.props.zoomOut);
                return this.repaint();
        }
    }

    onMouseDown(e) {
        this.setState({ state: STATE.DEFAULT });

        this.mouse = this.mouse
            .position(e)
            .mouseDown(true)
            .mouseDrag(false);
    }

    onMouseUp(e) {
        const wasDrag = this.mouse.isMouseDrag;

        this.setState({ state: STATE.DEFAULT });

        this.mouse = this.mouse
            .position(e)
            .mouseDown(false)
            .mouseDrag(false);

        if (!wasDrag) {
            const { x, y } = this.renderer(this.props.transformation).cellAt(this.mouse);
            this.props.toggleCellState(x, y);
        }
    }

    onMouseMove(e) {
        const mouseNow = this.mouse
            .position(e)
            .mouseDrag(this.mouse.isMouseDown);

        if (mouseNow.isMouseDrag) {
            this.moveTo({ x: mouseNow.x, y: mouseNow.y });
            this.setState({ state: STATE.TRANSLATE });
        }

        this.mouse = mouseNow;
    }

    onMouseWheel(e) {
        const { zoomOut, zoomIn } = this.props;

        const zoomFactor = Mouse.isScrollingDown(e)
            ? zoomOut
            : zoomIn;

        this.zoom(zoomFactor);
    }

    moveTo(to) {
        this.props.move({ x: this.mouse.x, y: this.mouse.y }, to);
    }

    moveBy(dx, dy) {
        this.props.moveBy(dx, dy);
    }

    zoom(factor) {
        this.props.zoom(factor, { x: this.mouse.x, y: this.mouse.y });
    }

    zoomCenter(factor) {
        const { width, height } = this.props.viewport;
        this.props.zoom(factor, { x: width / 2, y: height / 2 });
    }

    reset() {
        this.props.reset();
    }

    repaint() {
        const { transformation, world } = this.props;

        this.renderer(transformation).repaint(world);
    }

    initCanvas(canvas) {
        if (canvas && this.canvas !== canvas) {
            this.canvas = canvas;

            this.renderer = this.props.canvasRendererFactory(canvas.getContext("2d"));
        }
    }

    render() {
        const { state } = this.state;
        const { viewport } = this.props;

        const canvasProps = {
            className: cls({
                "life-canvas": true,
                "translate": state === STATE.TRANSLATE
            }),
            ref: canvas => this.initCanvas(canvas),
            onMouseDown: e => this.onMouseDown(e),
            onMouseUp: e => this.onMouseUp(e),
            onMouseMove: e => this.onMouseMove(e),
            onWheel: e => this.onMouseWheel(e),
            width: viewport.width,
            height: viewport.height,
        };

        return <canvas { ...canvasProps } />;
    }
}

Canvas.defaultProps = {
    zoomIn: 1.25,
    zoomOut: 1 / 1.25
};

export function Mouse({ x = 0, y = 0, isMouseDrag = false, isMouseDown = false } = {}) {

    const update = props => Mouse({ x, y, isMouseDown, isMouseDrag, ...props });

    return {
        position(event) {
            const { nativeEvent: { offsetX, offsetY } } = event;
            return update({ x: offsetX, y: offsetY });
        },
        mouseDrag: isMouseDrag => update({ isMouseDrag }),
        mouseDown: isMouseDown => update({ isMouseDown }),
        x,
        y,
        isMouseDrag,
        isMouseDown
    };
}
Mouse.isScrollingDown = event => {
    const d = event.deltaY || event.deltaX || event.deltaZ;
    return d > 0;
};

const STATE = {
    DEFAULT: "state-default",
    TRANSLATE: "state-translate"
};

const KEY_MAP = {
    ArrowLeft: [-10, 0],
    ArrowRight: [10, 0],
    ArrowUp: [0, -10],
    ArrowDown: [0, 10],
    Home: [-10, -10],
    PageUp: [10, -10],
    End: [-10, 10],
    PageDown: [10, 10]
};