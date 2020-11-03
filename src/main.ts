import { states as Templates } from "./lib/predefined_objects";
import * as Roles from "./lib/roles";
import * as ObjectAttributes from "./lib/object_attributes";
import * as ArrDiff from "fast-array-diff";
// Declaring own interfaces, because existing interfaces in ioBroker extend BaseObject.
// In ioBroker.BaseObject is complete structure in ioBroker described, not only the required Fields for writing to ioBroker
interface iobBaseObject{
	type: string;
	common?: ioBroker.StateCommon|ioBroker.ChannelCommon|ioBroker.DeviceCommon|ioBroker.EnumCommon|ioBroker.OtherCommon;
}

interface iobStateObject extends iobBaseObject{
	type: "state";
	common: ioBroker.StateCommon;
}
interface iobChannelObject extends iobBaseObject{
	type: "channel";
	common: ioBroker.ChannelCommon
}
interface iobDeviceObject extends iobBaseObject{
	type: "device";
	common: ioBroker.DeviceCommon;
}
interface iobFolderObject extends iobBaseObject{
	type: "folder";
	common: ioBroker.OtherCommon;
}
interface iobEnumObject extends iobBaseObject{
	type: "enum";
	common: ioBroker.EnumCommon
}
interface iobOtherObject extends iobBaseObject{
	type: "adapter" | "config" | "group" | "host" | "info" | "instance" | "meta" | "script" | "user" | "chart";
	common: ioBroker.OtherCommon;
}
type iobObjects = iobStateObject | iobChannelObject | iobDeviceObject | iobFolderObject | iobEnumObject | iobOtherObject;

export interface iobObject{
	id: string;
	value?: any;
	object: iobObjects;
}

// Creatable Object Types, taken from objattr because in ioBroker.ObjectType are only state, channel and device defined
type iobObjectTypes = keyof typeof ObjectAttributes.objectTypes;
// Defined roles, taken from roles
type iobRoles = keyof typeof Roles.roles_definition;
// Name of templates
type iobTemplates = keyof typeof Templates;

/**
 * Creates basic state object with name
 * @param {String} id Name of state
 * @param {String} name Display name of state
 * @param {string|boolean|number} value Value of state
 * @returns {iobBaseObject} Returns state with role state and type string
*/
export function makeIOBObj(id: string, name: string, value: any): iobObject;
/**
 * Creates object from template
 * @param {String} id Name of state
 * @param {string} name Display name of object
 * @param {string|boolean|number} value Value of state
 * @param objtype "template"
 * @param {iobTemplates} usetemplate Name of template
 * @returns {iobBaseObject} Returns complete object
*/
export function makeIOBObj(id: string, name: string, value: any, objtype: "template", usetemplate: iobTemplates ): iobObject;
/**
 * Creates object
 * @param {String} id Name of state
 * @param {string} name Display name of object
 * @param {string|boolean|number} value Value of state
 * @param {iobTypes} type Type of object, e.g. state, channel, ...
 * @param {iobRoles} type Role of object, e.g. state, text, json, ...
 * * @returns {iobBaseObject} Returns complete object
*/
export function makeIOBObj(id: string, name: string, value: any, objtype: "state", role: iobRoles): iobObject;
/**
 * Creates object
 * @param {String} id Name of state
 * @param {string} name Display name of object
 * @param {string|boolean|number} value Value of state
 * @param {iobTypes} type Type is state
 * @param {iobRoles} type Role of state is required, e.g. state, text, json, ...
 * @returns {iobBaseObject} Returns complete object
*/
export function makeIOBObj(...args: any[]): iobObject {
	let iobResObject: iobBaseObject;
	switch(args.length){
		case 3:
			// Create basic state object with name
			iobResObject = {"type": "state", common:{ "name": args[1], "role": "state", "read": true, "write": true, "type": "string", "desc": ""}} as iobStateObject;
			break;
		default:
			// Create object based on template
			// args[1] is name of template or name of Type
			if (args[3] === "template" ){
				const usetemplate: iobTemplates = args[4];
				iobResObject = Templates[usetemplate] as iobOtherObject;
			}else{
				iobResObject = createIOBObj(args[3],args[4]);
			}
			if (iobResObject.common){
				iobResObject.common.name  = args[1] || "";
			}
			break;
	}
	// Return correct type
	switch (iobResObject.type){
		case "state":
			if (args[2] === null){
				return { id: args[0], object: iobResObject as iobStateObject};
			}else{
				return { id: args[0], value: args[2], object: iobResObject as iobStateObject};
			}
			break;
		case "channel":
			if (args[2] === null){
				return { id: args[0], object: iobResObject as iobChannelObject};
			}else{
				return { id: args[0], value: args[2], object: iobResObject as iobChannelObject};
			}
			break;
		case "device":
			if (args[2] === null){
				return { id: args[0], object: iobResObject as iobDeviceObject};
			}else{
				return { id: args[0], value: args[2], object: iobResObject as iobDeviceObject};
			}
			break;
		case"folder":
			if (args[2] === null){
				return { id: args[0], object: iobResObject as iobFolderObject};
			}else{
				return { id: args[0], value: args[2], object: iobResObject as iobFolderObject};
			}
			break;
		case "enum":
			if (args[2] === null){
				return { id: args[0], object: iobResObject as iobEnumObject};
			}else{
				return { id: args[0], value: args[2], object: iobResObject as iobEnumObject};
			}
			break;
		default:
			if (args[2] === null){
				return { id: args[0], object: iobResObject as iobOtherObject};
			}else{
				return { id: args[0], value: args[2], object: iobResObject as iobOtherObject};
			}
			break;
	}
}

