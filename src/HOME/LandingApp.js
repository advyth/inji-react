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
            movie_redirect : false,
            movie_id : '',
            redirect : false,
        }
        this.getMovies = this.getMovies.bind(this);
        this.movieRedirect = this.movieRedirect.bind(this);
        this.searchBarHandler = this.searchBarHandler.bind(this);
        this.searchRedirect = this.searchRedirect.bind(this);

    }
    componentDidMount()
    {
        this.getMovies();
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
    movieRedirect(index)
    {
        this.setState({
            movie_redirect : true,
            movie_id : this.state.movies[index].id,
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
         return(<Col name={index} onClick={()=>this.movieRedirect(index)} key={index} md={2} className='movie-card'>
                <h6>
                    {this.state.movies[index].name} 
                    <Image className='poster-img' src={this.state.movies[index].url} fluid></Image>
                </h6>
            </Col>);       
        
    }
    searchRedirect()
    {
        this.setState({
            redirect : true,
        });
    }

    checkAuth()
    {
        console.log(this.state.auth);
    }
    searchBarHandler(event)
    {
        this.setState({
            search : event.target.value,
        });
    }
    render()
    {
        if(!this.state.auth)
        {
            return <Redirect to='/' />
        }
        if(this.state.movie_redirect)
        {
            var movie_url = '/movie/' + this.state.movie_id;
            return <Redirect to={movie_url} />
        }
        if(this.state.redirect)
        {
            var url = "/search/" + this.state.search;
            return <Redirect to={url} />
        }
        return(
            <Container fluid>
                <NavbarApp auth={this.state.auth}/>
                <Container fluid className='main-content'>
                    <input type="text" placeholder="search" onChange={this.searchBarHandler} className='searchbar' /><button className='gobutton' onClick={this.searchRedirect} > GO</button>
                </Container>
                <form>
                <Container fluid className='movie-list'>
                    <Row>
                        {this.renderMovies()}
                    </Row>
                </Container>
                </form>
            </Container>
        );
    }
}
export default LandingApp