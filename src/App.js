import React, {useState} from 'react'
import axios from 'axios'


function App() {
  const[data,setData]= useState({})
  const [location,setLocation] = useState('')

  const apikey = process.env.REACT_APP_APIKEY
  const apiid = process.env.REACT_APP_APIID
 
 const url2 = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${location}&offset=25`


  const callapi = async (cor) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cor.lat}&lon=${cor.long}&units=metric&appid=${apiid}`
        const res = await axios.get(url)
        return res.data;
  }

  const findcod= async () =>{
    const Response = await axios.get(url2)
      return {"lat":Response.data[0]["GeoPosition"]["Latitude"], "long":Response.data[0]["GeoPosition"]["Longitude"]}
  }

  const searchLocation = async (event) =>{
    if(event.key==='Enter'){
      const res = await findcod()
      const d = await callapi(res)
      setData(d)
  }
}
console.log(data)


  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location '
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed(1)}°C</h1> :null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description} </p> : null}
          </div>
          </div>

      {data.name &&
        
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed(1)}°C</p> : null}
            <p>Feels like</p>
          </div>
        <div className="humidity">
        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
        {data.main ? <p className='bold'>{data.wind.speed.toFixed(1)}MPH</p> : null}
          {/* <p className="bold">12 KMPH</p> */}
          <p>Wind Speed</p>
        </div>
        </div>
        }

      </div>
    </div>
  );
}

export default App;
