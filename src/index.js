import {
    isThennable,
    identity,
    immediate,
    constant,
    asyncCompose,
    partial
} from './lib';

import fetch from 'isomorphic-fetch';
import Promise from 'es6-promise';

import AsyncResult from './async-result';

import * as Result from './result';
import Tuple from './lib/tuple'

import {toJson, getConfig, getComposable} from './core';

import httpHandler from './lib/http-handler';

const _request = partial((middleware, asyncRequest, ...args) => {
    const asyncResult = asyncRequest(...args);

    switch (isThennable(asyncResult)) {
        case AsyncResult.NOT_THENNABLE:
            const syncResult = asyncResult;
            return new Promise(
                resolve => resolve(new Result.Ok(immediate(constant(syncResult), middleware))),
                reject => reject(new Result.Err('Error while parsing immediate Sync value.'))
            );
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
});

const middlewareClient = (...middleware) => {
    return {
        request: (...args) => {
            const config = getConfig(middleware),
                  composable = getComposable(middleware);

            const handleOk = toJson(asyncCompose(...composable), config);
            return _request(asyncCompose(handleOk, httpHandler), fetch, ...args);
        }
    }
};

const retry = () => { /* TODO */ };

const request = middlewareClient(identity).request;

// Example:
// function retry(tick = 100) {
//     if(tick === 0) return;
//     middleware(x => x, { 404: x => thru.request('https://jsonplaceholder.typicode.com/posts/1') })
//         .request('https://jsonplaceholder.typicode.com/polsts/1')
//         .then(x => x.andThen(identity).orElse(v => setTimeout(retry.bind(null, tick - 1), 250)));
// }

export {middlewareClient, request, Tuple, Result};
