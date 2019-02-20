import React from 'react';
import {Loader} from '../../common/Loader';
import UsersItem from './UsersItem';
import './UsersItem.css';

export class UsersListPage extends React.Component {

  componentDidMount() {
    this.props.dispatch.users.initUsersService();
  };

    render() {
      const arr = [...this.props.users];
      const loading = this.props.isLoadingUsers ? <Loader /> : null;
      const errorMessage = this.props.getErrorMessageForUsers ? <span className="alert alert-danger">I got error, sorry but no content now</span>: null;
      const content = arr.map((i) => {
        return (
          <li key = {i.idUser} className="list-group-item">
          <UsersItem label = {i.userName + ' - ' + i.userEmail} />
          </li>
        );
    });
        return (
            <div>
              <div className="h1">Список пользователей:</div>
              <ul className="list-group box1">
                {errorMessage}
                {loading}
                {content}
              </ul>
            </div>
        );
    }
}
