import Result from './result';

export default class Ok extends Result {
    constructor(x) {
        super(x);
    }

    map(fn) {
        return new Ok(fn(this.x));
    }

    orElse(_) {
        return new Ok(this.x);
    }
}

