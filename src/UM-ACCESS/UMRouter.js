import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import LoginApp from './LoginApp';
import RegisterApp from './RegisterApp';
import LandingApp from '../HOME/LandingApp';

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
                </Switch>
            </BrowserRouter>
        );
    }
}
export default UMRouter;