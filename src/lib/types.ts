// This combination of types defines the possible shapes of the template objects based on what the ioBroker type definitions offer us
type TemplateObjectWorker<T extends ioBroker.AnyObject> = T extends ioBroker.AnyObject ? Pick<T, "type" | "common"> : never;
export type TemplateObjectDefinition = TemplateObjectWorker<ioBroker.AnyObject>;

/** Defines the mandatory and optional common attributes of an ioBroker object */
export interface ObjectCommonSchema<T extends ioBroker.AnyObject> {
	/** Human-readable description what this object type does */
	desc?: string;
	attrMandatory?: (keyof T["common"])[];
	attrOptional?: (keyof T["common"])[];
}

// These types take all defined ioBroker object types and extract all possible common attributes
type CommonKeysOfUnion<T extends {type: string, common: Record<string, any>}> = {
	[P in T["type"]]: Extract<keyof (T & {type: P})["common"], string>;
}
type StripStringType<T extends Record<string, any>> = {
	[K in keyof T]: string extends T[K] ? never : T[K]
}
type IoBrokerCommonAttributesDict = StripStringType<CommonKeysOfUnion<ioBroker.AnyObject>>
/** All obj.common attributes that are defined in the type declarations */
export type CommonAttributes = IoBrokerCommonAttributesDict[keyof IoBrokerCommonAttributesDict];

export type JSType = "string" | "number" | "boolean" | "array" | "object";

export interface CommonAttributeSchema {
	/** Human-readable description what this attribute does */
	desc?: string;
	/** The common.type(s) of objects this attribute definition can be applied to */
	type?: ioBroker.CommonType | ioBroker.CommonType[];
	/** The type of this attribute's value */
	attrType: "string" | "number" | "boolean" | "array" | "object";
	write?: boolean;
}

export interface RoleSchema {
	desc: string;
	type?: ioBroker.CommonType | ioBroker.CommonType[];
	read: boolean;
	write: boolean;
	unit?: string | string[];
	states?: Record<number, string>;
	min?: number;
	max?: number;
}