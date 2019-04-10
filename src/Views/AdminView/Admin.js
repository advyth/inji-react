import React, {Component} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const server = "https://inji-backend.herokuapp.com/";


class Admin extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			movieName : "",
			director : "",
			genre : "",
			actor : "",
			rating : "",
			url : ""

		}
		this.handleChange = this.handleChange.bind(this);
		this.addMovie = this.addMovie.bind(this);
	}
	handleChange(event)
	{
		this.setState({
			[event.target.name] : event.target.value,
		});

	}
	addMovie()
	{
		axios.post(server+'admin/add',{
			moviename : this.state.movieName,
			director : this.state.director,
			genre : this.state.genre,
			actor : this.state.actor,
			rating : this.state.rating,
			url : this.state.url,
		})
		.then((response)=>{
			alert(response.data);

		});
	}
	render()
	{
		return(
			<div className='detail-add'>
				<h1>Add movie </h1>
				<form>
					<input type='text' className='firstInput' name='movieName' placeholder='movie name' onChange={this.handleChange}/><br/>
					<input type='text' className='nextInput' name='director' placeholder='director' onChange={this.handleChange} /><br/>
					<input type='text' className='nextInput' name='genre' placeholder='genre' onChange={this.handleChange} /><br/>
					<input type='text' className='nextInput' name='actor' placeholder='actor' onChange={this.handleChange} /><br/>
					<input type='text' className='nextInput' name='rating' placeholder='rating' onChange={this.handleChange} /><br/>
					<input type='text' className='nextInput' name='url' placeholder='url' onChange={this.handleChange} /><br/>
					<input type='button' className='movie-submit' value='submit' onClick={this.addMovie} /><br/>
				</form>
			</div>

			);
	}
}
export default Admin;