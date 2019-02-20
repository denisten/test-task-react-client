import {UsersListPage} from './UsersListPage';
import {connect} from 'react-redux';
import {select} from "../../../model";

export default connect((state) => {
    return {
        router: state.router,
        users: state.users.data.users,
        isLoadingUsers: select.users.isLoadingUsers(state),
        getErrorMessageForUsers: select.users.getErrorMessageForUsers(state)
    }
})(UsersListPage);
