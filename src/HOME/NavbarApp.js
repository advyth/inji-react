import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Col  from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Redirect} from 'react-router-dom';





class NavbarApp extends Component
{
	constructor(props)
	{
		super(props);
		this.logout = this.logout.bind(this);
		this.state = {
			auth : localStorage.getItem('auth'),
		}
	}
	logout()
    {
    	localStorage.setItem('auth', false);
        this.setState({
            auth : false,
        });
        
    }
    render()
    {
    	if(localStorage.getItem('auth') == 'false')
    	{
    		console.log(localStorage.getItem('auth'));
    		return <Redirect to='/' />
    	}
        return(
          <Container fluid className='nav-bar'>
          	<DropdownButton drop='left'  id="dropdown-basic-button" title={localStorage.getItem('name')}>
				  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
			  </DropdownButton>
              <a style={{color : "white"}} href="/home"><h2><b>inji</b></h2></a>
              <br></br>
              
          </Container>
        );
    }
}
export default NavbarApp;