const getRequestData = async (url) => {
    const response = await fetch(url);
    return response.json();
}

export const WeatherApi = {
    getLocations : (locationName) => {
        return getRequestData(`weatherforecast/location/search/${locationName}`);
    },
    getLocationWeather : (woeid) => {
        return getRequestData(`weatherforecast/location/${woeid}`);
    }
}