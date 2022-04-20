import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../Pages/Login';
import Home from '../Pages/Home';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>        
                <Route exact path='/home' component={Home}/>     
            </Switch>
        </BrowserRouter>
    )
}