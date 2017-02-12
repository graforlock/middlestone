import { Err, Ok } from '../result';

export default (response) => {
        return (response.status >= 400)
            ? new Err(response.status)
            : new Ok(response);
};
