import React, {Component} from 'react';
import NavbarApp from './NavbarApp';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import {Redirect} from 'react-router-dom';

class LandingApp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loadMovies : true,
            movies : null,
            auth : localStorage.getItem('auth'),
        }
        this.getMovies = this.getMovies.bind(this);
        

    }

    getMovies()
    {
        var self = this;
        axios.post('http://localhost:5000/api/get/movies',{
            auth : true,
        })
        .then(function(response){
            self.setState({
                movies : response.data,
            });
            
        });
        
    }
    renderMovies()
    {
        if(this.state.movies != null)
        {
            var row = [];
            for(var i=0;i<this.state.movies.length;i++)
            {
                row.push(this.renderRow(i));
                
            }
            return row 
        }
    }
    renderRow(index)
    {
         return(<Col key={index} md={2} className='movie-card'>
                <h6>
                    {this.state.movies[index].name} 
                    <Image className='poster-img' src={this.state.movies[index].url} fluid></Image>
                </h6>
            </Col>);       
        
    }

    checkAuth()
    {
        console.log(this.state.auth);
    }

    render()
    {
        if(!this.state.auth)
        {
            return <Redirect to='/' />
        }
        return(
            <Container fluid>
                 <NavbarApp auth={this.state.auth}/>
                <Container fluid className='main-content'>
                    <input type="text" placeholder="search" className='searchbar' /><button className='gobutton' onClick={this.getMovies} > GO</button>
                </Container>
                <Container fluid className='movie-list'>
                    <Row  onLoad={this.getMovies()}>
                        {this.renderMovies()}
                    </Row>
                </Container>
            </Container>
        );
    }
}
export default LandingApp