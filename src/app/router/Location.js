import url from "url";

export function Location(window, onChange) {

    window.addEventListener("hashchange", trigger);

    function current() {
        const hash = window.location.hash.match(/^#?(.*)$/)[1];
        const { path, pathname, query } = url.parse(hash, true);

        return {
            path: path || "/",
            pathname: pathname || "/",
            query
        };
    }

    function trigger() {
        onChange(current());
    }

    return {
        trigger,

        current,

        change(pathname, query) {
            window.location.assign("#" + url.format({ pathname, query }));
        }
    };
}