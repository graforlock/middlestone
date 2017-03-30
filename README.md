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

const client = middlewareClient(x => x.body); // middleware to get post body

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

const client = middlewareClient(x => x.body); // retrieve comment body 

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

**3.** Pattern matching alternative (for more fine grained `Err` control):

```javascript
import { middlewareClient } from 'middlestone';


const API_GET = {
  200: 'https://jsonplaceholder.typicode.com/posts/1',
  404: 'https://jsonplaceholder.typicode.com/bad-route'
};

const client = middlewareClient(x => x.body); // retrieve comment body 

const badRequest = (x) => console.warn('Bad Request: ', x);
const redirect = () => console.log('Redirecting on 423....');
const pageNotFound = () => console.warn('Page Not Found!');

const handleOk = (x) => { 
  alert(JSON.stringify(x))
  return x;
}

function handleResult(Result) {  
    switch(Result.inspect()) {
       	case 'Err(404)' :
          pageNotFound();
          return Result;
        case 'Err(423)' :
          redirect();
          return Result;
        case 'Ok([object Promise])':
          return Result;
        default: 
          badRequest(Result.unwrap());
          return Result;
    }
 }

client.request(API_GET['200'])
   .then(Result => handleResult(Result).andThen(handleOk));
      
```
