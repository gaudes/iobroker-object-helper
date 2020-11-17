// This file is a playground to test the function signatures

import { buildObject } from "./main";

const iobObj1 = buildObject(undefined as any, {
	id: "statistics.total_distance_meter",
	name: "total_distance_meter",
	value: "test",
	objectType: "state",
	role: "value",
	description: "Total distance in meters",
});
iobObj1.object.common.unit = "m";

const iobObj2 = buildObject(undefined as any, {
	id: "statistics.total_distance_meter",
	name: "total_distance_meter",
	value: "test",
	objectType: "template",
	template: "alive",
	description: "Total distance in meters",
});
iobObj2.object.common.unit = "m";

const iobObj3 = buildObject(undefined as any, {
	id: "statistics.total_distance_meter",
	name: "total_distance_meter",
	value: "test",
	objectType: "template",
	template: "device",
	description: "Total distance in meters",
});
// Expected error:
iobObj3.object.common.unit = "m";

const iobObj4 = buildObject(undefined as any, {
	id: "statistics.total_distance_meter",
	name: "total_distance_meter",
	value: "test",
	objectType:"state",
	role: "adapter.messagebox"
});
iobObj4;