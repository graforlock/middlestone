import { identity } from '../lib';

export const logger = (text, fn = identity) => x => {
    console.log(text, fn(x));
    return x;
};