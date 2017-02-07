import * as driver from './index';

export default function assert(asyncRequest) {
    switch(asyncRequest.name) {
        case 'wrap':
            return driver.axios;
        case 'fetch':
            return axios.fetch;
        default:
            return driver.jquery;
    }
}