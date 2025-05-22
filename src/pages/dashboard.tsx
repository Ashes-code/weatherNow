import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import "../App.css";

// Interfaces
interface WeatherData {
  id: number;
  name: string;
  weather: { main: string; icon: string; description: string }[];
  main: { temp: number };
}

interface ForecastItem {
  dt: number;
  dt_txt: string;
  weather: { icon: string; description: string }[];
  main: { temp: number };
}

const Dashboard = () => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const cities = [
    "Abia", "Rivers", "Lagos", "Abuja", "London", "New York", "Cairo",
    "Paris", "Nairobi", "Berlin", "Beijing", "Johannesburg", "Dubai", "Toronto",
  ];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [selectedCity, setSelectedCity] = useState("Abia");
  const [selectedForecastCity, setSelectedForecastCity] = useState("Abuja");
  const [cityWeather, setCityWeather] = useState<WeatherData[]>([]);
  const [forecastStripData, setForecastStripData] = useState<ForecastItem[]>([]);
  const [forecastGraphData, setForecastGraphData] = useState<ForecastItem[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);

  const fetchWeather = async (city: string) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching weather for:", city, error);
      return null;
    }
  };

  const fetchForecast = async (city: string) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      return res.data.list;
    } catch (error) {
      console.error("Error fetching forecast for:", city, error);
      return [];
    }
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoadingWeather(true);
      const data = await Promise.all(cities.map((city) => fetchWeather(city)));
      const validData = data.filter((d) => d !== null) as WeatherData[];
      setCityWeather(validData);
      setIsLoadingWeather(false);
    };
    loadWeatherData();
  }, []);

  useEffect(() => {
    const loadStripData = async () => {
      setIsLoadingForecast(true);
      const forecast = await fetchForecast(selectedForecastCity);
      setForecastStripData(forecast);
      setIsLoadingForecast(false);
    };
    loadStripData();
  }, [selectedForecastCity]);

  useEffect(() => {
    const loadGraphData = async () => {
      const forecast = await fetchForecast(selectedCity);
      setForecastGraphData(forecast);
    };
    loadGraphData();
  }, [selectedCity]);

  return (
    <div className="m-2 lg:m-0 bg-white rounded-lg p-3 overflow-hidden shadow h-full md:max-w-[97vw] lg:max-w-auto py-5">
      <div className="h-full overflow-y-scroll py-3 px-4 scrollbar-hide bg-indigo-100 rounded max-w-[90vw] md:max-w-[96vw] lg:max-w-[80vw]">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800 flex justify-center items-center lg:justify-start">Weather Forecast</h2>

        {isLoadingWeather ? (
          <div className="flex justify-center items-center h-40">
            <div className="loader border-indigo-500"></div>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide">
            {cityWeather.map((city) => (
              <div
                key={city.id}
                className="min-w-[200px] min-h-[160px] hover:bg-black rounded-xl shadow-md flex flex-col items-center justify-between text-white font-medium p-4 bg-indigo-600 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-bold">{city.name}</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  alt={city.weather[0].description}
                  className="w-24 h-24"
                />
                <p className="text-2xl">{Math.round(city.main.temp)}°C</p>
                <p className="text-md">{city.weather[0].main}</p>
              </div>
            ))}
          </div>
        )}

        {/* Forecast Strip */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center mt-6 lg:mt-14 mb-4 gap-3 lg:gap-0">
          <h2 className="text-2xl font-semibold text-indigo-800">Forecast-Strip</h2>
          <div>
            <label className="text-indigo-800 font-semibold mr-2 text-2xl">Select City:</label>
            <select
              value={selectedForecastCity}
              onChange={(e) => setSelectedForecastCity(e.target.value)}
              className="p-1 border border-indigo-600 rounded outline-none mb-3"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoadingForecast ? (
          <div className="flex justify-center items-center h-24">
            <div className="loader border-indigo-500"></div>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            {forecastStripData.slice(0, 12).map((forecast) => (
              <div
                key={forecast.dt}
                className="min-w-[10rem] h-36 bg-indigo-600 hover:bg-black rounded-lg shadow flex flex-col items-center justify-center px-2 text-white"
              >
                <p className="text-xs">{formatTime(forecast.dt_txt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                  className="w-8 h-8"
                />
                <p className="text-sm font-semibold">{Math.round(forecast.main.temp)}°C</p>
              </div>
            ))}
          </div>
        )}

        {/* Weather Graph */}
        <div className="mt-14 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-3 lg:gap-0">
          <h2 className="text-2xl font-semibold lg:mb-4 text-indigo-800">Weather-Graph</h2>
          <div>
            <label className="text-indigo-800 font-semibold mr-2 text-2xl">Select City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-1 border border-indigo-600 rounded outline-none mb-3"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow w-full h-auto px-4 py-4">
          {forecastGraphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastGraphData.slice(0, 10)}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="dt_txt" tickFormatter={(value) => formatTime(value)} />
                <YAxis unit="°C" />
                <Tooltip labelFormatter={(label) => `Time: ${formatTime(label)}`} />
                <Line
                  type="monotone"
                  dataKey="main.temp"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-indigo-600 mt-6">
              Loading forecast data for {selectedCity}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
