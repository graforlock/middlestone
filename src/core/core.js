import {asyncCompose, identity, isThennable, httpHandler} from '../lib';
import { Ok, Err } from '../result';

const handleErr = (config, x) => {
    let {status} = x.unwrap();
    return x.isErr() && config[status];
};

export function getComposable(middleware) {
    const composables = middleware
        ? middleware.filter(x => typeof x === 'function')
        : [];
    return composables.length ? composables : [identity];
}

export function getConfig(middleware) {
    const config = middleware.filter(x => typeof x === 'object');
    return config.length ? config[0] : {};
}

// Some APIs do return null, and null is of type object.
// It is still a valid response in some cases.
export function validObject(response) {
    return response !== null && typeof response === 'object';
}

export function toJson(composed, config) {
    return res => {
        if (handleErr(config, res)) {
            return new Promise(resolve => {
                res.orElse(config[res.unwrap().status])
                    .orElse(x => x.then(_x => _x.isOk() ? resolve(Ok.of(_x.unwrap())) : resolve(Err.of(_x.unwrap()))));
            });
        } else {
            return res.map(r => r.json().then(composed));
        }
    }
}
