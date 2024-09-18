"use client";

import Sidebar from "../components/Sidebar.js";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewHotel() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomType = searchParams.get("roomType");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const rooms = searchParams.get("rooms");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (firstName && lastName && email && mobileNumber) {
      console.log("Form submitted:", {
        firstName,
        lastName,
        email,
        mobileNumber,
      });
      localStorage.setItem("roomPrice", roomPrice);
      localStorage.setItem("priceWithVAT", priceWithVAT.toFixed(0));
      localStorage.setItem("totalPrice", totalPrice);
      router.push(`/payments`);
    } else {
      console.log("Please fill all the fields.");
    }
  };

  const [formattedCheckIn, setFormattedCheckIn] = useState("");
  const [formattedCheckOut, setFormattedCheckOut] = useState("");

  const [roomPrice, setRoomPrice] = useState(0);
  const [priceWithVAT, setPriceWithVAT] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      setFormattedCheckIn(new Date(checkIn).toUTCString().substr(0, 16));
      setFormattedCheckOut(new Date(checkOut).toUTCString().substr(0, 16));
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate - checkInDate;
    const days = timeDifference / (1000 * 60 * 60 * 24);
    setTotalDays(days);

    const totalRoomPrice = rooms * roomType * totalDays;
    const vatRate = 0.07;
    const vatAmount = totalRoomPrice * vatRate;
    const total = totalRoomPrice + vatAmount;

    setRoomPrice(totalRoomPrice);
    setPriceWithVAT(vatAmount);
    setTotalPrice(total);
  }, [totalDays, roomType, rooms]);

  return (
    <div className="flex flex-col md:flex-row md:ml-24">
      <Sidebar />
      <div className="flex-grow p-6 text-black">
        <div className="flex items-center space-x-4 mb-10">
          <Link href={`/`}>
            <div className="bg-blue-100 rounded-full p-3">
              <FaChevronLeft size={24} className="text-black" />
            </div>
          </Link>
          <div className="w-full border rounded-md p-3 text-gray-400 bg-blue-100">
            Search city, Country, Place for Travel advisory
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-3">
          <div className="border rounded-md p-3 text-black col-span-1 md:col-span-2">
            Where are you going?
          </div>
          <div className="border rounded-md p-3 text-black col-span-1 md:col-span-2">
            {formattedCheckIn.substr(4, 16)}
          </div>
          <div className="border rounded-md p-3 text-black col-span-1 md:col-span-2">
            {formattedCheckOut.substr(4, 16)}
          </div>
          <div className="p-3 border rounded-lg col-span-1 md:col-span-2">
            {adults} adults, {children} children - {rooms} room
          </div>
          <button className="bg-blue-800 text-white py-3 px-6 rounded-lg col-span-1 md:col-span-2">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          <div className="col-span-1 md:col-span-8 p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold">Holiday In Resort</h2>
                <p className="text-gray-500">Tambudki, Arpora, Goa, India</p>
                <p className="text-sm text-gray-400">
                  This hotel is reviewed by global firm
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐</span>
                  <span className="ml-2 text-gray-500">4.0</span>
                </div>
              </div>
              <img
                src="/hotel.png"
                alt="Hotel"
                className="w-full md:w-32 md:h-24 object-cover rounded-lg mt-4 md:mt-0"
              />
            </div>

            <div className="mt-6">
              <div className="flex flex-col md:flex-row justify-between bg-gray-100 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-semibold">
                    {formattedCheckIn.substr(0, 12)}
                  </p>
                  <p className="text-sm text-gray-500">10am</p>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  <button className="bg-blue-100 text-blue-600 py-1 px-3 rounded-lg">
                    {totalDays}
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-semibold">
                    {formattedCheckOut.substr(0, 12)}
                  </p>
                  <p className="text-sm text-gray-500">10am</p>
                </div>
                <div className="flex justify-center items-center mt-4 md:mt-0">
                  <p className="font-semibold">
                    {adults} adults, {children} children - {rooms} room
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Guest Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className={`border p-3 rounded-lg w-full ${
                    isSubmitted && !firstName ? "border-red-500" : ""
                  }`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`border p-3 rounded-lg w-full ${
                    isSubmitted && !lastName ? "border-red-500" : ""
                  }`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="E-mail Address"
                  className={`border p-3 rounded-lg w-full ${
                    isSubmitted && !email ? "border-red-500" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className={`border p-3 rounded-lg w-full ${
                    isSubmitted && !mobileNumber ? "border-red-500" : ""
                  }`}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <p className="text-blue-600 mt-4 cursor-pointer">Add Guest +</p>

              <div className="mt-4">
                <label className="text-gray-500">
                  Special Request (Optional)
                </label>
                <textarea
                  className="border p-3 rounded-lg w-full mt-2"
                  rows="3"
                ></textarea>
              </div>

              <div className="mt-6">
                <button
                  className="bg-blue-800 text-white py-3 px-6 rounded-lg w-full md:w-1/4"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center pb-4 mb-4">
              <p className="text-gray-500">1 Room x 1 Night</p>
              <p className="font-bold text-blue-300 text-lg">{roomPrice}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pb-4 mb-4">
              <p className="text-gray-500">Total Discount</p>
              <p className="font-bold text-blue-300 text-lg">0</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pb-4 mb-4">
              <p className="text-gray-500">Price After Discount</p>
              <p className="font-bold text-blue-300 text-lg">{roomPrice}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pb-4 mb-4">
              <p className="text-gray-500">Taxes & Service Fees</p>
              <p className="font-bold text-blue-300 text-lg">
                {priceWithVAT.toFixed(0)}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="font-bold text-xl">Total Amount</p>
              <p className="text-blue-800 font-bold text-2xl">{totalPrice}</p>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold">Cancellation Charges</h4>
              <p className="text-gray-500 mt-2">Non-Refundable</p>
              <p className="text-sm text-gray-400 mt-2">
                Penalty may be charged by the airline & by MMT based on how
                close to departure date you cancel. View fare rules to know
                more.
              </p>
              <button className="mt-4 text-blue-600">View Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
