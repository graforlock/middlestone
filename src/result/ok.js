import Result from './result';

export default class Ok extends Result {
    constructor(x) {
        super(x);
    }

    map(f) {
        return new Ok(f(this.x));
    }
}

