import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class RegisterApp extends Component
{
    render()
    {
        return(
            <div className='bodyClass'>
                <h1>inji</h1>
                <h3>movies. actors. reviews.</h3>
                <Container className='Container'>
                    <Row>
                        <Col className='LoginBox'>
                            <input type='text' className='InputBox-1' placeholder='email' /><br/>
                            <input type='password' className='InputBox-2'placeholder='password' /><br/>
                            <input type='password' className='InputBox-2'placeholder='confirm password' /><br/>
                            <input type='button' className='LoginButton' value='register'/>
                            <br/>
                            <br/>
                            <p>Have an account? <a href='/' >Login</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>  
        );
    }
}
export default RegisterApp;