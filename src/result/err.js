import Result from './result';

export default class Err extends Result {
    constructor(x) {
        super(x);
    }

    map(_) {
        return new Err(this.x);
    }
}

