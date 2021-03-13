/// <reference types="iobroker" />
import * as iobObjectHelper from "../main";
declare class iobObjectTreeBase {
    children: Map<string, iobObjectTreeBase>;
    adapterInstance: ioBroker.Adapter;
    isSyncComplete: boolean;
    constructor(adapterInstance: ioBroker.Adapter);
    protected addState(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "state";
    }, "objectType">): iobObjectState;
    protected addStateFromTemplate(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
    }, "objectType">): iobObjectState;
    protected addChannel(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
        template: "channel";
    }, "objectType" | "template">): iobObjectChannel;
    protected addFolder(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
        template: "folder";
    }, "objectType" | "template">): iobObjectFolder;
    protected ensureNamespace(objectId: string, baseObjectId?: string): string;
    flatten(): iobObjectHelper.ObjectWithValue[];
    protected validate(): boolean;
    protected syncObjectsAsync(options: iobObjectHelper.SyncObjectsOptions): Promise<void>;
    protected getTypefromValue(value: any): ioBroker.CommonType | undefined;
}
export declare class iobObjectTree extends iobObjectTreeBase {
    children: Map<string, iobObjectTreeBase>;
    adapterInstance: ioBroker.Adapter;
    constructor(adapterInstance: ioBroker.Adapter);
    addState(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "state";
    }, "objectType">): iobObjectState;
    addStateFromTemplate(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
    }, "objectType">): iobObjectState;
    addChannel(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
        template: "channel";
    }, "objectType" | "template">): iobObjectChannel;
    addFolder(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
        template: "folder";
    }, "objectType" | "template">): iobObjectFolder;
    syncObjectsAsync(options: iobObjectHelper.SyncObjectsOptions): Promise<void>;
    validate(): boolean;
}
export declare class iobObjectState extends iobObjectTreeBase {
    children: Map<string, never>;
    my: iobObjectHelper.ObjectWithValue<"state">;
    isSync: boolean;
    constructor(adapterInstance: ioBroker.Adapter, obj: iobObjectHelper.ObjectWithValue<"state">);
    setValue(value: string | number | boolean | ioBroker.State | ioBroker.SettableState | null, ack?: boolean): boolean;
    setValueAsync(value: string | number | boolean | ioBroker.State | ioBroker.SettableState | null, ack?: boolean): Promise<boolean>;
}
export declare class iobObjectChannel extends iobObjectTreeBase {
    children: Map<string, iobObjectChannel | iobObjectState | iobObjectFolder>;
    my: iobObjectHelper.ObjectWithValue<"channel">;
    isSync: boolean;
    constructor(adapterInstance: ioBroker.Adapter, obj: iobObjectHelper.ObjectWithValue<"channel">);
    addState(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "state";
    }, "objectType">): iobObjectState;
    addStateFromTemplate(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
    }, "objectType">): iobObjectState;
    addFolder(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
        template: "folder";
    }, "objectType" | "template">): iobObjectFolder;
}
export declare class iobObjectFolder extends iobObjectTreeBase {
    children: Map<string, iobObjectFolder | iobObjectState>;
    my: iobObjectHelper.ObjectWithValue<"folder">;
    isSync: boolean;
    constructor(adapterInstance: ioBroker.Adapter, obj: iobObjectHelper.ObjectWithValue<"folder">);
    addState(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "state";
    }, "objectType">): iobObjectState;
    addStateFromTemplate(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
    }, "objectType">): iobObjectState;
    addFolder(options: Omit<iobObjectHelper.BuildObjectOptions & {
        objectType: "template";
        template: "folder";
    }, "objectType" | "template">): iobObjectFolder;
}
export {};
