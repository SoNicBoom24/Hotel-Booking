"use client";

import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
import RecentSearches from "./components/RecentSearches";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full h-dvh">
      <Sidebar />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:pl-24">
        <div className="p-4 md:p-6">
          <Search />
          <RecentSearches />
        </div>
        <div className="relative h-80 md:h-dvh">
          <Image
            className="rounded-t-2xl md:rounded-l-2xl bg-cover h-dvh w-full object-cover "
            src="/hotel.png"
            alt="Hotel Image"
            fill={true}
          />
        </div>
      </div>
    </div>
  );
}
