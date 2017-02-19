import {
    isThennable,
    identity,
    immediate,
    constant,
    asyncCompose,
    partial
} from './lib';

import fetch from 'isomorphic-fetch';
import AsyncResult from './async-result';

import * as Result from './result';
import Tuple from './lib/tuple'

import { toJson } from './core';

import httpHandler from './lib/http-handler';

const _request =  partial((middleware, asyncRequest, ...args) => {
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
        request: (...args) => {
            const transforms = asyncCompose(toJson(asyncCompose(...middleware)), httpHandler);
            return _request(transforms, fetch, ...args)
        }
    }
};

const request = middlewareClient(identity).request;

export { middlewareClient, request, Tuple, Result };
