# [middlestone]()

A simple middleware for HTTP requests. Utilises `fetch` under the hood (fully polyfilled).
 
_ _ _

*Example use of Result API*:

Using `redux-saga` :

```javascript
// services/some-api.js

import { fromResult, middlewareClient } from 'middlestone';

const client = middlewareClient(x => x.body, { 500: () => this.retry() }); 

export default { get: (endpoint, opts = {}) => fromResult(client.request(endpoint, opts)) };

```

```javascript
// sagas/index.js
import someApi from '../services/some-service.js';

const API_GET = {
  200: 'https://jsonplaceholder.typicode.com/posts/1',
  404: 'https://jsonplaceholder.typicode.com/bad-route'
};

const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms);

function* fetchSomeService() {
 const {Err, Ok} = yield someApi.get(API_GET['200']);
 
 if(Ok) {
   const postBody = yield Ok.unwrap(); // safely unwrap result
   yield put(postBody);
 } else {
    yield delay(500);
    fetchSomeService();
 }
}
```
