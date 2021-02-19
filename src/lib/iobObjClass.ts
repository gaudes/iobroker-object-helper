/* eslint-disable @typescript-eslint/indent */
import * as iobObjectHelper from "../main";

//#endregion Base class
class iobObjectTreeBase{
	public children: Map<string, iobObjectTreeBase>;
	// Eventuell würde es Sinn machen, children als ReadonlyMap zu exportieren, damit sie nur von intern bearbeitet wird
	adapterInstance: ioBroker.Adapter;
	isSync: boolean;

	constructor(adapterInstance: ioBroker.Adapter) {
		this.adapterInstance = adapterInstance;
        this.children = new Map();
		this.isSync = false;
    }

	//#region State functions
    protected addState(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "state" },
		"objectType"
		>,
	): iobObjectState {
		// Build object
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "state",
		});
		// Verify object tree with new object
		const flatten = this.flatten();
		flatten.push(obj);
		iobObjectHelper.validateObjectTree(flatten);
		// On success return object
		const ret = new iobObjectState(this.adapterInstance, obj);
		this.isSync = false;
		return ret;
	}

    protected addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		// Build object
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "template",
		}) as iobObjectHelper.ObjectWithValue<"state">;
		// Verify object tree with new object
		const flatten = this.flatten();
		flatten.push(obj);
		iobObjectHelper.validateObjectTree(flatten);
		// On success return object
		const ret = new iobObjectState(this.adapterInstance, obj);
		this.isSync = false;
		return ret;
	}
	//#endregion

	//#region Channel functions
    protected addChannel(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "channel" },
		"objectType"|"template"
		>,
	): iobObjectChannel {
		// Build object
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "template",
			template: "channel"
		}) as iobObjectHelper.ObjectWithValue<"channel">;
		// Verify object tree with new object
		const flatten = this.flatten();
		flatten.push(obj);
		iobObjectHelper.validateObjectTree(flatten);
		// On success return object
		const ret = new iobObjectChannel(this.adapterInstance, obj);
		this.isSync = false;
		return ret;
    }
	//#endregion

	//#region Folder functions
    protected addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		// Build object
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "template",
			template: "folder"
		}) as iobObjectHelper.ObjectWithValue<"folder">;
		// Verify object tree with new object
		const flatten = this.flatten();
		flatten.push(obj);
		iobObjectHelper.validateObjectTree(flatten);
		// On success return object
		const ret = new iobObjectFolder(this.adapterInstance, obj);
		this.isSync = false;
		return ret;
	}
	//#endregion

	//#region Functions
    flatten(): iobObjectHelper.ObjectWithValue[]{
        const flatten: iobObjectHelper.ObjectWithValue[] = [];
		for (const [, child] of (this.children as Map<string, iobObjectChannel | iobObjectState | iobObjectFolder >).entries()){
			flatten.push(child.my);
			flatten.push(...child.flatten())
		}
		return flatten;
    }

	protected async syncObjects(options: iobObjectHelper.SyncObjectsOptions): Promise<void>{
		if (this.isSync === false){
			await iobObjectHelper.syncObjects(this.adapterInstance, this.flatten(), options);
			this.isSync = true;
		}
	}
	//#endregion
}
//#endregion

//#region Exported Level0 class
export class iobObjectTree extends iobObjectTreeBase{
	public children: Map<string, iobObjectTreeBase>;
	// Eventuell würde es Sinn machen, children als ReadonlyMap zu exportieren, damit sie nur von intern bearbeitet wird
	adapterInstance: ioBroker.Adapter;

	constructor(
		adapterInstance: ioBroker.Adapter
	) {
		super(adapterInstance);
        this.adapterInstance = adapterInstance;
        this.children = new Map();
	}

	addState(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "state" },
		"objectType"
		>,
	): iobObjectState {
		const ret = super.addState(options);
        this.children.set(ret.my.id, ret);
		return ret;
	}

	// Einschränkung von Template noch notwendig, nicht Device, Channel, Folder
	addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		const ret = super.addStateFromTemplate(options);
        this.children.set(ret.my.id, ret);
		return ret;
	}

	addChannel(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "channel" },
		"objectType"|"template"
		>,
	): iobObjectChannel {
		const ret = super.addChannel(options);
        this.children.set(ret.my.id, ret);
		return ret;
    }

    addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		const ret = super.addFolder(options);
        this.children.set(ret.my.id, ret);
		return ret;
	}
	async syncObjects(options: iobObjectHelper.SyncObjectsOptions): Promise<void>{
		await super.syncObjects(options);
	}
}
//#endregion

//#region State class
export class iobObjectState extends iobObjectTreeBase {
	// iobObjectState kann keine Kind-Objekte haben -> never
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	public declare children: Map<string, never>;
	public my: iobObjectHelper.ObjectWithValue<"state">;

	constructor(
		adapterInstance: ioBroker.Adapter,
		obj: iobObjectHelper.ObjectWithValue<"state">
	) {
		super(adapterInstance);
		//this.children.set("id", 1); // jetzt wird gemeckert, falls du doch children hinzufügen willst
		this.my = obj;
	}
}
//#endregion

//#region Channel class
export class iobObjectChannel extends iobObjectTreeBase {
	// iobObjectChannel kann Channel und States als Kinder haben
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	public declare children: Map<string, iobObjectChannel | iobObjectState | iobObjectFolder>;
	public my: iobObjectHelper.ObjectWithValue<"channel">;

	constructor(
		adapterInstance: ioBroker.Adapter,
		obj: iobObjectHelper.ObjectWithValue<"channel">
	) {
		super(adapterInstance);
		//this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
		this.my = obj;
		//this.children = new Map();
    }

    addState(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "state" },
		"objectType"
		>,
	): iobObjectState {
		const ret = super.addState(options);
        this.children.set(ret.my.id, ret);
		return ret;
	}

	addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		const ret = super.addStateFromTemplate(options);
        this.children.set(ret.my.id, ret);
		return ret;
    }

    addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		const ret = super.addFolder(options);
        this.children.set(ret.my.id, ret);
		return ret;
	}
}
//#endregion

//#region  Folder class
export class iobObjectFolder extends iobObjectTreeBase {
	// iobObjectFolder kann Folder und States als Kinder haben
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	public declare children: Map<string, iobObjectFolder | iobObjectState>;
	public my: iobObjectHelper.ObjectWithValue<"folder">;

	constructor(
		adapterInstance: ioBroker.Adapter,
		obj: iobObjectHelper.ObjectWithValue<"folder">
	) {
		super(adapterInstance);
		//this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
		this.my = obj;
		//this.children = new Map();
    }

    addState(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "state" },
		"objectType"
		>,
	): iobObjectState {
		const ret = super.addState(options);
        this.children.set(ret.my.id, ret);
		return ret;
	}

	addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		const ret = super.addStateFromTemplate(options);
        this.children.set(ret.my.id, ret);
		return ret;
    }

    addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		const ret = super.addFolder(options);
        this.children.set(ret.my.id, ret);
		return ret;
	}
}
//#endregion