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
Object.defineProperty(exports, "__esModule", { value: true });
exports.iobObjectFolder = exports.iobObjectChannel = exports.iobObjectState = exports.iobObjectTree = void 0;
/* eslint-disable @typescript-eslint/indent */
const iobObjectHelper = __importStar(require("../main"));
//#region Base class
class iobObjectTreeBase {
    constructor(adapterInstance) {
        this.adapterInstance = adapterInstance;
        this.children = new Map();
        this.isSyncComplete = false;
    }
    //#region State functions
    addState(options) {
        var _a;
        // Build object
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "state" }));
        options.id = this.ensureNamespace(options.id, (_a = this.my) === null || _a === void 0 ? void 0 : _a.id);
        const ret = new iobObjectState(this.adapterInstance, obj);
        this.children.set(ret.my.id, ret);
        this.isSyncComplete = false;
        return ret;
    }
    addStateFromTemplate(options) {
        var _a;
        // Build object
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "template" }));
        options.id = this.ensureNamespace(options.id, (_a = this.my) === null || _a === void 0 ? void 0 : _a.id);
        const ret = new iobObjectState(this.adapterInstance, obj);
        this.children.set(ret.my.id, ret);
        this.isSyncComplete = false;
        return ret;
    }
    //#endregion
    //#region Channel functions
    addChannel(options) {
        var _a;
        // Build object
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "template", template: "channel" }));
        options.id = this.ensureNamespace(options.id, (_a = this.my) === null || _a === void 0 ? void 0 : _a.id);
        const ret = new iobObjectChannel(this.adapterInstance, obj);
        this.children.set(ret.my.id, ret);
        this.isSyncComplete = false;
        return ret;
    }
    //#endregion
    //#region Folder functions
    addFolder(options) {
        var _a;
        // Build object
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "template", template: "folder" }));
        options.id = this.ensureNamespace(options.id, (_a = this.my) === null || _a === void 0 ? void 0 : _a.id);
        const ret = new iobObjectFolder(this.adapterInstance, obj);
        this.children.set(ret.my.id, ret);
        this.isSyncComplete = false;
        return ret;
    }
    //#endregion
    //#region Functions
    ensureNamespace(objectId, baseObjectId = "") {
        if (baseObjectId !== "") {
            if (objectId.match(new RegExp("^" + baseObjectId.replace(".", "\\.") + "\\.[^.]*$")))
                return objectId;
            if (objectId.match(/^[^.]*$/))
                return `${baseObjectId}.${objectId}`;
            throw (`Invalid object id: ${objectId}`);
        }
        else {
            if (objectId.match(new RegExp("^" + this.adapterInstance.namespace.replace(".", "\\.") + "\\.[^.]*$")))
                return objectId;
            if (objectId.match(/^[^.]*$/))
                return `${this.adapterInstance.namespace}.${objectId}`;
            throw (`Invalid object id: ${objectId}`);
        }
    }
    flatten() {
        const flatten = [];
        for (const [, child] of this.children.entries()) {
            flatten.push(child.my);
            flatten.push(...child.flatten());
        }
        return flatten;
    }
    validate() {
        iobObjectHelper.validateObjectTree(this.flatten());
        return true;
    }
    syncObjectsAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSyncComplete === false) {
                yield iobObjectHelper.syncObjects(this.adapterInstance, this.flatten(), options);
                this.isSyncComplete = true;
                for (const [, child] of this.children.entries()) {
                    child.isSync = true;
                }
            }
        });
    }
    getTypefromValue(value) {
        switch (typeof (value)) {
            case "object":
                // Handle typeof [] === "object"
                if (Array.isArray(value)) {
                    return "array";
                    // Handle typeof {} === "object"
                }
                else if (Object.prototype.toString.call(value) === "[object Object]") {
                    return "object";
                }
                // typeof null === "object"
                break;
            case "number":
                return "number";
            case "string":
                return "string";
            case "boolean":
                return "boolean";
        }
    }
}
//#endregion
//#region Exported Level0 class
class iobObjectTree extends iobObjectTreeBase {
    constructor(adapterInstance) {
        super(adapterInstance);
        this.adapterInstance = adapterInstance;
        this.children = new Map();
    }
    addState(options) {
        return super.addState(options);
    }
    // Einschränkung von Template noch notwendig, nicht Device, Channel, Folder
    addStateFromTemplate(options) {
        return super.addStateFromTemplate(options);
    }
    addChannel(options) {
        return super.addChannel(options);
    }
    addFolder(options) {
        return super.addFolder(options);
    }
    syncObjectsAsync(options) {
        const _super = Object.create(null, {
            syncObjectsAsync: { get: () => super.syncObjectsAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.syncObjectsAsync.call(this, options);
        });
    }
    validate() {
        return super.validate();
    }
}
exports.iobObjectTree = iobObjectTree;
//#endregion
//#region State class
class iobObjectState extends iobObjectTreeBase {
    constructor(adapterInstance, obj) {
        super(adapterInstance);
        //this.children.set("id", 1); // jetzt wird gemeckert, falls du doch children hinzufügen willst
        this.my = obj;
        this.isSync = false;
    }
    setValue(value, ack = false) {
        if (this.getTypefromValue(value) !== this.my.object.common.type) {
            throw `Invalid value type, type must be ${this.my.object.common.type}`;
        }
        if (this.isSync === false) {
            this.my.value = value;
            return true;
        }
        else {
            this.adapterInstance.setState(this.my.id, { val: value, ack: ack });
            return true;
        }
    }
    setValueAsync(value, ack = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getTypefromValue(value) !== this.my.object.common.type) {
                throw `Invalid value type, type must be ${this.my.object.common.type}`;
            }
            if (this.isSync === false) {
                this.my.value = value;
                return true;
            }
            else {
                yield this.adapterInstance.setStateAsync(this.my.id, { val: value, ack: ack });
                return true;
            }
        });
    }
}
exports.iobObjectState = iobObjectState;
//#endregion
//#region Channel class
class iobObjectChannel extends iobObjectTreeBase {
    constructor(adapterInstance, obj) {
        super(adapterInstance);
        //this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
        this.my = obj;
        this.isSync = false;
        //this.children = new Map();
    }
    addState(options) {
        return super.addState(options);
    }
    addStateFromTemplate(options) {
        return super.addStateFromTemplate(options);
    }
    addFolder(options) {
        return super.addFolder(options);
    }
}
exports.iobObjectChannel = iobObjectChannel;
//#endregion
//#region  Folder class
class iobObjectFolder extends iobObjectTreeBase {
    constructor(adapterInstance, obj) {
        super(adapterInstance);
        //this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
        this.my = obj;
        this.isSync = false;
        //this.children = new Map();
    }
    addState(options) {
        return super.addState(options);
    }
    addStateFromTemplate(options) {
        return super.addStateFromTemplate(options);
    }
    addFolder(options) {
        return super.addFolder(options);
    }
}
exports.iobObjectFolder = iobObjectFolder;
//#endregion
//# sourceMappingURL=iobObjClass.js.map