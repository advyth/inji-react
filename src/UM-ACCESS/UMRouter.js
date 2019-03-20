import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import LoginApp from './LoginApp';
import RegisterApp from './RegisterApp';

class UMRouter extends Component
{
    render()
    {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={LoginApp} exact />
                    <Route path='/register' component={RegisterApp} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default UMRouter;