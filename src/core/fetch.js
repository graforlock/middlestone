import {identity} from '../lib';

const handleErr = (config, x) => {
    return x.isErr() && config[x.unwrap()];
};

export function getComposable(middleware) {
    const composables = middleware.filter(x => typeof x === 'function');
    return composables.length ? composables : identity;
}

export function getConfig(middleware) {
    const config = middleware.filter(x => typeof x === 'object');
    return config.length ? config[0] : {};
}

export function validObject(response) {
    return response !== null && typeof response === 'object';
}

export function toJson(composed, config) {
    return res =>
         handleErr(config, res)
             ? res.orElse(config[res.unwrap()]).unwrap()
             : res.map(r => r.json().then(composed))
}
