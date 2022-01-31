import React from 'react';
import { Typography } from '@mui/material';
import Cities from './cities.json';



const App = () => {
  return <div className='container'>
    <Typography>
      <h2><br /> Welcome to weather app <br />Enter the city name to see its weather</h2>
    </Typography>
      <div className="innerContainer">
        <input className='searchBar' type="text" name="" id="" />
        <div className='searchDrop'>
          <p>Lorem</p>
        </div>
      </div>
  </div>;
};

export default App;
