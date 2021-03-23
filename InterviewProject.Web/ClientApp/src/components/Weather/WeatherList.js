import PropTypes from 'prop-types';
import React from 'react';

const WeatherList = ({forecasts}) => {
    return (

    <table className='table table-striped weather-list' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.id}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.state}</td>
            </tr>
          )}
        </tbody>
      </table>);
}


WeatherList.propTypes = {
    forecasts: PropTypes.array
};

export default WeatherList;