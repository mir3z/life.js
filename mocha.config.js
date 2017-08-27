import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
import chaiEnzyme from "chai-enzyme";


sinonStubPromise(sinon);
chai.use(sinonChai);
chai.use(chaiEnzyme());
