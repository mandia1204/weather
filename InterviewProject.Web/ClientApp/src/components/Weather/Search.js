import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { LocationList } from './LocationList';
import { usePrevious } from '../../hooks/usePrevious';
import { WeatherApi } from '../../api/WeatherApi';
import './Search.css';

const Search = ({dispatch, searching}) => {
    const [state, setState] = useState({locationFilter: '', selectedLocation: null});
    const [locations, setLocations] = useState([]);
    const prevLocationFilter = usePrevious(state.locationFilter);
    const isValidInput = (state.locationFilter.length > 2);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(state.locationFilter && isValidInput && state.locationFilter !== prevLocationFilter){
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
                }else {
                    setLocations([]);
                    dispatch({ type: 'RECORDS_NOT_FOUND', forecasts: []});
                }
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [state, prevLocationFilter, isValidInput, dispatch]);

    const onLocationSelected = useCallback(async (selectedLocation) => {
        setState({ locationFilter: selectedLocation.title, selectedLocation: selectedLocation});
    }, []);
    
    return (
        <div>
            <div>
                <input disabled={searching} className="search-input" placeholder="enter location" value={state.locationFilter} onChange={(e) => setState({ ...state, locationFilter: e.target.value})}></input>
                { state.locationFilter && !isValidInput && <span className="error">Enter at least 3 characters</span>}
                {searching && <span className="searching"><em>Searching...</em></span>}
            </div>
            { locations.length > 0 && <LocationList locations={locations} onLocationSelected={onLocationSelected} /> }
        </div>
    );
}

Search.propTypes = {
    dispatch: PropTypes.func
};

export default Search;