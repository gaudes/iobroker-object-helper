import { templates as Templates } from "./lib/predefined_objects";
import * as Roles from "./lib/roles";
import * as ObjectAttributes from "./lib/object_attributes";
import { CommonAttributes, CommonAttributeSchema, ObjectTypes, TemplateObjectDefinition } from "./lib/types";
import * as util from "util";
import cloneDeep from "clone-deep";

export interface ObjectWithValue {
	id: string;
	object: ioBroker.SettableObject;
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
		objectType: ObjectTypes,
		/** The role to use for the object */
		role: ObjectRoles,
	}
)

function ensureNamespace(namespace: string, objectId: string): string {
	if (objectId.startsWith(`${namespace}.`)) return objectId;
	return `${namespace}.${objectId}`;
}

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
	if (options.description != undefined && definition.type !== "device" && definition.type !== "enum") {
		definition.common.desc = options.description;
	}

	const ret: ObjectWithValue = {
		id: ensureNamespace(adapterInstance.namespace, options.id),
		object: { ...definition, native: {} },
	};
	if (options.value !== undefined) {
		ret.value = options.value;
	}
	return ret;
}

export function validateObjectTree(iobObjects: ObjectWithValue[]): void {
	// Sort by ID
	iobObjects.sort(function(a, b){
		return (a.id.split(".").length - b.id.split(".").length) || a.id.localeCompare(b.id);
	})
	// Verfify all sub-states have a superior device, channel or folder
	// Foreach sub-state (. in id)
	iobObjects.filter(item => item.object.type.split(".").length > 0).filter(item => item.object.type === "state").forEach(iobObj => {
		const iobIDPath = iobObj.id.split(".");
		if (iobIDPath.length > 0){
			// Remove last element (=name of state)
			iobIDPath.pop();
			let iobIDBasePath = "";
			iobIDPath.forEach(iobIDName =>{
				if (iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).length > 1){
					throw `Duplicated object ${iobIDBasePath}${iobIDName} defined`
				}else{
					if (iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).length === 0){
						throw `No superior object declared for ${iobIDPath.join(".")}`
					}
					iobObjects.filter(item => item.id === `${iobIDBasePath}${iobIDName}`).forEach(iobObj =>{
						if ((iobObj.object.type === "device" || iobObj.object.type === "channel" || iobObj.object.type === "folder") === false){
							throw `No correct superior object declared for ${iobIDPath.join(".")}`
						}
					})
				}
				iobIDBasePath = `${iobIDBasePath}${iobIDName}.`;
			})
		}
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

export function createTemplateObjectDefinition(objectType: ObjectTypes, role?: ObjectRoles): TemplateObjectDefinition {
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
	return {
		type: objectType,
		common: objectCommon as any
	};
}