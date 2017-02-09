import identity from './identity';
import thenify from './thenify';

const delayed = typeof process !== 'undefined'
            ?  process.nextTick
            :  setTimeout;

const TIMEOUT_LIMIT = 1000;

export default function defer(lambda, middleware = identity, tick = 0) {

    if (lambda()) {
        return thenify(middleware(lambda()));
    }

    if(tick >= TIMEOUT_LIMIT) {
        return new Error('Error: Async handler has timed out.');
    }

    delayed(defer.bind(null, lambda, middleware, tick + 1));
}