import {identity} from '../lib';

export function getComposable(middleware) {
    const composable = middleware.filter(x => typeof x === 'function');
    return composable.length ? composable : identity;
}

export function getConfig(middleware) {
    const objects = middleware.filter(x => typeof x === 'object');
    return objects[0] ? objects[0] : {};
}

const handleStatus = (config, x) => {
    return x.isErr() && config[x.unwrap()] === 'undefined';
};

export function toJson(composed, config) {
    return res =>
         handleStatus(config, res)
            ? res.map(r => r.json().then(composed))
            : res.orElse(config[res.unwrap()]);
}
