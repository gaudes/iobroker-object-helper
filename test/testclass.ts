import { expect } from "chai";
import { iobObjectTree } from "../src/lib/iobObjClass";

const Adapter = { namespace: "test.0"} as ioBroker.Adapter;

//#region Test ClassUsage
describe("Test ClassUsage", () =>{
	it("Create Class object", () => {
        const iobObjTree = new iobObjectTree(Adapter);
        expect(iobObjTree).to.have.property("adapterInstance").that.be.eql({namespace: "test.0"});
        expect(iobObjTree).to.have.property("children").that.be.eql(new Map());
    });

    it("Create Class object with simple state", () => {
        const iobObjTree = new iobObjectTree(Adapter);
        const TestState = iobObjTree.addStateFromTemplate({id: "test", name: "test", value: "Test", template: "html"});
        expect(TestState).to.have.property("my").to.have.property("id").that.be.eql("test.0.test");
        //expect(iobObjTree).to.have.property("children").to.have.key("test.0.test");
    });

    it("Create Class object with simple state and try to create a sub state", () => {
        const iobObjTree = new iobObjectTree(Adapter);
        const TestState = iobObjTree.addStateFromTemplate({id: "test.0.test", name: "test", value: "Test", template: "html"});
        const TestChannel = iobObjTree.addChannel({id: "channel", name: "channel"});
        const TestState2 = TestChannel.addStateFromTemplate({id: "substate", name: "test", value: "Test", template: "html"});
        console.log(iobObjTree.flatten());
        // Check state
        expect(TestState).to.have.property("my").to.have.property("id").that.be.eql("test.0.test");
        TestState.setValue("TEST");
        expect(TestState.setValue.bind(TestState, 123)).to.throw("Invalid value type, type must be string");
        expect(iobObjTree.addStateFromTemplate.bind(iobObjTree, {id: "test.0.test.test", name: "test", value: "Test", template: "html"})).to.throw("Invalid object id: test.0.test.test");
        console.log(iobObjTree.flatten());
        console.log(iobObjTree);
        iobObjTree.validate();
    });
});