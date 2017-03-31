export default function fromResult(result) {
    return result.isOk()
        ? {Ok: result, Err: null}
        : {Ok: null, Err: result};
}