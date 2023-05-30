import {React,useState} from 'react'
import fetchWeather from './fetchWeather';

const Home = () => {

    const [cityname,setCityname]=useState("");
    const [weather,setWeather] = useState([]);
    const [windspeed,setWindspeed]=useState("");
    const [humidity,setHumidity]=useState("");

    const fetchWeather = async (e)=>{
       e.preventDefault();

       const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=c315ec1225cad8093772c28b1149449f`;
    
       let data = await fetch(url);

       let parsedData = await data.json();

       setWeather(parsedData.weather);
       setWindspeed(parsedData.wind.speed);
       setHumidity(parsedData.main);

       console.log(weather);
       console.log("ok")
    }


  return (
    <>
    <div className="conatiner d-flex justify-content-center align-items-center my-3" >
       <h1>Enter city name for weather update: </h1>
       <form onSubmit={fetchWeather} className="d-flex mx-2">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setCityname(e.target.value)}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
     
    

    </div>
    <div className="conatiner d-flex justify-content-center align-items-center my-3" >
        <h2>{cityname}</h2>
    </div>
    <div className="conatiner d-flex justify-content-center align-items-center my-3" >
        <h2>Temperature: {humidity.temp}</h2>
    </div>
    <div className="conatiner d-flex justify-content-center align-items-center my-3" >
        <h2>Humidity: {humidity.humidity}</h2>
    </div>
    <div className="conatiner d-flex justify-content-center align-items-center my-3" >
        <h2>WindSpeed: {windspeed}</h2>
    </div>
   
   
    </>
  )
}

export default Home
