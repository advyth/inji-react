import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, {Component} from 'react';
import LoginApp from './UM-ACCESS/Login';
import Register from './UM-ACCESS/Register';

class RouterApp extends Component
{
    render()
    {
        return(
            <Router>
                <div>
                    <LoginApp />
                    <button><Link to='/register'>Register</Link></button>
                    <Route path="/register"  component={Register} />
                </div>
            </Router>
        );
    }
}
export default RouterApp;