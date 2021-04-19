/* eslint-disable @typescript-eslint/indent */
import * as iobObjectHelper from "../main";

//#region Base class
class iobObjectTreeBase{
	public children: Map<string, iobObjectTreeBase>;
	public my: iobObjectHelper.ObjectWithValue | undefined;
	// Eventuell würde es Sinn machen, children als ReadonlyMap zu exportieren, damit sie nur von intern bearbeitet wird
	adapterInstance: ioBroker.Adapter;
	isSyncComplete: boolean;

	constructor(adapterInstance: ioBroker.Adapter) {
		this.adapterInstance = adapterInstance;
        this.children = new Map();
		this.isSyncComplete = false;
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
		options.id = this.ensureNamespace(options.id, this.my?.id);
		const ret = new iobObjectState(this.adapterInstance, obj);
		this.children.set(ret.my.id, ret);
		this.isSyncComplete = false;
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
		options.id = this.ensureNamespace(options.id, this.my?.id);
		const ret = new iobObjectState(this.adapterInstance, obj);
		this.children.set(ret.my.id, ret);
		this.isSyncComplete = false;
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
		options.id = this.ensureNamespace(options.id, this.my?.id);
		const ret = new iobObjectChannel(this.adapterInstance, obj);
		this.children.set(ret.my.id, ret);
		this.isSyncComplete = false;
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
		options.id = this.ensureNamespace(options.id, this.my?.id);
		const ret = new iobObjectFolder(this.adapterInstance, obj);
		this.children.set(ret.my.id, ret);
		this.isSyncComplete = false;
		return ret;
	}
	//#endregion

	//#region Functions
	protected ensureNamespace(objectId: string, baseObjectId = ""): string {
		if (baseObjectId !== ""){
			if (objectId.match(new RegExp("^" + baseObjectId.replace(".", "\\.") + "\\.[^.]*$"))) return objectId;
			if (objectId.match(/^[^.]*$/)) return `${baseObjectId}.${objectId}`;
			throw(`Invalid object id: ${objectId}`);
		}else{
			if (objectId.match(new RegExp("^" + this.adapterInstance.namespace.replace(".", "\\.") + "\\.[^.]*$"))) return objectId;
			if (objectId.match(/^[^.]*$/)) return `${this.adapterInstance.namespace}.${objectId}`;
			throw(`Invalid object id: ${objectId}`);
		}
	}

    flatten(): iobObjectHelper.ObjectWithValue[]{
        const flatten: iobObjectHelper.ObjectWithValue[] = [];
		for (const [, child] of (this.children as Map<string, iobObjectChannel | iobObjectState | iobObjectFolder >).entries()){
			flatten.push(child.my);
			flatten.push(...child.flatten())
		}
		return flatten;
    }

	protected validate(): boolean{
		iobObjectHelper.validateObjectTree(this.flatten());
		return true;
	}

	protected async syncObjectsAsync(options: iobObjectHelper.SyncObjectsOptions): Promise<void>{
		if (this.isSyncComplete === false){
			await iobObjectHelper.syncObjects(this.adapterInstance, this.flatten(), options);
			this.isSyncComplete = true;
			this.setChildrenSyncState(this.children as Map<string, iobObjectChannel | iobObjectState | iobObjectFolder>, true);
		}
	}

	protected setChildrenSyncState(children: Map<string, iobObjectChannel | iobObjectState | iobObjectFolder >, SyncState: boolean): void{
		for (const [, child] of (children).entries()){
			child.isSync = SyncState;
			if (child.children){
				this.setChildrenSyncState(child.children, SyncState);
			}
		}
	}

	protected getTypefromValue(value:any): ioBroker.CommonType|undefined {
		switch (typeof(value)){
			case "object":
				// Handle typeof [] === "object"
				if (Array.isArray(value)){
					return "array";
				// Handle typeof {} === "object"
				}else if(Object.prototype.toString.call(value) === "[object Object]"){
					return "object";
				}
				// typeof null === "object"
				break;
			case "number":
				return "number";
			case "string":
				return "string";
			case "boolean":
				return "boolean";
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
		return super.addState(options);
	}

	// Einschränkung von Template noch notwendig, nicht Device, Channel, Folder
	addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		return super.addStateFromTemplate(options);
	}

