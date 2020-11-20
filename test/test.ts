import { expect } from "chai";
import * as iobHelper from "../src/main";

const Adapter = { namespace: "test.0"} as ioBroker.Adapter;

//#region Test buildObject
describe("Test buildObject", () =>{
	it("Build channel object by template", () => {
		const iobObjChannel1 = iobHelper.buildObject(Adapter, {id: "channel1", name: "channel1", objectType: "template", template: "channel"});
		expect(iobObjChannel1).to.be.eql({id:"test.0.channel1",object: {type:"channel",common:{name:"channel1"},native:{}}});
	});
	it("Build state object by template", () => {
		const iobObjStateJSON = iobHelper.buildObject(Adapter, {id: "statejson", name: "statejson", objectType: "template", template: "json"});
		expect(iobObjStateJSON).to.be.eql({id:"test.0.statejson",object:{type:"state",common:{role:"json",name:"statejson",type:"string",read:true,write:true,def:"{}"},native:{}}});
	});
	it("Build state object with role json", () => {
		const iobObjStateJSON = iobHelper.buildObject(Adapter, {id: "statejson", name: "statejson", objectType: "state", role: "json" });
		expect(iobObjStateJSON).to.be.eql({id:"test.0.statejson",object:{type:"state",common:{role:"json",name:"statejson",type:"string",read:true,write:true,desc:"JSON"},native:{}}});
	});
	it("Build state object with role value", () => {
		const iobObjStateNumber = iobHelper.buildObject(Adapter, {id: "statenumber", name: "statenumber", objectType: "state", role: "value" });
		iobObjStateNumber.object.common.unit = "°C";
		console.log(JSON.stringify(iobObjStateNumber));
		expect(iobObjStateNumber).to.be.eql({id:"test.0.statenumber",object:{type:"state",common:{name:"statenumber",read:true,write:false,role:"value",type:"number",desc:"Value",unit:"°C"},native:{}}});
	});
});
//#endregion

//#region Test validateObject
describe("Test validateObject", () =>{
	it("Validate object with successfull result (simple)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject(Adapter, {id: "channel1", name: "channel1", objectType: "template", template: "channel"}));
		iobObjs.push(iobHelper.buildObject(Adapter, {id: "channel1.state1", name: "channel1_state1", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.not.throw();
	});
	it("Validate object with unsuccessfull result (simple)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject(Adapter, {id: "channel1.state1", name: "state1", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.throw("No superior object declared for test.0.channel1");
	});
	it("Validate object with successfull result (complex)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject(Adapter, {id: "foobar", name: "channel1", objectType: "template", template: "channel"}));
		iobObjs.push(iobHelper.buildObject(Adapter, {id: "foobar.state", name: "channel1_state1", objectType: "template", template: "json"}));
		iobObjs.push(iobHelper.buildObject(Adapter, {id: "foobar.foobar", name: "folder1", objectType: "template", template: "folder"}));
		iobObjs.push(iobHelper.buildObject(Adapter, {id: "foobar.foobar.foobar", name: "channel1_folder1_state1", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.not.throw();
	});
	it("Validate object with unsuccessfull result (complex)", () =>{
		const iobObjs: iobHelper.ObjectWithValue[] = Array(iobHelper.buildObject(Adapter, {id: "foobar", name: "channel1", objectType: "template", template: "channel"}));
		iobObjs.push(iobHelper.buildObject(Adapter, {id: "foobar.state", name: "channel1_state1", objectType: "template", template: "json"}));
		iobObjs.push(iobHelper.buildObject(Adapter, {id: "foobar.foobar", name: "channel1_state2", objectType: "template", template: "json"}));
		iobObjs.push(iobHelper.buildObject(Adapter, {id: "foobar.foobar.foobar", name: "channel1_state2", objectType: "template", template: "json"}));
		expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.throw("No correct superior object declared for test.0.foobar.foobar");
	});
});
//#endregion
