import thenify from './thenify';

const delayed = typeof process !== 'undefined'
            ?  process.nextTick
            :  setTimeout;

export default function defer(lambda, middleware) {
    if (lambda()) {
        return thenify(middleware(lambda()));
    }

    delayed(defer.bind(null, lambda, middleware));
}