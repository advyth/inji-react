import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import NavbarApp from '../HOME/NavbarApp';



class MovieApp extends Component
{
	constructor(props, match)
	{
		super(props);
		this.state= {
			id : props.match.params.id,
		}
	}
	render()
	{
		return(
			<Container fluid>
				<NavbarApp auth={localStorage.getItem('auth')}/>
				<Row>
					<Col sm className='movie-detail-card'>
						<h1>Hello</h1>
					</Col>
					<Col sm className='reviews'>
						<div className='review-card'>
							<h6>Nice movie</h6>
						</div>
						<div className='comment'>
							<input type='text' />
						</div>
					</Col>
				</Row>
			</Container>
			);
	}
}
export default MovieApp;