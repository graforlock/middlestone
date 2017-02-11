export function toJson(composed) {
    return res => res.map(r => r.json().then(composed));
}
