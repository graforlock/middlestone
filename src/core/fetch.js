import {identity} from '../lib';

export function getComposable(middleware) {
    const composables = middleware.filter(x => typeof x === 'function');
    return composables.length ? composables : identity;
}

export function getConfig(middleware) {
    const config = middleware.filter(x => typeof x === 'object');
    return config.length ? config[0] : {};
}

const handleStatus = (config, x) => {
    return x.isErr() && config[x.unwrap()];
};

export function toJson(composed, config) {
    return res =>
         handleStatus(config, res)
             ? res.orElse(config[res.unwrap()])
             : res.map(r => r.json().then(composed))
}
