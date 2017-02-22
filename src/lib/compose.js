import isThennable from './is-thennable';
import { validObject } from '../core';

function fromThen(x, fn) {
    return x.then(fn);
}

export default function asyncCompose(...fns) {
    return (v) => fns.reverse().reduce((x, y) => {
        return validObject(x) && isThennable(x) ? fromThen(x, y) : y(x);
    }, v);
}