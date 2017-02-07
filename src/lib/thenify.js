export default function thenify(x) {
    if (this instanceof thenify) {
        this.x = x;
    }
    else {
        return new thenify(x);
    }
}

thenify.prototype.then = function(fn) {
    return new thenify(fn(this.x));
};