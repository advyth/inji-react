import React, {Component} from 'react';
import NavbarApp from './NavbarApp';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

class LandingApp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loadMovies : true,
            movies : null,
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
            return <ul>{row} </ul>
        }
    }
    renderRow(index)
    {
        //TODO add movie card JSX code.
        
        return <li>{this.state.movies[index].name}</li>
    }

    render()
    {
        return(
            <Container fluid>
                <Container className="homeDiv">
                    <NavbarApp />
                </Container>
                <div className='main-content'>
                    <input type="text" placeholder="search" className='searchbar' /><button className='gobutton' onClick={this.getMovies} > GO</button>
                </div>
                <div className='movie-list' onLoad={this.getMovies()}>
                    <h1>{this.renderMovies()}</h1>
                
                </div>
                    
            </Container>
        );
    }
}
export default LandingApp