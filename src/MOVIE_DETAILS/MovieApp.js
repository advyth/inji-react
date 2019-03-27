import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import NavbarApp from '../HOME/NavbarApp';
import star from '../Styles/star.png';


//TODO add modal for rating

class MovieApp extends Component
{
	constructor(props)
	{
		super(props);
		this.state= {
			id : props.match.params.id,
			moviedetails : {0:{name : '', url : ''}},
			review : 'default',
		}
		this.getMovieDetails = this.getMovieDetails.bind(this);
		this.renderStars = this.renderStars.bind(this);
		this.reviewHandler = this.reviewHandler.bind(this);
		this.addReview = this.addReview.bind(this);
	}
	getMovieDetails()
	{
		var self = this;
		axios.post('http://localhost:5000/api/get/single/movie',{
			auth : localStorage.getItem('auth'),
			id : this.state.id,
		})
		.then(function(response){
			self.setState({
				moviedetails : response.data
			});
			console.log(response.data[0].name);

		});
		
	}
	addReview()
	{
		axios.post('http://localhost:5000/api/add/review',{
			review : this.state.review,
			id : this.state.id
		})
		.then(function(response){
			console.log(response.data);
		});
	}
	renderStars()
	{
		var star_amount = this.state.moviedetails[0].rating/2;
		var stars = [];
		for(var i=0;i<star_amount;i++)
		{
			stars.push(<img src={star} height='40' width='40' />);
		}
		console.log("hit");
		return stars;
	}
	reviewHandler(event)
	{
		this.setState({
			review : event.target.value
		});
	}
	componentDidMount()
	{
		this.getMovieDetails();
	}
	render()
	{
		return(
			<Container fluid>
				<NavbarApp auth={localStorage.getItem('auth')}/>
				<Row>
					<Col sm className='movie-detail-card'>
						<h4>{this.state.moviedetails[0].name}</h4><br />
							
						<Image className='detail-poster' src={this.state.moviedetails[0].url} fluid />
						<div className='star-div'>
							{this.renderStars()}
						</div>
					</Col>
					<Col sm className='reviews'>
						<div className='review-card'>
							<h6>Nice movie</h6>
						</div>
						<div className='comment'>
							<input type='text' onChange={this.reviewHandler}/>
							<div onClick={this.addReview} className='review-submit-button'><h4>submit</h4></div>
						</div>
					</Col>
					<Modal show={true} >
				          <Modal.Header closeButton>
				            <Modal.Title>Give a rating</Modal.Title>
				          </Modal.Header>
				          <Modal.Body><h1>Star 1</h1><h1>Star 2</h1></Modal.Body>
				          <Modal.Footer>
				          </Modal.Footer>
			        </Modal>
				</Row>
			</Container>
			);
	}
}
export default MovieApp;