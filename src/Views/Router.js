import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import LoginApp from '../Views/UserManagementView/LoginApp';
import RegisterApp from '../Views/UserManagementView/RegisterApp';
import LandingApp from '../Views/HomeView/LandingApp';
import Admin from '../Views/AdminView/Admin';
import MovieApp from '../Views/MovieDetailsView/MovieApp';
import SearchApp from '../Views/SearchView/SearchApp';

class ViewRouter extends Component
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
export default ViewRouter;