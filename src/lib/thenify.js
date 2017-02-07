export default function thenify(x) {
    if (this instanceof thenify) {
        this.x = x;
    }
    else {
        return new thenify(x);
    }
}

thenify.prototype.unwrap = function() { return this.x; };

thenify.prototype.then = function(resolve, reject) {
    try {
        return new thenify(resolve(this.x));
    }
    catch(err) {
        reject(err);
    }
};