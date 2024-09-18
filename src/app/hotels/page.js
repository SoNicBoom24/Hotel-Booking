"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaChevronLeft } from "react-icons/fa";

import Link from "next/link";

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const [hotels, setHotels] = useState([]);

  const sd = new Date(startDate);
  console.log("x", sd);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/search?location=${location}`
        );
        const data = await response.json();

        if (response.ok) {
          setHotels(data);
        } else {
          console.log("Error fetching hotels");
        }
      } catch (error) {
        console.log("error");
      }
    };

    if (location) {
      fetchHotels();
    }
  }, [location]);

  return (
    <div className="flex w-full md:pl-24">
      <Sidebar />
      <div className="text-black flex-grow p-6">
        <div className="flex items-center space-x-4 mb-10">
          <Link href={`/`}>
            <div className="bg-blue-100 rounded-full p-3">
              <FaChevronLeft size={24} className="text-black" />
            </div>
          </Link>

          <div className="w-full border rounded-md p-3 text-gray-400 bg-blue-100">
            Search city , Country, Place for Travel advisory
          </div>
        </div>

        {hotels.length >= 0 ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-lg font-bold">
                Best places to enjoy your stay
              </h1>

              <div className="space-x-4">
                <button className="text-blue-800 py-2 px-4 rounded-lg border border-blue-800">
                  Sort By
                </button>
                <button className="text-blue-800 py-2 px-4 rounded-lg border border-blue-800">
                  Filter
                </button>
              </div>
            </div>

            <div className="flex w-full">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-fit">
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="border rounded-lg shadow-sm overflow-hidden "
                  >
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{hotel.name}</h3>
                          <p className="text-gray-500">
                            Price starts from {hotel.pricePerNight}
                          </p>
                        </div>

                        <Link href={`/explore-hotel/${hotel.id}`}>
                          <button className="text-blue-800 py-2 px-4 rounded-lg border border-blue-800">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden lg:block w-1/5 ml-6">
                <h3 className="text-lg font-bold mb-4">Recommended</h3>
                <ul className="space-y-4">
                  {hotels.map((rec, index) => (
                    <li
                      key={index}
                      className="border rounded-lg overflow-hidden shadow-sm"
                    >
                      <img
                        src={rec.imageUrl}
                        alt={rec.name}
                        className="w-full h-28 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold">{rec.name}</h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
    </div>
  );
}
