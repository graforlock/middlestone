import test from 'tape';

import $ from 'jquery';
import axios from 'axios';
import fetch from 'isomorphic-fetch';

import thru from '../src';

import { constant, defer, isThennable, partial, thenify } from '../src/lib';
import AsyncResult from '../src/async-result';

const settings = Object.freeze({
    API: 'https://jsonplaceholder.typicode.com/posts/1'
});

test("Thru import exists", expect => {
    expect.plan(1);

    expect.ok(thru);
});

test("Thru is partially applied and returns then for immediate values", expect => {
    expect.plan(3);

    expect.equals(typeof thru(x => x), 'function');
    expect.equals(typeof thru(x => x, () => "result!"), 'object');
    expect.equals(typeof thru(x => x, () => "result!").then, 'function');
});

test("Thru returns .then()", expect => {
    expect.plan(1);

    expect.equals(typeof thru(x => x.id, $.get, settings.API).then, 'function');
});

test("Thru calls .then() resolvers", expect => {
    expect.plan(3);

    let  axiosOutput = null,
         fetchOutput = null,
         jQueryOutput = null;

    thru(x => x.id, $.get, settings.API)
        .then(id => { jQueryOutput = id; })
        .then(() => { expect.equals(typeof jQueryOutput , 'number', '| thru is jQuery compatible.') });

    thru(x => x.json(), fetch, settings.API)
        .then(x => x.id)
        .then(id => { fetchOutput = id; })
        .then(() => { expect.equals(typeof fetchOutput , 'number', '| thru is fetch compatible.') });

    thru(x => x.data, axios.get, settings.API)
        .then(x => x.id)
        .then(id => { axiosOutput = id; })
        .then(() => { expect.equals(typeof axiosOutput , 'number', '| thru is axios compatible.') });

});

test("Thru library tests", expect => {
    expect.plan(12);

    const addTwo = (a, b) => a + b;

    expect.equal(typeof constant(() => 10), 'function');
    expect.equal(typeof constant(() => 10)(), 'number');

    expect.equal(isThennable(123), AsyncResult.NOT_THENNABLE);
    expect.equal(isThennable($.get(settings.API)), AsyncResult.THENNABLE);

    expect.equal(typeof partial(addTwo), 'function');
    expect.equal(typeof partial(addTwo)(1), 'function');
    expect.equal(typeof partial(addTwo)(1, 2), 'number');
    expect.equal(typeof partial(addTwo)(1)(2), 'number');

    expect.equal(thenify(123).unwrap(), 123);
    expect.equal(thenify(123).then(x => x * 2).unwrap(), 123 * 2);

    expect.equal(defer(() => 10, x => x * x).unwrap(), 100);

    let mutable = null;
    const captureReference = () => mutable;

    setTimeout(() => mutable = 100);

    defer(captureReference, x => {
        expect.equal(x, 100);
        return x;
    });
});



