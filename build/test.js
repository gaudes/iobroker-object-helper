"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const iobHelper = __importStar(require("./main"));
//#region Test buildObject
describe("Test buildObject", () => {
    it("Build channel object by template", () => {
        const iobObjChannel1 = iobHelper.buildObject({ namespace: "test.0" }, { id: "channel1", name: "channel1", objectType: "template", template: "channel" });
        //console.log(JSON.stringify(iobObjChannel1));
        chai_1.expect(iobObjChannel1).to.have.keys(["id", "object"]);
        chai_1.expect(iobObjChannel1.id).to.equal("test.0.channel1");
        chai_1.expect(iobObjChannel1.object).to.have.keys(["type", "common", "native"]);
        chai_1.expect(iobObjChannel1.object.common.name).to.equal("channel1");
    });
    it("Build state object by template", () => {
        const iobObjStateJSON = iobHelper.buildObject({ namespace: "test.0" }, { id: "statejson", name: "statejson", objectType: "template", template: "json" });
        //console.log(JSON.stringify(iobObjStateJSON));
        chai_1.expect(iobObjStateJSON).to.have.keys(["id", "object"]);
        chai_1.expect(iobObjStateJSON.id).to.equal("test.0.statejson");
        chai_1.expect(iobObjStateJSON.object).to.have.keys(["type", "common", "native"]);
        chai_1.expect(iobObjStateJSON.object.common).to.have.keys(["role", "name", "type", "read", "write", "def"]);
        chai_1.expect(iobObjStateJSON.object.common.name).to.equal("statejson");
    });
    it("Build state object with role json", () => {
        const iobObjStateJSON = iobHelper.buildObject({ namespace: "test.0" }, { id: "statejson", name: "statejson", objectType: "state", role: "json" });
        //console.log(JSON.stringify(iobObjStateJSON));
        chai_1.expect(iobObjStateJSON).to.have.keys(["id", "object"]);
        chai_1.expect(iobObjStateJSON.id).to.equal("test.0.statejson");
        chai_1.expect(iobObjStateJSON.object).to.have.keys(["type", "common", "native"]);
        chai_1.expect(iobObjStateJSON.object.common).to.have.keys(["role", "name", "type", "read", "write", "category", "desc"]);
        chai_1.expect(iobObjStateJSON.object.common.name).to.equal("statejson");
        chai_1.expect(iobObjStateJSON.object.common.type).to.equal("string");
    });
    it("Build state object with role value", () => {
        const iobObjStateNumber = iobHelper.buildObject({ namespace: "test.0" }, { id: "statenumber", name: "statenumber", objectType: "state", role: "value" });
        iobObjStateNumber.object.common.unit = "°C";
        //console.log(JSON.stringify(iobObjStateJSON));
        chai_1.expect(iobObjStateNumber).to.have.keys(["id", "object"]);
        chai_1.expect(iobObjStateNumber.id).to.equal("test.0.statenumber");
        chai_1.expect(iobObjStateNumber.object).to.have.keys(["type", "common", "native"]);
        chai_1.expect(iobObjStateNumber.object.common).to.have.keys(["role", "name", "type", "read", "write", "category", "desc", "unit"]);
        chai_1.expect(iobObjStateNumber.object.common.name).to.equal("statenumber");
        chai_1.expect(iobObjStateNumber.object.common.type).to.equal("number");
        chai_1.expect(iobObjStateNumber.object.common.unit).to.equal("°C");
    });
});
//#endregion
//#region Test validateObject
describe("Test validateObject", () => {
    it("Validate object with successfull result (simple)", () => {
        const iobObjs = Array(iobHelper.buildObject({ namespace: "test.0" }, { id: "channel1", name: "channel1", objectType: "template", template: "channel" }));
        iobObjs.push(iobHelper.buildObject({ namespace: "test.0" }, { id: "channel1.state1", name: "channel1_state1", objectType: "template", template: "json" }));
        chai_1.expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.not.throw();
    });
    it("Validate object with unsuccessfull result (simple)", () => {
        const iobObjs = Array(iobHelper.buildObject({ namespace: "test.0" }, { id: "channel1.state1", name: "state1", objectType: "template", template: "json" }));
        chai_1.expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.throw("No superior object declared for test.0.channel1");
    });
    it("Validate object with successfull result (complex)", () => {
        const iobObjs = Array(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar", name: "channel1", objectType: "template", template: "channel" }));
        iobObjs.push(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar.state", name: "channel1_state1", objectType: "template", template: "json" }));
        iobObjs.push(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar.foobar", name: "folder1", objectType: "template", template: "folder" }));
        iobObjs.push(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar.foobar.foobar", name: "channel1_folder1_state1", objectType: "template", template: "json" }));
        chai_1.expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.not.throw();
    });
    it("Validate object with unsuccessfull result (complex)", () => {
        const iobObjs = Array(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar", name: "channel1", objectType: "template", template: "channel" }));
        iobObjs.push(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar.state", name: "channel1_state1", objectType: "template", template: "json" }));
        iobObjs.push(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar.foobar", name: "channel1_state2", objectType: "template", template: "json" }));
        iobObjs.push(iobHelper.buildObject({ namespace: "test.0" }, { id: "foobar.foobar.foobar", name: "channel1_state2", objectType: "template", template: "json" }));
        chai_1.expect(iobHelper.validateObjectTree.bind(iobHelper.validateObjectTree, iobObjs)).to.throw("No correct superior object declared for test.0.foobar.foobar");
    });
});
//#endregion
//# sourceMappingURL=test.js.map