using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InterviewProject.Models;
using InterviewProject.Models.Dto;
using InterviewProject.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InterviewProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IWeatherRepository _weatherRepository;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherRepository weatherRepository)
        {
            _logger = logger;
            _weatherRepository = weatherRepository;
        }

        [HttpGet("location/search/{locationName}")]
        public Task<IEnumerable<Location>> GetLocationsByName(string locationName)
        {
            return _weatherRepository.GetLocationsByName(locationName);
        }

        [HttpGet("location/{woeid}")]
        public Task<IEnumerable<WeatherForecastDto>> GetLocationWeather(long woeid)
        {
            return _weatherRepository.GetLocationWeather(woeid);
        }

    }
}
