import { WiCloudy, WiThermometer, WiHumidity } from "react-icons/wi";

const WeatherCard = () => {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-md flex flex-col items-center text-center">
      <WiCloudy size={64} />
      <h2 className="text-2xl font-semibold mt-2">Lagos</h2>
      <p className="text-5xl font-bold mt-1">27°C</p>
      <p className="text-sm text-white/70 mt-1">Cloudy</p>

      <div className="flex gap-8 mt-4 text-white/80">
        <div className="flex items-center gap-1">
          <WiThermometer size={24} />
          <span>Feels like: 29°C</span>
        </div>
        <div className="flex items-center gap-1">
          <WiHumidity size={24} />
          <span>Humidity: 72%</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
