import { useState, useEffect } from 'react';
import { useSettingsStore } from '../components/useSettings';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { unit, city, setUnit, setCity } = useSettingsStore();
  const [localUnit, setLocalUnit] = useState<'C' | 'F'>(unit);
  const [localCity, setLocalCity] = useState(city);
  const [notifications, setNotifications] = useState(true);
  const [recentCities, setRecentCities] = useState<string[]>([]);

  useEffect(() => {
    const savedNotify = localStorage.getItem('notifications');
    if (savedNotify) setNotifications(savedNotify === 'true');

    const recent = JSON.parse(localStorage.getItem('recentCities') || '[]');
    setRecentCities(recent);
  }, []);


  useEffect(() => {
    const savedNotify = localStorage.getItem('notifications');
    if (savedNotify) setNotifications(savedNotify === 'true');
  }, []);

  const handleSave = () => {
    setUnit(localUnit);
    setCity(localCity);
    localStorage.setItem('notifications', notifications.toString());

    // Update recent cities
    let updatedRecent = [localCity, ...recentCities.filter(c => c !== localCity)];
    updatedRecent = updatedRecent.slice(0, 3); // Keep only 3
    localStorage.setItem('recentCities', JSON.stringify(updatedRecent));
    setRecentCities(updatedRecent);

    toast.success('Settings saved!');
  };

  const handleReset = () => {
    const defaultCity = 'New York';
    setLocalCity(defaultCity);
    setLocalUnit('C');
    setNotifications(true);
    setUnit('C');
    setCity(defaultCity);
    localStorage.removeItem('recentCities');
    localStorage.setItem('notifications', 'true');
    toast.success('Settings reset to defaults!');
    setRecentCities([]);
  };



  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold mb-4 text-indigo-700 text-center">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {/* Temperature Unit */}
        <div>
          <label className="block font-semibold mb-2">Temperature Unit</label>
          <select
            value={localUnit}
            onChange={(e) => setLocalUnit(e.target.value as 'C' | 'F')}
            className="w-full p-2 border rounded"
          >
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <label className="font-semibold">Enable Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-5 h-5"
          />
        </div>

        {/* Default City */}
        <div>
          <label className="block font-semibold mb-2">Default City</label>
          <input
            type="text"
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your default city"
          />
        </div>

        {/* Recent Cities Dropdown */}
        {recentCities.length > 0 && (
          <div>
            <label className="block font-semibold mb-2">Recent Cities</label>
            <select
              onChange={(e) => setLocalCity(e.target.value)}
              className="w-full p-2 border rounded"
              value=""
            >
              <option value="" disabled>Select from recent</option>
              {recentCities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
        )}


        {/* Save and Reset Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
          >
            Save Settings
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-900"
          >
            Reset to Defaults
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
