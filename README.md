# [thru]()

A simple middleware wrapper for `fetch` and other promise-based, HTTP libraries.
 
Example usage:

### with `fetch`:
```javascript
import { middlewareClient } from 'thru';

/* ... all other necessary imports ... */

const client = middlewareClient( 
  updateState, 
  setCookies,
  checkResponse
);

client.fetchJSON(API)
 .then(Result => Result.unwrap()) //-> This returns parsed JSON object.
 .then(JSON => /* do something */);


client.fetch(API)
 .then(Result => Result.unwrap()) //-> This returns Response object.
 .then(Response => /* do something */);

 
 ```
 
### all `other` Promise use cases:
```javascript
import { middlewareClient } from 'thru';

/* ... all other necessary imports ... */

const client = middlewareClient( 
  updateState, 
  setCookies,
  checkResponse
);

client.request(axios.get, constants.API)
 .then(Result => Result); //-> This returns Result type with axios compatible response.

client.request($.post, constants.API, settings)
 .then(Result => Result); //-> This returns Result type with jquery compatible response.
```


