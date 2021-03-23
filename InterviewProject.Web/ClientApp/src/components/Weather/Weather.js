import React, { useReducer } from 'react';
import Search from './Search';
import WeatherList from './WeatherList';

const weatherReducer = (state, action) => {
  console.log('action', action.type);
  switch(action.type){
    case 'SEARCH_COMPLETED':
      return { forecasts: action.forecasts, searching: false, location: action.location };
    case 'SEARCHING':
        return {...state, searching: action.searching};
    default:
        throw new Error();
  }
}

export const Weather = () => {
  const [state, dispatch] = useReducer(weatherReducer, { forecasts: [], location: '', searching: false });

  let contents = 
      <div>
        <Search dispatch= {dispatch} />
        {state.searching && <p><em>Searching...</em></p>}
        {state.location && <h1>Location: {state.location}</h1>}
        <WeatherList forecasts={state.forecasts} />
      </div>;
  return contents;
}
