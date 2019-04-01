import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import LoginApp from './LoginApp';
import RegisterApp from './RegisterApp';
import LandingApp from '../HOME/LandingApp';
import Admin from '../ADMIN/Admin';
import MovieApp from '../MOVIE_DETAILS/MovieApp';
import SearchApp from '../SEARCH/SearchApp';

class UMRouter extends Component
{
    render()
    {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={LoginApp} exact />
                    <Route path='/register' component={RegisterApp} />
                    <Route path='/home' component={LandingApp} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/movie/:id' component={MovieApp} />
                    <Route path='/search/:movie' component={SearchApp} />
                    <Route path='/:account' component={LoginApp} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default UMRouter;