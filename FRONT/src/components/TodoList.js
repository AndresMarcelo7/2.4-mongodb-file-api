import React from 'react';
import {Todo} from './Todo'

export class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} text={todo.text} status={todo.status} responsible={{name:todo.responsible.name,email:todo.responsible.email}} dueDate={todo.dueDate}/>
            );
        });

        return (
            <div>
                {todoList}
            </div>
                
        );


    }

}