export function saveIOBObj(_iobObj: Array<iobObject>): boolean{
	return true;
}

export function validateIOBObj(iobObj: iobObject): boolean{
	// Interface for Type Definitions from lib/object_attributes
	interface iobTypeDefinition{
		desc?: string;
		attrMandatory?: Array<string>;
		attrOptional?: Array<string>;
	}
	// Getting Type Definition for current type
	const iobResTemplate: iobTypeDefinition = ObjectAttributes.objectTypes[iobObj.object["type"] as iobObjectTypes];
	if (iobResTemplate.attrMandatory && iobObj.object.common){
		// Verify that all mandatory attributes are included
		const DiffMand = ArrDiff.diff(iobResTemplate.attrMandatory, Object.keys(iobObj.object.common));
		if (DiffMand.removed?.length > 0){
			throw `Mandatory attributes missing: ${DiffMand.removed.join(",")}`
		}
	}
	if (iobObj.object.common && (iobResTemplate.attrOptional || iobResTemplate.attrOptional)){
		// Verify that only mandatory and optional attributes for current type is included
		const DiffAll = ArrDiff.diff(iobResTemplate.attrMandatory?.concat(iobResTemplate.attrOptional) || iobResTemplate.attrOptional, Object.keys(iobObj.object.common));
		if (DiffAll.added?.length > 0){
			throw `Illegal attributes added: ${DiffAll.added.join(",")}`
		}
	}
	return true;
}

export function createIOBObj (objtype: iobObjectTypes, role?: iobRoles): iobBaseObject{
	// Interface for Type Definitions from lib/object_attributes
	interface iobTypeDefinition{
		desc?: string;
		attrMandatory?: Array<string>;
		attrOptional?: Array<string>;
	}
	// Interface for Attribute Definitions from lib/object_attributes
	interface iobAttributeDefinition{
		desc?: string;
		attrType?: string|Array<string>;
		[propName: string]: any;
	}
	// Temporary Interface for building result
	interface iobReturn{
		[propName: string]: any;
	}
	// Type of all valid attributes
	type iobAttributesTotal = keyof typeof ObjectAttributes.commonAttributes;
	// Getting Definition for current type
	const iobResTemplate: iobTypeDefinition = ObjectAttributes.objectTypes[objtype];
	// Temporary result object
	const ResultCommon: iobReturn = {};
	if (iobResTemplate.attrMandatory){
		// Adding mandatory attributes
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
				//Setting type for type attribute
				if (key === "type"){
					ResultCommon[key] = CurrentAttributeType;
				}else{
					// Setting value for key
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
	// If role is defined set role
	if (role && (objtype === "state" || objtype === "channel")){
		ResultCommon["role"] = role;
	}
	// Return correct type
	switch (objtype){
		case "state":
			return {type: objtype, common: ResultCommon}  as iobStateObject;
			break;
		case "channel":
			return {type: objtype, common: ResultCommon}  as iobChannelObject;
			break;
		case "device":
			return {type: objtype, common: ResultCommon}  as iobDeviceObject;
			break;
		case"folder":
			return {type: objtype, common: ResultCommon}  as iobFolderObject;
			break;
		case "enum":
			return {type: objtype, common: ResultCommon}  as iobEnumObject;
			break;
		default:
			return {type: objtype, common: ResultCommon as ioBroker.OtherCommon};
			break;
	}
}