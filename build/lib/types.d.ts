/// <reference types="iobroker" />
declare type TemplateObjectWorker<T extends ioBroker.AnyObject> = T extends ioBroker.AnyObject ? Pick<T, "type" | "common"> : never;
export declare type TemplateObjectDefinition = TemplateObjectWorker<ioBroker.AnyObject>;
/** Defines the mandatory and optional common attributes of an ioBroker object */
export interface ObjectCommonSchema<T extends ioBroker.AnyObject> {
    /** Human-readable description what this object type does */
    desc?: string;
    attrMandatory?: (keyof T["common"])[];
    attrOptional?: (keyof T["common"])[];
}
declare type CommonKeysOfUnion<T extends {
    type: string;
    common: Record<string, any>;
}> = {
    [P in T["type"]]: Extract<keyof (T & {
        type: P;
    })["common"], string>;
};
declare type StripStringType<T extends Record<string, any>> = {
    [K in keyof T]: string extends T[K] ? never : T[K];
};
declare type IoBrokerCommonAttributesDict = StripStringType<CommonKeysOfUnion<ioBroker.AnyObject>>;
/** All obj.common attributes that are defined in the type declarations */
export declare type CommonAttributes = IoBrokerCommonAttributesDict[keyof IoBrokerCommonAttributesDict];
export declare type JSType = "string" | "number" | "boolean" | "array" | "object";
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
export {};
