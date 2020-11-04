"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIOBObj = exports.validateIOBObj = exports.saveIOBObj = exports.makeIOBObj = void 0;
const predefined_objects_1 = require("./lib/predefined_objects");
const ObjectAttributes = require("./lib/object_attributes");
const matcher = require("matcher");
function makeIOBObj(...args) {
    let iobResObject;
    switch (args.length) {
        case 3:
            // Create basic state object with name
            iobResObject = { "type": "state", common: { "name": args[1], "role": "state", "read": true, "write": true, "type": "string", "desc": "" } };
            break;
        default:
            // Create object based on template
            // args[1] is name of template or name of Type
            if (args[3] === "template") {
                const usetemplate = args[4];
                iobResObject = predefined_objects_1.states[usetemplate];
            }
            else {
                iobResObject = createIOBObj(args[3], args[4]);
            }
            if (iobResObject.common) {
                iobResObject.common.name = args[1] || "";
            }
            break;
    }
    if (args[5] && (iobResObject.type !== "device" && iobResObject.type !== "enum")) {
        iobResObject.common.desc = args[5];
    }
    // Building information (id, value)
    const iobResult = {};
    iobResult.id = args[0];
    if (args[2] !== null) {
        iobResult.value = args[2];
    }
    // Return correct type
    switch (iobResObject.type) {
        case "state":
            iobResult.object = iobResObject;
            break;
        case "channel":
            iobResult.object = iobResObject;
            break;
        case "device":
            iobResult.object = iobResObject;
            break;
        case "folder":
            iobResult.object = iobResObject;
            break;
        case "enum":
            iobResult.object = iobResObject;
            break;
        default:
            iobResult.object = iobResObject;
            break;
    }
    return iobResult;
}
exports.makeIOBObj = makeIOBObj;
function saveIOBObj(Adapter, iobObjects, overwrite = false, remove = false, excluded) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
        // Sort by ID ?
        const IDs = iobObj.map(a => a.id);
        IDs.forEach((key: string) => {console.log(key)});
        return true;
        */
        iobObjects.forEach((iobObj) => __awaiter(this, void 0, void 0, function* () {
            if (overwrite === false) {
                yield Adapter.setObjectNotExistsAsync(iobObj.id, iobObj.object);
            }
            else {
                yield Adapter.setObjectAsync(iobObj.id, iobObj.object);
            }
            if (iobObj.value) {
                yield Adapter.setStateAsync(iobObj.id, { val: iobObj.value, ack: true });
            }
        }));
        if (remove === true) {
            const iobExistingObjects = yield Adapter.getAdapterObjectsAsync();
            Object.keys(iobExistingObjects).forEach((iobExistingObjectID) => __awaiter(this, void 0, void 0, function* () {
                if ((iobObjects.map(a => a.id).includes(iobExistingObjectID.replace(`${Adapter.name}.${Adapter.instance}.`, "")) !== true)) {
                    if (excluded) {
                        if (matcher.isMatch(iobExistingObjectID.replace(`${Adapter.name}.${Adapter.instance}.`, ""), excluded) !== true) {
                            yield Adapter.delObjectAsync(iobExistingObjectID);
                        }
                    }
                    else {
                        yield Adapter.delObjectAsync(iobExistingObjectID);
                    }
                }
            }));
        }
        return true;
    });
}
exports.saveIOBObj = saveIOBObj;
function validateIOBObj(iobObj) {
    var _a;
    // Getting Type Definition for current type
    const iobResTemplate = ObjectAttributes.objectTypes[iobObj.object["type"]];
    if (iobResTemplate.attrMandatory && iobObj.object.common) {
        // Verify that all mandatory attributes are included
        const DiffMand = iobResTemplate.attrMandatory.filter(x => Object.keys(iobObj.object.common).includes(x));
        if (DiffMand.length !== iobResTemplate.attrMandatory.length) {
            throw `Mandatory attributes missing: ${DiffMand.join(",")}`;
        }
    }
    if (iobObj.object.common && (iobResTemplate.attrOptional || iobResTemplate.attrOptional)) {
        // Verify that only mandatory and optional attributes for current type is included
        const DiffAll = (((_a = iobResTemplate.attrMandatory) === null || _a === void 0 ? void 0 : _a.concat(iobResTemplate.attrOptional)) || iobResTemplate.attrOptional).filter(x => Object.keys(iobObj.object.common).includes(x));
        if (DiffAll.length !== Object.keys(iobObj.object.common).length) {
            throw `Mandatory attributes missing: ${DiffAll.join(",")}`;
        }
    }
    return true;
}
exports.validateIOBObj = validateIOBObj;
function createIOBObj(objtype, role) {
    // Getting Definition for current type
    const iobResTemplate = ObjectAttributes.objectTypes[objtype];
    // Temporary result object
    const ResultCommon = {};
    if (iobResTemplate.attrMandatory) {
        // Adding mandatory attributes
        iobResTemplate.attrMandatory.forEach((key) => {
            const iobCurrentAttributeName = key;
            const CurrentAttribute = ObjectAttributes.commonAttributes[iobCurrentAttributeName];
            // Take first or single attrType, check for further attributes
            if (CurrentAttribute.attrType) {
                let CurrentAttributeType = "";
                if (Array.isArray(CurrentAttribute.attrType)) {
                    CurrentAttributeType = CurrentAttribute.attrType[0];
                }
                else {
                    CurrentAttributeType = CurrentAttribute.attrType;
                }
                //Setting type for type attribute
                if (key === "type") {
                    ResultCommon[key] = CurrentAttributeType;
                }
                else {
                    // Setting value for key
                    switch (CurrentAttributeType) {
                        case "string":
                            ResultCommon[key] = "";
                            break;
                        case "number":
                            ResultCommon[key] = 0;
                            break;
                        case "boolean":
                            ResultCommon[key] = true;
                            break;
                        case "object":
                            ResultCommon[key] = new Object;
                            break;
                        case "array":
                            ResultCommon[key] = [];
                            break;
                    }
                }
            }
        });
    }
    // If role is defined set role
    if (role && (objtype === "state" || objtype === "channel")) {
        ResultCommon["role"] = role;
    }
    // Return correct type
    switch (objtype) {
        case "state":
            return { type: objtype, common: ResultCommon };
            break;
        case "channel":
            return { type: objtype, common: ResultCommon };
            break;
        case "device":
            return { type: objtype, common: ResultCommon };
            break;
        case "folder":
            return { type: objtype, common: ResultCommon };
            break;
        case "enum":
            return { type: objtype, common: ResultCommon };
            break;
        default:
            return { type: objtype, common: ResultCommon };
            break;
    }
}
exports.createIOBObj = createIOBObj;
//# sourceMappingURL=main.js.map