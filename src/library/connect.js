import { connect } from "react-redux";
import LibraryView from "./view/LibraryView.jsx";

export function connectLibrary({ expand, fold, showPatternDetails }) {
    const mapStateToProps = ({ library }) => ({
        categories: library.categories,
        pattern: library.pattern,
        isExpanded: (idx) => library.expanded[idx]
    });

    return connect(
        mapStateToProps,
        { expand, fold, showPatternDetails }
    )(LibraryView)
}