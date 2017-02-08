import test from 'tape';

import * as drivers from '../src/drivers';

import $ from 'jquery';
import axios from 'axios';
import fetch from 'isomorphic-fetch';

import { request, middlewareClient } from '../src';

import { compose, constant, defer, identity, isThennable, partial, thenify} from '../src/lib';

import AsyncResult from '../src/async-result';

const settings = Object.freeze({
    API: 'https://jsonplaceholder.typicode.com/posts/1'
});

test("Thru import exists", expect => {
    expect.plan(1);

    expect.ok(request,
        '| Module import test.');
});

test("Thru is partially applied and returns then for immediate values", expect => {
    expect.plan(2);

    expect.equals(typeof request(x => x), 'function',
        '| Partial application step 1.');
    expect.equals(typeof request(x => x, () => "result!"), 'object',
        '| Partial application step 2.');

});

test("Thru returns .then()", expect => {
    expect.plan(2);

    expect.equals(typeof request(x => x, () => "result!").then, 'function',
        '| Basic .then() retrieval.');
    expect.equals(typeof request(x => x.id, $.get, settings.API).then, 'function',
        '| Ajax/HTTP .then() retrieval.');
});

test("Library compatibility for unwrapping GET requests", expect => {
    expect.plan(3);

    let  axiosOutput = null,
         fetchOutput = null,
         jQueryOutput = null;

    request(drivers.jquery, $.get, settings.API)
        .then(x => x.id)
        .then(id => { jQueryOutput = id; })
        .then(() => { expect.equals(typeof jQueryOutput , 'number',
            '| Request is jQuery compatible.') });

    request(drivers.fetch(compose(x => x.id)), fetch, settings.API)
        .then(id => { fetchOutput = id; })
        .then(() => { expect.equals(typeof fetchOutput , 'number',
            '| Request is fetch compatible.') });

    request(drivers.axios, axios.get, settings.API)
        .then(x => x.id)
        .then(id => { axiosOutput = id; })
        .then(() => { expect.equals(typeof axiosOutput , 'number',
            '| Request is axios compatible.') });

});

test("Thru core library tests", expect => {
    expect.plan(12);

    const addTwo = (a, b) => a + b;

    expect.equal(typeof constant(() => 10), 'function',
        '| Constant returns a function type.');
    expect.equal(typeof constant(() => 10)(), 'number',
        '| Constant returns a number result.');

    expect.equal(isThennable(123), AsyncResult.NOT_THENNABLE,
        '| isThennable returns a NOT_THENNABLE enum.');
    expect.equal(isThennable($.get(settings.API)), AsyncResult.THENNABLE,
        '| isThennable returns a THENNABLE enum.');

    expect.equal(typeof partial(addTwo), 'function',
        '| Partially applies addTwo.');
    expect.equal(typeof partial(addTwo)(1), 'function',
        '| Partially applies addTwo with step 1.');
    expect.equal(typeof partial(addTwo)(1, 2), 'number',
        '| Partially applies addTwo with step 2 and returns.');
    expect.equal(typeof partial(addTwo)(1)(2), 'number',
        '| Partially applies addTwo with two separate steps and returns.');

    expect.equal(thenify(123).unwrap(), 123,
        '| Thenify unwraps a correct stored value.');
    expect.equal(thenify(123).then(x => x * 2).unwrap(), 123 * 2,
        '| Thenify unwraps a correct stored value after .then().');

    expect.equal(defer(() => 10, x => x * x).unwrap(), 100,
        '| Defer defers an immediate value return.');

    let mutable = null;
    const captureReference = () => mutable;

    setTimeout(() => mutable = 100);

    defer(captureReference, x => {
        expect.equal(x, 100,
            '| Defer defers a deferred value return.');
        return x;
    });
});



