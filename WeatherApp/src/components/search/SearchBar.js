import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {

    state = {
        city: ""
    }

    onInputChange = ev => {
        const value = ev.target.value;
        this.setState({ city: value });
        this.props.onFetchWeatherData(value);
    }

    render() {
        return (
            <div className="SearchBarContent">
                <input className="SearchBar" name="city" type="text" placeholder="Search city" value={this.state.city} onChange={this.onInputChange} />
            </div>
        )
    }
}



export default SearchBar;