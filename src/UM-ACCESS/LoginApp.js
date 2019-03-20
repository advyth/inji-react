import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Styles/Login.css';
const axios = require('axios');


class LoginApp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password : "",
        }
        this.usernameHandle = this.usernameHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.login = this.login.bind(this);
    }
    login()
    {
        axios({
            method : 'post',
            url : 'http://localhost:5000/login',
            data : {
                username : this.state.username,
                password : this.state.password,                
            }
        })
        .then(function(data){
            console.log(data.data);
        });
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
        return(
            <div className='bodyClass'>
                <h1>inji</h1>
                <h3>movies. actors. reviews.</h3>
                <Container className='Container'>
                    <Row>
                        <Col className='LoginBox'>
                            <input type='text' className='InputBox-1' placeholder='email'onChange={this.usernameHandle} /><br/>
                            <input type='password' className='InputBox-2'placeholder='password' /><br/>
                            <input type='button' className='LoginButton' value='login' onClick={this.login}/> <br/><br/><br/>
                            <p>Don't have an account ? <a href='/register'>Register</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>  
        );
    }
}
export default LoginApp;