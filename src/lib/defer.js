import identity from './identity';

import * as Result from '../result';

const delayed = typeof process !== 'undefined'
            ?  process.nextTick
            :  setTimeout;

export default function defer(lambda, middleware = identity, tick = 0) {

    if (lambda()) {
        return Result.Ok(middleware(lambda()));
    }

    if(tick >= 1000) {
        return new Result.Err('Error: Async handler has timed out.');
    }

    delayed(defer.bind(null, lambda, middleware, tick + 1));
}