import React, {Component} from 'react';
import NavbarApp from './NavbarApp';
import Container from 'react-bootstrap/Container';

class LandingApp extends Component
{
    render()
    {
        return(
            <Container fluid>
                <Container className="homeDiv">
                    <NavbarApp />
                </Container>
                <div className='main-content'>
                    <input type="text" placeholder="search" className='searchbar' /><button className='gobutton'> GO</button>
                    <div classname='new-movie'>
                    </div>
                </div>
            </Container>
        );
    }
}
export default LandingApp