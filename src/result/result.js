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

}