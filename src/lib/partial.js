export default function partial(fn) {
    let arity = fn.length;
    return getArgs([]);

    function getArgs(totalArgs) {
        return function stepTwo(...args) {
            let nextTotalArgs = totalArgs.concat(args);
            if (nextTotalArgs.length >= arity) {
                return fn(...nextTotalArgs);
            }
            else {
                return getArgs(nextTotalArgs);
            }
        }
    }
}