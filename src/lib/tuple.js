export default function Tuple(a, b) {
    if(this instanceof Tuple) {
        this.a = a;
        this.b = b;
    }
    else {
        return new Tuple(a, b);
    }
}

Tuple.prototype.switchMap = function(fn) {
    return fn(this.a, this.b);
};