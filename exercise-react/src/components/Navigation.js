import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navigation () { 
    return (
        <nav>
           <Link to="/">Home</Link>
           <br />
           <Link to="/Create">Create Exercise</Link>
           
        </nav>
    ); 
}

export default Navigation; 

