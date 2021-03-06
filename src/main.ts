import { templates as Templates } from "./lib/predefined_objects";
import * as Roles from "./lib/roles";
import * as ObjectAttributes from "./lib/object_attributes";
import { CommonAttributes, CommonAttributeSchema, TemplateObjectDefinition, RoleSchema } from "./lib/types";
import * as util from "util";
import cloneDeep from "clone-deep";

export interface ObjectWithValue<T extends ioBroker.ObjectType = ioBroker.ObjectType> {
	id: string;
	object: ioBroker.SettableObject & {type: T};
	value?: string | number | boolean | ioBroker.State | ioBroker.SettableState | null;
}

// Defined roles, taken from roles
type ObjectRoles = keyof typeof Roles.roles_definition;
// Name of templates
type ObjectTemplateNames = keyof typeof Templates;

/** Defines the options for @see makeIOBObj */
export type BuildObjectOptions = {
	/** ID of the new object */
	id: string;
	/** Display name of the object */
	name: string;
	/** Description for the object */
	description?: string;
	/** Optional value for the corresponding state */
	value?: string | number | boolean | ioBroker.State | ioBroker.SettableState | null;
} & (
	| { objectType?: undefined } // no extra options
	| {
		/** "template" tells the method to create an object from a template */
		objectType: "template",
		/** The predefined template to use for the object */
		template: ObjectTemplateNames,
	}
	| {
		/** or use the given object type */
		objectType: ioBroker.ObjectType,
		/** The role to use for the object */
		role: ObjectRoles,
	}
)

function ensureNamespace(namespace: string, objectId: string): string {
	if (objectId.startsWith(`${namespace}.`)) return objectId;
	return `${namespace}.${objectId}`;
}

