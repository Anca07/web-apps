import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faTint } from '@fortawesome/free-solid-svg-icons'
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
                <FontAwesomeIcon icon={faWind} />
                <div className="CurrentDayWeatherColumn">
                    {`${props.weather.windSpeed} km/h Winds`}
                </div>
                <FontAwesomeIcon icon={faTint} />
                <div className="CurrentDayWeatherColumn">
                    {`${props.weather.humidity}% Humidity`}
                </div>
            </div>
        </div>
        <div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`} alt="weather" />
            </div>
        </div>
    </div>
}

export default CurrentDayWeather;