import isThennable from './is-thennable';

function fromThen(x, fn) {
    return x.then(fn);
}

export default function asyncCompose(...fns) {
    return (v) => fns.reverse().reduce((x, y) => {
        return isThennable(x) ? fromThen(x, y) : y(x);
    }, v);
}