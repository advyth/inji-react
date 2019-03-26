import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
                else
                {
                    alert("Failed");
                }
            });
            
        }
        else
        {
            alert("Passwords do not match");
        }
        
    }
    usernameHandle(event)
    {
        this.setState({
            username : event.target.value,
        });
    }
    passwordHandle(event)
    {
        this.setState({
            password : event.target.value,
        });
    }
    confirmPasswordHandle(event)
    {
        if(this.state.password == event.target.value)
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
            email : event.target.value,
        });

    }
    render()
    {
        if(this.state.redirect)
        {
            return <Redirect to='/' />
        }
        return(
            <div className='bodyClass'>
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