import { useState, useEffect } from "react";
import axios from 'axios';
import Moment from 'react-moment';

// import svgs
import logo from './assets/temperature.svg';
import sunrise from './assets/sunrise.svg';
import sunset from './assets/sunset.svg';
import wind from './assets/wind.svg';
import location from './assets/location.svg';

const Dashboard = () => {
  const [city, setCity] = useState('London');
  const [error, setError] = useState('');
  const [data, setData] = useState();
  const [cityImage, setCityImage] = useState();

  const handleSubmit = () =>{
    setData(null);
    axios.post( 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=ba6fd93a99500298fec2e2911f9b91d7' )
		.then(( res ) => {
      setData(res);
      getImage(city);
		}).catch(e =>{
			console.log("Erros while fetching user data : "+e)
			setError("Erros getting update !!")
		})
  }

  const getImage = (city) => {
    axios.get('https://api.teleport.org/api/urban_areas/slug:'+city.toLowerCase()+'/images/')
		.then(( res ) => {
      setCityImage(res.data.photos[0].image.web);
		}).catch(e =>{
      console.log('https://api.teleport.org/api/urban_areas/slug:'+city.toLowerCase()+'/images/')
			console.log("Erros while fetching user data : "+e)
		})
  }
 
  useEffect(()=>{
    //initial load
    handleSubmit();

    //update every 30 seconds 
    const interval = setInterval(() => {
      console.log('Update weather every 30 sec');
      handleSubmit()
    }, 30000);

    return () => clearInterval(interval);
  },[city]);

  return (
    <>
{data&&
      <div className="centerDiv">
        <div className="div1">
          <div className="div1-stack">
              <img className="city-image" src={cityImage}/>
          </div>
          <div className="div2-stack">
          </div>
          <div className="div3-stack">
          </div>

          <div className="div4-stack">
          <div className="div-cloud1">
            <div className="cloud">
                <img
                  src={"http://openweathermap.org/img/wn/"+data.data.weather[0].icon+"@4x.png"}
                  alt="new"
                  /> 
            </div>
                          
          </div>
          <div className="div-cloud1">
          <div className="temprature">{data.data.main.temp}<sup className="far">°F</sup></div>  
          </div>   

          </div>
          <div className="div5-stack">
          <div className="container-cloud">
                <div className="div-cloud1">
                  <div className="weather">
                    <h2><img src={location} alt="" />{data.data.name}</h2>
                    <h3>{data.data.weather[0].main}</h3>
                    <p>{data.data.weather[0].description}</p>
                  </div>
                </div>
                <div className="div-cloud2">
                  <div className="temprature-detail">
                    <div className="div-cloud-sub1">
                        <div className="temprature-detail">
                          <div className="div-sun">
                              <div className="div-sun-pad">
                              <img src={sunrise}/>
                              </div>
                            </div>
                            <div className="sun-time">
                              <Moment unix>{data.data.sys.sunrise}</Moment>
                            </div>
                        </div>
                    </div>
                    <div className="div-cloud-sub2">
                      <div className="temprature-detail">
                            <div className="div-sun">
                              <div className="div-sun-pad">
                              <img src={sunset}/>
                              </div>
                            </div>
                            <div className="sun-time">
                              <Moment unix>{data.data.sys.sunset}</Moment>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>



        </div>
       
          <div className="div2">
            <div className="div1-stack">
                      <select className="select-city create-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}>
                        <option value="london">London</option>
                        <option value="tokyo">Tokyo</option>
                        <option value="toronto">Toronto</option>
                        <option value="montreal">Montreal</option>
                        <option value="vancouver">Vancouver</option>
                        <option value="Ottawa">Ottawa</option>
                      </select>
                      <div className="error">{error}</div>
            </div>
            <div className="div2-stack">
            </div>
            <div className="div3-stack">
            
                
            </div>
            <div className="div4-stack">
                <div className="div-cloud1">
                <div className="thermo">
                <img src={logo}/>
                </div>
                </div>
                <div className="div-cloud1">
                  <div className="weather">
                    <div className="temprature-detail">
                    <h2>Detail temprature</h2>
                    {data.data.main.temp}<sup className="farx">°F</sup> <span className="sun-text">daily averaged temperature</span><br></br>
                    {data.data.main.feels_like}<sup className="farx">°F</sup><span className="sun-text">daily min temperature</span><br></br>
                    {data.data.main.temp_min}<sup className="farx">°F</sup><span className="sun-text">daily min temperature</span><br></br>
                    {data.data.main.temp_max}<sup className="farx">°F</sup><span className="sun-text">daily max temperature)</span><br></br>
                  </div>
                  </div>
                </div>
            </div>

            <div className="div5-stack">
                <div className="div-cloud4">
                <div className="wind">
                <img src={wind}/>
                </div>
                </div>
                <div className="div-cloud4">
                  <div className="weather">
                    <div className="temprature-detail">
                    <h2>Wind</h2>
                    <br></br>
                    <span className="sun-textx"> Speed </span>{data.data.wind.speed}<br></br>
                    <span className="sun-textx">Degree</span>{data.data.wind.deg}<br></br>
                  </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
}

    </>
  );
}
 
export default Dashboard;