import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Redirect} from 'react-router-dom';
import LandingApp from '../HOME/LandingApp';
import '../Styles/Login.css';
import axios from 'axios';




class LoginApp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password : "",
            redirect : false,
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
            axios.post('http://localhost:5000/login',{
                email : this.state.username,
                password : this.state.password,
            })
            .then((response)=>{
                if(response.data[1] == "Success")
                {
                    localStorage.setItem('auth', true);
                    localStorage.setItem('name', response.data[0])
                    self.setState({
                        redirect : true
                    });
                }
                else
                {
                    alert(response.data);
                }
            });
        }
        else
        {
            alert("Username and password cannot be empty");
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
    render()
    {
        if(this.state.redirect)
        {
            return <Redirect to='/home' />
        }
        return(
            <div className='bodyClass'>
                <b><h1>inji</h1></b>
                <strong><h3>movies. actors. reviews.</h3></strong>
                <Container className='Container'>
                    <Row>
                        <Col className='LoginBox'>
                            <input type='text' className='InputBox-1' placeholder='email' onChange={this.usernameHandle} /><br/>
                            <input type='password' className='InputBox-2' placeholder='password' onChange={this.passwordHandle} /><br/>
                            <button className='LoginButton' onClick={this.login} >login</button> <br/><br/><br/>
                            <p>Don't have an account ? <a href='/register'>Register</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>  
        );
    }
}
export default LoginApp;