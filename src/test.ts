import { expect } from "chai";
import * as iobHelper from "./main";

//#region Test buildObject
describe("Test buildObject", () =>{
	it("Build channel object by template", () => {
		const iobObjChannel1 = iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "channel1", name: "channel1", objectType: "template", template: "channel"});
		//console.log(JSON.stringify(iobObjChannel1));
		expect(iobObjChannel1).to.have.keys(["id", "object"]);
		expect(iobObjChannel1.id).to.equal("test.0.channel1");
		expect(iobObjChannel1.object).to.have.keys(["type", "common", "native"]);
		expect(iobObjChannel1.object.common.name).to.equal("channel1");
	});
	it("Build state object by template", () => {
		const iobObjStateJSON = iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "statejson", name: "statejson", objectType: "template", template: "json"});
		//console.log(JSON.stringify(iobObjStateJSON));
		expect(iobObjStateJSON).to.have.keys(["id", "object"]);
		expect(iobObjStateJSON.id).to.equal("test.0.statejson");
		expect(iobObjStateJSON.object).to.have.keys(["type", "common", "native"]);
		expect(iobObjStateJSON.object.common).to.have.keys(["role", "name", "type", "read", "write", "def"]);
		expect(iobObjStateJSON.object.common.name).to.equal("statejson");
	});
	it("Build state object with role json", () => {
		const iobObjStateJSON = iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "statejson", name: "statejson", objectType: "state", role: "json" });
		//console.log(JSON.stringify(iobObjStateJSON));
		expect(iobObjStateJSON).to.have.keys(["id", "object"]);
		expect(iobObjStateJSON.id).to.equal("test.0.statejson");
		expect(iobObjStateJSON.object).to.have.keys(["type", "common", "native"]);
		expect(iobObjStateJSON.object.common).to.have.keys(["role", "name", "type", "read", "write", "category", "desc"]);
		expect(iobObjStateJSON.object.common.name).to.equal("statejson");
		expect(iobObjStateJSON.object.common.type).to.equal("string");
	});
	it("Build state object with role value", () => {
		const iobObjStateNumber = iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "statenumber", name: "statenumber", objectType: "state", role: "value" });
		iobObjStateNumber.object.common.unit = "°C";
		//console.log(JSON.stringify(iobObjStateJSON));
		expect(iobObjStateNumber).to.have.keys(["id", "object"]);
		expect(iobObjStateNumber.id).to.equal("test.0.statenumber");
		expect(iobObjStateNumber.object).to.have.keys(["type", "common", "native"]);
		expect(iobObjStateNumber.object.common).to.have.keys(["role", "name", "type", "read", "write", "category", "desc", "unit"]);
		expect(iobObjStateNumber.object.common.name).to.equal("statenumber");
		expect(iobObjStateNumber.object.common.type).to.equal("number");
		expect(iobObjStateNumber.object.common.unit).to.equal("°C");
	});
});
//#endregion

//#region Test validateObject
describe("Test validateObject", () =>{
	it("Validate object with successfull result (simple)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "channel1", name: "channel1", objectType: "template", template: "channel"}));
		iobObjs.push(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "channel1.state1", name: "channel1_state1", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.not.throw();
	});
	it("Validate object with unsuccessfull result (simple)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "channel1.state1", name: "state1", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.throw("No superior object declared for test.0.channel1");
	});
	it("Validate object with successfull result (complex)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar", name: "channel1", objectType: "template", template: "channel"}));
		iobObjs.push(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar.state", name: "channel1_state1", objectType: "template", template: "json"}));
		iobObjs.push(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar.foobar", name: "folder1", objectType: "template", template: "folder"}));
		iobObjs.push(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar.foobar.foobar", name: "channel1_folder1_state1", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.not.throw();
	});
	it("Validate object with unsuccessfull result (complex)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar", name: "channel1", objectType: "template", template: "channel"}));
		iobObjs.push(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar.state", name: "channel1_state1", objectType: "template", template: "json"}));
		iobObjs.push(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar.foobar", name: "channel1_state2", objectType: "template", template: "json"}));
		iobObjs.push(iobHelper.buildObject({ namespace: "test.0"} as globalThis.ioBroker.Adapter , {id: "foobar.foobar.foobar", name: "channel1_state2", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.throw("No correct superior object declared for test.0.foobar.foobar");
	});
});
//#endregion
