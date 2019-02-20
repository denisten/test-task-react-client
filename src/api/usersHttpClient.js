import {HttpService} from '@qiwi/let-fly-at-http/build';
import config from '../config';
import ls from '../storage/localStorage';

export class UsersHttpClient extends HttpService {
    constructor() {
        super(config.apiUrl, {
            headers: {
                 Authorization: 'Bearer ' + ls.getItem('jwt')
            }
        });
    }
}
