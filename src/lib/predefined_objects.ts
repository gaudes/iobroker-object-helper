import { TemplateObjectDefinition } from "./types";

// This type is used to statically validate the templates below for correct type and correct properties
type Validated<T extends Record<keyof T, any>> = {
	// If @types/iobroker has a definition for this object type, ...
	[key in keyof T]: T[key] extends { type: ioBroker.ObjectType }
		// ... select it
		? TemplateObjectDefinition & { type: T[key]["type"] }
		// ... otherwise use the default
		: TemplateObjectDefinition;
}

// Essentially a no-op but we need it to use the templates property to validate itself
function validateType<T extends Validated<T>>(objs: T): T { return objs; }

export const templates = validateType({
	device: {
		type: "device",
		common: {
			name: "Device",
		},
	},
	channel: {
		type: "channel",
		common: {
			name: "Channel",
		},
	},
	folder: {
		type: "folder",
		common: {
			name: "Folder",
		},
	},
	html: {
		type: "state",
		common: {
			role: "html",
			name: "HTML code",
			type: "string",
			read: true,
			write: true,
		},
	},
	json: {
		type: "state",
		common: {
			role: "state",
			name: "JSON",
			type: "json",
			read: true,
			write: true,
			def: "{}",
		},
	},
	battery: {
		type: "state",
		common: {
			name: "Battery state in percent",
			type: "number",
			role: "value.battery",
			read: true,
			write: false,
			unit: "%",
			min: 0,
			max: 100,
			def: 0,
		},
	},
	battery_voltage: {
		type: "state",
		common: {
			name: "Battery voltage",
			type: "number",
			role: "value.battery",
			read: true,
			write: false,
			unit: "V",
			min: 0,
			def: 0,
		},
	},
	humidity: {
		type: "state",
		common: {
			name: "Relative humidity",
			type: "number",
			role: "value.humidity",
			read: true,
			write: false,
			unit: "%",
			min: 0,
			max: 100,
			def: 0,
		},
	},
	humidity_absolute: {
		type: "state",
		common: {
			name: "Absolute humidity",
			type: "number",
			role: "value.humidity",
			read: true,
			write: false,
			unit: "g/m³",
			min: 0,
			def: 0,
		},
	},
	on: {
		type: "state",
		common: {
			name: "On",
			type: "boolean",
			role: "switch",
			read: true,
			write: true,
		},
	},
	pressure: {
		type: "state",
		common: {
			name: "Pressure",
			type: "number",
			role: "value.pressure",
			read: true,
			write: false,
			unit: "hPa",
			def: 0,
		},
	},
	reachable: {
		type: "state",
		common: {
			name: "Reachable",
			type: "boolean",
			role: "indicator.reachable",
			read: true,
			write: false,
		},
	},
	temperature: {
		type: "state",
		common: {
			name: "Temperature",
			type: "number",
			role: "value.temperature",
			read: true,
			write: false,
			unit: "°C",
			def: 0,
		},
	},
	sunrise: {
		type: "state",
		common: {
			name: "Daylight sunrise",
			type: "string",
			role: "date.sunrise",
			read: true,
			write: false,
		},
	},
	sunset: {
		type: "state",
		common: {
			name: "Daylight sunset",
			type: "string",
			role: "date.sunset",
			read: true,
			write: false,
		},
	},
	brightness: {
		type: "state",
		common: {
			name: "Brightness",
			type: "number",
			role: "level.brightness",
			read: true,
			write: true,
			min: 0,
			max: 254,
			def: 254,
		},
	},
	hue: {
		type: "state",
		common: {
			name: "Hue color",
			type: "number",
			role: "level.color.hue",
			read: true,
			write: true,
			unit: "°",
			min: 0,
			max: 360,
			def: 360,
		},
	},
	saturation: {
		type: "state",
		common: {
			name: "Saturation",
			type: "number",
			role: "level.color.saturation",
			read: true,
			write: true,
			min: 0,
			max: 254,
			def: 254,
		},
	},
	alive: {
		type: "state",
		common: {
			name: "Alive",
			type: "boolean",
			role: "indicator.online",
			read: true,
			write: false,
			def: false,
		},
	},
	enabled: {
		type: "state",
		common: {
			name: "Enabled",
			type: "boolean",
			role: "indicator",
			read: true,
			write: false,
			def: false,
		},
	},
	disabled: {
		type: "state",
		common: {
			name: "Disabled",
			type: "boolean",
			role: "indicator",
			read: true,
			write: false,
			def: false,
		},
	},
	reboot: {
		type: "state",
		common: {
			name: "Reboot ",
			type: "boolean",
			role: "button",
			read: false,
			write: true,
		},
	},
	discover: {
		type: "state",
		common: {
			role: "button",
			name: "Discover",
			type: "boolean",
			read: false,
			write: true,
		},
	},
	connection: {
		type: "state",
		common: {
			name: "Connection",
			def: false,
			read: true,
			write: false,
			role: "indicator.connected",
		},
	},
	rssi: {
		type: "state",
		common: {
			name: "Signal Strength",
			role: "value.rssi",
			type: "number",
			read: true,
			write: false,
		},
	},
	presence: {
		type: "state",
		common: {
			name: "Presence",
			type: "boolean",
			role: "sensor.motion",
			read: true,
			write: false,
		},
	},
	motion: {
		type: "state",
		common: {
			name: "motion",
			type: "boolean",
			role: "sensor.motion",
			read: true,
			write: false,
		},
	},
	mute: {
		type: "state",
		common: {
			name: "Mute",
			type: "boolean",
			role: "media.mute",
			read: true,
			write: true,
			def: false,
		},
	},
	next: {
		type: "state",
		common: {
			name: "Next button",
			type: "boolean",
			role: "button.next",
			read: false,
			write: true,
		},
	},
	pause: {
		type: "state",
		common: {
			name: "Pause button",
			type: "boolean",
			role: "button.pause",
			read: false,
			write: true,
		},
	},
	play: {
		type: "state",
		common: {
			name: "Play button",
			type: "boolean",
			role: "button.play",
			read: false,
			write: true,
		},
	},
	previous: {
		type: "state",
		common: {
			name: "Previous button",
			type: "boolean",
			role: "button.prev",
			read: false,
			write: true,
		},
	},
	stop: {
		type: "state",
		common: {
			name: "Stop button",
			type: "boolean",
			role: "button.stop",
			read: false,
			write: true,
		},
	},
	volume: {
		type: "state",
		common: {
			name: "Volume",
			type: "number",
			role: "level.volume",
			read: true,
			write: true,
			min: 0,
			max: 100,
		},
	},
	menu: {
		type: "state",
		common: {
			role: "button",
			name: "Menu",
			type: "boolean",
			read: true,
			write: true,
			def: false,
		},
	},
	power: {
		type: "state",
		common: {
			role: "switch.power",
			name: "Power",
			type: "boolean",
			read: true,
			write: true,
			def: false,
		},
	},
});
