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
import { Link, Redirect } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { postTask } from "../callApi";
import axios from 'axios';

export class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      text: "",
      responsible: { name: "", email: "" },
      status: "",
      dueDate: moment(),
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="App">
        <br />
        <br />
        <form onSubmit={this.handleSubmit} className="todo-form">
          <h3>New TODO</h3>
          <Card>
            <CardContent>
              <label htmlFor="text" className="right-margin">
                Text:
              </label>

              <TextField
                id="text"
                onChange={this.handleTextChange}
                value={this.state.text}
              ></TextField>

              <br />
              <br />
              <label htmlFor="status" className="right-margin">
                Status:
              </label>

              <TextField
                id="status"
                type="text"
                onChange={this.handleStatusChange}
                value={this.state.status}
              ></TextField>
              <br />
              <br />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={this.state.dueDate}
                  onChange={this.handleDateChange}
                  format="dd/MM/yyyy"
                />
              </MuiPickersUtilsProvider>

              <br />
              <br />

              <input type="file" id="file" onChange={this.handleInputChange} />
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button size="large" color="secondary" type="submit">
                Add
              </Button>
            </CardActions>
          </Card>
        </form>
        <br />
        <br />
      </div>
    );
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleStatusChange(e) {
    this.setState({
      status: e.target.value,
    });
  }
  handleInputChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  handleDateChange(date) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    console.log(date);
    this.setState({
      dueDate: new Date(date),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("file", this.state.file);

    axios
      .post("http://localhost:8080/api/files", data)
      .then(function (response) {
        console.log("file uploaded!", data);
      })
      .catch(function (error) {
        console.log("failed file upload", error);
      });
    
    if (
      !this.state.text.length ||
      !this.state.status.length ||
      !this.state.dueDate
    )
      return;

    const newItem = {
      redirect: true,
      text: this.state.text,
      responsible: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      },
      status: this.state.status,
      dueDate: new Date(this.state.dueDate),
    };
    this.setState(newItem);
    this.props.submit(newItem);
    postTask(newItem);
  }
}

export default TodoApp;
