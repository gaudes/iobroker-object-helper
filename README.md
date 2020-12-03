# iobroker-object-helper
This helper supports Adapter developers for ioBroker with an easy interface for ioBroker objects. The main features are:
* Create objects based on templates or roles defined in the official documentation with a single function call:
    * https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md
    * https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md
* Save a complete array of objects to ioBroker with a single function call
    * Object tree gets validated, so all devices, channels or folders in the path must be defined
    * No longer required objects in ioBroker could be removed automatically, exceptions as string or regex possible
    * Overwrite ioBroker objects just as parameter

Credits for JeyCee, who created the basic libraries we customized for this project:
https://github.com/iobroker-community-adapters/iobroker-adapter-helpers/tree/master/definitions

## Use in Adapter project

Installation e.g. in Terminal window in VSCode:

```
npm install gaudes/iobroker-object-helper
```

An entry in package.json will be created:

```
  "dependencies": {
    "@iobroker/adapter-core": "^2.4.0",
    "iobroker-object-helper": "github:gaudes/iobroker-object-helper",
    ...
  },
```

## Integration

For TypeScript-Adapter use
```typescript
import * as iobObjectHelper from "iobroker-object-helper";
```
For JavaScript-Adapter use
```javascript
const iobObjectHelper = require("iobroker-object-helper");
```

## Functions

### buildObject
This functions returns a validated ioBroker object.

It has two main features:
* Create object based on a template
* Create a custom object based on a defined role

Example usage:

#### Create initial array with a channel named "user":

TypeScript
```typescript
const iobResult: iobObjectHelper.ObjectWithValue[] = Array(iobObjectHelper.buildObject(this,{id: "user", name: "user", objectType: "template", template: "channel"}));
```
Javascript
```javascript
const iobResult = Array(iobObjectHelper.buildObject(this,{id: "user", name: "user", objectType: "template", template: "channel"}));
```

### Adds a State with JSON data to array:

```typescript
iobResult.push(iobObjectHelper.buildObject(this, {id: "user.json", name: "json", value: JSON.stringify(yourjsondata), objectType: "template", template: "json"}));
```

### Adds State with a numeric userid to array:

```typescript
iobResult.push(iobObjectHelper.buildObject(this, {id: "user.id", name: "userid", value: yournumericuserid, objectType: "state", role: "value", description: "Numeric User-ID"}));
```

### syncObject
This functions saves your array of ioBroker objects to ioBroker.
The complete tree in the array gets validated, so all devices, channels and folders must also be defined.

There are some options for this function:
* overwriteExisting: Usage of setObjectNotExists against setObject
* removeUnused: Objects in ioBroker not anymore included in your array will be deleted
* except: Elements excluded from deletion of removeUnused

Example usage:

### Save Array of states and channel to ioBroker
```typescript
await iobObjectHelper.syncObjects(this, iobResult,{ removeUnused: true, except: /(info.*/} )
```

## Changelog

### 0.0.1 (2020-12-05)
* Initial release

## License
MIT License

Copyright (c) 2020 Gaudes <ralf@gaudes.net> and AlCalzone <d.griesel@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
