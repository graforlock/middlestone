import AsyncResult from '../async-result';

export default function isThennable(resultingAsync) {
    return resultingAsync.then
        ? AsyncResult.THENNABLE
        : AsyncResult.NOT_THENNABLE
}