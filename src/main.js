import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';

import { Location } from "./app/router/Location";
import { Router } from "./app/router/Router";

import App from "./app/view/App.jsx";
import { changeView, registerNavigationItem, appReducer } from "./app";

import Raf from "./utils/Raf";
import Clock from "./utils/Clock";
import TextFileReader from "./utils/TextFileReader";

import { configure as configureLife, lifeReducer, PATH as LIFE_PATH } from "./life";
import { reducer as importReducer } from "./import-lib";
import { configure as configureAbout } from "./about";

import { configure as configureLibrary } from "./library";
import { libraryReducer } from "./library";

export default function main(window, api) {
    const mainReducer = combineReducers({
        app: appReducer,
        life: lifeReducer,
        import: importReducer,
        library: libraryReducer
    });

    const store = createStore(mainReducer, applyMiddleware(thunk));

    const router = Router();
    router.addRoute("/", () => location.change(LIFE_PATH));

    const location = Location(window, (currentLocation) => router.accept(currentLocation));
    const changeLocation = (nextLocation) => location.change(nextLocation);

    const viewsBuilder = createViewsBuilder();

    const context = {
        window,
        store,
        api,
        changeLocation,
        createClock: () => Clock(Raf(window)),
        createFileReader: () => TextFileReader(new window.FileReader()),
        addRoute: router.addRoute,
        changeView: (...views) => store.dispatch(changeView(...views)),
        registerView: viewsBuilder.add,
        registerNavigationItem: (props) => store.dispatch(registerNavigationItem(props)),
        navigateToMainView: () => changeLocation(LIFE_PATH)
    };

    configureLife(context);
    configureLibrary(context);
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