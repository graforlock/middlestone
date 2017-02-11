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

import httpHandler from './lib/http-handler';

const request =  partial((middleware, asyncRequest, ...args) => {
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
        request:   request(compose(...middleware)),
        fetch:     (...args) => request(compose(...middleware, httpHandler), fetch, ...args),
        fetchJSON: (...args) => request(compose(fetchWrapper(compose(...middleware)), httpHandler), fetch, ...args)
    }
};

export { request, middlewareClient };