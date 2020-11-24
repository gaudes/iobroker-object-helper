import { RoleSchema } from "./types";

/** Makes sure that the role definitions below have the desired form and we didn't mistype anything */
function validateRoles<T extends Record<keyof T, RoleSchema>>(roles: T): T { return roles; }

export const roles_definition = validateRoles({
	"state":{
		"desc":"General purpose",
		"read":true,
		"write":true
	},
	"text":{
		"desc":"Text",
		"type":"string",
		"read":true,
		"write":true
	},
	"text.url":{
		"desc":"URL",
		"type":"string",
		"read":true,
		"write":true
	},
	"html":{
		"desc":"HTML",
		"type":"string",
		"read":true,
		"write":true
	},
	"json":{
		"desc":"JSON",
		"type":"string",
		"read":true,
		"write":true
	},
	"list":{
		"desc":"List",
		"type":"array",
		"read":true,
		"write":true
	},
	"date":{
		"desc":"Date",
		"type":[
			"string",
			"number"
		],
		"read":true,
		"write":true
	},
	"sensor.window":{
		"desc":"Window open/closed",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.door":{
		"desc":"Door open/closed",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.alarm":{
		"desc":"Alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.alarm.flood":{
		"desc":"Waterleakage",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.alarm.fire":{
		"desc":"Fire alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.alarm.secure":{
		"desc":"Secure alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.alarm.power":{
		"desc":"Power alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.light":{
		"desc":"Light sensor",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.lock":{
		"desc":"Lock state",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.motion":{
		"desc":"Motion sensor",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.rain":{
		"desc":"Rain sensor",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"sensor.noise":{
		"desc":"Noise sensor",
		"type":"boolean",
		"read":true,
		"write":false,
		"unit":"dB"
	},
	"button":{
		"desc":"Button",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.long":{
		"desc":"Button long press",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.press":{
		"desc":"Button press",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.stop":{
		"desc":"Button stop",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.start":{
		"desc":"Button start",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.open.door":{
		"desc":"Button open door",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.open.window":{
		"desc":"Button",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.mode.auto":{
		"desc":"Button set mode auto",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.mode.manual":{
		"desc":"Button set mode manual",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"button.mode.silent":{
		"desc":"Button set mode silent",
		"type":"boolean",
		"read":false,
		"write":true
	},
	"value":{
		"desc":"Value",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.window":{
		"desc":"Window state",
		"type":"number",
		"read":true,
		"write":false,
		"states":{
			"0":"CLOSED",
			"1":"TILTED",
			"2":"OPEN"
		}
	},
	"value.temperature":{
		"desc":"Temperature",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"value.brightness":{
		"desc":"Brightness",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"lx"
	},
	"value.min":{
		"category":"value",
		"desc":"Value minimum",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.max":{
		"desc":"Value maximum",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.default":{
		"desc":"Value default",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.battery":{
		"desc":"Battery level",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"%",
			"V"
		]
	},
	"value.gas":{
		"desc":"Gas concentration",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"ppm"
	},
	"value.valve":{
		"desc":"Valve position",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.time":{
		"desc":"Time",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.interval":{
		"desc":"Interval time",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"sec"
	},
	"value.date":{
		"desc":"Date",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.datetime":{
		"desc":"Date and time",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.gps.longitude":{
		"desc":"GPS longitude",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.gps.latitude":{
		"desc":"GPS latitude",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.gps.elevation":{
		"desc":"GPS elevation",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.gps":{
		"desc":"GPS longitude and latitude",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.power.consumption":{
		"desc":"Power consumption (Ws, Wh, kWh)",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.direction":{
		"desc":"Direction",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.curtain":{
		"desc":"Curtain position",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.blind":{
		"desc":"Actual position of blind (100% = fully open, 0% = fully closed)",
		"type":"number",
		"read":true,
		"write":false,
		"unit": "%",
		"min": 0,
		"max": 100
	},
	"value.tilt":{
		"desc":"Actual tilt position (100% = fully open, 0% = fully closed)",
		"type":"number",
		"read":true,
		"write":false,
		"unit": "%",
		"min": 0,
		"max": 100
	},
	"value.lock":{
		"desc":"Lock position",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.speed":{
		"desc":"Wind speed",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.pressure":{
		"desc":"Pressure",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"mbar",
			"bar",
			"hPa"
		]
	},
	"value.distance":{
		"desc":"Distance",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.distance.visibility":{
		"desc":"Distance visibility",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.severity":{
		"desc":"Severity (priority)",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.warning":{
		"desc":"Warning",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.sun.elevation":{
		"desc":"Sun elevation",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"°"
	},
	"value.sun.azimuth":{
		"desc":"Sun Azimuth",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"°"
	},
	"value.voltage":{
		"desc":"Voltage",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"V"
	},
	"value.current":{
		"desc":"Current",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"A",
			"mA"
		]
	},
	"value.fill":{
		"desc":"Fill",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"l",
			"ml",
			"m3",
			"%"
		]
	},
	"value.blood.sugar":{
		"desc":"Blood sugar (mmol, mgdl)",
		"type":"number",
		"read":true,
		"write":false
	},
	"indicator":{
		"desc":"Indicator",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.working":{
		"desc":"Working",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.reachable":{
		"desc":"Device Reachable",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.connected":{
		"desc":"Shows connection state for adapter instance",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.maintenance":{
		"desc":"Shows service messages",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.maintenance.lowbat":{
		"desc":"Indicates low battery",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.maintenance.unreach":{
		"desc":"Indicates device is not reachable",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.maintenance.alarm":{
		"desc":"Indicates alarm message",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.lowbat":{
		"desc":"Indicates low battery",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.alarm":{
		"desc":"Indicates alarm message",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.alarm.fire":{
		"desc":"Indicates fire alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.alarm.flood":{
		"desc":"Indicates waterleakage alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.alarm.secure":{
		"desc":"Indicates secure alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"indicator.alarm.health":{
		"desc":"Indicates health alarm",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"level":{
		"desc":"Level general",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.co2":{
		"desc":"Air Quality",
		"type":"number",
		"read":true,
		"write":true,
		"min":0,
		"max":100,
		"unit":"%"
	},
	"level.dimmer":{
		"desc":"Brightness setpoint",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.blind":{
		"desc":"Set blind position (100% = fully open, 0% = fully closed)",
		"type":"number",
		"read":true,
		"write":true,
		"unit": "%",
		"min": 0,
		"max": 100
	},
	"level.temperature":{
		"desc":"Temperature setpoint",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.valve":{
		"desc":"Valve setpoint",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.red":{
		"desc":"Level for color red",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.green":{
		"desc":"Level for color green",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.blue":{
		"desc":"Level for color blue",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.white":{
		"desc":"Level for color white",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.hue":{
		"desc":"Color in hue",
		"type":"number",
		"read":true,
		"write":true,
		"unit":"°"
	},
	"level.color.saturation":{
		"desc":"Color saturation",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.rgb":{
		"desc":"RGB color as HEX",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.luminance":{
		"desc":"Color Luminance",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.color.temperature":{
		"desc":"Color temperature",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.timer":{
		"desc":"Timer",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.timer.sleep":{
		"desc":"Sleep timer",
		"type":"number",
		"read":true,
		"write":true,
		"unit":"min"
	},
	"level.volume":{
		"desc":"Audio volume",
		"type":"number",
		"read":true,
		"write":true,
		"min":0,
		"max":100,
		"unit":"%"
	},
	"level.volume.group":{
		"desc":"Audio volume for group",
		"type":"number",
		"read":true,
		"write":true,
		"min":0,
		"max":100,
		"unit":"%"
	},
	"level.curtain":{
		"desc":"Curtain setpoint",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.tilt":{
		"desc":"Set the tilt position of blinds (100% = fully open, 0% = fully closed)",
		"type":"number",
		"read":true,
		"write":true,
		"unit": "%",
		"min": 0,
		"max": 100
	},
	"level.speed.fan": {
		"desc":"Speed of fan",
		"type": [
			"string",
			"number"
		],
		"read":true,
		"write":true,
		"unit":"%",
		"states":{
			"0":"AUTO",
			"1":"high",
			"2":"low",
			"3":"medium",
			"4":"quiet",
			"5":"turbo"
		}
	},
	"level.swing": {
		"desc":"Angle or enumeration",
		"type":"string",
		"read":true,
		"write":true,
		"states":{
			"0":"AUTO",
			"1":"horizontal",
			"2":"vertical",
			"3":"stationary"
		}
	},
	"level.mode.thermostat":{
		"desc":"Thermostat mode",
		"type":"string",
		"read":true,
		"write":true,
		"states":{
			"0":"AUTO",
			"1":"COOL",
			"2":"DRY",
			"3":"ECO",
			"4":"FAN_ONLY",
			"5":"HEAT",
			"6":"OFF"
		}
	},
	"switch":{
		"desc":"Switch gerneral",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.lock":{
		"desc":"Lock switch",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.lock.door":{
		"desc":"Door lock switch",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.window":{
		"desc":"Window switch",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.boost":{
		"desc":"Switch boost on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.light":{
		"desc":"Light switch",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.comfort":{
		"desc":"Switch comfort mode on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.enable":{
		"desc":"Release",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.power":{
		"desc":"Power on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.mode.auto":{
		"desc":"Switch mode auto on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.mode.manual":{
		"desc":"Switch mode manual on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.mode.silent":{
		"desc":"Switch mode silent on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.mode.moonlight":{
		"desc":"Switch mode moonlight on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"switch.mode.color":{
		"desc":"Switch mode color on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.play":{
		"desc":"Media button play",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.next":{
		"desc":"Media button next",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.prev":{
		"desc":"Media button prev",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.pause":{
		"desc":"Media button pause",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.forward":{
		"desc":"Media button forward",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.reverse":{
		"desc":"Media button reverse",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.fastforward":{
		"desc":"Media button fast forward",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.fastreverse":{
		"desc":"Media button fast reverse",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.volume.up":{
		"desc":"Volume up",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"button.volume.down":{
		"desc":"Volume down",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"media.seek":{
		"desc":"Media seek",
		"type":"number",
		"read":true,
		"write":true
	},
	"media.mode.shuffle":{
		"desc":"Switch shuffle mode on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"media.mode.repeat":{
		"desc":"Switch repeat on/off",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"media.state":{
		"desc":"State of player",
		"type":"mixed",
		"read":true,
		"write":true
	},
	"media.artist":{
		"desc":"Name of artist",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.album":{
		"desc":"Name of album",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.title":{
		"desc":"Title of media",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.title.next":{
		"desc":"Title of next media",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.cover":{
		"desc":"URL of cover image",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.cover.big":{
		"desc":"URL of big cover image",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.cover.small":{
		"desc":"URL of small cover image",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.duration.text":{
		"desc":"Duration as text e.g. 2:35",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.duration":{
		"desc":"Duration in seconds",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"sec"
	},
	"media.elapsed.text":{
		"desc":"Elapsed time as text e.g. 2:35",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.elapsed":{
		"desc":"Elapsed time in seconds",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"sec"
	},
	"media.broadcastDate":{
		"desc":"Date of broadcast",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.mute":{
		"desc":"Mute device",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"media.season":{
		"desc":"Season",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.episode":{
		"desc":"Episode",
		"type":"string",
		"read":true,
		"write":false
	},
	"media.mute.group":{
		"desc":"Mute group",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"media.tts":{
		"desc":"Text to speech",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.bitrate":{
		"desc":"Bitrate",
		"type":"boolean",
		"read":true,
		"write":true,
		"unit":"kbps"
	},
	"media.genre":{
		"desc":"Genre",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.date":{
		"desc":"Date of media",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.track":{
		"desc":"Track number",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.playid":{
		"desc":"Track ID",
		"type":"number",
		"read":true,
		"write":true
	},
	"media.track.add":{
		"desc":"Add track",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.track.remove":{
		"desc":"Remove track",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.playlist":{
		"desc":"Play list as JSON",
		"type":"object",
		"read":true,
		"write":true
	},
	"media.playlist.addtrack":{
		"desc":"Add track to play list",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.playlist.removetrack":{
		"desc":"Remove track to play list",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.clear":{
		"desc":"Clear actual play list",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"media.url":{
		"desc":"URL for media",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.url.announcement":{
		"desc":"URL for announcement media",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.jump":{
		"desc":"Jump over n elements positive/negative",
		"type":"number",
		"read":true,
		"write":true
	},
	"media.content":{
		"desc":"Content type",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.link":{
		"desc":"State with actual file",
		"type":"string",
		"read":true,
		"write":true
	},
	"media.input":{
		"desc":"Input channel",
		"type":"string",
		"read":true,
		"write":true
	},
	"level.bass":{
		"desc":"Bass level",
		"type":"number",
		"read":true,
		"write":true
	},
	"level.treble":{
		"desc":"Treble level",
		"type":"string",
		"read":true,
		"write":true
	},
	"switch.power.zone":{
		"desc":"Switch zone on/off ",
		"type":"boolean",
		"read":true,
		"write":true
	},
	"media.browser":{
		"desc":"JSON Array like files",
		"type":"object",
		"read":true,
		"write":true
	},
	"value.health.fat": {
		"desc":"Body fat index",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"%"
	},
	"value.health.weight": {
		"desc":"Body weight",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"kg",
			"lbs"
		]
	},
	"value.health.bmi": {
		"desc":"BMI index",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.health.calories": {
		"desc":"Burned calories",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"kcal"
	},
	"value.health.steps": {
		"desc":"Steps done",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.health.bpm": {
		"desc":"Heart beats per minute",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"bpm"
	},
	"value.temperature.windchill":{
		"desc":"Felt temperature with wind",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"value.temperature.dewpoint":{
		"desc":"Dewpoint",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"value.temperature.feelslike":{
		"desc":"Temperature feels like",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"value.temperature.min":{
		"desc":"Temperature minimum",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"value.temperature.max":{
		"desc":"Temperature ",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"value.humidity":{
		"desc":"Humidity",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"%"
	},
	"value.humidity.min":{
		"desc":"Humidity minimum",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"%"
	},
	"value.humidity.max":{
		"desc":"Humidity maximum",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"%"
	},
	"value.speed.wind":{
		"desc":"Actual or average wind speed",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"kn",
			"m/s",
			"km/h",
			"mph"
		]
	},
	"value.speed.max.wind":{
		"desc":"Maximum wind speed over a specific time range, normal 24 hours",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"kn",
			"m/s",
			"km/h",
			"mph"
		]
	},
	"value.speed.min.wind":{
		"desc": "Minimum wind speed over a specific time range (normal 24 hours)",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"kn",
			"m/s",
			"km/h",
			"mph"
		]
	},
	"value.speed.wind.gust":{
		"desc":"Gusts of wind speed",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"kn",
			"m/s",
			"km/h",
			"mph"
		]
	},
	"value.direction.wind":{
		"desc":"Direction of wind",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"°"
	},
	"value.direction.max.wind":{
		"desc":"Direction of wind maximum",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"°"
	},
	"value.direction.min.wind":{
		"desc":"Direction of wind minimum",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"°"
	},
	"weather.direction.wind":{
		"desc":"Direction of wind",
		"type":"string",
		"read":true,
		"write":false
	},
	"date.sunrise":{
		"desc":"Sunrise today",
		"type":"string",
		"read":true,
		"write":true
	},
	"date.sunset":{
		"desc":"Sunset today",
		"type":"string",
		"read":true,
		"write":true
	},
	"weekday":{
		"desc":"Weekday",
		"type":"string",
		"read":true,
		"write":true
	},
	"location":{
		"desc":"Location as text",
		"type":"string",
		"read":true,
		"write":true
	},
	"weather.icon":{
		"desc":"URL to weather icon",
		"type":"string",
		"read":true,
		"write":true
	},
	"weather.icon.wind":{
		"desc":"URL to weather icon wind",
		"type":"string",
		"read":true,
		"write":true
	},
	"weather.icon.name":{
		"desc":"Name of the actual icon or status",
		"type":"string",
		"read":true,
		"write":false
	},
	"weather.state":{
		"desc":"Actual weather as text",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.precipitation":{
		"desc":"Rainfall in a certain period of time, normally last 24 hours ",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"mm"
	},
	"value.precipitation.hour":{
		"desc":"Precipitation in the last hour",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"mm"
	},
	"value.precipitation.today":{
		"desc":"Precipitation today",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"mm"
	},
	"value.radiation":{
		"desc":"Sun exposure",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"W/m2"
	},
	"value.uv":{
		"desc":"UV value",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.clouds":{
		"desc":"Cloud cover in %, 0% = no clouds, 100% = very cloudy",
		"type":"number",
		"read":true,
		"write":false,
		"min":0,
		"max":100,
		"unit":"%"
	},
	"value.rain":{
		"desc":"Rain level for specific time periode, normally last 24 hours",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.rain.hour":{
		"desc":"Rain level last hour",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.rain.today":{
		"desc":"Rain level today",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.snow":{
		"desc":"Snow depth",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"cm",
			"m"
		]
	},
	"value.snow.hour":{
		"desc":"Snowfall last hour",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.snow.today":{
		"desc":"Snowfall today",
		"type":"number",
		"read":true,
		"write":false
	},
	"value.snowline":{
		"desc":"Snow line in meters above sea level",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"m"
	},
	"weather.chart.url":{
		"desc":"URL to weather chart",
		"type":"string",
		"read":true,
		"write":false
	},
	"weather.chart.url.forecast":{
		"desc":"URL to weather forecast chart ",
		"type":"string",
		"read":true,
		"write":false
	},
	"weather.html":{
		"desc":"HTML object for weather description",
		"type":"string",
		"read":true,
		"write":false
	},
	"weather.title":{
		"desc":"Weather title",
		"type":"string",
		"read":true,
		"write":false
	},
	"weather.title.short":{
		"desc":"Short weather title, just one word",
		"type":"string",
		"read":true,
		"write":false
	},
	"weather.type":{
		"desc":"Type of weatherinformation",
		"type":"string",
		"read":true,
		"write":false
	},
	"weather.json":{
		"desc":"Weather data as JSON object",
		"type":"object",
		"read":true,
		"write":false
	},
	"value.speed.wind.forecast.*":{
		"desc":"Wind speed forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"kn",
			"m/s",
			"km/h",
			"mph"
		]
	},
	"weather.state.forecast.*":{
		"desc":"Weather forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.direction.wind.forecast.*":{
		"desc":"Wind direction forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"°"
	},
	"weather.direction.wind.forecast.*":{
		"desc":"Wind direction forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.pressure.forecast.*":{
		"desc":"Air pressure forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"mbar"
	},
	"value.temperature.min.forecast.*":{
		"desc":"Minimal temperature forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"value.temperature.max.forecast.*":{
		"desc":"Maximum temperature forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":[
			"°C",
			"°F",
			"K"
		]
	},
	"weather.precipitation.forecast.*":{
		"desc":"Precipitations probability for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"%"
	},
	"value.precipitation.forecast.*":{
		"desc":"Precipitation forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"mm"
	},
	"weather.title.forecast.*":{
		"desc":"Short weather forecast",
		"type":"string",
		"read":true,
		"write":false
	},
	"value.precipitation.day.forecast.*":{
		"desc":"Precipitation day forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"mm"
	},
	"value.precipitation.night.forecast.*":{
		"desc":"Precipitation night forecast for *, replace * with 0=today, 1=tomorrow, and so on",
		"type":"number",
		"read":true,
		"write":false,
		"unit":"mm"
	},
	"weather.icon.forecast.*":{
		"desc":"URL to icon forecast for *, replace * with 1=tomorrow, 2=day after tomorrow, and so on",
		"type":"string",
		"read":true,
		"write":false
	},
	"info.ip":{
		"desc":"IP address of device",
		"type":"string",
		"read":true,
		"write":false
	},
	"info.mac":{
		"desc":"MAC address of device",
		"type":"string",
		"read":true,
		"write":false
	},
	"info.name":{
		"desc":"Name of *, could be the name of a device, service or what ever ",
		"type":"string",
		"read":true,
		"write":false
	},
	"info.address":{
		"desc":"Technical address, for KNX or something like this, NOT a geo location",
		"type":"string",
		"read":true,
		"write":false
	},
	"info.port":{
		"desc":"Network port",
		"type":"number",
		"read":true,
		"write":false
	},
	"info.standby":{
		"desc":"Shows true if the device is in stand-by mode",
		"type":"boolean",
		"read":true,
		"write":false
	},
	"info.status":{
		"desc":"Shows state of device or service",
		"type":"string",
		"read":true,
		"write":false
	},
	"info.display":{
		"desc":"Information will be shown on device display",
		"type":"string",
		"read":true,
		"write":false
	},
	"date.start":{
		"desc":"Start at date",
		"type":["string","number"],
		"read":true,
		"write":true
	},
	"date.end":{
		"desc":"End at date",
		"type":["string","number"],
		"read":true,
		"write":true
	},
	"url":{
		"desc":"URL to what ever",
		"type":"string",
		"read":true,
		"write":true
	},
	"url.icon":{
		"desc":"URL to icon ",
		"type":"string",
		"read":true,
		"write":true
	},
	"url.cam":{
		"desc":"URL to webcam",
		"type":"string",
		"read":true,
		"write":true
	},
	"url.blank":{
		"desc":"Open URL in new window",
		"type":"string",
		"read":true,
		"write":true
	},
	"url.same":{
		"desc":"Open URL in this window",
		"type":"string",
		"read":true,
		"write":true
	},
	"url.audio":{
		"desc":"URL to audio",
		"type":"string",
		"read":true,
		"write":true
	},
	"text.phone":{
		"desc":"Phonenumber",
		"type":"string",
		"read":true,
		"write":true
	},
	"adapter.messagebox":{
		"desc":"Used to send messages to adapter instance, like e-mail or pushover",
		"type":"object",
		"read":true,
		"write":true
	},
	"adapter.wakeup":{
		"desc":"Used to start adapter instance if it is stopped",
		"type":"boolean",
		"read":true,
		"write":true
	}
});
