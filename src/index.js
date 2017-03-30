import {
    asyncCompose,
    constant,
    chainPromise,
    fromResult,
    isThennable,
    identity,
    immediate,
    partial
} from './lib';

// Main library dependencies:
import fetch from 'isomorphic-fetch';
import Promise from 'es6-promise';

// Constants and others:
import AsyncResult from './async-result';
import Messages from './constants/messages';
import * as Result from './result';

// Core imports:
import {toJson, getConfig, getComposable} from './core';
import httpHandler from './lib/http-handler';

// Request: a private core functionality
// of the library. This is never directly exposed.
const _request = partial((middleware, asyncRequest, ...args) => {
    const asyncResult = asyncRequest(...args);
    switch (isThennable(asyncResult)) {
        case AsyncResult.NOT_THENNABLE:
            const syncResult = asyncResult;
            return new Promise(
                resolve => resolve(new Result.Ok(immediate(constant(syncResult), middleware))),
                reject => reject(new Result.Err(Messages.SYNC_ERR))
            );
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
});

// Middleware Client: Gives ability to use request
// piped through middleware chain. NOTE: middleware
// is applied using functional composition, which is
// right-to-left (so-called reversed pipe).
const middlewareClient = (...middleware) => {
    let _lastCall = null;
    return {
        request: (...args) => {
            _lastCall = args;

            const config = getConfig(middleware),
                  composables = getComposable(middleware);

            const handleResponse = toJson(asyncCompose(...composables), config);
            return _request(asyncCompose(handleResponse, httpHandler), fetch, ...args);
        },
        retry: () => this.request(..._lastCall)
    }
};

// Request: Exposure of the vanilla request
// functionality. Applies identity as middleware.
// Not very useful for more sophisticated retrying
// functionality.
const request = middlewareClient(identity).request;


// Exports:
export { chainPromise, fromResult, httpHandler, middlewareClient, request, Result };
