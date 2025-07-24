import React from 'react';

const CustomerLicense = () => {
  const mockData = [
    { site: "AL237 Kodungaiyur Mr.Elangovan", lifts: "A, #277951, Lift Code: AL237, Name: Mr.Elangovan, Floor: G+2, Brand: ATOM Lifts IPL, 6P, 408 Kg, GEARLESS Machine, Machine Brand: ATOM Lifts IPL, Passenger Lift, AUTOMATIC Door, Door Brand: ATOM Lifts IPL, Controller Brand: ATOM Lifts IPL, Cabin: SS", licenseNo: "LC001", period: "2025-07-01 to 2026-06-30", attachment: "View" },
    { site: "BL145 Chennai Ms.Priya", lifts: "B, #288762, Lift Code: BL145, Name: Ms.Priya, Floor: G+5, Brand: Elevate Ltd, 8P, 630 Kg, GEARED Machine, Machine Brand: Elevate Ltd, Passenger Lift, MANUAL Door, Door Brand: Elevate Ltd, Controller Brand: Elevate Ltd, Cabin: Glass", licenseNo: "LC002", period: "2025-06-15 to 2026-06-14", attachment: "View" },
    { site: "CL392 Bangalore Mr.Ramesh", lifts: "C, #299483, Lift Code: CL392, Name: Mr.Ramesh, Floor: G+3, Brand: LiftMaster, 4P, 320 Kg, GEARLESS Machine, Machine Brand: LiftMaster, Passenger Lift, AUTOMATIC Door, Door Brand: LiftMaster, Controller Brand: LiftMaster, Cabin: SS", licenseNo: "LC003", period: "2025-07-10 to 2026-07-09", attachment: "View" },
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">Customer License</h2>
      </div>
      <div className="flex flex-col md:flex-row mb-6 gap-4">
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL</option>
        </select>
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>EQUAL</option>
        </select>
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL</option>
        </select>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 transform hover:scale-105 w-full md:w-auto">Search</button>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 transform hover:scale-105">Export</button>

      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow-2xl">
          <thead>
            <tr className="bg-gray-300 text-gray-800 rounded-t-xl">
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold rounded-tl-xl">SITE NAME</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">LIFTS</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">LICENSE NO</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">PERIOD</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold rounded-tr-xl">ATTACHMENT</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-300">
                <td className="border-b border-gray-200 p-4 text-gray-800">{item.site}</td>
                <td className="border-b border-gray-200 p-4 text-gray-700">{item.lifts}</td>
                <td className="border-b border-gray-200 p-4 text-gray-800">{item.licenseNo}</td>
                <td className="border-b border-gray-200 p-4 text-gray-800">{item.period}</td>
                <td className="border-b border-gray-200 p-4 text-orange-500 hover:text-orange-700 cursor-pointer">{item.attachment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="text-right mt-6 text-gray-600 font-medium">Showing 1-03 of 78</div> */}
    </div>
  );
};

export default CustomerLicense;