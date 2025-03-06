// components/Statistics.js
import React from "react";

function Statistics() {
  const stats = [
    { label: "Total Users", value: "76", color: "bg-green-400" },
    { label: "Total Pending Transaction", value: "42", color: "bg-blue-300" },
    {
      label: "Total Approved Transaction",
      value: "34",
      color: "bg-yellow-300",
    },
    {
      label: "Total Token Issued",
      value: "800000 EFRND",
      color: "bg-orange-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[1190px] px-8 py-8 mx-auto">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} px-4 py-8 hover:shadow-xl hover:scale-105 ease-out transition-all text-white text-center rounded-lg`}
        >
          <h2 className="font-semibold">{stat.label}</h2>
          <p className="text-lg">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
