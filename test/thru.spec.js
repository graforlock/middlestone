import test from 'tape';

import * as drivers from '../src/core';

import $ from 'jquery';
import axios from 'axios';
import fetch from 'isomorphic-fetch';

import {request, middlewareClient, Result} from '../src';
import * as thru from '../src';

import {compose, constant, immediate, identity, isThennable, partial} from '../src/lib';

import {Err, Ok} from '../src/result';

import AsyncResult from '../src/async-result';
import httpHandler from '../src/lib/http-handler';

const API_URL = 'https://jsonplaceholder.typicode.com';

const settings = Object.freeze({
    API_GET: `${API_URL}/posts/1`,
    API_POST: `${API_URL}/posts`,
    ERROR_MSG: 'Error has occured!',
    SUCCESS_MSG: 'Result is: true.',
    SPACER: '----'
});

test(`\n${settings.SPACER}[1] Import exists${settings.SPACER}`, expect => {
    expect.plan(2);

    expect.ok(request,
        '| Module import test.');
    expect.equal(Object.keys(thru).length, 4,
        '| Module exports 4 interfaces.')
});

test(`\n${settings.SPACER}[2] Request is partially applied and returns then for immediate values${settings.SPACER}`, expect => {
    expect.plan(2);

    expect.equals(typeof request(x => x), 'function',
        '| Partial application step 1.');
    expect.equals(typeof request(x => x, () => "result!"), 'object',
        '| Partial application step 2.');

});

test(`\n${settings.SPACER}[3] Library compatibility for unwrapping GET/POST requests${settings.SPACER}`, expect => {
    expect.plan(2);

    let axiosOutput = null,
        fetchOutput = null,
        jQueryOutput = null;

    request(identity, $.get, settings.API_GET)
        .then(x => x.id)
        .then(id => {
            jQueryOutput = id;
        })
        .then(() => {
            expect.equals(typeof jQueryOutput, 'number',
                '| Request is jQuery GET ompatible.')
        });

    request(drivers.toJson(compose(x => x.id, httpHandler)), fetch, settings.API_GET)
        .then(result => result.unwrap())
        .then(id => {
            fetchOutput = id;
        })
        .then(() => {
            expect.equals(typeof fetchOutput, 'number',
                '| Request is fetch compatible.')
        });

    request(x => x.data, axios.get, settings.API_GET)
        .then(x => x.id)
        .then(id => {
            axiosOutput = id;
        })
        .then(() => {
            expect.equals(typeof axiosOutput, 'number',
                '| Request is axios compatible.')
        });

});

test(`\n${settings.SPACER}[4] Middleware Client functionality for GET/POST requests${settings.SPACER}`, expect => {
    expect.plan(2);
    let client = middlewareClient(x => x.id);

    client.fetch(settings.API_GET)
        .then(result => result.unwrap())
        .then(id => {
            expect.equals(typeof id, 'number',
                '| middlewareClient fetches the fetch request with simple middleware.')
        });

    client.fetch(settings.API_POST, {
        method: 'POST',
        body: "title=Mayo&body=naise"
    })
        .then(result => result.unwrap())
        .then(id => {
            expect.equals(typeof id, 'number',
                '| middlewareClient posts the fetch request with simple middleware.')
        });

});

test(`\n${settings.SPACER}[5] Core library tests${settings.SPACER}`, expect => {
    expect.plan(9);

    const addTwo = (a, b) => a + b;

    expect.equal(typeof constant(() => 10), 'function',
        '| Constant returns a function type.');
    expect.equal(typeof constant(() => 10)(), 'number',
        '| Constant returns a number result.');

    expect.equal(isThennable(123), AsyncResult.NOT_THENNABLE,
        '| isThennable returns a NOT_THENNABLE enum.');
    expect.equal(isThennable($.get(settings.API_GET)), AsyncResult.THENNABLE,
        '| isThennable returns a THENNABLE enum.');

    expect.equal(typeof partial(addTwo), 'function',
        '| Partially applies addTwo.');
    expect.equal(typeof partial(addTwo)(1), 'function',
        '| Partially applies addTwo with step 1.');
    expect.equal(typeof partial(addTwo)(1, 2), 'number',
        '| Partially applies addTwo with step 2 and returns.');
    expect.equal(typeof partial(addTwo)(1)(2), 'number',
        '| Partially applies addTwo with two separate steps and returns.');

    expect.equal(immediate(() => 10, x => x * x).unwrap(), 100,
        '| An immediate value return.');
});

test(`\n${settings.SPACER}[6] Result tests${settings.SPACER}`, expect => {
    expect.plan(9);

    expect.ok(Result,
        '| Module import test.');

    const ok = new Ok(1234),
          err = new Err('Error has occurred');

    expect.equals(typeof ok.unwrap, 'function',
        '| Ok implements Result\'s .unwrap().');
    expect.equals(typeof ok.isOk, 'function',
        '| Ok implements Result\'s .isOk().');
    expect.equals(typeof ok.isErr, 'function',
        '| Ok implements Result\'s .isErr().');
    expect.equals(typeof ok.inspect, 'function',
        '| Ok implements Result\'s .inspect.');

    expect.equals(typeof err.unwrap, 'function',
        '| Err implements Result\'s .unwrap().');
    expect.equals(typeof err.isOk, 'function',
        '| Err implements Result\'s .isOk().');
    expect.equals(typeof err.isErr, 'function',
        '| Err implements Result\'s .isErr().');
    expect.equals(typeof err.inspect, 'function',
        '| Err implements Result\'s .inspect.');
});

test(`\n${settings.SPACER}[7] Err/Ok tests${settings.SPACER}`, expect => {
    expect.plan(4);

    const error = new Err(settings.ERROR_MSG)
        .map(identity)
        .orElse(x => x.toUpperCase());

    expect.notEqual(error.unwrap(), settings.ERROR_MSG,
        '| Err ignores map.');
    expect.equal(error.unwrap().toLowerCase(), settings.ERROR_MSG.toLowerCase(),
        '| Err doesn\'t ignore orElse.');

    const ok = new Ok(true)
        .map(_ => settings.SUCCESS_MSG)
        .orElse(identity);

    expect.notEqual(ok.unwrap(), true,
        '| Ok ignores orElse.');
    expect.equal(ok.unwrap(), settings.SUCCESS_MSG,
        '| Ok doesn\'t ignore map.');

});



