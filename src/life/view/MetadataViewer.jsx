import React from "react";
import cls from "classnames";
import { Icon, GLYPHS } from "../../components/Icon.jsx";
import { Dialog } from "../../components/Dialog.jsx";
import { Button } from "../../components/Button.jsx";

import "./MetadataViewer.scss";

export class MetadataViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            metadataVisible: false
        };

        this.toggleMetadata = (visible) => this.setState({ metadataVisible: visible });
        this.showMetadata = () => this.toggleMetadata(true);
        this.hideMetadata = () => this.toggleMetadata(false);
    }

    render() {
        const { metadataVisible } = this.state;
        const { meta } = this.props;

        if (!meta.length) {
            return null;
        }

        return (
            <div className="metadata-viewer">
                <Trigger onClick={ this.showMetadata } />
                { metadataVisible && <MetadataDialog meta={ meta } onClose={ this.hideMetadata } /> }
            </div>
        );
    }
}

const MetadataDialog = ({ meta = [], onClose }) => (
    <div className="dialog-overlay">
        <Dialog className="metadata-dialog">
            <Dialog.Body>
                { meta.map(({ type, value }, i) => <Entry key={ i } type={ type }>{ value }</Entry>) }
            </Dialog.Body>
            <Dialog.Footer>
                <Button label="Close" onClick={ onClose } />
            </Dialog.Footer>
        </Dialog>
    </div>
);

const Entry = ({ type, children }) => {
    const TheEntry = ENTRY_TYPE[type] || (() => null);
    return <TheEntry>{ children }</TheEntry>;
};

const NameEntry = ({ children }) => (
    <EntryWrapper className="name">
        <EntryValue>{ children }</EntryValue>
    </EntryWrapper>
);

const AuthorEntry = ({ children }) => (
    <EntryWrapper className="author">
        <EntryName>Created by:</EntryName>
        <EntryValue>{ children }</EntryValue>
    </EntryWrapper>
);

const CommentEntry = ({ children }) => (
    <EntryWrapper className="comment">
        <EntryValue>{ children }</EntryValue>
    </EntryWrapper>
);

const EntryWrapper = ({ className, children }) => (
    <div className={ cls("metadata-entry", className) }>
        { children }
    </div>
);

const EntryName = ({ children }) => <span className="metadata-name">{ children }</span>;
const EntryValue = ({ children }) => <span className="metadata-value">{ children }</span>;

const ENTRY_TYPE = {
    "NAME": NameEntry,
    "CREATED": AuthorEntry,
    "COMMENT": CommentEntry,
};

const Trigger = ({ onClick }) => (
    <Icon className="metadata-trigger" onClick={ onClick } glyph={ GLYPHS.INFO_OUTLINE } />
);
