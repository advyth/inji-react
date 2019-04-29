import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Anime from 'react-anime';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Circle from 'react-circle';
import Alert from 'react-bootstrap/Alert';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import NavbarApp from '../../Views/HomeView/NavbarApp';
import star from '../../Assets/star.png';
import grey_star from '../../Assets/grey_star.png';
import thumbs_up_w from "../../Assets/thumbs_up_white.png";
import kids from "../../Assets/kids.png";
import adults from "../../Assets/adults.png";
import thumbs_down_w from "../../Assets/thumbs_down_white.png";
const server = require("../ServerConfig").server;




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
			star_rating : 1,
			star_type : '',
			star_clicked : [1,0,0,0,0],
			db_review : {0:{username : '', review : '', rating :'', id : '', likes : '', dislikes : '', review_id : '',}},
			badge_value : "default",
			badge_color : "default",
			kid_friendly_button_color : "white",
			kid_friendly_button_font_color : "red",
			kid_friendly : 0,
			thumb_class : "",
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
		this.kidFriendlyCheck = this.kidFriendlyCheck.bind(this);
		this.renderKidFriendlyTag = this.renderKidFriendlyTag.bind(this);
		this.rateReview = this.rateReview.bind(this);
	}
	getMovieDetails()
	{
		var self = this;
		axios.post(server+'api/get/single/movie',{
			auth : localStorage.getItem('auth'),
			id : this.state.id,
		})
		.then(function(response){
			var tag_array = [];
				tag_array["HO"] = ["Horror","red"];
				tag_array["AC"] = ["Action", "orange"];
				tag_array["DR"] = ["Drama", "blue"];
				tag_array["TH"] = ["Thriller", "yellow"];
				tag_array["CO"] = ["Comedy", "green"];
			self.setState({
				moviedetails : response.data,
				badge_color : tag_array[response.data[0].tags][1],
				badge_value : tag_array[response.data[0].tags][0],
			});
			
			

		});
		
	}
	addReview()
	{
		this.setState({showModal : true});
		
	}
	sendReview()
	{
		var self = this;
		axios.post(server+'api/add/review',{
			review : this.state.review,
			id : this.state.id,
			rating : this.state.star_rating,
			kid_friendly : this.state.kid_friendly,
			username : localStorage.getItem('name'),
			email : localStorage.getItem("email"),
		})
		.then(function(response){
		
			document.location.reload();
		});
		this.setState({
			star_clicked : [1,0,0,0,0]
		});
	}
	renderStars()
	{
		var rating = this.state.moviedetails[0].rating;
		var star_amount = 0
		if(rating == 0)
		{
			star_amount = 1;
		}
		else if(rating <= 25)
		{
			star_amount = 2;
		}
		else if(rating <= 50)
		{
			star_amount = 3;
		}
		else if(rating <= 75)
		{
			star_amount = 4;
		}
		else if(rating > 75)
		{
			star_amount = 5;
		}

		
		var stars = [];
		for(var i=0;i<star_amount;i++)
		{
			stars.push(<img src={star} key={i} height='40' width='40' />);
		}
	
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
			stars.push(<img src={star} key={i} style={{marginBottom : '3vh', marginTop : '2vh'}} key={i} height='20' width='20' />);
		}
		return stars;
	}
	rateReview(review_id, type)
	{
			var self = this;
			axios.post(server+'api/review/rate',{
				review_id : review_id,
				review_type : type,
				id : this.state.id,
				email : localStorage.getItem("email")
			})
			.then(function(response){
				self.loadReviews();
			});
	}
	renderReviews()
	{
		var review_card = [];
		for(var i = this.state.db_review.length-1;i >=0;i--)
		{
			review_card.push(<div key={i} className='review-card'>
							<h6>"{this.state.db_review[i].review}"</h6>
							{this.renderReviewCardStars(this.state.db_review[i].rating)}<br/>
							<h6>By <b>{this.state.db_review[i].username} </b></h6><br />
							<span>{this.state.db_review[i].likes} </span><img onClick={this.rateReview.bind(this,this.state.db_review[i].review_id, "like")} className="review_thumb" style={{marginRight : "2vh"}} src={thumbs_up_w} height="20" width="20" />
							<img onClick={this.rateReview.bind(this,this.state.db_review[i].review_id ,"dislike")} className="review_thumb" src={thumbs_down_w} height="20" width="20" /><span>{this.state.db_review[i].dislikes}</span>
						</div>);
		}
		return review_card;
	}
	loadReviews()
	{
		var self = this;
		axios.post(server+'api/get/reviews',{
			id : this.state.id,
			email : localStorage.getItem("email")
		})
		.then(function(response){
			self.setState({
				db_review : response.data,
			});
		});
		console.log(this.state.db_review);
	}
	kidFriendlyCheck()
	{
		if(this.state.kid_friendly_button_color == "white")
		{
			this.setState({
				kid_friendly_button_color : "red",
				kid_friendly_button_font_color : "white",
				kid_friendly : 1
			});
		}
		else
		{
			this.setState({
				kid_friendly_button_color : "white",
				kid_friendly_button_font_color : "red",
				kid_friendly : 0
			});
		}
		
	}
	renderKidFriendlyTag()
	{
		if(this.state.moviedetails[0].kid_friendly > 50)
		{
			return(<Badge variant="success">Kid friendly</Badge>);
		}
		else
		{
			return(<Badge variant="danger">Not kid friendly</Badge>);	
		}
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
							<button style={{backgroundColor : this.state.kid_friendly_button_color, color : this.state.kid_friendly_button_font_color}} className="modal_kid_friendly_button" onClick={this.kidFriendlyCheck}><b>Kid Friendly</b></button><br />
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
					<Col className='movie-detail-card'>
						<Row>
							<Col style={{float : "left"}} className="movie-detail-card-1">
							<br/>
								<h4><b>{this.state.moviedetails[0].name}</b></h4><br />
								<Image className='detail-poster' src={this.state.moviedetails[0].url} fluid />
								<div className='star-div'>
									{this.renderStars()}
								</div><br />
								
								<Badge style={{backgroundColor : this.state.badge_color, color : "white", marginRight : "1vw"}}>{this.state.badge_value}</Badge>
								{this.renderKidFriendlyTag()}		
							</Col>
							<Col className="movie-detail-card-2">
							  <br/><h4><b>Synopsis</b></h4><br/>
								<p style={{textAlign : "justify"}}>{this.state.moviedetails[0].synopsis}</p><br />
								<h4><b>General ratings</b></h4>
								<p>{this.state.moviedetails[0].rating}</p><br />
								<h4><b>Director</b></h4>
								<p>{this.state.moviedetails[0].director}</p><br />
								<h4><b>Actors</b></h4>
								<p>{this.state.moviedetails[0].actor}</p><br />
								<h6><b>Kid Friendly?</b></h6>
								<p>{this.state.moviedetails[0].kid_friendly}% of people say this movie is kid friendly.</p>
								
							</Col>
						</Row>
					</Col>
					<Col sm className='reviews'>
						{this.renderReviews()}
						<button className="floating-button" onClick={this.addReview} title="Go to top"><b>Add review</b></button>
					</Col>
					{this.showModal()}
				</Row>
			</Container>

			);
	}
}
export default MovieApp;