import React from 'react'
import './WeatherDaysList.css'

const WeatherDaysList = props => {

    return (
        <table className="WeatherDaysList">
            <tbody>
                {props.weatherList.map(weather => (
                    <tr className="WeatherRow" key={weather.day}>
                        <td className="WeatherCell">
                            {weather.day}
                        </td>
                        <td>
                            <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather" />
                        </td>
                        <td className="WeatherCell">
                            {`${weather.tempMin}\u00b0 C/${weather.tempMax}\u00b0 C`}
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
    )
}

export default WeatherDaysList;