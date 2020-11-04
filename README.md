# iobroker-object-helper

## Example usage:

### Creates initial array with a channel named "user":

`const iobResult: iobObjectHelper.iobObject[] = Array(iobObjectHelper.makeIOBObj("user", "user", null, "template", "channel"));`

### Adds a State with JSON data to array:

`iobResult.push(iobObjectHelper.makeIOBObj("user.json", "json", JSON.stringify(jsondata), "template", "json", "JSON-Result from API"));`

### Adds State with a numeric userid to array:

`iobResult.push(iobObjectHelper.makeIOBObj("user.id", "userid", userid, "state", "value", "Numeric User-ID"));`

### Save Array of states and channel to ioBroker
* Parameter 3 (false) = Not overwrite existing objects (setObjectNotExistsAsync insted setObjectAsync) 
* Parameter 4 (true)  = Remove existing objects in ioBroker not existing in the Array
* Parameter 5 ("info*") = Removal except of objects with this mask

`await iobObjectHelper.saveIOBObj(this, iobResult, false, true, "info*");`