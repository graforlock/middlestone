export default function constant(x) {
    return () => typeof x === 'function' ? x() : x;
}