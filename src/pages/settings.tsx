import { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [notifications, setNotifications] = useState(true);
  const [defaultCity, setDefaultCity] = useState('New York');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load settings from localStorage if available
    const savedUnit = localStorage.getItem('unit') as 'C' | 'F';
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedCity = localStorage.getItem('city');
    const savedNotify = localStorage.getItem('notifications');

    if (savedUnit) setUnit(savedUnit);
    if (savedTheme) setTheme(savedTheme);
    if (savedCity) setDefaultCity(savedCity);
    if (savedNotify) setNotifications(savedNotify === 'true');
  }, []);

  const handleSave = () => {
    localStorage.setItem('unit', unit);
    localStorage.setItem('theme', theme);
    localStorage.setItem('city', defaultCity);
    localStorage.setItem('notifications', notifications.toString());
    alert('Settings saved!');
  };

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {/* Unit Toggle */}
        <div>
          <label className="block font-semibold mb-2">Temperature Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'C' | 'F')}
            className="w-full p-2 border rounded"
          >
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>

        {/* Notification Toggle */}
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
            value={defaultCity}
            onChange={(e) => setDefaultCity(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your default city"
          />
        </div>

        {/* Theme Toggle */}
        <div>
          <label className="block font-semibold mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
