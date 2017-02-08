import {
    isThennable,
    defer,
    partial,
    constant,
    compose
} from './lib';

import fetch from 'isomorphic-fetch';
import AsyncResult from './async-result';
import { fetchWrapper } from './drivers';

const request =  partial(function request(middleware, asyncRequest, ...args) {
    const asyncResult = asyncRequest(...args);

    switch(isThennable(asyncResult)) {
        case AsyncResult.NOT_THENNABLE:
            return defer(constant(asyncResult), middleware);
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
});

const middlewareClient = (...middleware) => {
    return {
        request: request(compose(...middleware)),
        fetch: request.bind(null, fetchWrapper(compose(...middleware)), fetch)
    }
};

export { request, middlewareClient };