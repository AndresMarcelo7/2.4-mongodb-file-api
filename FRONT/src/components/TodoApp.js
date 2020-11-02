import React, { Component } from "react";
import "./TodoApp.css";
import { TodoList } from "./TodoList";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { Card } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import moment from "moment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Link } from "react-router-dom";
import FilterModal from "./FilterModal";

export class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateF: "",
      responsibleF: "",
      statusF: "",
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  render() {
    let items = this.filterList(this.props.items);
    return (
      <div className="App">
        <TodoList todoList={items} />
        <div style={{ float: "right" }}>
          <Link to="/NewTask">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
          <FilterModal handleFilters={this.handleFilter}></FilterModal>
        </div>
      </div>
    );
  }

  handleFilter(date, responsible, status) {
    this.setState({
      dateF: date,
      responsibleF: responsible,
      statusF: status,
    });
  }

  filterList(list) {
    let filtered = list;

    if (this.state.statusF != "") {
      filtered = filtered.filter((todo) => todo.status === this.state.statusF
      );
    }
    if (this.state.responsibleF != "") {
      filtered = filtered.filter((todo) => todo.responsible.name === this.state.responsibleF
      );
    }
    if (this.state.dateF != "") {
      filtered = filtered.filter((todo) => moment(todo.dueDate).format("dd-MM-yyyy") === moment(this.state.dateF).format("dd-MM-yyyy")
      );
    }
    return filtered;
  }
}

export default TodoApp;
