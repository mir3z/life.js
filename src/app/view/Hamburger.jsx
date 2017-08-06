import React from "react";
import cls from "classnames";
import { Icon, GLYPHS } from "../../components/Icon.jsx";
import { Link, fragment } from "../../components/Link.jsx";
import "./Hamburger.scss";

export class Hamburger extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel() {
        this.setState(({ active }) => ({ active: !active }));
    }

    render() {
        return (
            <div className="hamburger-menu">
                <HamburgerButton onClick={ this.togglePanel } />
                <HamburgerPanel
                    items={ this.props.items }
                    active={ this.state.active }
                    onClose={ this.togglePanel }
                />
            </div>
        );
    }
}

const HamburgerButton = ({ onClick }) => (
    <Icon className="hamburger-icon" onClick={ onClick } glyph={ GLYPHS.MENU } />
);

const HamburgerPanel = ({ items, active, onClose }) => (
    <div className={ cls("hamburger-panel", active && "active") }>
        <CloseIcon onClick={ onClose } />
        <div className="content">
            { items.map((props, i) => <NavItem key={ i } { ...{ ...props, onClose } } />) }
        </div>
    </div>
);

const CloseIcon = ({ onClick }) => (
    <Icon className="close-icon" onClick={ onClick } glyph={ GLYPHS.CLOSE } />
);

const NavItem = ({ label, path, data: { icon }, onClose }) => (
    <Link className="nav-item" href={ fragment(path) } onClick={ onClose }>
        <Icon glyph={ icon } />
        <span>{ label }</span>
    </Link>
);
