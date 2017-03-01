import Result from './result';

export default class Err extends Result {
    constructor(x) {
        super(x);
    }

    static of(x) {
        return new Err(x);
    }

    map(_) {
        return new Err(this.x);
    }

    orElse(fn) {
         return new Err(fn(this.x));
    }

    andThen(_) {
        return new Err(this.x);
    }

    unwrapOr(x) {
        return x;
    }

    unwrapOrElse(fn) {
        return fn(this.x);
    }
}

