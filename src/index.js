import {
    isThennable,
    immediate,
    constant,
    compose,
    partial
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
            const syncResult = asyncResult;
            return immediate(constant(syncResult), middleware);
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
});

const middlewareClient = (...middleware) => {
    return {
        request:   (...args) => request(compose(...middleware, httpHandler), ...args),
        fetch:     (...args) => request(compose(toJson(compose(...middleware)), httpHandler), fetch, ...args)
    }
};

export { fetch, middlewareClient, Result, request };
