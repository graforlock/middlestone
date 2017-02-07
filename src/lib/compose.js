export default function compose(...fns) {
    return (v) => fns.reverse().reduce((x, y) => y(x), v);
}