export declare const roles_definition: {
    state: {
        desc: string;
        read: true;
        write: true;
    };
    text: {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "text.url": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    html: {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    json: {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    list: {
        desc: string;
        type: "array";
        read: true;
        write: true;
    };
    date: {
        desc: string;
        type: ("number" | "string")[];
        read: true;
        write: true;
    };
    "sensor.window": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.door": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.alarm": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.alarm.flood": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.alarm.fire": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.alarm.secure": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.alarm.power": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.light": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.lock": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.motion": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.rain": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "sensor.noise": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    button: {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.stop": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.stop.tilt": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.start": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.open.door": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.open.window": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.open.blind": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.open.tilt": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.close.blind": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.close.tilt": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.mode.auto": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.mode.manual": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.mode.silent": {
        desc: string;
        type: "boolean";
        read: false;
        write: true;
    };
    "button.long": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.press": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    value: {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.window": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        states: {
            "0": string;
            "1": string;
            "2": string;
        };
        unit: string;
    };
    "value.temperature": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.brightness": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.min": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.max": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.default": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.battery": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.valve": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.time": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.interval": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.date": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.datetime": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.gps.longitude": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.gps.latitude": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.gps.elevation": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.gps": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.power.consumption": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.direction": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.curtain": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.blind": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
        min: number;
        max: number;
    };
    "value.tilt": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
        min: number;
        max: number;
    };
    "value.lock": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.speed": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.pressure": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.distance": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.distance.visibility": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.severity": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.warning": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.sun.elevation": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.sun.azimuth": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.voltage": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.current": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.fill": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.blood.sugar": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.water": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
        min: number;
        max: number;
    };
    "value.waste": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
        min: number;
        max: number;
    };
    "value.state": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    indicator: {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.working": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.reachable": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.connected": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.maintenance": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.maintenance.lowbat": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.maintenance.unreach": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.maintenance.alarm": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.maintenance.waste": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.lowbat": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.alarm": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.alarm.fire": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.alarm.flood": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.alarm.secure": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "indicator.alarm.health": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    level: {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.co2": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        min: number;
        max: number;
        unit: string;
    };
    "level.dimmer": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.blind": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
        min: number;
        max: number;
    };
    "level.temperature": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string[];
    };
    "level.valve": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.color.red": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "level.color.green": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "level.color.blue": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "level.color.white": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "level.color.hue": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        min: number;
        max: number;
        unit: string;
    };
    "level.color.saturation": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.color.rgb": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.color.luminance": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.color.temperature": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "level.timer": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.timer.sleep": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "level.volume": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        min: number;
        max: number;
        unit: string;
    };
    "level.volume.group": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        min: number;
        max: number;
        unit: string;
    };
    "level.curtain": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.tilt": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
        min: number;
        max: number;
    };
    "level.mode.fan": {
        desc: string;
        type: ("number" | "string")[];
        read: true;
        write: true;
        states: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
            "4": string;
            "5": string;
        };
        unit: string;
    };
    "level.mode.swing": {
        desc: string;
        type: "string";
        read: true;
        write: true;
        states: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
        };
        unit: string;
    };
    "level.mode.thermostat": {
        desc: string;
        type: "string";
        read: true;
        write: true;
        states: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
            "4": string;
            "5": string;
            "6": string;
        };
        unit: string;
    };
    "level.mode.cleanup": {
        desc: string;
        type: ("number" | "string")[];
        read: true;
        write: true;
        states: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
            "4": string;
        };
        unit: string;
    };
    "level.mode.work": {
        desc: string;
        type: ("number" | "string")[];
        read: true;
        write: true;
        states: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
            "4": string;
        };
        unit: string;
    };
    switch: {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.lock": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.lock.door": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.lock.window": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.boost": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.light": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.comfort": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.enable": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.power": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.mode.auto": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.mode.manual": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.mode.silent": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.mode.moonlight": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.mode.color": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.play": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.next": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.prev": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.pause": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "switch.pause": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.forward": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.reverse": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.fastforward": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.fastreverse": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.volume.up": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "button.volume.down": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "media.seek": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "media.mode.shuffle": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "media.mode.repeat": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "media.state": {
        desc: string;
        type: "mixed";
        read: true;
        write: true;
    };
    "media.artist": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.album": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.title": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.title.next": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.cover": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.cover.big": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.cover.small": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.duration.text": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.duration": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "media.elapsed.text": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.elapsed": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "media.broadcastDate": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.mute": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "media.season": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.episode": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "media.mute.group": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "media.tts": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.bitrate": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
        unit: string;
    };
    "media.genre": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.date": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.track": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.playid": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "media.add": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.clear": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "media.playlist": {
        desc: string;
        type: "object";
        read: true;
        write: true;
    };
    "media.url": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.url.announcement": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.jump": {
        desc: string;
        type: "number";
        read: true;
        write: true;
        unit: string;
    };
    "media.content": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.link": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "media.input": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "level.bass": {
        desc: string;
        type: "number";
        read: true;
        write: true;
    };
    "level.treble": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "switch.power.zone": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
    "media.browser": {
        desc: string;
        type: "object";
        read: true;
        write: true;
    };
    "value.health.fat": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        min: number;
        max: number;
        unit: string;
    };
    "value.health.weight": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.health.bmi": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.health.calories": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.health.steps": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.health.bpm": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.temperature.windchill": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.temperature.dewpoint": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.temperature.feelslike": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.temperature.min": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.temperature.max": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.humidity": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        min: number;
        max: number;
        unit: string;
    };
    "value.humidity.min": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        min: number;
        max: number;
        unit: string;
    };
    "value.humidity.max": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        min: number;
        max: number;
        unit: string;
    };
    "value.speed.wind": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.speed.max.wind": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.speed.min.wind": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.speed.wind.gust": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.direction.wind": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.direction.max.wind": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.direction.min.wind": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "weather.direction.wind": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "date.sunrise": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "date.sunset": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    dayofweek: {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    location: {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "weather.icon": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "weather.icon.wind": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "weather.icon.name": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "weather.state": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.precipitation": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.precipitation.hour": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.precipitation.today": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.radiation": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.uv": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.clouds": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        min: number;
        max: number;
        unit: string;
    };
    "value.rain": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.rain.hour": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.rain.today": {
        desc: string;
        type: "number";
        read: true;
        write: false;
    };
    "value.snow": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.snow.hour": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.snow.today": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.snowline": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "weather.chart.url": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "weather.chart.url.forecast": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "weather.html": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "weather.title": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "weather.title.short": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "weather.type": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "weather.json": {
        desc: string;
        type: "object";
        read: true;
        write: false;
    };
    "value.speed.wind.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "weather.state.forecast.*": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.direction.wind.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "weather.direction.wind.forecast.*": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.pressure.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.temperature.min.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "value.temperature.max.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string[];
    };
    "weather.precipitation.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        min: number;
        max: number;
        unit: string;
    };
    "value.precipitation.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "weather.title.forecast.*": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "value.precipitation.day.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "value.precipitation.night.forecast.*": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "date.forecast.*": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "weather.icon.forecast.*": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "info.ip": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "info.mac": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "info.name": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "info.address": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "info.port": {
        desc: string;
        type: "number";
        read: true;
        write: false;
        unit: string;
    };
    "info.standby": {
        desc: string;
        type: "boolean";
        read: true;
        write: false;
    };
    "info.status": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "info.display": {
        desc: string;
        type: "string";
        read: true;
        write: false;
    };
    "date.start": {
        desc: string;
        type: ("number" | "string")[];
        read: true;
        write: true;
    };
    "date.end": {
        desc: string;
        type: ("number" | "string")[];
        read: true;
        write: true;
    };
    url: {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "url.icon": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "url.cam": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "url.blank": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "url.same": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "url.audio": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "text.phone": {
        desc: string;
        type: "string";
        read: true;
        write: true;
    };
    "adapter.messagebox": {
        desc: string;
        type: "object";
        read: true;
        write: true;
    };
    "adapter.wakeup": {
        desc: string;
        type: "boolean";
        read: true;
        write: true;
    };
};
