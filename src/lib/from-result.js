export default function fromResult(result) {
    return new Promise(resolve => {
        result.then(result => {
            return result.isOk()
                ? resolve({Ok: result, Err: null})
                : resolve({Ok: null, Err: result});
        });
    });
}