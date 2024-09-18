export default function RecentSearches() {
  const searches = [
    {
      name: "Hotel JW Marriott",
      price: "1,000/night",
      rating: 4.9,
      reviews: 1366,
    },
    {
      name: "Hotel JW Marriott",
      price: "1,000/night",
      rating: 4.9,
      reviews: 1366,
    },
  ];

  return (
    <div className="mt-8 p-8 text-black">
      <h2 className="text-2xl font-bold mb-4">Recent Searches</h2>
      {searches.map((search, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-md shadow-md flex justify-between mb-4"
        >
          <div>
            <h3 className="font-bold">{search.name}</h3>
            <div className="text-gray-500">
              {search.rating} ★ | {search.reviews} Reviews
            </div>
            <div className="text-blue-500">{search.price}</div>
          </div>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-md">
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}
