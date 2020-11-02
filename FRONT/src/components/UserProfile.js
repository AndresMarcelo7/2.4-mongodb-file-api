


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
import {Link, Redirect} from "react-router-dom";
import ContactMailIcon from '@material-ui/icons/ContactMail';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {redirect:false, name:"",email:"",password:"",confirm:"" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCPasswordChange = this.handleCPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if(this.state.redirect){
      return<Redirect to={'/'} />
  } 
     return (
      <div className="App">
        <br />
        <br />
        <form onSubmit={this.handleSubmit} className="todo-form">
          <h3>User Profile</h3>
          <ContactMailIcon style={{ fontSize: 90 }}color='primary'></ContactMailIcon>
          <Card>
            <CardContent>
              <label htmlFor="text" className="right-margin">
                Name:
              </label>

              <TextField
                id="text"
                onChange={this.handleNameChange}
                value={this.state.text}
              ></TextField>

              <br />
              <br />
              <label htmlFor="status" className="right-margin">
                Email:
              </label>

              <TextField
                id="status"
                type="text"
                onChange={this.handleEmailChange}
                value={this.state.status}
              ></TextField>
              <br />
              <br />
              <label htmlFor="status" className="right-margin">
                Password:
              </label>

              <TextField
                id="status"
                type="text"
                onChange={this.handlePasswordChange}
                value={this.state.status}
              ></TextField>
              <br/>
              <br/>
              <label htmlFor="status" className="right-margin">
                Confirm Password:
              </label>

              <TextField
                id="status"
                type="text"
                onChange={this.handleCPasswordChange}
                value={this.state.status}
              ></TextField>
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
  

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleCPasswordChange(e) {

    this.setState({
      confirm: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      !this.state.name.length ||
      !this.state.email.length ||
      !this.state.password||
      !this.state.confirm
    )
      return;
      if (this.state.password===this.state.confirm){
      localStorage.setItem("email",this.state.email);
      localStorage.setItem("name",this.state.name);
      localStorage.setItem("password",this.state.password);
      this.setState({redirect:true});
      }
      else{
          alert("Passwords doesn't match!")
      }
    
  }
}

export default UserProfile;
