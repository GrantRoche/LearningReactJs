import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './components/navbar';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Customers from './components/customers';
import Rentals from './components/rentals';
import LoginForm from './components/loginForm';
import NotFound from './components/notfound';
import './App.css';

function App() {
  return (
    <React.Fragment>
        <NavBar />
        <br/>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />

            <Route path="/movies/:_id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />            
            
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
    </React.Fragment>    
  );
}

export default App;

