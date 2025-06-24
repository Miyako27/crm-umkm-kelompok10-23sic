import React from "react";
import { Calendar, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const flightData = [
  {
    id: 1,
    airline: "Garuda Indonesia",
    rating: 4.8,
    price: 750000,
    departure: "06:00",
    arrival: "07:30",
    duration: "1j 30mnt",
    from: "Soekarno-Hatta (CGK)",
    to: "Juanda (SUB)",
    class: "Economy",
  },
  {
    id: 2,
    airline: "Batik Air",
    rating: 4.6,
    price: 680000,
    departure: "08:15",
    arrival: "09:45",
    duration: "1j 30mnt",
    from: "Soekarno-Hatta (CGK)",
    to: "Juanda (SUB)",
    class: "Business",
  },
  {
    id: 3,
    airline: "AirAsia",
    rating: 4.3,
    price: 540000,
    departure: "10:00",
    arrival: "11:30",
    duration: "1j 30mnt",
    from: "Soekarno-Hatta (CGK)",
    to: "Juanda (SUB)",
    class: "Economy",
  },
];

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (flight.id === 1) {
      navigate("/form-final-tiket", { state: flight });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white shadow-md rounded-xl p-5 mb-5 border border-gray-200 relative transition ${
        flight.id === 1 ? "cursor-pointer hover:shadow-lg" : "cursor-default opacity-80"
      }`}
    >
      {flight.id === 1 && (
        <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-md absolute top-4 left-4">
          Bisa Reschedule
        </span>
      )}

      <div className="flex justify-between items-start mt-6">
        <div>
          <h2 className="text-base font-semibold">{flight.airline}</h2>
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>{flight.class} Class</span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <span>{flight.rating}/5</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-orange-600 text-lg font-bold">
            Rp {flight.price.toLocaleString("id-ID")}
            <span className="text-gray-400 font-normal text-sm"> /tiket</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 text-sm text-gray-600">
        <div className="flex flex-col items-center pt-1 pb-1">
          <div className="w-2 h-2 rounded-full border-2 border-blue-500 bg-white"></div>
          <div
            className="flex-1 w-0.5 bg-gray-300 my-1"
            style={{ minHeight: "40px" }}
          ></div>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>

        <div className="flex flex-col justify-between py-0.5">
          <div className="mb-3">
            <span className="font-medium mr-2 text-black">{flight.departure}</span>
            <span className="text-gray-600">{flight.from}</span>
          </div>
          <div className="text-xs text-gray-400">{flight.duration}</div>
          <div className="mt-3">
            <span className="font-medium mr-2 text-black">{flight.arrival}</span>
            <span className="text-gray-600">{flight.to}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ListTiketPesawatCustomer() {
  return (
    <div className="max-w-xl mx-auto px-5 py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Jakarta ➜ Surabaya</h1>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>Sen, 23 Jun</span>
          <Clock className="w-5 h-5" />
          <span>06:00 - 11:30</span>
        </div>
      </div>

      {flightData.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
