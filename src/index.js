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
import Messages from './constants/messages';

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
                reject => reject(new Result.Err(Messages.SYNC_ERR))
            );
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
});

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

const request = middlewareClient(identity).request;

export {middlewareClient, request, Tuple, Result};
