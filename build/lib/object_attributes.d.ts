/// <reference types="iobroker" />
import { ObjectCommonSchema } from "./types";
declare type ValidatedCommonSchema<T extends Record<keyof T, any>> = {
    [key in Exclude<ioBroker.ObjectType, keyof T>]: ObjectCommonSchema<ioBroker.AnyObject & {
        type: key;
    }>;
} & {
    [key in keyof T]: key extends ioBroker.ObjectType ? ObjectCommonSchema<ioBroker.AnyObject & {
        type: key;
    }> & T[key] : "ERROR: This object type does not exist in the type definitions";
};
export declare const objectCommonSchemas: ValidatedCommonSchema<{
    state: {
        desc: string;
        attrMandatory: string[];
        attrOptional: string[];
    };
    channel: {
        desc: string;
        attrMandatory: string[];
        attrOptional: string[];
    };
    device: {
        desc: string;
        attrMandatory: string[];
    };
    folder: {
        desc: string;
        attrMandatory: string[];
    };
    enum: {
        desc: string;
        attrMandatory: string[];
    };
    host: {
        desc: string;
        attrMandatory: string[];
        attrOptional: never[];
    };
    adapter: {
        desc: string;
        attrMandatory: string[];
        attrOptional: string[];
    };
    instance: {
        desc: string;
        attrMandatory: string[];
    };
    meta: {
        desc: string;
    };
    config: {
        desc: string;
    };
    script: {
        desc: string;
        attrMandatory: string[];
        attrOptional: string[];
    };
    user: {
        desc: string;
        attrMandatory: string[];
    };
    group: {
        desc: string;
        attrMandatory: string[];
        attrOptional: never[];
    };
    chart: {
        desc: string;
    };
}>;
export declare const commonAttributes: {
    type: {
        desc: string;
        type: ("string" | "number" | "boolean" | "array" | "object" | "mixed" | "file")[];
        attrType: "string";
    };
    name: {
        desc: string;
        attrType: "string";
    };
    min: {
        desc: string;
        type: "number";
        write: true;
        attrType: "number";
    };
    max: {
        desc: string;
        type: "number";
        write: true;
        attrType: "number";
    };
    step: {
        desc: string;
        type: "number";
        write: true;
        attrType: "number";
    };
    unit: {
        desc: string;
        type: "number";
        attrType: "string";
    };
    defAck: {
        desc: string;
        attrType: "boolean";
    };
    desc: {
        desc: string;
        attrType: "string";
    };
    read: {
        desc: string;
        attrType: "boolean";
    };
    write: {
        desc: string;
        attrType: "boolean";
    };
    role: {
        desc: string;
        attrType: "string";
    };
    states: {
        desc: string;
        attrType: "object";
    };
    workingID: {
        desc: string;
        type: "string";
        attrType: "string";
    };
    custom: {
        desc: string;
        attrType: "object";
    };
    members: {
        desc: string;
        attrType: "array";
    };
    icon: {
        desc: string;
        attrType: "string";
    };
};
export {};
