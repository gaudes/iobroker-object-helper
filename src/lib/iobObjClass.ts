/* eslint-disable @typescript-eslint/indent */
import * as iobObjectHelper from "../main";

const globalchildren: Map<string, any> = new Map();

class iobObjectTreeBase{
	public children: Map<string, iobObjectTreeBase>;
	// Eventuell würde es Sinn machen, children als ReadonlyMap zu exportieren, damit sie nur von intern bearbeitet wird
	adapterInstance: ioBroker.Adapter;

	constructor(adapterInstance: ioBroker.Adapter) {
		this.adapterInstance = adapterInstance;
        this.children = new Map();
    }

    protected addState(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "state" },
		"objectType"
		>,
	): iobObjectState {
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "state",
		});
		const ret = new iobObjectState(this.adapterInstance, obj);
        globalchildren.set(obj.id, ret);
		return ret;
	}

    protected addStateFromTemplate(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template" },
		"objectType"
		>,
	): iobObjectState {
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "template",
		}) as iobObjectHelper.ObjectWithValue<"state">;
		const ret = new iobObjectState(this.adapterInstance, obj);
        globalchildren.set(obj.id, obj);
		return ret;
	}

    protected addChannel(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "channel" },
		"objectType"|"template"
		>,
	): iobObjectChannel {
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "template",
			template: "channel"
		}) as iobObjectHelper.ObjectWithValue<"channel">;
		const ret = new iobObjectChannel(this.adapterInstance, obj);
        globalchildren.set(obj.id, ret);
		return ret;
    }

    protected addFolder(
		options: Omit<
		iobObjectHelper.BuildObjectOptions & { objectType: "template", template: "folder" },
		"objectType"|"template"
		>,
	): iobObjectFolder {
		const obj = iobObjectHelper.buildObject(this.adapterInstance, {
			...options,
			objectType: "template",
			template: "folder"
		}) as iobObjectHelper.ObjectWithValue<"folder">;
		const ret = new iobObjectFolder(this.adapterInstance, obj);
        globalchildren.set(obj.id, ret);
		return ret;
	}

    logChildren():void{
        console.log(globalchildren);
    }
}

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
}

export class iobObjectState extends iobObjectTreeBase {
	// iobObjectState kann keine Kind-Objekte haben -> never
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	//public declare children: Map<string, never>;
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

export class iobObjectChannel extends iobObjectTreeBase {
	// iobObjectChannel kann Channel und States als Kinder haben
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	//public declare children: Map<string, iobObjectChannel | iobObjectState>;
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

export class iobObjectFolder extends iobObjectTreeBase {
	// iobObjectFolder kann Folder und States als Kinder haben
	// declare überschreibt hier nur den Typ und definiert keine neue Eigenschaft
	//public declare children: Map<string, iobObjectChannel | iobObjectState>;
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