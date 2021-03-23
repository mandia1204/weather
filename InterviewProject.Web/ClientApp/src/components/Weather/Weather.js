import React, { useReducer } from 'react';
import Search from './Search';
import WeatherList from './WeatherList';

const weatherReducer = (state, action) => {
  console.log('action', action.type);
  switch(action.type){
    case 'SEARCH_COMPLETED':
      return { forecasts: action.forecasts, searching: false, location: action.location, noDataAfterSearch: false };
    case 'SEARCHING':
        return {...state, searching: action.searching};
    case 'RECORDS_NOT_FOUND':
        return { searching: false, forecasts: [], location: '', noDataAfterSearch: true};
    default:
        throw new Error();
  }
}

export const Weather = () => {
  const [state, dispatch] = useReducer(weatherReducer, { forecasts: [], location: '', searching: false, noDataAfterSearch: false });

  let contents = 
      <div>
        <Search dispatch= {dispatch} searching={state.searching} />
        {state.location && <h1>Location: {state.location}</h1>}
        <WeatherList forecasts={state.forecasts} />
        {state.noDataAfterSearch && <p><em>Your search did not return any data.</em></p>}
      </div>;
  return contents;
}
