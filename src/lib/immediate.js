import identity from './identity';
import {Ok, Err} from '../result';

export default function immediate(lambda, middleware = identity) {
    if (typeof lambda() !== 'undefined' && lambda() !== null) {
        return new Ok(middleware(lambda()));
    } else {
        return new Err('Failed to retrieve any immediate value.')
    }
}