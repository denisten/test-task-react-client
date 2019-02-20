import {AuthError} from "../../error/authError";
import {UsersHttpClient} from "../usersHttpClient";
const ERROR_LOGIN_FAILED = 'ERROR_LOGIN_FAILED';

export class UserApiService {
    constructor() {
        this.client = new UsersHttpClient();
    }
    async getUsers() {
        try {
            const apiResponse = await this.client.get('users/items');
            return apiResponse;
        }
        catch (err) {
            let errorBody;
            if (err && err.response && err.response.json) {
                errorBody = await err.response.json();
            }
            switch (errorBody && errorBody.error) {
                case errorBody.error === '401':
                    throw new AuthError(AuthError.BAD_CREDENTIALS, errorBody);
                default:
                    throw new AuthError(AuthError.API_ERROR, errorBody);
            }
          }
    }
    async getCurrentUser(id) {
        try {
            const apiResponse = await this.client.get('users/item/', {id});
            return apiResponse;
        }
        catch (err) {
            let errorBody;
            if (err && err.response && err.response.json) {
                errorBody = await err.response.json();
            }
            switch (errorBody && errorBody.error) {
                case ERROR_LOGIN_FAILED:
                    throw new AuthError(AuthError.BAD_CREDENTIALS, errorBody);
                default:
                    throw new AuthError(AuthError.API_ERROR, errorBody);
            }
          }
    }
}
