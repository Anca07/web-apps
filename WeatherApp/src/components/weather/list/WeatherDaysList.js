import React from 'react'
import './WeatherDaysList.css'

const WeatherDaysList = props => {

    return (
        <div className="WeatherDaysList">
            {props.weatherList.map(weather => (
                <div className="WeatherRow" key={weather.day}>
                    <div>
                        {weather.day}
                    </div>
                    <div>
                        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather" />
                    </div>
                    <div>
                        {`${weather.tempMin}/${weather.tempMax}`}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WeatherDaysList;