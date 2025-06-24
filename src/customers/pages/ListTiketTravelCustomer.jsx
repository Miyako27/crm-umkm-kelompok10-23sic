import React from "react";
import { Calendar, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom"; // import untuk navigasi

const travelData = [
  {
    id: 1,
    provider: "Jackal Holidays",
    rating: 4.7,
    price: 125000,
    departure: "00:00",
    arrival: "03:00",
    duration: "3j 0mnt",
    from: "Jackal Holidays Blora (Menteng)",
    to: "Jackal Holidays Pasteur (Pool Transit)",
  },
  {
    id: 2,
    provider: "Cititrans",
    rating: 4.6,
    price: 130000,
    departure: "01:00",
    arrival: "04:00",
    duration: "3j 0mnt",
    from: "Cititrans Sudirman",
    to: "Cititrans Dago",
  },
  {
    id: 3,
    provider: "Baraya Travel",
    rating: 4.5,
    price: 110000,
    departure: "02:00",
    arrival: "05:00",
    duration: "3j 0mnt",
    from: "Baraya Travel Benhil",
    to: "Baraya Travel Cihampelas",
  },
];

const TravelCard = ({ travel, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white shadow-md rounded-xl p-5 mb-5 border border-gray-200 relative hover:shadow-lg transition"
  >
    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-md absolute top-4 left-4">
      Bisa Reschedule
    </span>

    <div className="flex justify-between items-start mt-6">
      <div>
        <h2 className="text-base font-semibold">{travel.provider}</h2>
        <div className="text-gray-400 text-sm flex items-center gap-2">
          <span>Luxury Shuttle</span>
          <div className="flex items-center gap-1 text-blue-500">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span>{travel.rating}/5</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-orange-600 text-lg font-bold">
          Rp {travel.price.toLocaleString("id-ID")}
          <span className="text-gray-400 font-normal text-sm">/kursi</span>
        </div>
      </div>
    </div>

    <div className="mt-5 flex items-start gap-3 text-sm text-gray-600">
      <div className="flex flex-col items-center pt-1 pb-1">
        <div className="w-2 h-2 rounded-full border-2 border-blue-500 bg-white"></div>
        <div className="flex-1 w-0.5 bg-gray-300 my-1" style={{ minHeight: "40px" }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>

      <div className="flex flex-col justify-between py-0.5">
        <div className="mb-3">
          <span className="font-medium mr-2 text-black">{travel.departure}</span>
          <span className="text-gray-600">{travel.from}</span>
        </div>
        <div className="text-xs text-gray-400">{travel.duration}</div>
        <div className="mt-3">
          <span className="font-medium mr-2 text-black">{travel.arrival}</span>
          <span className="text-gray-600">{travel.to}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function ListTiketTravelCustomer() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-5 py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Jakarta ➜ Bandung</h1>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>Sen, 23 Jun</span>
          <Clock className="w-5 h-5" />
          <span>00:00 - 04:00</span>
        </div>
      </div>

      {/* Render cards */}
      {travelData.map((travel) => (
        <TravelCard
          key={travel.id}
          travel={travel}
          onClick={() => navigate("/order-customer/travel/pemesanan")}
        />
      ))}
    </div>
  );
}
