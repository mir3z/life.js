import React from "react";

export default function entriesBuilder(entries, pattern) {
    return entries.map(({ key, component: Component }) => {
        return typeof pattern[key] !== "undefined"
            ? <Component key={ key } { ...pattern } />
            : null
    });
}

export const ENTRIES = [
    {
        key: "href",
        component: ({ href }) => (
            <Entry name="Link"><a className="link" href={ href } title={ href } target="_blank">{ href }</a></Entry>
        )
    },
    {
        key: "type",
        component: ({ type }) => <Entry name="Type">{ type }</Entry>
    },
    {
        key: "mod",
        component: ({ mod }) => <Entry name="Mod">{ mod }</Entry>
    },
    {
        key: "heat",
        component: ({ heat }) => <Entry name="Heat">{ heat }</Entry>
    },
    {
        key: "volatility",
        component: ({ volatility }) => <Entry name="Volatility">{ volatility }</Entry>
    },
    {
        key: "period",
        component: ({ period }) => <Entry name="Period">{ period }</Entry>
    },
    {
        key: "stableAfter",
        component: ({ stableAfter }) => <Entry name="Lifespan">{ stableAfter }</Entry>
    },
    {
        key: "backPartPeriod",
        component: ({ backPartPeriod }) => <Entry name="Back Period">{ backPartPeriod }</Entry>
    },
    {
        key: "frontPartPeriod",
        component: ({ frontPartPeriod }) => <Entry name="Front Period">{ frontPartPeriod }</Entry>
    },
    {
        key: "cells",
        component: ({ cells }) => <Entry name="Cells">{ cells }</Entry>
    },
    {
        key: "barrels",
        component: ({ barrels }) => <Entry name="Barrels">{ barrels }</Entry>
    },
    {
        key: "crawlsOn",
        component: ({ crawlsOn }) => <Entry name="Crawls on">{ crawlsOn }</Entry>
    },
    {
        key: "direction",
        component: ({ direction }) => <Entry name="Direction">{ ucFirst(direction) }</Entry>
    },
    {
        key: "angle",
        component: ({ angle }) => <Entry name="Angle">{ angle }</Entry>
    },
    {
        key: "speed",
        component: ({ speed }) => <Entry name="Speed">{ speed }</Entry>
    },
    {
        key: "expansion",
        component: ({ expansion }) => <Entry name="Expansion Factor">{ expansion }</Entry>
    },
    {
        key: "backPartSpeed",
        component: ({ backPartSpeed }) => <Entry name="Back Speed">{ backPartSpeed }</Entry>
    },
    {
        key: "frontPartSpeed",
        component: ({ frontPartSpeed }) => <Entry name="Front Speed">{ frontPartSpeed }</Entry>
    },
    {
        key: "discoveredBy",
        component: ({ discoveredBy }) => <Entry name="Discovered by">{ discoveredBy }</Entry>
    },
    {
        key: "discoveredAt",
        component: ({ discoveredAt }) => <Entry name="Year of discovery">{ discoveredAt }</Entry>
    },
    {
        key: "synth",
        component: ({ synth }) => <Entry name="Fewest gliders">{ synth }</Entry>
    }
];


const Entry = ({ name, children }) => (
    <div className="entry">
        <div className="entry-name">{ name }</div>
        <div className="entry-value">{ children }</div>
    </div>
);

const ucFirst = (str = "") => {
    const [first = "", ...rest] = str;
    return [first.toUpperCase(), ...rest].join("");
};