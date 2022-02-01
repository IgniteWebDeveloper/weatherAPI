import React, { useState } from 'react';
import { Typography, Card, Box, CardContent, CardMedia } from '@mui/material';
import Cities from './cities.json';
import { Search, Close } from '@mui/icons-material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
;

;





const App = () => {

  const [searchWord, setSearchWord] = useState("")
  const [filterSearch, setFilter] = useState({})
  const [weatherData, setweatherData] = useState([])

  const searchingWord = (event) => {
    let word = event.target.value
    setSearchWord(word)
    let Result = Cities.filter(c => {
      return c.name.toLowerCase().includes(word.toLowerCase());
    })
    setFilter(Result)
  }

  const callWeatherAPI = (city) => {
    const api_key = '126e187d472d440092364437223101'
    const base_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`
    axios.get(base_url)
      .then(function (response) {
        // handle success
        setweatherData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    setSearchWord(city)
    setFilter([])
  }
  const allClear = () => {
    setFilter([])
    setSearchWord("")
    weatherData([])
  }
  const theme = useTheme();

  console.log(weatherData);

  return <div className='container'>
      <h2><br /> Welcome to Weather App <br />Enter the city name to see its weather</h2>
    <input className='searchBar' type="text" value={searchWord} onChange={(event) => searchingWord(event)} name="" />{searchWord.length == 0 ?
      <Search className='Icon' /> : <Close onClick={allClear} className='CloseIcon' />}
    {searchWord.length && filterSearch.length !== 0 ?
      <div className='searchDrop'>
        {filterSearch.map((city) => {
          return <p onClick={() => callWeatherAPI(city.name)} key={city.id}>{city.name}</p>
        }).slice(0, 15)}
      </div>
      : ''}
    {weatherData.length !==0 ? <div className='card'>
    <Card sx={{ display: 'flex', width: '22vmax' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" mt={2}>
            {weatherData.location.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <b>{weatherData.current.temp_c}°C</b>
            <p className='time'>{weatherData.current.last_updated}</p>
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={weatherData.current.condition.icon}
        alt="Live from space album cover"
      />
    </Card>
    </div> : ''}
    
  </div>
};

export default App;
