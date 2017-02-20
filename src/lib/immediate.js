import identity from './identity';
import {Ok, Err} from '../result';

import Messages from '../constants/messages';

export default function immediate(lambda, middleware = identity) {
    if (typeof lambda() !== 'undefined' && lambda() !== null) {
        return new Ok(middleware(lambda()));
    } else {
        return new Err(Messages.IMMEDIATE_ERR);
    }
}