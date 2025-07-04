import React, { useEffect, useState } from "react";
import { Calendar, Clock, Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase"; // Pastikan path sesuai

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const handleClick = () => {
  navigate("/form-final-tiket", {
    state: {
      selectedFlight: flight,
    },
  });
};


  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-xl p-5 mb-5 border border-gray-200 relative transition cursor-pointer hover:shadow-lg"
    >
      <div className="flex justify-between items-start mt-6">
        <div>
          <h2 className="text-base font-semibold">{flight.maskapai}</h2>
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>{flight.kelas} Class</span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <span>4.5/5</span> {/* default rating */}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-orange-600 text-lg font-bold">
            Rp {Number(flight.harga).toLocaleString("id-ID")}
            <span className="text-gray-400 font-normal text-sm"> /tiket</span>
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
            <span className="font-medium mr-2 text-black">
              {new Date(flight.waktu_berangkat).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-gray-600">{flight.asal}</span>
          </div>
          <div className="text-xs text-gray-400">Estimasi waktu tidak tersedia</div>
          <div className="mt-3">
            <span className="font-medium mr-2 text-black">
              {/* misalnya 1 jam 30 menit setelah waktu_berangkat */}
              {new Date(new Date(flight.waktu_berangkat).getTime() + 90 * 60000).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-gray-600">{flight.tujuan}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ListTiketPesawatCustomer() {
  const location = useLocation();
  const [flightList, setFlightList] = useState([]);
  const formData = location.state || JSON.parse(localStorage.getItem("pencarianPesawat"));

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("tiketpesawat")
        .select("*")
        .ilike("asal", `%${formData.dari}%`)
        .ilike("tujuan", `%${formData.ke}%`);

      if (error) console.error("❌ Error fetching:", error);
      else setFlightList(data);
    };

    if (formData?.dari && formData?.ke) fetchData();
  }, [formData]);

  return (
    <div className="max-w-xl mx-auto px-5 py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">
          {formData?.dari} ➜ {formData?.ke}
        </h1>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>{new Date(formData?.tanggalPergi).toLocaleDateString("id-ID", { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          <Clock className="w-5 h-5" />
          <span>{flightList[0] ? new Date(flightList[0].waktu_berangkat).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) : "--:--"}</span>
        </div>
      </div>

      {flightList.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada tiket ditemukan.</p>
      ) : (
        flightList.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      )}
    </div>
  );
}
