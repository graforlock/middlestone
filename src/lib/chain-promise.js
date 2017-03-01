export default function chainPromise(x) {
    return x.then(x => x.unwrap());
}