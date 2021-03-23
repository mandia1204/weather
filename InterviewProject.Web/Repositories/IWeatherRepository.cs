using InterviewProject.Models;
using InterviewProject.Models.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InterviewProject.Repositories
{
    public interface IWeatherRepository
    {
        Task<IEnumerable<Location>> GetLocationsByName(string locationName);

        Task<IEnumerable<WeatherForecastDto>> GetLocationWeather(long woeid);
    }
}
