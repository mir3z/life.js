import { expect } from "chai";
import { mock, stub } from "sinon";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { createActions, IMPORT_DONE, IMPORT_ERROR } from "./actions.js";

const mockStore = configureStore([thunk]);

describe("Import-lib actions", () => {
    const imported = {
        universe: {
            root: {}
        },
        meta: {}
    };

    const error = {
        location: {
            start: {
                line: 10,
                column: 3
            }
        },
        message: "shame!"
    };

    const expectedErrorMessage = { message: "Line 10, Column 3: shame!" };
    const rleString = "9b2o4b2o3bo1!";
    const file = "file-to-import.rle";
    const expectedImportDoneAction = { type: IMPORT_DONE, root: imported.universe.root, meta: imported.meta };
    const expectedImportErrorAction = { type: IMPORT_ERROR, message: expectedErrorMessage.message };

    context("when importing pattern from a file" , () => {
        const createLifeImporterStub = (returned) => ({
            importFile: stub().returns(returned)
        });

        const setUp = (fakeLifeImported) => {
            const store = mockStore();
            const { importFile } = createActions(fakeLifeImported);

            return { store, importFile };
        };

        it("resolves with imported pattern", () => {
            const lifeImporter = {
                importFile: mock()
                    .once()
                    .withArgs(file)
                    .returns(Promise.resolve(imported))
            };
            const { store, importFile } = setUp(lifeImporter);

            return store.dispatch(importFile(file))
                .then(result => {
                    lifeImporter.importFile.verify();
                    expect(result).to.eql(imported);
                });
        });

        it("dispatches an action when import is finished", () => {
            const lifeImporter = createLifeImporterStub(Promise.resolve(imported));
            const { store, importFile } = setUp(lifeImporter);


            return store.dispatch(importFile(file))
                .then(() => {
                    expect(store.getActions()).to.eql([expectedImportDoneAction]);
                });
        });

        it("rejects with error message when import failed", () => {
            const lifeImporter = createLifeImporterStub(Promise.reject(error));
            const { store, importFile } = setUp(lifeImporter);


            return store.dispatch(importFile(file))
                .then(() => { })
                .catch(error => {
                    expect(error).to.eql(expectedErrorMessage);
                });
        });

        it("dispatches an action when import failed", () => {
            const lifeImporter = createLifeImporterStub(Promise.reject(error));
            const { store, importFile } = setUp(lifeImporter);

            return store.dispatch(importFile(file))
                .catch(() => {
                    expect(store.getActions()).to.eql([expectedImportErrorAction]);
                });
        });
    });

    context("when importing pattern from string", () => {
        const createLifeImporterStub = (returned) => ({
            importFromString: stub().returns(returned)
        });

        const setUp = (fakeLifeImported) => {
            const store = mockStore();
            const { importFromString } = createActions(fakeLifeImported);

            return { store, importFromString };
        };

        it("resolves with imported pattern", () => {
            const lifeImporter = {
                importFromString: mock()
                    .once()
                    .withArgs(rleString)
                    .returns(Promise.resolve(imported))
            };

            const { store, importFromString } = setUp(lifeImporter);

            return store.dispatch(importFromString(rleString))
                .then(result => {
                    lifeImporter.importFromString.verify();
                    expect(result).to.eql(imported);
                });
        });

        it("dispatches an action when import is finished", () => {
            const lifeImporter = createLifeImporterStub(Promise.resolve(imported));
            const { store, importFromString } = setUp(lifeImporter);

            return store.dispatch(importFromString(rleString))
                .then(() => {
                    expect(store.getActions()).to.eql([expectedImportDoneAction]);
                });
        });

        it("rejects with error message when import failed", () => {
            const lifeImporter = createLifeImporterStub(Promise.reject(error));
            const { store, importFromString } = setUp(lifeImporter);

            return store.dispatch(importFromString(rleString))
                .then(() => { })
                .catch(error => {
                    expect(error).to.eql(expectedErrorMessage);
                });
        });

        it("dispatches an action when import failed", () => {
            const lifeImporter = createLifeImporterStub(Promise.reject(error));
            const { store, importFromString } = setUp(lifeImporter);

            return store.dispatch(importFromString(rleString))
                .catch(() => {
                    expect(store.getActions()).to.eql([expectedImportErrorAction]);
                });
        });
    });
});