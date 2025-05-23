import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const toggleUnit = () => {
    setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  const position: LatLngExpression = [40.7128, -74.006];

  const openWeatherTileUrl = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

  return (
    <div className="h-full m-2">
      <div className="flex justify-between items-center px-4 py-2 bg-indigo-600 text-white">
        <h2 className="text-xl font-bold">Weather Map</h2>
        <button
          onClick={toggleUnit}
          className="bg-white text-indigo-600 px-3 py-1 rounded font-medium"
        >
          {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
        </button>
      </div>

      <MapContainer
        center={position}
        zoom={3}
        scrollWheelZoom={true}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          url={openWeatherTileUrl}
          opacity={0.8}
        />
        <Marker
          position={position}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            New York<br />Current Temp Layer
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
