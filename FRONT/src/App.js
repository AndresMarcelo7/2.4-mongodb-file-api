import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { TodoApp } from "./components/TodoApp";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { Login } from "./components/Login";
import NavigationDrawer from "./components/NavigationDrawer";
import NewTask from "./components/NewTask";
import { UserProfile } from "./components/UserProfile";
import FilterModal from "./components/FilterModal";
import ApiUsers from "./components/ApiUsers";
const miAxios = require("axios");
// import DrawerLeft from './components/DrawerLeft'

//localStorage.getItem("isLogged")==="true"?<DrawerLeft main={<TodoApp/>}/>:<Login/>

var todos = [];
//callTasks();
console.log(todos);

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect:true};
    localStorage.setItem("password", "password");
    localStorage.setItem("email", "sancarbar@gmail");
    localStorage.setItem("name", "Santiago Carrillo");
  }
  componentDidMount() {
    /*
    this.miAxios = miAxios.create({
      baseURL: "http://localhost:8080/api/",
      timeout: 1000,
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    });

    this.getData().then( () => {
        console.log("cargando...");
        this.setState({redirect:true});
    }
    );*/
    
  }

  getData(){
    const p = new Promise((resolve,reject) =>{
        miAxios
          .get("http://localhost:8080/api/tasks/user/test@mail.com",{headers:{ authorization: "Bearer " + localStorage.getItem("token")}})
          .then(function (response) {
            // handle success
            todos = response.data;
            console.log(response.data);
            resolve();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            reject();
          });
        })
    return p;

  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  render() {
    if (localStorage.getItem("isLogged") === undefined) {
      localStorage.setItem("isLogged", false);
    }
    if (this.state.redirect){
        return (
            <Router>
              <div className="App">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={() =>
                      localStorage.getItem("isLogged") === "true" ? (
                        <NavigationDrawer component={<TodoApp items={todos} />} />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route
                    path="/todo"
                    component={() =>
                      localStorage.getItem("isLogged") === "true" ? (
                        <NavigationDrawer component={<TodoApp items={todos} />} />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route
                    path="/NewTask"
                    render={() =>
                      localStorage.getItem("isLogged") === "true" ? (
                        <NavigationDrawer
                          component={<NewTask submit={this.submitTodo} />}
                        />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route
                    path="/userProfile"
                    component={() =>
                      localStorage.getItem("isLogged") === "true" ? (
                        <NavigationDrawer component={<UserProfile />} />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route
                    path="/caca"
                    component={() =>
                      localStorage.getItem("isLogged") === "true" ? (
                        <FilterModal />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route exact path="/api" component={() => <ApiUsers />} />
                </Switch>
              </div>
            </Router>
          );  
    }
    else{
        return(
        <Router>
        <Switch>
        <Route
                    exact
                    path="/"
                    component={() =>
                      localStorage.getItem("isLogged") === "true" ? (
                        <NavigationDrawer component={<TodoApp items={todos} />} />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  </Switch>
        </Router>
        
        );
    }
    
  }
  submitTodo(item) {
    todos.push(item);
  }
}
