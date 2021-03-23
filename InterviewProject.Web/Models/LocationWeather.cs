using System;
using System.Collections.Generic;

namespace InterviewProject.Models
{
    public class LocationWeather
    {
        public IEnumerable<WeatherForecast> consolidated_weather { get; set; }
    }

    public class WeatherForecast
    {
        public long id { get; set; }
        public string weather_state_name { get; set; }
        public DateTime applicable_date { get; set; }
        public double the_temp { get; set; }
        public string weather_state_abbr { get; set; }
    }
}
