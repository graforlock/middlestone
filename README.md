# [middlestone]()

A simple middleware for HTTP requests. Utilises `fetch` under the hood (fully polyfilled).
 
_ _ _

*Example use of Result API*:

**1.** Standard way, using `.map` and `.orElse` :

```javascript
import { middlewareClient } from 'middlestone';
 

const API_GET = {
  200: 'https://jsonplaceholder.typicode.com/posts/1',
  404: 'https://jsonplaceholder.typicode.com/bad-route'
};

const client = middlewareClient(x => x.body, { 500: () => this.retry() }); 

const handleOk = (x) => alert(x),
      handleErr = (err) =>  alert(`Error: ${err}`);

client.request(API_GET['200'])
   .then(Result => Result.andThen(handleOk)
          	     .orElse(handleErr)); // alert box will show post body.

client.request(API_GET['404'])
   .then(Result => Result.andThen(handleOk)
          	     .orElse(handleErr)); // alert box will show Error: 404.

```

**2.** Using `redux-saga`, basic way :

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

function* watchFetchSomeService() {
 const {Err, Ok} = yield someApi.get(API_GET['200']);
 
 if(Ok) {
   yield put(receiveData(Ok.unwrap()));
 } else {
    // ... handle error or retry the call
 }
}
```
