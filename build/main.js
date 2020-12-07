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
exports.createTemplateObjectDefinition = exports.syncObjects = exports.validateObjectTree = exports.validateObject = exports.buildObject = void 0;
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
function getTypefromValue(value) {
    switch (typeof (value)) {
        case "object":
            // Handle typeof [] === "object"
            if (Array.isArray(value)) {
                return "array";
                // Handle typeof {} === "object"
            }
            else if (Object.prototype.toString.call(value) === "[object Object]") {
                return "object";
                // typeof null === "object"
            }
        case "number":
            return "number";
        case "string":
            return "string";
        case "boolean":
            return "boolean";
    }
}
function selectTypefromArray(value, AllowedTypes) {
    const TypeOfValue = getTypefromValue(value);
    if (AllowedTypes.includes(TypeOfValue)) {
        return TypeOfValue;
    }
    else {
        throw `Invalid type ${TypeOfValue || typeof (value)} of value ${value} for allowed types ${AllowedTypes.join(",")} `;
    }
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
    // The templates may contain arrays for some values that are no arrays in ioBroker.
    // We find them and pin them to a single value.
    if (definition.type === "state") {
        if (Array.isArray(definition.common.type)) {
            if (options.value != null) {
                definition.common.type = selectTypefromArray(options.value, definition.common.type);
            }
            else {
                definition.common.type = definition.common.type[0];
            }
        }
        if (Array.isArray(definition.common.unit)) {
            definition.common.unit = definition.common.unit[0];
        }
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
function validateObject(iobObject) {
    // Verifying unit on states
    if (iobObject.object.type === "state" && iobObject.object.common.role && iobObject.object.common.unit) {
        // Cast iobObject.object.common as StateCommon
        const iobObjectCommon = iobObject.object.common;
        // Get RoleDefinition
        const RoleDefinition = Roles.roles_definition[iobObjectCommon.role];
        if (RoleDefinition.unit) {
            if (RoleDefinition.unit === "forbidden" && iobObjectCommon.unit) {
                throw `Unit is forbidden in Role ${iobObjectCommon.role} at State with ID ${iobObject.id}`;
            }
            if (!Array.isArray(RoleDefinition.unit) && RoleDefinition.unit !== iobObjectCommon.unit) {
                throw `Only Unit ${RoleDefinition.unit} is allowed in Role ${iobObjectCommon.role} at State with ID ${iobObject.id}`;
            }
            if (Array.isArray(RoleDefinition.unit) && !RoleDefinition.unit.some(item => item === iobObjectCommon.unit)) {
                throw `Only Units ${RoleDefinition.unit.join(",")} are allowed in Role ${iobObjectCommon.role} at State with ID ${iobObject.id}`;
            }
        }
    }
}
exports.validateObject = validateObject;
function validateObjectTree(iobObjects) {
    // Sort by ID
    iobObjects.sort(function (a, b) {
        return (a.id.split(".").length - b.id.split(".").length) || a.id.localeCompare(b.id);
    });
    // Verfify all sub-states have a superior device, channel or folder
    // Action1:		Filter sub-id's (split . and array length > 3)
    // Example:		Match adapter.0.folder.statename (Folder must be defined as superior object)
    // 				But not adapter.0.statename (There could not exist a superior object)
    // Action2:		Filter states, for states in a sub-level a superior object should be defined
    iobObjects.filter(item => item.id.split(".").length > 3).filter(item => item.object.type === "state").forEach(iobObj => {
        // Split id in an array by .
        const iobIDPath = iobObj.id.split(".");
        // Remove last element (=name of state)
        // iobIDPath from adapter.0.folder.statename is then ['adapter', '0', 'folder']
        iobIDPath.pop();
        // Create empty BasePath (explained below)
        let iobIDBasePath = "";
        // Create a Counter for Path-Depth (explained below)
        let CountPathDepth = 0;
        // Iterate each part of id, so adapter, 0, folder
        // adapter and 0 could not be defined as superior object, this structure is created automatically.
        // Therefore the Counter CountPathDepth is used. We're starting always with adapter, followed by 0.
        // So checks for a superior object must start after adapter.0 (CountPathDepth >= 2)
        // Because we're iterating through ['adapter', '0', 'folder'] we need the ability to recreate the complete id
        // Therefore the variable iobIDBasePath is used. After checking the current level, we're setting the basepath.
        // So after checking adapter the basepath is "adapter.", after 0 the basepath becomes "adapter.0."
        iobIDPath.forEach(iobIDName => {
            // First lets check that there is no duplicted object with that name
            // For example: a state with id adapter.0.folder.name and another state or folder with the same id
            // Therefore we're checking if the complete object array has more than one element with that id
            if (iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).length > 1) {
                throw `Duplicated object ${iobIDBasePath}${iobIDName} defined`;
            }
            else {
                // Checking if a superior object is defined
                // When iterating ['adapter', '0', 'folder'], we must check only at Depth >= 2 and not adapter or 0
                // Then we check that adapter.0.folder is defined as id in the complete object array
                if (CountPathDepth >= 2 && !iobObjects.some(item => item.id === `${iobIDBasePath}${iobIDName}`)) {
                    throw `No superior object declared for ${iobIDPath.join(".")}`;
                }
                // Ok, superior object is defined. But the superior object muste be device, channel or folder, not a state for example
                // Due to filter on the superior object we don't get into foreach for adapter or 0
                // For adapter.0.folder we get the above checked for exist superior object
                // Now finally verify that this superior object has the correct type
                iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).forEach(iobObj => {
                    if ((iobObj.object.type === "device" || iobObj.object.type === "channel" || iobObj.object.type === "folder") === false) {
                        throw `No correct superior object declared for ${iobIDPath.join(".")}`;
                    }
                });
            }
            // Extend Base Path, e.g. from "" to "adapter.", then from "adapter." to "adapter.0., then...."
            iobIDBasePath = `${iobIDBasePath}${iobIDName}.`;
            // PathDepth Counter + 1 (adapter = 0, 0 = 1, folder = 2, ...)
            CountPathDepth++;
        });
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
        // Validate objects
        iobObjects.forEach(iobObject => {
            validateObject(iobObject);
        });
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
    // Remove unit:forbidden
    if (objectCommon.unit === "forbidden") {
        delete objectCommon.unit;
    }
    return {
        type: objectType,
        common: objectCommon
    };
}
exports.createTemplateObjectDefinition = createTemplateObjectDefinition;
//# sourceMappingURL=main.js.map