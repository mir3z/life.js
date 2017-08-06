import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';

import { Location } from "./app/router/Location";
import { Router } from "./app/router/Router";

import { App } from "./app/view/App.jsx";
import { changeView, registerNavigationItem, appReducer } from "./app";

import Raf from "./utils/Raf";
import Clock from "./utils/Clock";
import TextFileReader from "./utils/TextFileReader";

import { configure as configureLife, lifeReducer } from "./life";
import { importReducer } from "./life/import";
import { configure as configureAbout } from "./about";

export default function main(window) {
    const mainReducer = combineReducers({
        app: appReducer,
        life: lifeReducer,
        import: importReducer
    });

    const store = createStore(mainReducer, applyMiddleware(thunk, createLogger()));
    // const store = createStore(mainReducer, applyMiddleware(thunk));

    const router = Router();
    router.addRoute("/", () => location.change("/life"));

    const location = Location(window, (currentLocation) => {
        console.warn(">>", currentLocation);
        router.accept(currentLocation);
    });

    const viewsBuilder = createViewsBuilder();

    const context = {
        window,
        store,
        createClock: () => Clock(Raf(window)),
        createFileReader: () => TextFileReader(new window.FileReader()),
        addRoute: router.addRoute,
        changeLocation: location.change,
        changeView: (...views) => store.dispatch(changeView(...views)),
        registerView: viewsBuilder.add,
        registerNavigationItem: (props) => store.dispatch(registerNavigationItem(props))
    };

    configureLife(context);
    configureAbout(context);

    location.trigger();

    ReactDOM.render(
        <App store={ store } views={ viewsBuilder.build() } />,
        document.getElementById("root")
    );
}

function createViewsBuilder() {
    const views = {};
    return {
        add(name, view) {
            views[name] = view;
        },
        build() {
            return views;
        }
    };
}