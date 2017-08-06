import { Universe } from "./Universe";

export default function LifeImporter({ parser, createFileReader }) {

    function universeFromPattern(pattern) {
        return pattern.reduce((universe, row, y) => {
            return row.reduce((acc, cell, x) => {
                return cell
                    ? acc.toggleCell(x, y)
                    : acc;
            }, universe);
        }, Universe.create());
    }

    function importLife(content) {
        const parsed = parser(content);
        const universe = universeFromPattern(parsed.pattern);
        return { ...parsed, universe };
    }

    return {
        importFile(file) {
            const readFile = createFileReader();
            return readFile(file).then(importLife);
        },

        importFromString(content) {
            return new Promise((resolve) => resolve(importLife(content)));
        }
    };
}