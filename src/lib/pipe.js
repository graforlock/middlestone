import compose from './compose';

export default function pipe(...fns) {
    const reversed = fns.reverse();
    return compose(reversed);
}
