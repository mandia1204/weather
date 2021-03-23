using InterviewProject.Models;
using InterviewProject.Models.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace InterviewProject.Repositories
{
    public class WeatherRepository : IWeatherRepository
    {
        private readonly HttpClient _httpClient;
        public WeatherRepository(IHttpClientFactory clientFactory)
        {
            _httpClient = clientFactory.CreateClient("weatheApi");
        }

        public async Task<IEnumerable<Location>> GetLocationsByName(string locationName)
        {
            var response = await _httpClient.GetAsync($"location/search/?query={locationName}");
            response.EnsureSuccessStatusCode();
            using var responseStream = await response.Content.ReadAsStreamAsync();

            return await JsonSerializer.DeserializeAsync<IEnumerable<Location>>(responseStream);
        }

        public async Task<IEnumerable<WeatherForecastDto>> GetLocationWeather(long woeid)
        {
            var response = await _httpClient.GetAsync($"location/{woeid}/");
            response.EnsureSuccessStatusCode();

            using var responseStream = await response.Content.ReadAsStreamAsync();
            var result = await JsonSerializer.DeserializeAsync<LocationWeather>(responseStream);
            return result.consolidated_weather.Select(forecastWeather => new WeatherForecastDto
            {
                Id = forecastWeather.id,
                Date = forecastWeather.applicable_date.ToShortDateString(),
                State = forecastWeather.weather_state_name,
                StateAbbr = forecastWeather.weather_state_abbr,
                TemperatureC = (int)forecastWeather.the_temp
            }
            );
        }
    }
}
