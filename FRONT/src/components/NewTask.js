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
import axios from "axios";

export class TodoApp extends Component {
  constructor(props) {
    super(props);
    let _isMounted = false;
    let newItem;

    this.state = {
      redirect: false,
      text: "",
      responsible: { name: "", email: "" },
      status: "",
      dueDate: moment(),
      fileUrl: "coño",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postfile = this.postfile.bind(this);
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

  postfile() {
    let data = new FormData();
    data.append("file", this.state.file);
    let that = this;
    let p = new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8080/api/files", data)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          console.log("failed file upload", error);
          reject();
        });
    });

    return p;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState(this.newItem);
      console.log(this.state);
      
  }

  handleSubmit(e) {
    
    let that = this;
    e.preventDefault();
    this._isMounted = true;
    this.postfile().then((response) => {
      if (this._isMounted) {
        that.setState({ fileUrl: response.data });

        if (
          !that.state.text.length ||
          !that.state.status.length ||
          !that.state.dueDate
        )
          return;
        this.newItem = {
          redirect: true,
          text: this.state.text,
          responsible: {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
          },
          status: this.state.status,
          dueDate: new Date(this.state.dueDate),
          fileUrl: this.state.fileUrl,
        };
      }
      this.props.submit(this.newItem);
      this.setState({redirect:true});
      axios
        .post("http://localhost:8080/api/todo", this.newItem)
        .then(function (response) {
          console.log("Posted Broly")
        })
        .catch(function (error) {
          console.log("failed Broly", error);
         
        });
      
    });
    
   
  }
}

export default TodoApp;
