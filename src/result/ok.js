import Result from './result';
import { isThennable } from '../lib';

export default class Ok extends Result {
    constructor(x) {
        super(x);
    }

    static of(x) {
        return new Ok(x);
    }

    map(fn) {
        return new Ok(fn(this.x));
    }

    orElse(_) {
        return new Ok(this.x);
    }

    andThen(fn) {
        return isThennable(this.x)
            ? new Ok(this.x.then(fn))
            : new Ok(fn(this.x));
    }

    unwrapOr(_) {
        this.unwrap();
    }

    unwrapOrElse() {
        this.unwrap();
    }
}

