import {
  LayoutDashboard,
  BarChart3,
  Map,
  CalendarDays,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen?: boolean }) => {
  return (
    <section
      className={`
        fixed top-0 left-0 h-full z-50
        bg-indigo-600 text-white p-4 rounded-l-lg
        transform transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0`}
    >
      <div className="flex flex-col flex-1">
        <h1 className="text-xl font-bold mb-6">WEATHER NOW</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:bg-indigo-500 p-2 rounded flex items-center gap-2">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/statistics" className="hover:bg-indigo-500 p-2 rounded flex items-center gap-2">
            <BarChart3 size={18} /> Statistics
          </Link>
          <Link to="/map" className="hover:bg-indigo-500 p-2 rounded flex items-center gap-2">
            <Map size={18} /> Map
          </Link>
          <Link to="/calendar" className="hover:bg-indigo-500 p-2 rounded flex items-center gap-2">
            <CalendarDays size={18} /> Calendar
          </Link>
          <Link to="/settings" className="hover:bg-indigo-500 p-2 rounded flex items-center gap-2">
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <div className="mt-auto bg-white text-black p-4 rounded shadow">
          <p className="text-sm">Today</p>
          <p className="text-2xl font-bold">+4°C</p>
          <p className="text-sm">New York, United States</p>
          <p className="text-xs mt-2">Humidity: 70%</p>
          <p className="text-xs">Precipitation: 25%</p>
          <p className="text-xs">Wind: 4.5km/h</p>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
