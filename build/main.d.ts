/// <reference types="iobroker" />
import { templates as Templates } from "./lib/predefined_objects";
import * as Roles from "./lib/roles";
import { TemplateObjectDefinition } from "./lib/types";
export interface ObjectWithValue<T extends ioBroker.ObjectType = ioBroker.ObjectType> {
    id: string;
    object: ioBroker.SettableObject & {
        type: T;
    };
    value?: string | number | boolean | ioBroker.State | ioBroker.SettableState | null;
}
declare type ObjectRoles = keyof typeof Roles.roles_definition;
declare type ObjectTemplateNames = keyof typeof Templates;
/** Defines the options for @see makeIOBObj */
export declare type BuildObjectOptions = {
    /** ID of the new object */
    id: string;
    /** Display name of the object */
    name: string;
    /** Description for the object */
    description?: string;
    /** Optional value for the corresponding state */
    value?: string | number | boolean | ioBroker.State | ioBroker.SettableState | null;
} & ({
    objectType?: undefined;
} | {
    /** "template" tells the method to create an object from a template */
    objectType: "template";
    /** The predefined template to use for the object */
    template: ObjectTemplateNames;
} | {
    /** or use the given object type */
    objectType: ioBroker.ObjectType;
    /** The role to use for the object */
    role: ObjectRoles;
});
export declare function buildObject<T extends BuildObjectOptions>(adapterInstance: ioBroker.Adapter, options: T): T extends {
    objectType: "template";
    template: infer U;
} ? (U extends keyof typeof Templates ? ObjectWithValue<(typeof Templates[U])["type"]> : never) : T extends {
    objectType: ioBroker.ObjectType;
} ? ObjectWithValue<T["objectType"]> : ObjectWithValue<"state">;
export declare function validateObject(iobObject: ObjectWithValue): void;
export declare function validateObjectTree(iobObjects: ObjectWithValue[]): void;
export declare type SyncObjectsOptions = {
    /** What to do with existing objects */
    overwriteExisting?: boolean;
} & ({
    /** Ignore objects that are no longer needed */
    removeUnused?: false;
    except?: undefined;
} | {
    /** Remove objects that are no longer needed */
    removeUnused: true;
    /** Object IDs matching this filter are not removed */
    except?: string | string[] | RegExp | ((id: string) => boolean);
});
/**
 * Synchronizes a list of objects into the ioBroker objects DB
 * @param adapterInstance The instance of the current ioBroker adapter
 * @param iobObjects The desired list of objects that should exist after this call
 * @param options Can be used to influence the behavior (overwriting and removing existing objects)
 */
export declare function syncObjects(adapterInstance: ioBroker.Adapter, iobObjects: ObjectWithValue[], options?: SyncObjectsOptions): Promise<void>;
export declare function createTemplateObjectDefinition(objectType: ioBroker.ObjectType, role?: ObjectRoles): TemplateObjectDefinition;
export {};
