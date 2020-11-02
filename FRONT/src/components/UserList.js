import React from 'react';
import User from './User';

export class UserList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const todoList = this.props.usersList.map((u, i) => {
            return (
                <User key={i} name={u.userName} email={u.userEmail} id={u.userId}/>
            );
        });

        return (
            <div>
                <h2>USERS</h2>
                {todoList}
            </div>
                
        );


    }

}