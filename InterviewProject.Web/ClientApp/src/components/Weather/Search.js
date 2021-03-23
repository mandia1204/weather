import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { LocationList } from './LocationList';
import { WeatherApi } from '../../api/WeatherApi';

const Search = ({dispatch}) => {
    const [state, setState] = useState({locationFilter: '', selectedLocation: null});
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(state.locationFilter){
                dispatch({ type: 'SEARCHING', searching: true });

                let locationsFound;
                if(state.selectedLocation != null) {
                    locationsFound = [state.selectedLocation];
                    setState({...state, selectedLocation: null});
                }else {
                    locationsFound = await WeatherApi.getLocations(state.locationFilter);
                }

                if(locationsFound.length === 1){
                    setLocations([]);
                    const locationWeather = await WeatherApi.getLocationWeather(locationsFound[0].woeid);
                    dispatch({ type: 'SEARCH_COMPLETED', forecasts: locationWeather, location: locationsFound[0].title});
                }else if (locationsFound.length > 1) {
                    setLocations(locationsFound);
                    dispatch({ type: 'SEARCHING', searching: false });
                }
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [state, dispatch]);

    const onLocationSelected = useCallback(async (selectedLocation) => {
        setState({ locationFilter: selectedLocation.title, selectedLocation: selectedLocation});
    }, []);
    
    return (
        <div>
            <input className="search-input" placeholder="enter location" value={state.locationFilter} onChange={(e) => setState({ ...state, locationFilter: e.target.value})}></input>
            { locations.length > 0 && <LocationList locations={locations} onLocationSelected={onLocationSelected} /> }
        </div>
    );
}

Search.propTypes = {
    dispatch: PropTypes.func
};

export default Search;