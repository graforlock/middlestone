import fromThen from './from-then';
import isThennable from './is-thennable';
import { validObject } from '../core';

export default function asyncCompose(...fns) {
    return (v) => fns.reverse().reduce((x, y) => {
        return validObject(x) && isThennable(x) ? fromThen(x, y) : y(x);
    }, v);
}