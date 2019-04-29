import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import LandingApp from '../../Views/HomeView/LandingApp';
import axios from 'axios';
const server = require("../ServerConfig").server;



class LoginApp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password : "",
            redirect : false,
            loginButtonValue : 'login',
            showAlert : false,
            alertMessage : "",
            successShow : false,
            adminRedirect : false,
        }
        this.usernameHandle = this.usernameHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.login = this.login.bind(this);
    }

    login()
    {
        var self = this;
        if(this.state.username != '' && this.state.password != '')
        {
            this.setState({
                loginButtonValue : "..."
            });
            axios.post(server+'login',{
                email : this.state.username,
                password : this.state.password,
            })
            .then((response)=>{
                if(response.data[1] == "Success")
                {
                    localStorage.setItem('auth', true);
                    localStorage.setItem('name', response.data[0]);
                    localStorage.setItem('email', this.state.username);
                    self.setState({
                        redirect : true
                    });
                }
                else if(response.data == "admin")
                {
                    self.setState({
                        adminRedirect : true,
                    });
                }
                else
                {
                    self.setState({
                        showAlert : true,
                        alertMessage : "username/password is invalid.",
                        loginButtonValue : "login",
                    });
                }
            });
        }
        else
        {
            self.setState({
                    showAlert : true,
                    alertMessage : "fields cannot be empty.",
                    loginButtonValue : "login",
                });
        }
        
    }

    
    usernameHandle(event)
    {
        this.setState({
            username : event.target.value,
            showAlert : false,
            successShow : false,
        });
    }
    passwordHandle(event)
    {
        this.setState({
            password : event.target.value,
            showAlert : false,
            successShow : false,
        });
    }
    componentDidMount()
    {
        if(this.props.match.params.account == "created=true")
        {
            this.setState({
            successShow : true,
            });
        }
        
        console.log(this.state.successShow);
    }
    render()
    {
        if(this.state.redirect)
        {
            return <Redirect to='/home' />
        }
        if(this.state.adminRedirect)
        {
            return <Redirect to='/admin' />
        }
        return(
            <div className='bodyClass'>
             <Alert show={this.state.showAlert} variant="danger">
                  <Alert.Heading>Alert</Alert.Heading>
                  <p>
                    {this.state.alertMessage}<br />
                  </p>
             </Alert>
             <Alert show={this.state.successShow} variant="success">
                <Alert.Heading>Alert</Alert.Heading>
                <p>
                    Your account has been created, login to proceed.
                </p>
             </Alert>
                <b><h1 className="inji-heading">inji</h1></b>
                <strong><h4><b>movies</b> and <b>reviews</b></h4></strong><br/>
                <Container className='Container'>
                    <Row>
                        <Col className='LoginBox'>
                           
                            <input type='text' className='InputBox-1' placeholder='email' onChange={this.usernameHandle} /><br/>
                            <input type='password' className='InputBox-2' placeholder='password' onChange={this.passwordHandle} /><br/>
                            <button className='LoginButton' onClick={this.login} >{this.state.loginButtonValue}</button> <br/><br/><br/>
                            <p>Don't have an account ? <a href='/register'>Register</a></p>
                           
                        </Col>
                    </Row>
                </Container>
               
            </div>  
        );
    }
}
export default LoginApp;