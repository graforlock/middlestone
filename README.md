# [thru]()

A simple middleware wrapper for Ajax/HTTP clients.
 
Example use:

### `fetch`
```javascript
import { middlewareClient } from 'thru';

const client = middlewareClient( 
  doSomething, 
  setCookies 
);

client.fetchJSON('https://jsonplaceholder.typicode.com/posts/1')
 .then(json => json);
 
client.fetch('https://jsonplaceholder.typicode.com/posts/1')
 .then(result => result);
 

 
 ```
 
###`other`
```javascript
import axios from 'axios';
import { middlewareClient } from 'thru';

const client = middlewareClient( 
  doSomething, 
  setCookies 
);

client.request(axios.get, 'https://jsonplaceholder.typicode.com/posts/1')
 .then(result => result)
```