	addChannel(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "channel" },
		"objectType"|"template"
		>,
	): iobObjectChannel {
		return super.addChannel(options);
    }

    addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		return super.addFolder(options);
	}

	async syncObjectsAsync(options: iobObjectHelper.SyncObjectsOptions): Promise<void>{
		await super.syncObjectsAsync(options);
	}

	validate(): boolean{
		return super.validate();
	}
}
//#endregion

//#region State class
export class iobObjectState extends iobObjectTreeBase {
	// iobObjectState kann keine Kind-Objekte haben -> never
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	public declare children: Map<string, never>;
	public my: iobObjectHelper.ObjectWithValue<"state">;
	public isSync: boolean;

	constructor(
		adapterInstance: ioBroker.Adapter,
		obj: iobObjectHelper.ObjectWithValue<"state">
	) {
		super(adapterInstance);
		//this.children.set("id", 1); // jetzt wird gemeckert, falls du doch children hinzufügen willst
		this.my = obj;
		this.isSync = false;
	}

	setValue(value: string | number | boolean | ioBroker.State | ioBroker.SettableState | null, ack = false): boolean{
		if (this.getTypefromValue(value) !== this.my.object.common.type){
			throw `Invalid value type, type must be ${this.my.object.common.type}`
		}
		if (this.isSync === false){
			this.my.value = value;
			return true;
		}else{
			this.adapterInstance.setState(this.my.id, { val: value, ack: ack });
			return true;
		}
	}

	async setValueAsync(value: string | number | boolean | ioBroker.State | ioBroker.SettableState | null, ack = false): Promise<boolean>{
		if (this.getTypefromValue(value) !== this.my.object.common.type){
			throw `Invalid value type, type must be ${this.my.object.common.type}`
		}
		if (this.isSync === false){
			this.my.value = value;
			return true;
		}else{
			await this.adapterInstance.setStateAsync(this.my.id, { val: value, ack: ack });
			return true;
		}
	}
}
//#endregion

//#region Channel class
export class iobObjectChannel extends iobObjectTreeBase {
	// iobObjectChannel kann Channel und States als Kinder haben
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	public declare children: Map<string, iobObjectChannel | iobObjectState | iobObjectFolder>;
	public my: iobObjectHelper.ObjectWithValue<"channel">;
	public isSync: boolean;

	constructor(
		adapterInstance: ioBroker.Adapter,
		obj: iobObjectHelper.ObjectWithValue<"channel">
	) {
		super(adapterInstance);
		//this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
		this.my = obj;
		this.isSync = false;
		//this.children = new Map();
    }

    addState(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "state" },
		"objectType"
		>,
	): iobObjectState {
		return super.addState({...options, id: `${this.my.id}.${options.id}`});
	}

	addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		return super.addStateFromTemplate({...options, id: `${this.my.id}.${options.id}`});
    }

    addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		return super.addFolder({...options, id: `${this.my.id}.${options.id}`});
	}
}
//#endregion

//#region  Folder class
export class iobObjectFolder extends iobObjectTreeBase {
	// iobObjectFolder kann Folder und States als Kinder haben
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	public declare children: Map<string, iobObjectFolder | iobObjectState>;
	public my: iobObjectHelper.ObjectWithValue<"folder">;
	public isSync: boolean;

	constructor(
		adapterInstance: ioBroker.Adapter,
		obj: iobObjectHelper.ObjectWithValue<"folder">
	) {
		super(adapterInstance);
		//this.children.set("id", (undefined as any) as iobObjectChannel); // Kleiner Hack, um zu demonstrieren dass man Channel hinzufügen kann
		this.my = obj;
		this.isSync = false;
		//this.children = new Map();
    }

    addState(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "state" },
		"objectType"
		>,
	): iobObjectState {
		return super.addState({...options, id: `${this.my.id}.${options.id}`});
	}

	addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		return super.addStateFromTemplate({...options, id: `${this.my.id}.${options.id}`});
    }

    addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		return super.addFolder({...options, id: `${this.my.id}.${options.id}`});
	}
}
//#endregion