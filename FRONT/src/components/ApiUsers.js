import React from 'react';
import { UserList } from './UserList';


class ApiUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
        };
    }

    componentDidMount() {
        fetch('http://marcelo-task-planner-backend.southcentralus.azurecontainer.io:8080/users')
            .then(response => response.json())
            .then(data => {
                let usersList = [];
                console.log(data);
                data.forEach(function (user) {
                    usersList.push({
                       "userId":user.id,
                        "userEmail":user.email,
                       "userName":user.name
                    })

                });
                this.setState({userList: usersList});
            });
    }

    render() {
        return (
            <div>
                <UserList usersList={this.state.userList}/>
            </div>
        );
    }
}

export default ApiUsers;