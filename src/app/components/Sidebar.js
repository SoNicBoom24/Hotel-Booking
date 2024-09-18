"use client";

import { FaHome, FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
  const [selected, setSelected] = useState("Explore");
  return (
    <div className="z-40 bg-blue-800 w-full h-auto flex flex-col items-center justify-center rounded-t-[32px] pb-2 md:pb-0 md:rounded-r-[32px] md:min-h-screen md:w-[6rem] md:rounded-none fixed bottom-0 md:top-0 md:left-0 md:fixed md:h-screen md:overflow-y-auto">
      <div className="flex w-full items-center justify-between md:flex-col md:space-y-24 md:w-auto p-2">
        <div
          className={`flex flex-col items-center w-16 h-16 justify-center cursor-pointer ${
            selected === "Home" ? "bg-white rounded-full p-3 text-blue-800" : ""
          }`}
          onClick={() => setSelected("Home")}
        >
          <FaHome size={24} />
          Home
        </div>

        <div
          className={`flex flex-col items-center w-16 h-16 justify-center cursor-pointer ${
            selected === "Explore"
              ? "bg-white rounded-full p-3 text-blue-800"
              : ""
          }`}
          onClick={() => setSelected("Explore")}
        >
          <FaSearch size={24} />
          Explore
        </div>

        <div
          className={`flex flex-col items-center w-16 h-16 justify-center cursor-pointer ${
            selected === "Trips"
              ? "bg-white rounded-full p-3 text-blue-800"
              : ""
          }`}
          onClick={() => setSelected("Trips")}
        >
          <FaHeart size={24} />
          Trips
        </div>

        <div
          className={`flex flex-col items-center w-16 h-16 justify-center cursor-pointer ${
            selected === "Profile"
              ? "bg-white rounded-full p-3 text-blue-800"
              : ""
          }`}
          onClick={() => setSelected("Profile")}
        >
          <FaUser size={24} />
          Profile
        </div>
      </div>
    </div>
  );
}
