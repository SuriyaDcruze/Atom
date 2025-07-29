import React, { useState } from 'react';

const CustomerLicense = () => {
  const mockData = [
    { 
      site: "AL237 Kodungaiyur Mr.Elangovan", 
      lifts: "A, #277951, Lift Code: AL237, Name: Mr.Elangovan, Floor: G+2, Brand: ATOM Lifts IPL, 6P, 408 Kg, GEARLESS Machine, Machine Brand: ATOM Lifts IPL, Passenger Lift, AUTOMATIC Door, Door Brand: ATOM Lifts IPL, Controller Brand: ATOM Lifts IPL, Cabin: SS", 
      licenseNo: "LC001", 
      period: "2025-07-01 to 2026-06-30", 
      attachment: "View" 
    },
    { 
      site: "BL145 Chennai Ms.Priya", 
      lifts: "B, #288762, Lift Code: BL145, Name: Ms.Priya, Floor: G+5, Brand: Elevate Ltd, 8P, 630 Kg, GEARED Machine, Machine Brand: Elevate Ltd, Passenger Lift, MANUAL Door, Door Brand: Elevate Ltd, Controller Brand: Elevate Ltd, Cabin: Glass", 
      licenseNo: "LC002", 
      period: "2025-06-15 to 2026-06-14", 
      attachment: "View" 
    },
    { 
      site: "CL392 Bangalore Mr.Ramesh", 
      lifts: "C, #299483, Lift Code: CL392, Name: Mr.Ramesh, Floor: G+3, Brand: LiftMaster, 4P, 320 Kg, GEARLESS Machine, Machine Brand: LiftMaster, Passenger Lift, AUTOMATIC Door, Door Brand: LiftMaster, Controller Brand: LiftMaster, Cabin: SS", 
      licenseNo: "LC003", 
      period: "2025-07-10 to 2026-07-09", 
      attachment: "View" 
    },
  ];

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">Customer License</h2>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row mb-6 gap-4">
        <select className="border border-gray-300 p-2 md:p-3 rounded-lg w-full md:w-1/4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base">
          <option>ALL</option>
        </select>
        <select className="border border-gray-300 p-2 md:p-3 rounded-lg w-full md:w-1/4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base">
          <option>EQUAL</option>
        </select>
        <select className="border border-gray-300 p-2 md:p-3 rounded-lg w-full md:w-1/4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base">
          <option>ALL</option>
        </select>
        <button className="bg-gradient-to-r from-[#2D3A6B] to-[#243158] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:from-[#213066] hover:to-[#182755] transition duration-300 w-full md:w-auto text-sm md:text-base">
          Search
        </button>
        <button className="bg-gradient-to-r from-[#2D3A6B] to-[#243158] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:from-[#213066] hover:to-[#182755] transition duration-300 w-full md:w-auto text-sm md:text-base">
          Export
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow-2xl">
          <thead>
            <tr className="bg-gray-300 text-gray-800 rounded-t-xl">
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold rounded-tl-xl whitespace-nowrap">SITE NAME</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold whitespace-nowrap">LIFTS</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold whitespace-nowrap">LICENSE NO</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold whitespace-nowrap">PERIOD</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold rounded-tr-xl whitespace-nowrap">ATTACHMENT</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-300">
                <td className="border-b border-gray-200 p-4 text-gray-800 whitespace-nowrap">{item.site}</td>
                <td className="border-b border-gray-200 p-4 text-gray-700">{item.lifts}</td>
                <td className="border-b border-gray-200 p-4 text-gray-800 whitespace-nowrap">{item.licenseNo}</td>
                <td className="border-b border-gray-200 p-4 text-gray-800 whitespace-nowrap">{item.period}</td>
                <td className="border-b border-gray-200 p-4 text-[#213066] hover:text-[#213066] cursor-pointer whitespace-nowrap">{item.attachment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {mockData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg p-4 border border-gray-200"
            onClick={() => toggleExpand(index)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{item.site}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">License:</span> {item.licenseNo}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Period:</span> {item.period}
                </p>
              </div>
              <button 
                className="text-orange-500 hover:text-orange-700"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle attachment view
                }}
              >
                {item.attachment}
              </button>
            </div>
            
            {expandedCard === index && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-1">Lift Details:</h4>
                <p className="text-sm text-gray-600">{item.lifts}</p>
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-center">
              <button 
                className="text-orange-500 text-sm flex items-center"
                onClick={() => toggleExpand(index)}
              >
                {expandedCard === index ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerLicense;