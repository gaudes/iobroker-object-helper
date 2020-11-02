import { states as Templates } from "./lib/predefined_objects";
import * as Roles from "./lib/roles";
import * as ObjectAttributes from "./lib/object_attributes";
import * as ArrDiff from "fast-array-diff";


// Declaring own interfaces, because existing interfaces in ioBroker extend BaseObject.
// In ioBroker.BaseObject is complete structure in ioBroker described, not only the required Fields for writing to ioBroker
export interface BaseObject{
	type: string;
	common?: ioBroker.StateCommon|ioBroker.ChannelCommon|ioBroker.DeviceCommon|ioBroker.EnumCommon|ioBroker.OtherCommon;
}

interface StateObject extends BaseObject{
	type: "state";
	common: ioBroker.StateCommon;
}
interface ChannelObject extends BaseObject{
	type: "channel";
	common: ioBroker.ChannelCommon
}
interface DeviceObject extends BaseObject{
	type: "device";
	common: ioBroker.DeviceCommon;
}
interface FolderObject extends BaseObject{
	type: "folder";
	common: ioBroker.OtherCommon;
}
interface EnumObject extends BaseObject{
	type: "enum";
	common: ioBroker.EnumCommon
}
interface OtherObject extends BaseObject{
	type: "adapter" | "config" | "group" | "host" | "info" | "instance" | "meta" | "script" | "user" | "chart";
	common: ioBroker.OtherCommon;
}
type iobObject = StateObject | ChannelObject | DeviceObject | FolderObject | EnumObject | OtherObject;
// Creatable Object Types, taken from objattr because in ioBroker.ObjectType are only state, channel and device defined
type iobObjectTypes = keyof typeof ObjectAttributes.objectTypes;
// Defined roles, taken from roles
type iobRoles = keyof typeof Roles.roles_definition;
// Name of templates
type iobTemplates = keyof typeof Templates;

/**
 * Creates basic empty state object of type state
 * @returns {BaseObject} Returns state with role state and type string
*/
export function makeIOBObj(): BaseObject|null;
/**
 * Creates basic state object with name
 * @param {String} name Name of state
 * @returns {BaseObject} Returns state with role state and type string
*/
export function makeIOBObj(name: string): BaseObject|null;
/**
 * Creates object from template
 * @param {string} name Name of object
 * @param objtype "template"
 * @param {iobTemplates} usetemplate Name of template
 * @returns {BaseObject} Returns complete object
*/
export function makeIOBObj(name: string, objtype: "template", usetemplate: iobTemplates ): BaseObject|null;
/**
 * Creates object
 * @param {string} name Name of object
 * @param {iobTypes} type Type of object, e.g. state, channel, ...
 * @param {iobRoles} type Role of object, e.g. state, text, json, ...
 * * @returns {BaseObject} Returns complete object
*/
export function makeIOBObj(name: string, objtype: "state", role: iobRoles): BaseObject|null;
/**
 * Creates object
 * @param {string} name Name of object
 * @param {iobTypes} type Type is state
 * @param {iobRoles} type Role of state is required, e.g. state, text, json, ...
 * @returns {BaseObject} Returns complete object
*/
export function makeIOBObj(...args: any[]): StateObject|ChannelObject|DeviceObject|FolderObject|EnumObject|OtherObject {
	let iobRes: BaseObject;
	switch(args.length){
		case 0:
			// Create basic state object
			iobRes = {"type": "state", common:{ "name": "", "role": "state", "read": true, "write": true, "type": "string", "desc": ""}} as StateObject;
			break;
		case 1:
			// Create basic state object with name
			iobRes = {"type": "state", common:{ "name": args[0], "role": "state", "read": true, "write": true, "type": "string", "desc": ""}} as StateObject;
			break;
		default:
			// Create object based on template
			// args[1] is name of template or name of Type
			if (args[1] === "template" ){
				const usetemplate: iobTemplates = args[2];
				iobRes = Templates[usetemplate] as OtherObject;
			}else{
				iobRes = createIOBObj(args[1],args[2]);
			}
			if (iobRes.common){
				iobRes.common.name  = args[0] || "";
			}
			break;
	}
	switch (iobRes.type){
		case "state":
			return iobRes as StateObject;
			break;
		case "channel":
			return iobRes as ChannelObject;
			break;
		case "device":
			return iobRes as DeviceObject;
			break;
		case"folder":
			return iobRes as FolderObject;
			break;
		case "enum":
			return iobRes as EnumObject;
			break;
		default:
			return iobRes as OtherObject;
			break;
	}
}

export function saveIOBObj(_iobObj: BaseObject): boolean{
	return true;
}

export function validateIOBObj(iobObj: BaseObject): boolean{
	interface iobTypeDefinition{
		desc?: string;
		attrMandatory?: Array<string>;
		attrOptional?: Array<string>;
	}
	const iobResTemplate: iobTypeDefinition = ObjectAttributes.objectTypes[iobObj["type"] as iobObjectTypes];
	if (iobResTemplate.attrMandatory && iobObj.common){
		const DiffMand = ArrDiff.diff(iobResTemplate.attrMandatory, Object.keys(iobObj.common));
		if (DiffMand.removed?.length > 0){
			throw `Mandatory attributes missing: ${DiffMand.removed.join(",")}`
		}
	}
	if (iobObj.common && (iobResTemplate.attrOptional || iobResTemplate.attrOptional)){
		const DiffAll = ArrDiff.diff(iobResTemplate.attrMandatory?.concat(iobResTemplate.attrOptional) || iobResTemplate.attrOptional, Object.keys(iobObj.common));
		if (DiffAll.added?.length > 0){
			throw `Illegal attributes added: ${DiffAll.added.join(",")}`
		}
	}
	return true;
}

export function createIOBObj (objtype: iobObjectTypes, role?: iobRoles): iobObject{
	interface iobTypeDefinition{
		desc?: string;
		attrMandatory?: Array<string>;
		attrOptional?: Array<string>;
	}

	interface iobAttributeDefinition{
		desc?: string;
		attrType?: string|Array<string>;
		[propName: string]: any;
	}
	interface iobReturn{
		[propName: string]: any;
	}
	type iobAttributesTotal = keyof typeof ObjectAttributes.commonAttributes;
	const iobResTemplate: iobTypeDefinition = ObjectAttributes.objectTypes[objtype];
	const ResultCommon: iobReturn = {};
	if (iobResTemplate.attrMandatory){
		iobResTemplate.attrMandatory.forEach((key: string) => {
			const iobCurrentAttributeName: iobAttributesTotal = key as iobAttributesTotal;
			const CurrentAttribute = ObjectAttributes.commonAttributes[iobCurrentAttributeName] as iobAttributeDefinition;
			// Take first or single attrType, check for further attributes
			if (CurrentAttribute.attrType){
				let CurrentAttributeType = "";
				if (Array.isArray(CurrentAttribute.attrType)){
					CurrentAttributeType = CurrentAttribute.attrType[0];
				}else{
					CurrentAttributeType = CurrentAttribute.attrType;
				}
				if (key === "type"){
					ResultCommon[key] = CurrentAttributeType;
				}else{
					switch (CurrentAttributeType){
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
	if (role && (objtype === "state" || objtype === "channel")){
		ResultCommon["role"] = role;
	}
	switch (objtype){
		case "state":
			return {type: objtype, common: ResultCommon}  as StateObject;
			break;
		case "channel":
			return {type: objtype, common: ResultCommon}  as ChannelObject;
			break;
		case "device":
			return {type: objtype, common: ResultCommon}  as DeviceObject;
			break;
		case"folder":
			return {type: objtype, common: ResultCommon}  as FolderObject;
			break;
		case "enum":
			return {type: objtype, common: ResultCommon}  as EnumObject;
			break;
		default:
			return {type: objtype, common: ResultCommon as ioBroker.OtherCommon};
			break;
	}
}