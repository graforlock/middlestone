import HttpStatus from 'http-status-codes';

import { Err, Ok } from '../result';

export default (response) => {

        switch (response.status) {
            case HttpStatus.INTERNAL_SERVER_ERROR:
            case HttpStatus.SERVICE_UNAVAILABLE:
            case HttpStatus.FORBIDDEN:
            case HttpStatus.LOCKED:
                return new Err(response.status);
            default:
                break;
        }

        return (response.status >= 400)
            ? new Err('Bad response from server.')
            : new Ok(response);
};