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
        }
        this.getMovies = this.getMovies.bind(this);

    }

    getMovies()
    {
        axios.post('http://localhost:5000/api/get/movies',{
            auth : true,
        })
        .then(function(response){
            return response.data[0].name;
        });
    
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
                <div className='movie-list'>
                    //TODO render movie list here.
                    
                </div>
                    }
            </Container>
        );
    }
}
export default LandingApp