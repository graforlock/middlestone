const handleStatus = (objects, x) => {
    return !objects.length || x.isErr() && objects[0][x.unwrap()] === 'undefined';
};

export function toJson(composed, objects) {
    return res =>
         handleStatus(objects, res)
            ? res.map(r => r.json().then(composed))
            : res.orElse(objects[0][res.unwrap()]);
}
