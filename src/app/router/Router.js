import UrlPattern from "url-pattern";

export function Router() {
    const routes = [];

    function matchRoute(path) {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            const matched = route.pattern.match(path);

            if (matched) {
                return { ...route, params: matched };
            }
        }
    }

    return {
        addRoute(path, onEnter) {
            routes.push({
                path,
                onEnter,
                pattern: new UrlPattern(path)
            });
        },

        accept({ path }) {
            const route = matchRoute(path);

            if (route) {
                route.onEnter(route.params, path);
            }
        }
    };
}