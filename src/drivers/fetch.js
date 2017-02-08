export default function fetchWrapper(composed) {
    return res => res.json().then(composed);
}
