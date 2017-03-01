export default function fromResult(result, ok, err) {
    return result.isOk()
        ? result.andThen(ok)
        : result.orElse(err);
}