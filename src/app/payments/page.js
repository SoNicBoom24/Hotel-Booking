"use client";

import Sidebar from "../components/Sidebar.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function Payment() {
  const [roomPrice, setRoomPrice] = useState(0);
  const [priceWithVAT, setPriceWithVAT] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setRoomPrice(localStorage.getItem("roomPrice"));
    setPriceWithVAT(localStorage.getItem("priceWithVAT"));
    setTotalPrice(localStorage.getItem("totalPrice"));
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full md:pl-24 mb-20">
      <Sidebar className="md:w-1/4" />
      <div className="flex-grow p-6 text-black">
        <div className="flex items-center mb-10">
          <Link href="/">
            <div className="bg-blue-100 rounded-full p-3">
              <FaChevronLeft size={24} className="text-black" />
            </div>
          </Link>
        </div>
        <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-3">
          <div className="md:col-span-5 p-6">
            <Link href="/payment-done">
              <button className="w-full flex items-center justify-between p-4 border border-blue-800 rounded-lg mb-12 hover:shadow-xl transition-shadow group">
                <div className="flex items-center">
                  <img
                    src="/debit-card.png"
                    alt="Debit Card"
                    className="w-10 h-10 mr-4"
                  />
                  <span className="text-lg">Debit Card</span>
                </div>
                <FaChevronRight
                  size={24}
                  className="text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </Link>

            <Link href="/payment-done">
              <button className="w-full flex items-center justify-between p-4 border border-blue-800 rounded-lg mb-12 hover:shadow-xl transition-shadow group">
                <div className="flex items-center">
                  <img
                    src="/debit-card.png"
                    alt="UPI"
                    className="w-10 h-10 mr-4"
                  />
                  <span className="text-lg">UPI</span>
                </div>
                <FaChevronRight
                  size={24}
                  className="text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </Link>

            <Link href="/payment-done">
              <button className="w-full flex items-center justify-between p-4 border border-blue-800 rounded-lg mb-12 hover:shadow-xl transition-shadow group">
                <div className="flex items-center">
                  <img
                    src="/debit-card.png"
                    alt="PhonePay"
                    className="w-10 h-10 mr-4"
                  />
                  <span className="text-lg">PhonePay</span>
                </div>
                <FaChevronRight
                  size={24}
                  className="text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </Link>

            <Link href="/payment-done">
              <button className="w-full flex items-center justify-between p-4 border border-blue-800 rounded-lg mb-12 hover:shadow-xl transition-shadow group">
                <div className="flex items-center">
                  <img
                    src="/debit-card.png"
                    alt="Net Banking"
                    className="w-10 h-10 mr-4"
                  />
                  <span className="text-lg">Net Banking</span>
                </div>
                <FaChevronRight
                  size={24}
                  className="text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </Link>

            <Link href="/payment-done">
              <button className="w-full flex items-center justify-between p-4 border border-blue-800 rounded-lg mb-12 hover:shadow-xl transition-shadow group">
                <div className="flex items-center">
                  <img
                    src="/debit-card.png"
                    alt="Credit Card"
                    className="w-10 h-10 mr-4"
                  />
                  <span className="text-lg">Credit Card</span>
                </div>
                <FaChevronRight
                  size={24}
                  className="text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-9">
            {/* Pricing Breakdown */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500">Base fare</p>
                <p className="font-bold text-blue-300 text-lg">{roomPrice}</p>
              </div>
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500">Total discount</p>
                <p className="font-bold text-blue-300 text-lg">0</p>
              </div>
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500">Price after discount</p>
                <p className="font-bold text-blue-300 text-lg">{roomPrice}</p>
              </div>
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500">Taxes & service fees</p>
                <p className="font-bold text-blue-300 text-lg">
                  {priceWithVAT}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-xl">Total Amount</p>
                <p className="text-blue-800 font-bold text-2xl">{totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
