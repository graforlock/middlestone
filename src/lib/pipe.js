export default function pipe(x) {
    return {
        pipe: fn => pipe(fn(x)),
        value: x
    }
}
