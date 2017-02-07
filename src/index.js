import {
    isThennable,
    defer,
    partial,
    compose,
    constant
} from './lib';

import AsyncResult from './async-result';
import assert from './drivers/assert'

export default partial(function thru(middleware, ajax, ...args) {
    const asyncResult = ajax(...args);

    switch(isThennable(asyncResult)) {
        case AsyncResult.NOT_THENNABLE:
            return defer(constant(asyncResult), middleware);
        case AsyncResult.THENNABLE:
            const driver = assert(asyncResult);
            return asyncResult.then(compose(middleware, driver));
    }
});
