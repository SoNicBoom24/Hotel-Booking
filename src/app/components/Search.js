"use client";

import { FaHotel, FaPlaneDeparture, FaCarSide } from "react-icons/fa";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Search() {
  const [selected, setSelected] = useState("Hotel");
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const handleSearch = () => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      setError("Location cannot be empty");
      return;
    }

    setError("");

    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    router.push(`/hotels?location=${searchQuery}`);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="flex-1 p-8 text-black">
      <div className="w-full border rounded-md p-3 text-gray-400 bg-blue-100 mb-10">
        Search city , Country, Place for Travel advisory
      </div>

      <h1 className="text-3xl font-bold mb-6">What Are You Looking For?</h1>
      <div className="flex space-x-14 mb-8 justify-center">
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setSelected("Hotel")}
        >
          <div
            className={`flex items-center justify-center rounded-full ${
              selected === "Hotel" ? "bg-blue-800 p-3 text-white" : ""
            }`}
          >
            <FaHotel size={24} />
          </div>
          <span>Home</span>
        </div>

        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setSelected("Flight")}
        >
          <div
            className={`flex items-center justify-center rounded-full ${
              selected === "Flight" ? "bg-blue-800 p-3 text-white" : ""
            }`}
          >
            <FaPlaneDeparture size={24} />
          </div>
          <span>Flight</span>
        </div>

        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setSelected("Car")}
        >
          <div
            className={`flex items-center justify-center rounded-full ${
              selected === "Car" ? "bg-blue-800 p-3 text-white" : ""
            }`}
          >
            <FaCarSide size={24} />
          </div>
          <span>Car</span>
        </div>
      </div>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Location"
          className="w-full border rounded-md p-3 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded-md p-3"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            className="border rounded-md p-3"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>

        <div className="w-full border rounded-md p-3 text-black">
          2 adults, 1 child - 1 room
        </div>

        {/* <Link
          href={`/hotels?location=${searchQuery}&startDate=${startDate}&endDate=${endDate}`}
          onClick={handleSearch}
        > */}
        <button
          className="bg-blue-800 text-white w-full p-3 rounded-md mt-3"
          onClick={handleSearch}
        >
          Search
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
}
