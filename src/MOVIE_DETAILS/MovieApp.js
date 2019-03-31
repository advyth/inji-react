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
import grey_star from '../Styles/grey_star.png';


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
			showModal : false,
			star_rating : 0,
			star_type : '',
			star_clicked : [1,0,0,0,0],
			db_review : {0:{username : '', review : '', rating :'', id : ''}}
		}
		this.getMovieDetails = this.getMovieDetails.bind(this);
		this.renderStars = this.renderStars.bind(this);
		this.reviewHandler = this.reviewHandler.bind(this);
		this.addReview = this.addReview.bind(this);
		this.showModal = this.showModal.bind(this);
		this.modalHide = this.modalHide.bind(this);
		this.renderGreyStar = this.renderGreyStar.bind(this);
		this.handleStarClick = this.handleStarClick.bind(this);
		this.sendReview = this.sendReview.bind(this);
		this.loadReviews = this.loadReviews.bind(this);
		this.renderReviews = this.renderReviews.bind(this);
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
			

		});
		
	}
	addReview()
	{
		this.setState({showModal : true});
		console.log(this.state.showModal);
	}
	sendReview()
	{
		var self = this;
		axios.post('http://localhost:5000/api/add/review',{
			review : this.state.review,
			id : this.state.id,
			rating : this.state.star_rating,
			username : localStorage.getItem('name'),
		})
		.then(function(response){
			console.log(response.data);
			self.modalHide();
			self.loadReviews();
		});
	}
	renderStars()
	{
		var star_amount = this.state.moviedetails[0].rating/2;
		var stars = [];
		for(var i=0;i<star_amount;i++)
		{
			stars.push(<img src={star} key={i} height='40' width='40' />);
		}
		console.log("hit");
		return stars;
	}
	renderGreyStar()
	{
		var greyStars = [];
		for(var i=0;i<5;i++)
		{
			if(this.state.star_clicked[i] == 0)
			{
				greyStars.push(<img src={grey_star} onClick={this.handleStarClick} key={i} name={i} height='40' width='40' />);
			}
			else
			{
				greyStars.push(<img src={star} onClick={this.handleStarClick} key={i} name={i} height='40' width='40' />);

			}
			
		}
		return greyStars;
	}
	handleStarClick(event)
	{
		var starState = this.state.star_clicked;
		var rating = this.state.star_rating;
		if(event.target.name == 0)
		{
			rating=1;
			starState = [1,0,0,0,0];
			this.setState({
				star_clicked : starState,
				star_rating : rating,
			});
		}
		else if(event.target.name == 1)
		{
			rating=2;
			starState = [1,1,0,0,0];
			this.setState({
				star_clicked : starState,
				star_rating : rating,
			});
		}
		else if(event.target.name == 2)
		{
			rating=3;
			starState = [1,1,1,0,0];
			this.setState({
				star_clicked : starState,
				star_rating : rating,
			});
		}
		else if(event.target.name == 3)
		{
			rating=4;
			starState = [1,1,1,1,0];
			this.setState({
				star_clicked : starState,
				star_rating : rating,
			});
		}
		else if(event.target.name == 4)
		{
			rating=5;
			starState = [1,1,1,1,1];
			this.setState({
				star_clicked : starState,
				star_rating : rating,
			});
		}
		console.log(rating);
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
		this.loadReviews();
	}
	modalHide()
	{
		this.setState({showModal : false});
	}
	renderReviewCardStars(count)
	{
		var stars = [];
		for(var i=0;i<count;i++)
		{
			stars.push(<img src={star} style={{marginBottom : '3vh', marginTop : '2vh'}} key={i} height='20' width='20' />);
		}
		console.log("hit");
		return stars;
	}
	renderReviews()
	{
		var review_card = [];
		for(var i = this.state.db_review.length-1;i >=0;i--)
		{
			review_card.push(<div className='review-card'>
							<h6>"{this.state.db_review[i].review}"</h6>
							{this.renderReviewCardStars(this.state.db_review[i].rating)}<br/>
							<h7>By <b>{this.state.db_review[i].username} </b></h7>
						</div>);
		}
		return review_card;
	}
	loadReviews()
	{
		var self = this;
		axios.post('http://localhost:5000/api/get/reviews',{
			id : this.state.id
		})
		.then(function(response){
			self.setState({
				db_review : response.data,
			});
			console.log(response.data);
		});
	}
	showModal()
	{
		if(this.state.showModal)
		{
			return(<Modal show={true} onHide={this.modalHide}>
				          <Modal.Header closeButton>
				            <Modal.Title>Give a rating</Modal.Title>
				          </Modal.Header>
				          <Modal.Body style={{textAlign : 'center'}}>
				          	<input className="review_text_field" placeholder="Write your review here" type='text' onChange={this.reviewHandler}/><br/>
				          	{this.renderGreyStar()}<br/>
				          	<button onClick={this.sendReview} className='modal_submit_button'><b>Publish review</b></button>
				          </Modal.Body>
				          <Modal.Footer>
				          </Modal.Footer>
			        </Modal>);
		}
		else
		{
			return '';
		}
		
	}
	render()
	{

		document.body.style.backgroundColor = "#e4e9f0";
		return(
			<Container fluid>
				<NavbarApp auth={localStorage.getItem('auth')}/>
				<Row>
					<Col sm className='movie-detail-card'>
					
						<h4><b>{this.state.moviedetails[0].name}</b></h4><br />

						<Image className='detail-poster' src={this.state.moviedetails[0].url} fluid />
						<div className='star-div'>
							{this.renderStars()}
						</div>
						

					</Col>
					<Col sm className='reviews'>
						{this.renderReviews()}
						<button class="floating-button" onClick={this.addReview} title="Go to top"><b>+</b></button>
					</Col>
					{this.showModal()}
					
				</Row>
			</Container>
			);
	}
}
export default MovieApp;