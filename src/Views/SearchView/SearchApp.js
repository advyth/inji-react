import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import NavbarApp from "../HomeView/NavbarApp";
import {Redirect} from "react-router-dom";
const server = "https://inji-backend.herokuapp.com/";


class SearchApp extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			movie : props.match.params.movie,
			search : "",
			redirect : false,
			detail_redirect : false,
			detail_redirect_id : "",
			search_result : {0:{name : "", genre : "", direcor :"", url :"", id : ""}},
			movie_message : "",
		}
		this.renderSearchMovies = this.renderSearchMovies.bind(this);
		this.searchBarHandler = this.searchBarHandler.bind(this);
		this.searchRedirect = this.searchRedirect.bind(this);
		this.getSearchItem = this.getSearchItem.bind(this);
		this.renderResults = this.renderResults.bind(this);
		this.redirectToDetails = this.redirectToDetails.bind(this);
	}
	redirectToDetails(id)
	{
		this.setState({
			detail_redirect : true,
			detail_redirect_id : id,

		});
		console.log(id);
	}
	renderSearchMovies(index)
	{
		return(<Row key={index}>
			<Col onClick={()=>this.redirectToDetails(this.state.search_result[index].id)} className='searchResultCard' style={{marginTop : "2vh"}}>
				<Row>
					<Col style={{maxWidth : "100%"}}>
						<h3><b>{this.state.search_result[index].name}</b></h3><br/><br/>
						<h5 style={{marginTop : "10px"}}><b>Directed by  </b>{this.state.search_result[index].director} </h5><br/><br/>
						<h5 style={{marginTop : "-16px"}}><b>Genre : </b>{this.state.search_result[index].genre}</h5>
					</Col>
					<Col>
						<Image fluid src={this.state.search_result[index].url} style={{height:"15vh"}}/>
					</Col>
				</Row>
						
			</Col>
			</Row>);
	}
	renderResults()
	{

		var results = [];
		for(var i=0;i<this.state.search_result.length;i++)
		{
			results.push(this.renderSearchMovies(i));
		}
		return results;
		
	}
	componentDidMount()
	{
		this.getSearchItem();
	}
	getSearchItem()
	{
		var self = this;
		axios.post(server+"api/search/movie/",{
			movie : this.state.movie,
		})
		.then(function(response){
			if(response.data == "empty")
			{
				self.setState({
					movie_message : "No movies found :(",
				});
			}
			else
			{
				self.setState({
					search_result : response.data,
				});
			}
			
		});
	}
	 searchBarHandler(event)
	
    {
        this.setState({
            search : event.target.value,
        });
    }
     searchRedirect()
    {
        this.setState({
            redirect : true,
        });
    }

	render()
	{
		if(this.state.redirect)
		{
			if(window.location.href[4] == ":" && this.state.search != "")
			{
				var url = "/search/"+this.state.search;
				window.location = "http://"+window.location.hostname + ":3000" + url;
				
			}
			else if(window.location.href[4] == "s" && this.state.search != "")
			{
				var url = "/search/"+this.state.search;
				window.location = "http://"+window.location.hostname + url;
				
			}
			
		}
		if(this.state.detail_redirect)
		{
			var url = "/movie/"+this.state.detail_redirect_id+"/";
			return <Redirect to={url} />
		}
		return(<Container fluid style={{textAlign : "center"}}>
				<NavbarApp auth={localStorage.getItem('auth')} />
				<Container className="searchMovieContainer" style={{marginBottom : "6vh"}}>
				       <input type="text" placeholder="search" onChange={this.searchBarHandler} className='searchbar' /><button className='gobutton' onClick={this.searchRedirect} > GO</button>
						
				</Container>
				<Container fluid>
					{this.renderResults()}
					<h5 style={{marginTop : "20vh"}}><i>{this.state.movie_message}</i></h5>
				</Container>
			</Container>);
	}
}
export default SearchApp;