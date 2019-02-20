import {UserApiService} from '../../../../api/users';
import Machine from '@qiwi/cyclone';
import {AuthError} from "../../../../error/authError";

const OK = 'ok';
const LOADING = 'loading';
const INITIAL = 'init';
const INITIALISED = 'initialised';
const UNAUTHORIZED= 'unautorized';
const LOADING_USERS_ERROR= 'loadingUsersError';

const machine = new Machine({
    initialState: INITIAL,
    initialData: {
        users: [],
        error: {
            userMessage: ''
        }
    },
    transitions: {
        'init>initialised': true,
        'initialised>loading': true,
        'ok>loading': true,
        'loading>ok': (state, res) => res,
        'loading>loadingUsersError': (state, res) => res,
        'loading>unautorized': true,
        'unautorized>loading': true,
    }
});

let users;
export default
{
  state: machine.current(),
  reducers: {
      next(prev, next, ...payload) {
          return machine.next(next, ...payload).current()
      }
  },
  effects: {
      initUsersService() {
        users = new UserApiService();
        this.next(INITIALISED);
        this.getUsers();

      },
      async getUsers() {
        this.next(LOADING);
        try{
          const gotUsers = await users.getUsers();
          this.next(OK, {
              users: gotUsers
          });
        } catch (err) {
                if (err instanceof AuthError && err.code === AuthError.UNAUTHORIZED) {
                    this.next(UNAUTHORIZED);
                    return;
                }
                this.next(LOADING_USERS_ERROR, {error: {userMessage: 'Something was wrong'}, users: []});
            }
      }
  },
  selectors: (slice, createSelector, hasProps) => ({
      isLoadingUsers() {
        return slice(users => {
            return users.state === LOADING
        });
      },
      isInitialUsers() {
        return slice(users => {
            return users.state === INITIAL
        });
      },
      getErrorMessageForUsers() {
          return slice(auth => {
              return (auth.data && auth.data.error && auth.data.error.userMessage) || undefined;
          })
      }
  })
}
