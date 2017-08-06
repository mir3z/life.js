import { connect } from "react-redux";
import { Import } from "./view/Import.jsx";

export function connectImportView(actions) {
    return connect(mapStateToProps, actions)(Import);
}

function mapStateToProps({ import: { error } }) {
    return { error };
}