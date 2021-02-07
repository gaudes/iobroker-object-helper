/// <reference types="iobroker" />
import * as iobObjectHelper from "../main";
declare class iobObjectTreeBase {
    children: Map<string, iobObjectTreeBase>;
    adapterInstance: ioBroker.Adapter;
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
    logChildren(): void;
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
}
export declare class iobObjectState extends iobObjectTreeBase {
    my: iobObjectHelper.ObjectWithValue<"state">;
    constructor(adapterInstance: ioBroker.Adapter, obj: iobObjectHelper.ObjectWithValue<"state">);
}
export declare class iobObjectChannel extends iobObjectTreeBase {
    my: iobObjectHelper.ObjectWithValue<"channel">;
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
    my: iobObjectHelper.ObjectWithValue<"folder">;
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
