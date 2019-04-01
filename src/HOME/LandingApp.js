import React, {Component} from 'react';
import NavbarApp from './NavbarApp';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
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
            autoComplete : "",
            showAutoComplete : false,
        }
        this.getMovies = this.getMovies.bind(this);
        this.movieRedirect = this.movieRedirect.bind(this);
        this.searchBarHandler = this.searchBarHandler.bind(this);
        this.searchRedirect = this.searchRedirect.bind(this);
        this.autoCompleteFetch = this.autoCompleteFetch.bind(this);
        this.renderResult = this.renderResult.bind(this);
        this.renderAutoBox = this.renderAutoBox.bind(this);

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
            showAutoComplete : true,
        });
        this.autoCompleteFetch();
    }
    autoCompleteFetch()
    {
     
            var self = this;
            var term = "@";
            if(this.state.search != "")
            {
                term = this.state.search;
            }
            axios.post("http://localhost:5000/api/autocomplete/",{
                search : term,
            })
            .then(function(response){
                self.setState({
                    autoComplete : response.data,
                });
                console.log(self.state.autoComplete);
            });

        
    }
    renderResult()
    {
        if(this.state.search != "")
        {
           if(this.state.autoComplete != "")
           {
               var div = [];
               for(var i = 0;i<this.state.autoComplete.length;i++)
               {    var url = "/movie/" + this.state.autoComplete[i].id;
                    div.push(<a key={i+10} style={{color : "red"}} href={url}><h6 key={i}>{this.state.autoComplete[i].name}</h6></a>);
                    div.push(<hr key={i} />)
               }
               return div;
               
           }
        }
       return "";
       
       
    }
    renderAutoBox()
    {
        if(this.state.showAutoComplete && this.state.search != "")
        {
            return(<div className="autoCompleteBox ">
                    {this.renderResult()}
                    </div>);
        }
        
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
                    <input style={{marginBottom : "2vh"}} type="text" placeholder="search" onChange={this.searchBarHandler} className='searchbar' /><button className='gobutton' onClick={this.searchRedirect} > GO</button>
                    {this.renderAutoBox()}
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