function getTypefromValue(value:any): ioBroker.CommonType|undefined {
	switch (typeof(value)){
		case "object":
			// Handle typeof [] === "object"
			if (Array.isArray(value)){
				return "array";
			// Handle typeof {} === "object"
			}else if(Object.prototype.toString.call(value) === "[object Object]"){
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

function selectTypefromArray(value: any, AllowedTypes: ioBroker.CommonType[]): ioBroker.CommonType{
	const TypeOfValue = getTypefromValue(value) as ioBroker.CommonType;
	if (AllowedTypes.includes(TypeOfValue)){
		return TypeOfValue;
	}else{
		throw `Invalid type ${TypeOfValue || typeof(value)} of value ${value} for allowed types ${AllowedTypes.join(",")} `;
	}
}

// Shadow the implementation signature. If we used this complex type on the implemantation, we would have to deal with
// many type assertions
export function buildObject<T extends BuildObjectOptions>(
	adapterInstance: ioBroker.Adapter, options: T
): T extends { objectType: "template", template: infer U } ? (U extends keyof typeof Templates ? ObjectWithValue<(typeof Templates[U])["type"]> : never)
	: T extends { objectType: ioBroker.ObjectType } ? ObjectWithValue<T["objectType"]>
		: ObjectWithValue<"state">;

export function buildObject(adapterInstance: ioBroker.Adapter, options: BuildObjectOptions): ObjectWithValue {
	let definition: TemplateObjectDefinition;
	if (options.objectType != undefined) {
		if (options.objectType === "template") {
			// Use a predefined template
			definition = cloneDeep(Templates[options.template]);
		} else {
			// Create a new object from the given options
			definition = createTemplateObjectDefinition(options.objectType, options.role);
		}
		definition.common.name = options.name || "";
	} else {
		// Create basic state object with name
		definition = {
			type: "state",
			common: { "name": options.name, "role": "state", "read": true, "write": true, "type": "string", "desc": "" }
		}
	}
	if (
		options.description != undefined && (
			definition.type === "state"
			|| definition.type === "channel")
	) {
		definition.common.desc = options.description;
	}
	// The templates may contain arrays for some values that are no arrays in ioBroker.
	// We find them and pin them to a single value.
	if (definition.type === "state"){
		if (Array.isArray(definition.common.type)){
			if (options.value != null){
				definition.common.type = selectTypefromArray(options.value, definition.common.type)
			}else{
				definition.common.type = definition.common.type[0];
			}
		}
		if (Array.isArray(definition.common.unit)){
			definition.common.unit = definition.common.unit[0];
		}
	}

	// Turn off object type validation here - we know what we're doing
	const ret: ObjectWithValue<any> = {
		id: ensureNamespace(adapterInstance.namespace, options.id),
		// Some object types have required properties on `native`
		// Since we're not creating them, disable that check
		object: { ...definition, native: {} as any },
	};
	if (options.value !== undefined) {
		ret.value = options.value;
	}
	return ret;
}

export function validateObject(iobObject: ObjectWithValue): void{
	// Verifying unit on states
	if (iobObject.object.type === "state" && iobObject.object.common.role && iobObject.object.common.unit){
		// Cast iobObject.object.common as StateCommon
		const iobObjectCommon = iobObject.object.common as ioBroker.StateCommon;
		// Get RoleDefinition
		const RoleDefinition = (Roles.roles_definition as Record<string, RoleSchema>)[iobObjectCommon.role];
		if (RoleDefinition.unit){
			if (RoleDefinition.unit === "forbidden" && iobObjectCommon.unit){
				throw `Unit is forbidden in Role ${iobObjectCommon.role} at State with ID ${iobObject.id}`;
			}
			if (!Array.isArray(RoleDefinition.unit) && RoleDefinition.unit !== iobObjectCommon.unit){
				throw `Only Unit ${RoleDefinition.unit} is allowed in Role ${iobObjectCommon.role} at State with ID ${iobObject.id}`;
			}
			if (Array.isArray(RoleDefinition.unit) && !RoleDefinition.unit.some(item => item === iobObjectCommon.unit)){
				throw `Only Units ${RoleDefinition.unit.join(",")} are allowed in Role ${iobObjectCommon.role} at State with ID ${iobObject.id}`;
			}
		}
	}
}

export function validateObjectTree(iobObjects: ObjectWithValue[]): void {
	// Sort by ID
	iobObjects.sort(function(a, b){
		return (a.id.split(".").length - b.id.split(".").length) || a.id.localeCompare(b.id);
	})
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
		iobIDPath.forEach(iobIDName =>{
			// First lets check that there is no duplicted object with that name
			// For example: a state with id adapter.0.folder.name and another state or folder with the same id
			// Therefore we're checking if the complete object array has more than one element with that id
			if (iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).length > 1){
				throw `Duplicated object ${iobIDBasePath}${iobIDName} defined`
			}else{
				// Checking if a superior object is defined
				// When iterating ['adapter', '0', 'folder'], we must check only at Depth >= 2 and not adapter or 0
				// Then we check that adapter.0.folder is defined as id in the complete object array
				if (CountPathDepth >= 2 && !iobObjects.some(item => item.id === `${iobIDBasePath}${iobIDName}`)){
					throw `No superior object declared for ${iobIDPath.join(".")}`
				}
				// Ok, superior object is defined. But the superior object muste be device, channel or folder, not a state for example
				// Due to filter on the superior object we don't get into foreach for adapter or 0
				// For adapter.0.folder we get the above checked for exist superior object
				// Now finally verify that this superior object has the correct type
				iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).forEach(iobObj =>{
					if ((iobObj.object.type === "device" || iobObj.object.type === "channel" || iobObj.object.type === "folder") === false){
						throw `No correct superior object declared for ${iobIDPath.join(".")}`
					}
				})
			}
			// Extend Base Path, e.g. from "" to "adapter.", then from "adapter." to "adapter.0., then...."
			iobIDBasePath = `${iobIDBasePath}${iobIDName}.`;
			// PathDepth Counter + 1 (adapter = 0, 0 = 1, folder = 2, ...)
			CountPathDepth++;
		})
	})
}

