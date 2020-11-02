import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css'
import axios from 'axios';

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {email:"",password:"",redirect:false}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e) {
        // Multiple events(2 inputs) in one function
        const value = e.target.value;
        this.setState({[e.target.name]: value});
      }

    componentDidMount(){
        /*
        this.getUser().then(()=>{
            alert("Request to API Was successfull! :D please just click on the Sign In button");
            this.setState({redirect:true})
        }
        );
        */
    }

    getUser(){
        const p = new Promise((resolve,reject) =>{
            axios.post('http://localhost:8080/user/login', {
             username: 'test@mail.com',
             password: 'password'
         })
             .then(function (response) {
                 console.log(response.data);
                 localStorage.setItem("token",response.data.accessToken);
                 resolve();
                 
             })
             .catch(function (error) {
                 console.log(error);
                 reject();
             });

        });
        return p;
    }



    handleSubmit(e){
        e.preventDefault();
        if(localStorage.getItem("email") === this.state.email && localStorage.getItem("password") === this.state.password || (localStorage.getItem("token")!=null )) {
                localStorage.setItem("isLogged","true");
                window.location.href = "/";   
        }
        else{
            alert("Datos incorrectos!")
        }
        
    }
    render(){
        if (this.state.redirect){
            return (
                <React.Fragment>
                    <CssBaseline />
                    <main className="layout">
                        <Paper className="paper">
                            <Avatar className="avatar">
                                <LockIcon />
                            </Avatar>
                            <Typography variant="h2">Sign in</Typography>
                            <form className="form">
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input id="email"
                                     name="email" 
                                     autoComplete="email"
                                      autoFocus
                                       value={this.state.email}
                                        onChange={this.handleChange}/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={this.handleSubmit}
                                >
                                    Sign in
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </React.Fragment>
            );

        }
        else{
            return(<h1>Calling API User Token :) </h1>);
        }
        
    }


}