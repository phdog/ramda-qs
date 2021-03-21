# ramda-qs
Pure functional querystring parser and manager made with declarative ramda pipelines.

- Handles also lists of values
- Works with non-Latin charachters
- Customizable behaviuor with point-free functional building blocks
- Well tested since made by pure functions
- Is decorated by your project's own side effects

## Installation
Copy lib folder to your utilities :-)

## Usage Example

To use lib you have to decorate it by getter/setter route side effects, adopted in your project, and handle it as a singleton. Here's an example of React app using history object for navigation:

```import {qs as ramdaQs} from 'lib';```

```export const qs = ramdaQs(() => window.location.search, (search) => history.push({search}));```

## API
### qs.add(key, value)
Adds a value to a list at a given key
### qs.drop(key, value)
Removes a value from a list at a given key
### qs.set(key, value)
Sets a value at a given key
### qs.getKey(key)
Gets a value at a given key

### qs.parse, qs.stringify
Helper functions


For more examples please look into tests
