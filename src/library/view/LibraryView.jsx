import React from "react";
import { Dialog } from "../../components/Dialog.jsx";
import { Icon, GLYPHS } from "../../components/Icon.jsx";
import { Button } from "../../components/Button.jsx";

import entriesBuilder, { ENTRIES } from "./PatternEntries.jsx";

import "./LibraryView.scss";

export default function LibraryView({ categories, ...rest }) {
    return (
        <div className="library">
            <Dialog className="library-dialog">
                <Dialog.Title>Library</Dialog.Title>
                <Dialog.Body>
                    { categories.loading && <Status>Loading&hellip;</Status> }
                    { categories.error && <Status>Something went wrong&hellip;</Status> }
                    { !categories.loading && !categories.error && <LibraryContent { ...{ categories, ...rest } } /> }
                </Dialog.Body>
                <Dialog.Footer>
                    Source: <a className="link" href="http://www.conwaylife.com/wiki/" target="_blank">
                        www.conwaylife.com/wiki/
                    </a>
                </Dialog.Footer>
            </Dialog>
        </div>
    );
}

const LibraryContent = ({ categories, pattern, ...rest }) => (
    <div className="library-content-wrapper">
        <CategoriesTree categories={ categories } { ...rest } />
        <PatternPane pattern={ pattern } />
    </div>
);

const CategoriesTree = ({ categories, isExpanded, expand, fold, showPatternDetails }) => (
    <div className="categories-tree">
        {
            categories.map((category, i) => (
                <Category
                    key={ i }
                    { ...category }
                    expanded={ isExpanded(i) }
                    onExpand={ () => expand(i) }
                    onFold={ () => fold(i) }
                    onPatternSelect={ showPatternDetails }
                />
            ))
        }
    </div>
);

const Category = ({ name, patterns, expanded, onExpand, onFold, onPatternSelect }) => (
    <div className="category">
        <div className="node" onClick={ () => expanded ? onFold(): onExpand() }>
            <Icon className="expand-icon" glyph={ expanded ? GLYPHS.CARET_DOWN : GLYPHS.CARET_RIGHT } />
            <div className="category-name">{ name } ({ patterns.length })</div>
        </div>
        {
            expanded && <PatternsList { ...{ onPatternSelect, patterns } } />
        }
    </div>
);

const PatternsList = ({ patterns, onPatternSelect }) => (
    <div className="patterns">
        {
            patterns.map((pattern, i) => <Pattern key={ i } { ...{ onPatternSelect, pattern } } />)
        }
    </div>
);

const Pattern = ({ pattern, onPatternSelect }) => (
    <div className="pattern node" onClick={ () => onPatternSelect(pattern) }>
        <Icon glyph={ GLYPHS.APPS } />{ pattern.name }
    </div>
);

const PatternPane = ({ pattern }) => (
    <div className="pattern-pane">
        <h3 className="pattern-name">{ pattern.name }</h3>
        { entriesBuilder(ENTRIES, pattern) }
        { pattern.rle && <LoadPatternWrapper /> }
    </div>
);

const LoadPatternWrapper = () => (
    <div className="load-pattern-wrapper">
        <Button className="load-pattern-btn" label="Load pattern" />
    </div>
);

const Status = ({ children }) => <div className="library-status">{ children }</div>;
