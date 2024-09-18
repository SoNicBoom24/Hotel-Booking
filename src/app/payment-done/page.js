import Link from "next/link";

export default function PaymentDone() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Booking Successfully completed
        </h1>
        <p className="text-gray-600 mb-6">
          Your trip schedule is ready,please check under profile.
        </p>
        <Link href={`/`}>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
