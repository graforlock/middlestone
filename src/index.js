import { isThennable } from './lib';
import Promise from 'es6-promise';

import AsyncResult from './async-result';

export default function thru(middleware, ajax, ...args) {
    const asyncResult = ajax.apply(null,args);

    switch(isThennable(asyncResult)) {
        case AsyncResult.NOT_THENNABLE:
            return new Promise(asyncResult).then(middleware);
        case AsyncResult.THENNABLE:
            return asyncResult.then(middleware);
    }
};
