import { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface WeatherEntry {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string }[];
}

interface DailySummary {
  day: string;
  temp: number;
  humidity: number;
  type: string;
}

const CITIES: City[] = [
  { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "London", lat: 51.5072, lon: -0.1276 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
];

const COLORS = ["#FDBA74", "#A5B4FC", "#93C5FD"];

const Statistics = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [tempData, setTempData] = useState<{ day: string; temp: number }[]>([]);
  const [humidityData, setHumidityData] = useState<{ name: string; humidity: number }[]>([]);
  const [weatherDistribution, setWeatherDistribution] = useState<{ name: string; value: number }[]>([]);

  const mostFrequent = (arr: string[]) => {
    const count: Record<string, number> = {};
    arr.forEach((x) => (count[x] = (count[x] || 0) + 1));
    return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
  };

  const fetchWeather = useCallback(async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=${unit}&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const list: WeatherEntry[] = data.list;

    const groupedDaily: Record<string, WeatherEntry[]> = {};

    list.forEach((entry) => {
      const day = new Date(entry.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!groupedDaily[day]) groupedDaily[day] = [];
      groupedDaily[day].push(entry);
    });

    const dailySummaries: DailySummary[] = Object.entries(groupedDaily)
      .slice(0, 7)
      .map(([day, entries]) => {
        const temps = entries.map((e) => e.main.temp);
        const humidities = entries.map((e) => e.main.humidity);
        const weatherTypes = entries.map((e) => e.weather[0].main);

        return {
          day,
          temp: parseFloat((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)),
          humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
          type: mostFrequent(weatherTypes),
        };
      });

    setTempData(dailySummaries.map((d) => ({ day: d.day, temp: d.temp })));
    setHumidityData([
      { name: "Today", humidity: dailySummaries[0]?.humidity ?? 0 },
      { name: "Yesterday", humidity: dailySummaries[1]?.humidity ?? 0 },
    ]);

    const dist: Record<string, number> = {};
    dailySummaries.forEach((d) => {
      dist[d.type] = (dist[d.type] || 0) + 1;
    });

    setWeatherDistribution(Object.entries(dist).map(([name, value]) => ({ name, value })));
  }, [selectedCity, unit]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="p-3 space-y-8 h-full overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow-lg text-center">
          <p className="text-gray-500 text-sm">Avg Temp</p>
          <h2 className="text-xl font-bold">
            {tempData.length > 0 ? `${tempData[0].temp}°${unit === "metric" ? "C" : "F"}` : "--"}
          </h2>
        </div>
        <div className="bg-white p-4 rounded shadow-lg text-center">
          <p className="text-gray-500 text-sm">Avg Humidity</p>
          <h2 className="text-xl font-bold">
            {humidityData.length > 0 ? `${humidityData[0].humidity}%` : "--"}
          </h2>
        </div>
        <div className="bg-white p-4 rounded shadow-lg text-center">
          <p className="text-gray-500 text-sm">Wind</p>
          <h2 className="text-xl font-bold">Check Forecast</h2>
        </div>
        <div className="bg-white p-4 rounded shadow-lg text-center">
          <p className="text-gray-500 text-sm">Precipitation</p>
          <h2 className="text-xl font-bold">Varies</h2>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            className="border p-2 rounded border-indigo-600 outline-none"
            value={selectedCity.name}
            onChange={(e) => {
              const city = CITIES.find((c) => c.name === e.target.value);
              if (city) setSelectedCity(city);
            }}
          >
            {CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        >
          Toggle to °{unit === "metric" ? "F" : "C"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-3">
        <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-center">Temperature Trend</h3>
          <LineChart width={300} height={200} data={tempData}>
            <Line type="monotone" dataKey="temp" stroke="#6366F1" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-center">Humidity Comparison</h3>
          <BarChart width={300} height={200} data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="humidity" fill="#4F46E5" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-center">Weather Type Distribution</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={weatherDistribution}
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {weatherDistribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
