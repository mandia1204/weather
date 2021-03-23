import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { WeatherApi } from '../../api/WeatherApi';

const Search = ({dispatch}) => {
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(locationFilter){
                dispatch({ type: 'SEARCHING', searching: true });

                let locationsFound = await WeatherApi.getLocations(locationFilter);

                if(locationsFound.length === 1){
                    const locationWeather = await WeatherApi.getLocationWeather(locationsFound[0].woeid);
                    dispatch({ type: 'SEARCH_COMPLETED', forecasts: locationWeather, location: locationsFound[0].title});
                }
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [locationFilter, dispatch]);
    
    return (
        <div>
            <input className="search-input" placeholder="enter location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}></input>
        </div>
    );
}

Search.propTypes = {
    dispatch: PropTypes.func
};

export default Search;