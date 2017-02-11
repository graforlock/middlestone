export default function fetchWrapper(composed) {
    return res => res.map(r => r.json().then(composed));
}
