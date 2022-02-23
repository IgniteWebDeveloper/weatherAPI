import React, { useState } from 'react';
import { Typography, Card, Box, CardContent, CardMedia, Grid } from '@mui/material';
import Cities from './cities.json';
import { Search, Close } from '@mui/icons-material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
;

;





const App = () => {

  const [searchWord, setSearchWord] = useState([])
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
        localStorage.setItem("city", JSON.stringify(response.data))
        const copycityWeather = [...weatherData]
        const newcityData = response.data
        copycityWeather.push(newcityData)
        setweatherData(copycityWeather)
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
  }
  const theme = useTheme();

  console.log(weatherData.map(city => city));

  return <div className='container'>
    <div className="mainContainer1">
    <h2><br /> Welcome to Weather App <br />Enter the city name to see its weather</h2>
    <input className='searchBar' type="text" value={searchWord} onChange={(event) => searchingWord(event)} name="" />{searchWord.length === 0 ?
      <Search className='Icon' /> : <Close onClick={allClear} className='CloseIcon' />}
    {searchWord.length && filterSearch.length !== 0 ?
      <div className='searchDrop'>
        {filterSearch.map((city) => {
          return <p onClick={() => callWeatherAPI(city.name)} key={city.id}>{city.name}</p>
        }).slice(0, 15)}
      </div>
      : ''}
    </div>
      <Grid className="mainContainer2" container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 12, md: 12 }}>
        {weatherData.map((cityData, index) =>
          <Grid item xs={2} sm={4} md={4}  key={index} style={{width: '23vmax', height: '20vmax', marginBottom: '0vmax'}} >
            <Card sx={{ display: 'flex', width: '22vmax' }}>
                <CardContent>
                  <Typography component="div" variant="h5">
                    {cityData.location.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    <b>{cityData.current.temp_c}°C</b>
                    <p className='time'>{cityData.current.last_updated}</p>
                  </Typography>
                </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                image={cityData.current.condition.icon}
                alt="Live from space album cover"
              />
            </Card>
          </Grid>
        )}
      </Grid>

  </div>
};

export default App;



{/* <Card sx={{ display: 'flex', width: '22vmax' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" mt={2}>
              {cityData.location.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <b>{cityData.current.temp_c}°C</b>
              <p className='time'>{cityData.current.last_updated}</p>
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={cityData.current.condition.icon}
          alt="Live from space album cover"
        />
      </Card> */}