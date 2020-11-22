import React from 'react'
import SearchBar from '../components/search/SearchBar'
import moment from 'moment'
import CurrentDayWeather from '../components/weather/CurrentDayWeather'
import WeatherDaysList from '../components/weather/list/WeatherDaysList'
import './WeatherDashboard.css'

const MESSAGE = "Love is in the air. Call that special someone up for a coffee"
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class WeatherDashboard extends React.Component {
    state = {
        city: null,
        currentDayWeather: null,
        weatherList: []
    }

    getCurrentDayWeather = weatherList => {
        const currentDayWeather = weatherList.find(weather => {
            const today = moment(moment().format("YYYY-MM-DD"));
            const day = moment(moment.unix(weather.dt).format("YYYY-MM-DD"));
            return day.isSame(today, "day")
        });

        const date = moment(moment.unix(currentDayWeather.dt).format("YYYY-MM-DD HH:mm:ss"));

        return {
            day: date.format('dddd'),
            time: date.format('HH:mm A'),
            description: currentDayWeather.weather[0].main,
            temp: Math.round(currentDayWeather.main.temp),
            windSpeed: currentDayWeather.wind.speed,
            humidity: currentDayWeather.main.humidity,
            icon: currentDayWeather.weather[0].icon,
        }
    }

    getNextDaysWeather = weatherList => {
        const weatherPerDay = weatherList.reduce((result, weather) => {
            const day = moment(moment.unix(weather.dt).format("YYYY-MM-DD"));

            (result[day] = result[day] || []).push(weather);

            return result;
        }, {});

        const weatherArray = [];
        for (let key in weatherPerDay) {
            const noon = Math.floor(weatherPerDay[key].length / 2);
            weatherArray.push(weatherPerDay[key][noon])
        }

        const weathers = weatherArray.map(weather => {
            const date = moment(moment.unix(weather.dt).format("YYYY-MM-DD HH:mm:ss"));
            return {
                day: date.format('dddd'),
                icon: weather.weather[0].icon,
                tempMin: Math.round(weather.main.temp_min),
                tempMax: Math.round(weather.main.temp_max)
            }
        })

        return weathers;
    }

    onFetchWeatherData = city => {
        if (city && city.length >= 3) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=${WEATHER_API_KEY}&units=metric&q=${city}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        city: {
                            name: data.city.name,
                            country: data.city.country
                        },
                        currentDayWeather: this.getCurrentDayWeather(data.list),
                        weatherList: this.getNextDaysWeather(data.list)
                    })
                })
                .catch(err => {
                    this.setState({
                        city: null,
                        currentDayWeather: null,
                        weatherList: []
                    })
                    console.log(err)
                })
        } else {
            this.setState({
                city: null,
                currentDayWeather: null,
                weatherList: []
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <SearchBar onFetchWeatherData={this.onFetchWeatherData} />
                {this.state.city ?
                    <React.Fragment>
                        {this.state.city && this.state.currentDayWeather &&
                            <CurrentDayWeather weather={this.state.currentDayWeather} city={this.state.city} />
                        }
                        {this.state.currentDayWeather && <div className="Message">
                            {MESSAGE}
                        </div>}
                        {
                            this.state.weatherList && <WeatherDaysList
                                weatherList={this.state.weatherList} />
                        }
                    </React.Fragment> :

                    <React.Fragment>
                        <div className="Message">
                            No weather info available
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default WeatherDashboard;