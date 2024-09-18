"use client";

import Sidebar from "../../components/Sidebar.js";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function ExploreHotel({ params }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [hotel, setHotel] = useState([]);
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setStartDate(localStorage.getItem("startDate"));
    setEndDate(localStorage.getItem("endDate"));
  }, []);

  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [rooms, setRooms] = useState("");

  const handleStartDateChange = (e) => {
    localStorage.setItem("startDate", e.target.value);
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    localStorage.setItem("endDate", e.target.value);
    setEndDate(e.target.value);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmitNomal = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (adults && children && rooms && startDate && endDate) {
      // ส่งข้อมูลหรือทำสิ่งที่ต้องการ
      console.log("Submitted:", { adults, children, rooms });
      router.push(
        `/review-hotel?roomType=${hotel.roomTypeNomal}&checkIn=${startDate}&checkOut=${endDate}&adults=${adults}&children=${children}&rooms=${rooms}`
      );
    } else {
      console.log("Please fill all the fields");
    }
  };

  const handleSubmitDeluxe = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (adults && children && rooms && startDate && endDate) {
      // ส่งข้อมูลหรือทำสิ่งที่ต้องการ
      console.log("Submitted:", { adults, children, rooms });
      router.push(
        `/review-hotel?roomType=${hotel.roomTypeDeluxe}&checkIn=${startDate}&checkOut=${endDate}&adults=${adults}&children=${children}&rooms=${rooms}`
      );
    } else {
      console.log("Please fill all the fields");
    }
  };

  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/search-id?id=${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setHotel(data);
        } else {
          setError(data.error || "Error fetching hotel data");
        }
      } catch (error) {
        setError("Error fetching hotel data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotelById();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full md:pl-24 mb-20">
      <Sidebar className="md:w-1/4 md:flex-shrink-0" />
      <div className="flex-1 p-6 text-black">
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mb-10">
          <Link href={`/`}>
            <div className="bg-blue-100 rounded-full p-3 mb-4 md:mb-0">
              <FaChevronLeft size={24} className="text-black" />
            </div>
          </Link>
          <div className="w-full border rounded-md p-3 text-gray-400 bg-blue-100">
            Search city, Country, Place for Travel advisory
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-3">
          <div className="w-full border rounded-md p-3 text-black md:col-span-3">
            Where are you going?
          </div>

          <input
            type="date"
            className={`w-full border rounded-md p-3 text-black md:col-span-2 ${
              isSubmitted && !startDate ? "border-red-500" : ""
            }`}
            value={startDate}
            onChange={handleStartDateChange}
          />

          <input
            type="date"
            className={`w-full border rounded-md p-3 text-black md:col-span-2 ${
              isSubmitted && !endDate ? "border-red-500" : ""
            }`}
            value={endDate}
            onChange={handleEndDateChange}
          />

          <form className="md:col-span-3 flex flex-col md:flex-row gap-3">
            <input
              type="number"
              className={`w-full border rounded-md p-3 text-black ${
                isSubmitted && !adults ? "border-red-500" : ""
              }`}
              placeholder="Adults"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
            <input
              type="number"
              className={`w-full border rounded-md p-3 text-black ${
                isSubmitted && !children ? "border-red-500" : ""
              }`}
              placeholder="Children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
            <input
              type="number"
              className={`w-full border rounded-md p-3 text-black ${
                isSubmitted && !rooms ? "border-red-500" : ""
              }`}
              placeholder="Rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
          </form>

          <button className="bg-blue-800 text-white py-3 px-6 rounded-lg md:col-span-2 md:col-end-13">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2">
          <div className="w-full md:col-span-6">
            <img
              src="/hotel.png"
              alt="Main Hotel"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-3">
            <img
              src="/hotel.png"
              alt="Hotel"
              className="w-full h-1/2 object-cover rounded-lg"
            />
            <img
              src="/hotel.png"
              alt="Hotel"
              className="w-full h-1/2 object-cover rounded-lg"
            />
          </div>

          <div className="md:col-span-3 w-full">
            <div className="border border-gray-200 p-4 rounded-lg mx-auto">
              <div className="my-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
                  8.4 Excellent
                </span>
                <p className="text-gray-400">6879 Reviews</p>
              </div>
              <div>
                <p className="font-semibold">Housekeeping</p>
                <div className="flex">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">Food</p>
                <div className="flex">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">Service</p>
                <div className="flex">
                  <span>⭐⭐⭐⭐</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">Staff</p>
                <div className="flex">
                  <span>⭐⭐⭐⭐</span>
                </div>
              </div>
              <div className="flex flex-wrap space-x-4 my-4">
                <div className="p-3 border rounded-lg">🚗</div>
                <div className="p-3 border rounded-lg">🍽</div>
                <div className="p-3 border rounded-lg">🍹</div>
                <div className="p-3 border rounded-lg">📶</div>
                <div className="p-3 border rounded-lg">🏋️‍♂️</div>
              </div>
              <div className="p-4 rounded-lg">
                <p className="text-blue-500">
                  This property is in high demand today.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2">
          <div className="flex flex-col gap-2 w-full md:col-span-3">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <p className="text-gray-500">{hotel.location}</p>
          </div>
          <div className="w-full border rounded-md p-3 text-blue-800 border-blue-800 flex justify-center items-center md:col-start-8 md:col-span-2">
            <p className="text-blue-800">
              Price Starting from {hotel.pricePerNight} BAHT
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2">
          <div className="col-span-1 md:col-span-4 shadow-md rounded-lg flex items-center justify-between">
            <img
              src="/hotel.png"
              alt="Hotel"
              className="w-1/3 h-full object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-semibold">Normal Room</h3>
              <p className="text-xl font-bold text-blue-600">
                {hotel.roomTypeNomal} BAHT/Night
              </p>
            </div>
            <button
              className="bg-blue-800 text-white py-2 px-4 rounded-lg rotate-90"
              onClick={handleSubmitNomal}
            >
              Book Now
            </button>
          </div>

          <div className="col-span-1 md:col-start-6 md:col-span-4 shadow-md rounded-lg flex items-center justify-between">
            <img
              src="/hotel.png"
              alt="Hotel"
              className="w-1/3 h-full object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-semibold">Deluxe Room</h3>
              <p className="text-xl font-bold text-blue-600">
                {hotel.roomTypeDeluxe} BAHT/Night
              </p>
            </div>
            <button
              className="bg-blue-800 text-white py-2 px-4 rounded-lg rotate-90"
              onClick={handleSubmitDeluxe}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
