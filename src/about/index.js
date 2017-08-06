import { GLYPHS } from "../components/Icon.jsx";

export function configure({ registerNavigationItem }) {

    registerNavigationItem({
        label: "About",
        path: PATH,
        data: {
            icon: GLYPHS.HELP_OUTLINE
        }
    });
}

export const PATH = "/import";