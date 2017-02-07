import {
    isThennable,
    defer,
    partial,
    constant
} from './lib';

import AsyncResult from './async-result';

export default partial(function thru(middleware, ajax, ...args) {
    const asyncResult = ajax(...args);

    switch(isThennable(asyncResult)) {
        case AsyncResult.NOT_THENNABLE:
            return defer(constant(asyncResult), middleware);
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
});
