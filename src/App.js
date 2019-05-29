import React from 'react';
import { Jumbotron, Container, Button, ButtonToolbar,Card,CardImg,CardTitle,CardText } from 'reactstrap';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const kelvinToCelsius = require('kelvin-to-celsius');
const  moment = require('moment');

class APP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.getWeather(latitude, longitude)
      
    });
  };


  
  
  getWeather = async (latitude, longitude) => {
    // const city = e.target.elements.city.value;
    // const country = e.target.elements.country.value;
    const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Api_Key}`);
    const response = await api_call.json();
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })

      }
  
  render() {

    return (
    
         <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row inline" style={{display: 'inline'}}>
                <div className="col-xs-5 title-container">
                <Titles />
                </div>
                <div className="col-xs-7 form-container">
                <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={kelvinToCelsius(parseInt(this.state.temperature))}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    
    )
    }

  }

  class Titles extends React.Component {

    render() {

        return (

            <div>

                <h1 className="title-container__title">AWESOME WEATHER APP </h1>
                <p className="title-container__subtitle"> Give the weather condition for your convinent...  </p>
            </div>
        )
    }
}

class Weather extends React.Component{

  render(){

      return(

          <div className="weather-info">
              {
                  this.props.country && this.props.city && <p className="weather__key">Location: 
                      <span className="weather__value">  {this.props.city}, {this.props.country}</span>                    
                  </p> 
              }
              
              {
                  this.props.temperature && <p className="weather__key">Temperature (oC): 
                      <span className="weather__value">  {this.props.temperature}</span>
                  </p>
              }

              {
                  this.props.humidity && <p className="weather__key">Humidity (%): 
                      <span className="weather__value">  {this.props.humidity}</span>
                  </p>
              }

              {
                  this.props.description && <p className="weather__key">Conditions:  
                      <span className="weather__value">  {this.props.description}</span>
                  </p>
              }

              {
                  this.props.error && <p className="weather__error">{this.props.error}</p>
              }
      
          </div>
      )
  }
}
 
class Form extends React.Component{

  render(){

      return(
              <form onSubmit = {this.props.loadWeather}>
                  <input type="text" name="city" placeholder="City..."/>
                  <input type="text" name="country" placeholder="Country..."/>
                  <button>Get Weather</button>
              </form>
         
      )
  }
}










export default APP;
