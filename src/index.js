import {
    isThennable,
    immediate,
    partial,
    constant,
    compose
} from './lib';

import fetch from 'isomorphic-fetch';
import AsyncResult from './async-result';

import * as Result from './result';

import { toJson } from './core';

import httpHandler from './lib/http-handler';

const request =  partial((middleware, asyncRequest, ...args) => {
    const asyncResult = asyncRequest(...args);

    switch(isThennable(asyncResult)) {
        case AsyncResult.NOT_THENNABLE:
            return immediate(constant(asyncResult), middleware);
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
});

const middlewareClient = (...middleware) => {
    return {
        request:   (...args) => request(compose(...middleware, httpHandler), ...args),
        fetch:     (...args) => request(compose(...middleware, httpHandler), fetch, ...args),
        fetchJSON: (...args) => request(compose(toJson(compose(...middleware)), httpHandler), fetch, ...args)
    }
};

export { request, middlewareClient, Result };