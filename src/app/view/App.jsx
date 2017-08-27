import React from "react";
import { Provider, connect } from "react-redux";
import { head, tail } from "lodash/array";
import isEmpty from "lodash/isEmpty";

import Hamburger from "./Hamburger.jsx";

import "./App.scss";

export default function App({ store, views }) {
    return (
        <Provider store={ store }>
            <AppWrapper views={ views } />
        </Provider>
    );
}

const ConnectedHamburger = connect(({ app: { navigation } }) => ({ items: navigation }))(Hamburger);

const AppWrapper = ({ views }) => (
    <div id="app">
        <ConnectedHamburger />
        <ConnectedViewsWrapper viewRegistry={ views } />
    </div>
);

const ViewsWrapper = ({ viewRegistry, views = [] }) => {
    const toShow = views.map(viewName => {
        const requestedView = viewRegistry[viewName];

        if (!requestedView) {
            throw `Unable to find a view: ${ viewName }`;
        }

        return requestedView;
    });

    return composeViews(toShow);
};

function composeViews(views) {
    if (isEmpty(views)) {
        return null;
    }

    const View = head(views);

    return <View>{ composeViews(tail(views)) }</View>;
}

const selectViews = ({ app: { views } }) => ({ views });
const ConnectedViewsWrapper = connect(selectViews)(ViewsWrapper);


