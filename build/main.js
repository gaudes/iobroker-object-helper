"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIOBObj = exports.validateIOBObj = exports.saveIOBObj = exports.makeIOBObj = void 0;
const predefined_objects_1 = require("./lib/predefined_objects");
const ObjectAttributes = require("./lib/object_attributes");
const ArrDiff = require("fast-array-diff");
/**
 * Creates object
 * @param {string} name Name of object
 * @param {iobTypes} type Type is state
 * @param {iobRoles} type Role of state is required, e.g. state, text, json, ...
 * @returns {BaseObject} Returns complete object
*/
function makeIOBObj(...args) {
    let iobRes;
    switch (args.length) {
        case 0:
            // Create basic state object
            iobRes = { "type": "state", common: { "name": "", "role": "state", "read": true, "write": true, "type": "string", "desc": "" } };
            break;
        case 1:
            // Create basic state object with name
            iobRes = { "type": "state", common: { "name": args[0], "role": "state", "read": true, "write": true, "type": "string", "desc": "" } };
            break;
        default:
            // Create object based on template
            // args[1] is name of template or name of Type
            if (args[1] === "template") {
                const usetemplate = args[2];
                iobRes = predefined_objects_1.states[usetemplate];
            }
            else {
                iobRes = createIOBObj(args[1], args[2]);
            }
            if (iobRes.common) {
                iobRes.common.name = args[0] || "";
            }
            break;
    }
    switch (iobRes.type) {
        case "state":
            return iobRes;
            break;
        case "channel":
            return iobRes;
            break;
        case "device":
            return iobRes;
            break;
        case "folder":
            return iobRes;
            break;
        case "enum":
            return iobRes;
            break;
        default:
            return iobRes;
            break;
    }
}
exports.makeIOBObj = makeIOBObj;
function saveIOBObj(_iobObj) {
    return true;
}
exports.saveIOBObj = saveIOBObj;
function validateIOBObj(iobObj) {
    var _a, _b, _c;
    const iobResTemplate = ObjectAttributes.objectTypes[iobObj["type"]];
    if (iobResTemplate.attrMandatory && iobObj.common) {
        const DiffMand = ArrDiff.diff(iobResTemplate.attrMandatory, Object.keys(iobObj.common));
        if (((_a = DiffMand.removed) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            throw `Mandatory attributes missing: ${DiffMand.removed.join(",")}`;
        }
    }
    if (iobObj.common && (iobResTemplate.attrOptional || iobResTemplate.attrOptional)) {
        const DiffAll = ArrDiff.diff(((_b = iobResTemplate.attrMandatory) === null || _b === void 0 ? void 0 : _b.concat(iobResTemplate.attrOptional)) || iobResTemplate.attrOptional, Object.keys(iobObj.common));
        if (((_c = DiffAll.added) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            throw `Illegal attributes added: ${DiffAll.added.join(",")}`;
        }
    }
    return true;
}
exports.validateIOBObj = validateIOBObj;
function createIOBObj(objtype, role) {
    const iobResTemplate = ObjectAttributes.objectTypes[objtype];
    const ResultCommon = {};
    if (iobResTemplate.attrMandatory) {
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
                if (key === "type") {
                    ResultCommon[key] = CurrentAttributeType;
                }
                else {
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
    if (role && (objtype === "state" || objtype === "channel")) {
        ResultCommon["role"] = role;
    }
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