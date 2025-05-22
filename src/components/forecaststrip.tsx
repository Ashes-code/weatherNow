import { WiDayRainMix } from "react-icons/wi";

type ForecastCardProps = {
  dayOffset: number;
};

const ForecastCard = ({ dayOffset }: ForecastCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center shadow-sm">
      <h3 className="font-semibold mb-2">Day {dayOffset}</h3>
      <WiDayRainMix size={40} className="mx-auto" />
      <p className="text-lg font-bold mt-2">24°C</p>
      <p className="text-sm text-white/70">Rainy</p>
    </div>
  );
};

export default ForecastCard;
