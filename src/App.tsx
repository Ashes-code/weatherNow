import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import Dashboard from "./pages/dashboard";
import Statistics from "./pages/statistics";
import MapPage from "./pages/map";
import CalendarPage from "./pages/calendar";
import SettingsPage from "./pages/settings";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <div className="flex h-screen lg:p-4 bg-[radial-gradient(ellipse_at_top_left,_#ffffff,_#e0f2ff,_#cce4ff)]">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Topbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 pt-3 overflow-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
