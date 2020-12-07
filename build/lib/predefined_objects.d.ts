export declare const templates: {
    device: {
        type: "device";
        common: {
            name: string;
        };
    };
    channel: {
        type: "channel";
        common: {
            name: string;
        };
    };
    folder: {
        type: "folder";
        common: {
            name: string;
        };
    };
    html: {
        type: "state";
        common: {
            role: string;
            name: string;
            type: "string";
            read: true;
            write: true;
        };
    };
    json: {
        type: "state";
        common: {
            role: string;
            name: string;
            type: "string";
            read: true;
            write: true;
            def: string;
        };
    };
    battery: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: false;
            unit: string;
            min: number;
            max: number;
            def: number;
        };
    };
    battery_voltage: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: false;
            unit: string;
            min: number;
            def: number;
        };
    };
    humidity: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: false;
            unit: string;
            min: number;
            max: number;
            def: number;
        };
    };
    humidity_absolute: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: false;
            unit: string;
            min: number;
            def: number;
        };
    };
    on: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: true;
        };
    };
    pressure: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: false;
            unit: string;
            def: number;
        };
    };
    reachable: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: false;
        };
    };
    temperature: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: false;
            unit: string;
            def: number;
        };
    };
    sunrise: {
        type: "state";
        common: {
            name: string;
            type: "string";
            role: string;
            read: true;
            write: false;
        };
    };
    sunset: {
        type: "state";
        common: {
            name: string;
            type: "string";
            role: string;
            read: true;
            write: false;
        };
    };
    brightness: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: true;
            min: number;
            max: number;
            def: number;
        };
    };
    hue: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: true;
            unit: string;
            min: number;
            max: number;
            def: number;
        };
    };
    saturation: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: true;
            min: number;
            max: number;
            def: number;
        };
    };
    alive: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: false;
            def: boolean;
        };
    };
    enabled: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: false;
            def: boolean;
        };
    };
    disabled: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: false;
            def: boolean;
        };
    };
    reboot: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: false;
            write: true;
        };
    };
    discover: {
        type: "state";
        common: {
            role: string;
            name: string;
            type: "boolean";
            read: false;
            write: true;
        };
    };
    connection: {
        type: "state";
        common: {
            name: string;
            def: boolean;
            read: true;
            write: false;
            role: string;
        };
    };
    rssi: {
        type: "state";
        common: {
            name: string;
            role: string;
            type: "number";
            read: true;
            write: false;
        };
    };
    presence: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: false;
        };
    };
    motion: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: false;
        };
    };
    mute: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: true;
            write: true;
            def: boolean;
        };
    };
    next: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: false;
            write: true;
        };
    };
    pause: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: false;
            write: true;
        };
    };
    play: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: false;
            write: true;
        };
    };
    previous: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: false;
            write: true;
        };
    };
    stop: {
        type: "state";
        common: {
            name: string;
            type: "boolean";
            role: string;
            read: false;
            write: true;
        };
    };
    volume: {
        type: "state";
        common: {
            name: string;
            type: "number";
            role: string;
            read: true;
            write: true;
            min: number;
            max: number;
        };
    };
    menu: {
        type: "state";
        common: {
            role: string;
            name: string;
            type: "boolean";
            read: true;
            write: true;
            def: boolean;
        };
    };
    power: {
        type: "state";
        common: {
            role: string;
            name: string;
            type: "boolean";
            read: true;
            write: true;
            def: boolean;
        };
    };
};
