import { GLYPHS } from "../components/Icon.jsx";

export function configure({ registerNavigationItem }) {

    registerNavigationItem({
        label: "Library",
        path: PATH,
        data: {
            icon: GLYPHS.FOLDER_OUTLINE
        }
    });
}

export const PATH = "/library";