export type SyncObjectsOptions = {
	/** What to do with existing objects */
	overwriteExisting?: boolean;
} & (
	| {
		/** Ignore objects that are no longer needed */
		removeUnused?: false;
		except?: undefined;
	}
	| {
		/** Remove objects that are no longer needed */
		removeUnused: true;
		/** Object IDs matching this filter are not removed */
		except?: string | string[] | RegExp | ((id: string) => boolean);
	}
)

/**
 * Synchronizes a list of objects into the ioBroker objects DB
 * @param adapterInstance The instance of the current ioBroker adapter
 * @param iobObjects The desired list of objects that should exist after this call
 * @param options Can be used to influence the behavior (overwriting and removing existing objects)
 */
export async function syncObjects(adapterInstance: ioBroker.Adapter, iobObjects: ObjectWithValue[], options: SyncObjectsOptions = {}): Promise<void> {
	// Parse options and choose defaults
	const { overwriteExisting = false, removeUnused = false, except } = options;

	// Validate objects
	iobObjects.forEach(iobObject =>{
		validateObject(iobObject);
	});

	// Ensure that the entire object tree is complete and no intermediate objects are missing
	validateObjectTree(iobObjects);

	// Find out which objects are new, which are going to be overwritten and which might need to be deleted
	const existingObjects = Object.values(await adapterInstance.getAdapterObjectsAsync());
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
		const shouldKeep: (id: string) => boolean = !except ? () => true
			: typeof except === "string" ? (id) => id === except
				: Array.isArray(except) ? (id) => except.includes(id)
					: util.types.isRegExp(except) ? (id) => except.test(id)
						: typeof except === "function" ? (id) => except(id)
							: () => true;

		for (const id of unusedIDs) {
			if (!shouldKeep(id)) await adapterInstance.delObjectAsync(id);
		}
	}

	// Create new objects (and update existing if desired)
	for (const obj of iobObjects) {
		if (!overwriteExisting) {
			await adapterInstance.setObjectNotExistsAsync(obj.id, obj.object);
		} else {
			await adapterInstance.setObjectAsync(obj.id, obj.object);
		}
		if (obj.value !== undefined) {
			await adapterInstance.setStateAsync(obj.id, { val: obj.value, ack: true });
		}
	}
}

export function createTemplateObjectDefinition(objectType: ioBroker.ObjectType, role?: ObjectRoles): TemplateObjectDefinition {
	// Getting Definition for current type
	const iobResTemplate = ObjectAttributes.objectCommonSchemas[objectType];
	// Temporary result object
	let objectCommon: Record<string, any> = {} ;
	if (iobResTemplate.attrMandatory) {
		// Adding mandatory attributes
		for (const attrName of iobResTemplate.attrMandatory as CommonAttributes[]) {
			// @ts-expect-error While the common attributes are not without error, this won't work
			const attrDefinition: CommonAttributeSchema = ObjectAttributes.commonAttributes[attrName];
			// Take first or single attrType, check for further attributes
			if (attrDefinition.attrType) {
				// If an attribute type is defined, create a property with the correct type
				let defaultAttributeType: string;
				if (Array.isArray(attrDefinition.attrType)) {
					defaultAttributeType = attrDefinition.attrType[0];
				} else {
					defaultAttributeType = attrDefinition.attrType;
				}
				//Setting type for type attribute
				if (attrName === "type") {
					objectCommon[attrName] = defaultAttributeType;
				} else {
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
		objectCommon = {
			...objectCommon,
			role,
			...Roles.roles_definition[role],
		};
	}
	// Remove unit:forbidden
	if (objectCommon.unit === "forbidden"){
		delete objectCommon.unit;
	}
	return {
		type: objectType,
		common: objectCommon as any
	};
}
