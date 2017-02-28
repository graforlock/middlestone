export default class Result {
    constructor(x) {
        this.x = x;
    }

    unwrap() {
        return this.x;
    }

    isOk() {
        return this.constructor.name === 'Ok';
    }

    isErr() {
        return this.constructor.name === 'Err';
    }

    inspect() {
        const inspection = this.x && this.x.status ? this.x.status : this.x;
        return `${this.constructor.name}(${inspection})`;
    }
}