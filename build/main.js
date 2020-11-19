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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateObjectDefinition = exports.syncObjects = exports.validateObjectTree = exports.buildObject = void 0;
const predefined_objects_1 = require("./lib/predefined_objects");
const Roles = __importStar(require("./lib/roles"));
const ObjectAttributes = __importStar(require("./lib/object_attributes"));
const util = __importStar(require("util"));
const clone_deep_1 = __importDefault(require("clone-deep"));
function ensureNamespace(namespace, objectId) {
    if (objectId.startsWith(`${namespace}.`))
        return objectId;
    return `${namespace}.${objectId}`;
}
function buildObject(adapterInstance, options) {
    let definition;
    if (options.objectType != undefined) {
        if (options.objectType === "template") {
            // Use a predefined template
            definition = clone_deep_1.default(predefined_objects_1.templates[options.template]);
        }
        else {
            // Create a new object from the given options
            definition = createTemplateObjectDefinition(options.objectType, options.role);
        }
        definition.common.name = options.name || "";
    }
    else {
        // Create basic state object with name
        definition = {
            type: "state",
            common: { "name": options.name, "role": "state", "read": true, "write": true, "type": "string", "desc": "" }
        };
    }
    if (options.description != undefined && (definition.type === "state"
        || definition.type === "channel")) {
        definition.common.desc = options.description;
    }
    // Turn off object type validation here - we know what we're doing
    const ret = {
        id: ensureNamespace(adapterInstance.namespace, options.id),
        // Some object types have required properties on `native`
        // Since we're not creating them, disable that check
        object: Object.assign(Object.assign({}, definition), { native: {} }),
    };
    if (options.value !== undefined) {
        ret.value = options.value;
    }
    return ret;
}
exports.buildObject = buildObject;
function validateObjectTree(iobObjects) {
    // Sort by ID
    iobObjects.sort(function (a, b) {
        return (a.id.split(".").length - b.id.split(".").length) || a.id.localeCompare(b.id);
    });
    // Verfify all sub-states have a superior device, channel or folder
    // Foreach sub-state (. in id)
    iobObjects.filter(item => item.object.type.split(".").length > 0).filter(item => item.object.type === "state").forEach(iobObj => {
        const iobIDPath = iobObj.id.split(".");
        if (iobIDPath.length > 0) {
            // Remove last element (=name of state)
            iobIDPath.pop();
            let iobIDBasePath = "";
            iobIDPath.forEach(iobIDName => {
                if (iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).length > 1) {
                    throw `Duplicated object ${iobIDBasePath}${iobIDName} defined`;
                }
                else {
                    if (iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).length === 0) {
                        throw `No superior object declared for ${iobIDPath.join(".")}`;
                    }
                    iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).forEach(iobObj => {
                        if ((iobObj.object.type === "device" || iobObj.object.type === "channel" || iobObj.object.type === "folder") === false) {
                            throw `No correct superior object declared for ${iobIDPath.join(".")}`;
                        }
                    });
                }
                iobIDBasePath = `${iobIDBasePath}${iobIDName}.`;
            });
        }
    });
}
exports.validateObjectTree = validateObjectTree;
/**
 * Synchronizes a list of objects into the ioBroker objects DB
 * @param adapterInstance The instance of the current ioBroker adapter
 * @param iobObjects The desired list of objects that should exist after this call
 * @param options Can be used to influence the behavior (overwriting and removing existing objects)
 */
function syncObjects(adapterInstance, iobObjects, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Parse options and choose defaults
        const { overwriteExisting = false, removeUnused = false, except } = options;
        // Ensure that the entire object tree is complete and no intermediate objects are missing
        validateObjectTree(iobObjects);
        // Find out which objects are new, which are going to be overwritten and which might need to be deleted
        const existingObjects = Object.values(yield adapterInstance.getAdapterObjectsAsync());
        // Using Sets allows us to ignore duplicates (which shouldn't happen, but you never know)
        const existingObjectIDs = new Set(existingObjects.map(o => o._id));
        const desiredObjectIDs = new Set(iobObjects.map(o => o.id));
        // Objects that exist but are no longer needed
        const unusedIDs = new Set([...existingObjectIDs].filter(id => !desiredObjectIDs.has(id)));
        // TODO: Use this so we can merge changed objects instead of completely overwriting them
        // // Objects that don't exist yet
        // const newIDs = new Set([...desiredObjectIDs].filter(id => !existingObjectIDs.has(id)));
        // // Objects that already exist and should be kept
        // const existingIDs = new Set([...desiredObjectIDs].filter(id => existingObjectIDs.has(id)));
        // Clean up unused objects if desired
        if (removeUnused) {
            // Create a matcher function to check which unused IDs to keep
            const shouldKeep = !except ? () => true
                : typeof except === "string" ? (id) => id === except
                    : Array.isArray(except) ? (id) => except.includes(id)
                        : util.types.isRegExp(except) ? (id) => except.test(id)
                            : typeof except === "function" ? (id) => except(id)
                                : () => true;
            for (const id of unusedIDs) {
                if (!shouldKeep(id))
                    yield adapterInstance.delObjectAsync(id);
            }
        }
        // Create new objects (and update existing if desired)
        for (const obj of iobObjects) {
            if (!overwriteExisting) {
                yield adapterInstance.setObjectNotExistsAsync(obj.id, obj.object);
            }
            else {
                yield adapterInstance.setObjectAsync(obj.id, obj.object);
            }
            if (obj.value !== undefined) {
                yield adapterInstance.setStateAsync(obj.id, { val: obj.value, ack: true });
            }
        }
    });
}
exports.syncObjects = syncObjects;
function createTemplateObjectDefinition(objectType, role) {
    // Getting Definition for current type
    const iobResTemplate = ObjectAttributes.objectCommonSchemas[objectType];
    // Temporary result object
    let objectCommon = {};
    if (iobResTemplate.attrMandatory) {
        // Adding mandatory attributes
        for (const attrName of iobResTemplate.attrMandatory) {
            // @ts-expect-error While the common attributes are not without error, this won't work
            const attrDefinition = ObjectAttributes.commonAttributes[attrName];
            // Take first or single attrType, check for further attributes
            if (attrDefinition.attrType) {
                // If an attribute type is defined, create a property with the correct type
                let defaultAttributeType;
                if (Array.isArray(attrDefinition.attrType)) {
                    defaultAttributeType = attrDefinition.attrType[0];
                }
                else {
                    defaultAttributeType = attrDefinition.attrType;
                }
                //Setting type for type attribute
                if (attrName === "type") {
                    objectCommon[attrName] = defaultAttributeType;
                }
                else {
                    // Setting value for key
                    switch (defaultAttributeType) {
                        case "string":
                            objectCommon[attrName] = "";
                            break;
                        case "number":
                            objectCommon[attrName] = 0;
                            break;
                        case "boolean":
                            objectCommon[attrName] = true;
                            break;
                        case "object":
                            objectCommon[attrName] = {};
                            break;
                        case "array":
                            objectCommon[attrName] = [];
                            break;
                    }
                }
            }
        }
    }
    // If role is defined set role
    if (role && (objectType === "state" || objectType === "channel")) {
        objectCommon = Object.assign(Object.assign(Object.assign({}, objectCommon), { role }), Roles.roles_definition[role]);
    }
    return {
        type: objectType,
        common: objectCommon
    };
}
exports.createTemplateObjectDefinition = createTemplateObjectDefinition;
//# sourceMappingURL=main.js.map