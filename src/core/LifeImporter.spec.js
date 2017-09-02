import { expect } from "chai";
import { mock } from "sinon";

import LifeImporter from "./LifeImporter.js";

describe("LifeImporter", () => {

    it("imports from file using given file reader and parser", () => {
        const file = "pattern.rle";
        const fileContent = "";
        const fileReaderMock = mock()
            .once()
            .withArgs(file)
            .returns(Promise.resolve(fileContent));
        const createFileReader = () => fileReaderMock;
        const parser = createParserMock(fileContent, parsed);

        const { importFile } = LifeImporter({ parser, createFileReader });

        return importFile(file)
            .then((result) => {
                fileReaderMock.verify();
                parser.verify();

                verifyParsingResult(result);
            });
    });

    it("imports from string using given parser", () => {
        const inputString = "";
        const parser = createParserMock(inputString, parsed);

        const { importFromString } = LifeImporter({ parser });

        return importFromString(inputString)
            .then((result) => {
                parser.verify();
                verifyParsingResult(result);
            });
    });

    const parsed = { pattern: [[1]] };
    const createParserMock = (input, output) => {
        return mock()
            .once()
            .withArgs(input)
            .returns(output);
    };

    const verifyParsingResult = (result) => {
        expect(result.universe.root.population).to.eql(1);
        expect(result.universe.root.level).to.eql(3);
        expect(result.universe.generation).to.eql(0);
    };
});