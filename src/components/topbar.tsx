// import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const Topbar = ({
  onToggleSidebar,
  search,
  onSearchChange,
}: {
  onToggleSidebar: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}) => {
  return (
    <header className="m-2 lg:m-0 p-4 bg-white shadow flex justify-between items-center lg:justify-center rounded-lg lg:rounded-r-lg">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-indigo-600 outline-indigo-600 text-indigo-800 px-4 py-2 rounded sm:w-1/2 lg:w-1/2"
      />

      <button
        onClick={onToggleSidebar}
        className="text-indigo-600 text-2xl lg:hidden cursor-pointer"
      >
        <HiMenu />
      </button>
    </header>
  );
};

export default Topbar;
