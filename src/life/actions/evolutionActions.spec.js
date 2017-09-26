import { expect } from "chai";
import { spy, stub } from "sinon";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    createEvolutionActions,
    NEXT_GENERATION, SUPER_GENERATION, RESET_EVOLUTION, START_EVOLUTION, EVOLUTION_STATE
} from "./evolutionActions.js";
import { TreeNode } from "../../core/TreeNode.js";

const mockStore = configureStore([thunk]);

describe("life / evolution actions", () => {

    it("requests next generation", () => {
        const { nextGeneration } = createEvolutionActions({});

        expect(nextGeneration()).to.eql({ type: NEXT_GENERATION });
    });

    it("requests next super generation", () => {
        const { superGeneration } = createEvolutionActions({});

        expect(superGeneration()).to.eql({ type: SUPER_GENERATION });
    });

    it("resets evolution", () => {
        spy(TreeNode.__cache, "reset");
        const { resetEvolution } = createEvolutionActions({});
        const store = mockStore();

        expect(store.dispatch(resetEvolution())).to.eql({ type: RESET_EVOLUTION });
        expect(TreeNode.__cache.reset).to.have.been.called;
    });

    context("when starting evolution", () => {
        it("requests next generation of evolution state = running", () => {
            const fakeClock = createFakeClock();
            const store = mockStore({ life: { evolution: EVOLUTION_STATE.RUNNING } });
            const { startEvolution } = createEvolutionActions({ clock: fakeClock });

            store.dispatch(startEvolution());

            expect(store.getActions()).to.eql([
                { type: START_EVOLUTION },
                { type: NEXT_GENERATION }
            ]);

            expect(fakeClock.start).to.have.been.called;
            expect(fakeClock.stop).to.not.have.been.called;
        });

        it("does not request next generation and stops clock if evolution state = stopped", () => {
            const fakeClock = createFakeClock();
            const store = mockStore({ life: { evolution: EVOLUTION_STATE.STOPPED } });
            const { startEvolution } = createEvolutionActions({ clock: fakeClock });

            store.dispatch(startEvolution());

            expect(store.getActions()).to.eql([
                { type: START_EVOLUTION }
            ]);

            expect(fakeClock.start).to.have.been.called;
            expect(fakeClock.stop).to.have.been.called;
        });

        function createFakeClock() {
            return {
                start: stub().callsFake((fn) => fn()),
                stop: spy()
            };
        }
    });
});