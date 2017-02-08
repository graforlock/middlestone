# [thru]()

A simple middleware wrapper for Ajax/HTTP clients.
 
Example use:

### `fetch`
```javascript
import { middlewareClient } from 'thru';

import * as constants from './constants';

const client = middlewareClient( 
  doSomething, 
  setCookies 
);

client.fetchJSON(constants.API)
 .then(json => json);
 
client.fetch(constants.API)
 .then(result => result);
 

 
 ```
 
###`other`
```javascript
import axios from 'axios';
import { middlewareClient } from 'thru';

import * as constants from './constants';

const client = middlewareClient( 
  doSomething, 
  setCookies 
);

client.request(axios.get, constants.API)
 .then(result => result)
```
