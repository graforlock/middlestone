# [middlestone]()

A simple middleware for HTTP requests. Utilises `fetch` under the hood (fully polyfilled).
 
_ _ _

*Example use of Result API*:

Using `redux-saga` :

```javascript
// services/some-api.js

import { middlewareClient } from 'middlestone';

const client = middlewareClient(x => x.body, //  get the body of json
 { 404: () => this.retry() }); 
 // ^^ if 404, retry last call.

export default { 
  get: (endpoint = 'https://jsonplaceholder.typicode.com/posts/1', opts = {}) => {
    return client.requestOf(endpoint, opts);
  }
}
```

```javascript
//sagas/effects.js
export const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms);
```

```javascript
// sagas/index.js
// .. all necessary saga imports here, like call or put.
// ...

import actions from '../actions';
import types from '../constants/actionTypes';
import someApi from '../services/some-service.js';
import { delay } from './effects';

export function* fetchSomeService() {
 const { Err, Ok } = yield call(someApi.get);
 
 if(Ok) {
   const postBody = yield Ok.unwrap(); // safely unwrap result
   yield put(postBody);
 } else {
    yield delay(500);
    yield put(actions.getSomeApi()); // it is going to retry the same step
 }
}

// ... 

export function *watchFetchSomeService() {
 yield takeEvery(types.FETCH_SOME_SERVICE, fetchSomeService);
}

// ...

export default function* root() {
 yield [
  fork(watchFetchSomeService)
 ]
}
```
