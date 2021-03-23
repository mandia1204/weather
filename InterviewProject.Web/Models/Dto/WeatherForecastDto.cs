namespace InterviewProject.Models.Dto
{
    public class WeatherForecastDto
    {
        public long Id { get; set; }
        public string State { get; set; }
        public string Date { get; set; }
        public double TemperatureC { get; set; }
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        public string StateAbbr { get; set; }
    }
}
