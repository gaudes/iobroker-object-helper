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
exports.iobObjectFolder = exports.iobObjectChannel = exports.iobObjectState = exports.iobObjectTree = void 0;
/* eslint-disable @typescript-eslint/indent */
const iobObjectHelper = __importStar(require("../main"));
const globalchildren = new Map();
class iobObjectTreeBase {
    constructor(adapterInstance) {
        this.adapterInstance = adapterInstance;
        this.children = new Map();
    }
    addState(options) {
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "state" }));
        const ret = new iobObjectState(this.adapterInstance, obj);
        globalchildren.set(obj.id, ret);
        return ret;
    }
    addStateFromTemplate(options) {
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "template" }));
        const ret = new iobObjectState(this.adapterInstance, obj);
        globalchildren.set(obj.id, obj);
        return ret;
    }
    addChannel(options) {
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "template", template: "channel" }));
        const ret = new iobObjectChannel(this.adapterInstance, obj);
        globalchildren.set(obj.id, ret);
        return ret;
    }
    addFolder(options) {
        const obj = iobObjectHelper.buildObject(this.adapterInstance, Object.assign(Object.assign({}, options), { objectType: "template", template: "folder" }));
        const ret = new iobObjectFolder(this.adapterInstance, obj);
        globalchildren.set(obj.id, ret);
        return ret;
    }
    logChildren() {
        console.log(globalchildren);
    }
}
class iobObjectTree extends iobObjectTreeBase {
    constructor(adapterInstance) {
        super(adapterInstance);
        this.adapterInstance = adapterInstance;
        this.children = new Map();
    }
    addState(options) {
        const ret = super.addState(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
    // Einschränkung von Template noch notwendig, nicht Device, Channel, Folder
    addStateFromTemplate(options) {
        const ret = super.addStateFromTemplate(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
    addChannel(options) {
        const ret = super.addChannel(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
    addFolder(options) {
        const ret = super.addFolder(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
}
exports.iobObjectTree = iobObjectTree;
class iobObjectState extends iobObjectTreeBase {
    constructor(adapterInstance, obj) {
        super(adapterInstance);
        //this.children.set("id", 1); // jetzt wird gemeckert, falls du doch children hinzufügen willst
        this.my = obj;
    }
}
exports.iobObjectState = iobObjectState;
class iobObjectChannel extends iobObjectTreeBase {
    constructor(adapterInstance, obj) {
        super(adapterInstance);
        //this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
        this.my = obj;
        //this.children = new Map();
    }
    addState(options) {
        const ret = super.addState(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
    addStateFromTemplate(options) {
        const ret = super.addStateFromTemplate(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
    addFolder(options) {
        const ret = super.addFolder(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
}
exports.iobObjectChannel = iobObjectChannel;
class iobObjectFolder extends iobObjectTreeBase {
    constructor(adapterInstance, obj) {
        super(adapterInstance);
        //this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
        this.my = obj;
        //this.children = new Map();
    }
    addState(options) {
        const ret = super.addState(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
    addStateFromTemplate(options) {
        const ret = super.addStateFromTemplate(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
    addFolder(options) {
        const ret = super.addFolder(options);
        this.children.set(ret.my.id, ret);
        return ret;
    }
}
exports.iobObjectFolder = iobObjectFolder;
//# sourceMappingURL=iobObjClass.js.map