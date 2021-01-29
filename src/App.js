import React from "react";
import { Route, Link } from 'react-router-dom';
import "./App.css";

//import components
import Confirmation from './components/Confirmation';
import Form from './components/Form';
import Home from './components/Home';



//main app
const App = () => {
  return (
    <div className='App'>
      <header className='header-container'>
        <div className='header-bar'>
          <h1>LAMBDA EATS</h1>
          <nav>
            <Link to='/' className="nav-link">Home</Link>
            <Link to='/' className="nav-link">Help</Link>
          </nav>
        </div>
      </header>
        <Route exact path={'/'}>
          <Home />
        </Route>
        <Route path={'/pizza'}>
          <Form />
        </Route>
        <Route path={'/confirmed'}>
          <Confirmation />
        </Route>
    </div>
  );
};
export default App;
