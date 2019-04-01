import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import LoginApp from './LoginApp';
import {Redirect} from 'react-router-dom';
import LandingApp from '../HOME/LandingApp';
import green_tick from '../Styles/green-tick.png';
import red_cross from '../Styles/red-cross.png';


class RegisterApp extends Component
{
   
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password : "",
            email : "",
            redirect : false,
            url : "",
            opacity : 0,
            showAlert : false,
            alertMessage : "",
        }
        this.usernameHandle = this.usernameHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.confirmPasswordHandle = this.confirmPasswordHandle.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.register = this.register.bind(this);
    }
    register()
    {
        var self = this;
        if(this.state.username != '' && this.state.password != '')
        {
            if(this.state.password == this.state.confirm_password)
            {
                axios({
                    method : 'post',
                    url : 'http://localhost:5000/register',
                    data : {
                        email : this.state.email,
                        username : this.state.username,
                        password : this.state.password,                
                    }
                })
                .then(function(response){
                    if(response.data == "Registered")
                    {
                        self.setState({
                            redirect : true,
                        });
                        
                    }
                    else if(response.data == "Exists")
                    {
                        self.setState({
                            showAlert : true,
                            alertMessage : "This account exists.",
                        });
                    }
            });
            
            }
            else
            {
                this.setState({
                    showAlert : true,
                    alertMessage : "Passwords do not match.",
                });
            }
        }
        else
        {
            this.setState({
                    showAlert : true,
                    alertMessage : "Fields cannot be empty.",
                });
        }
        
        
    }
    usernameHandle(event)
    {
        this.setState({
            username : event.target.value,
            showAlert : false,
        });
    }
    passwordHandle(event)
    {
        this.setState({
            password : event.target.value,
            showAlert : false,
        });
    }
    confirmPasswordHandle(event)
    {
        if(this.state.password == event.target.value && event.target.value != "")
        {
            this.setState({url : green_tick, opacity : 1});
        }
        else
        {
            this.setState({url : red_cross  , opacity : 1});
        }
        this.setState({
            confirm_password : event.target.value,
        });
    }
    emailHandle(event)
    {
        this.setState({
            showAlert  :false,
            email : event.target.value,
        });

    }
    render()
    {
        if(this.state.redirect)
        {
            return <Redirect to='/created=true' />
        }
        return(
            <div className='bodyClass'>
                <Alert show={this.state.showAlert} variant="danger">
                  <Alert.Heading>Alert</Alert.Heading>
                  <p>
                    {this.state.alertMessage}<br />
                  </p>
                </Alert>
                <h1>inji</h1>
                <h3>movies. actors. reviews.</h3>
                <Container className='Container'>
                    <Row>
                        <Col className='LoginBox'>
                        <form>
                            <input type='text' className='InputBox-1' placeholder='email' onChange={this.emailHandle} /><br/>
                            <input type='text' className='InputBox-2' placeholder='username' onChange={this.usernameHandle} /><br/>
                            <input type='password' name='password' className='InputBox-2'placeholder='password' onChange={this.passwordHandle}/><br/>
                            <input type='password' name='passwordConfirm'  className='InputBox-2'placeholder='confirm password' onChange={this.confirmPasswordHandle}/><img style={ {opacity : this.state.opacity, position : 'absolute', marginTop:'2.5vh', marginLeft:'1vw'} } src={this.state.url} height='20' width='20' /><br/>
                            <input type='button' className='LoginButton' value='register' onClick={this.register}/>
                            <br/>
                            <br/>
                            <p>Have an account? <a href='/' >Login</a></p>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>  
        );
    }
}
export default RegisterApp;