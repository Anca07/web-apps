import React from 'react';
import './CurrentDayWeather.css'

const CurrentDayWeather = props => {
    return <div className="CurrentDayWeather CurrentDayWeatherRow">
        <div>
            <div>
                <b>{`${props.city.name}, ${props.city.country}`}</b>
            </div>
            <div>
                {`${props.weather.day}, ${props.weather.time}, ${props.weather.description}`}
            </div>
            <div className="Temperature">
                {`${props.weather.temp}\u00b0 C`}
            </div>
            <div className="CurrentDayWeatherRow">
                <div>
                    <img
                        className="Logo"
                        src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-wind-icon-png-image_924484.jpg"
                        alt="wind" />
                    {`${props.weather.windSpeed} km/h Winds`}
                </div>
                <div>
                    <img
                        className="Logo"
                        src="https://f1.pngfuel.com/png/389/899/774/moisture-logo-humidifier-humidity-relative-humidity-temperature-data-logger-weather-symbol-png-clip-art.png"
                        alt="humidity" />
                    {`${props.weather.humidity}% Humidity`}
                </div>
            </div>
        </div>
        <div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`} alt="weather"/>
            </div>
        </div>
    </div>
}

export default CurrentDayWeather;