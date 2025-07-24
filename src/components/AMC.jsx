import React from 'react';
import { Edit, Plus } from 'lucide-react';

const AMC = () => {
  const mockData = [
    { amc: "15", customer: "AL056 # Sithalapakkam 2, Mr.Manivannan -- Chennai", created: "23.06.2025", contactPeriod: "21.06.2025 - 20.06.2026", nextPayment: "Payments Complete", status: "Active", amount: "Contract Amount: 0.00, Total Amount Paid: 0.00, Amount Due: 0.00", option: "Contract Amount: 0.00 +" },
    { amc: "15", customer: "AL056 # Sithalapakkam 2, Mr.Manivannan -- Chennai", created: "23.06.2025", contactPeriod: "21.06.2025 - 20.06.2026", nextPayment: "Payments Complete", status: "Active", amount: "Contract Amount: 0.00, Total Amount Paid: 0.00, Amount Due: 0.00", option: "Contract Amount: 0.00 +" },
    { amc: "15", customer: "AL056 # Sithalapakkam 2, Mr.Manivannan -- Chennai", created: "23.06.2025", contactPeriod: "21.06.2025 - 20.06.2026", nextPayment: "Payments Complete", status: "Active", amount: "Contract Amount: 0.00, Total Amount Paid: 0.00, Amount Due: 0.00", option: "Contract Amount: 0.00 +" },
    { amc: "15", customer: "AL056 # Sithalapakkam 2, Mr.Manivannan -- Chennai", created: "23.06.2025", contactPeriod: "21.06.2025 - 20.06.2026", nextPayment: "Payments Complete", status: "Active", amount: "Contract Amount: 0.00, Total Amount Paid: 0.00, Amount Due: 0.00", option: "Contract Amount: 0.00 +" },
    { amc: "15", customer: "AL056 # Sithalapakkam 2, Mr.Manivannan -- Chennai", created: "23.06.2025", contactPeriod: "21.06.2025 - 20.06.2026", nextPayment: "Payments Complete", status: "Active", amount: "Contract Amount: 0.00, Total Amount Paid: 0.00, Amount Due: 0.00", option: "Contract Amount: 0.00 +" },
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">AMC</h2>
        <div className="flex space-x-4">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">Bulk Actions</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">+ New AMC</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-6 gap-4">
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL TIME</option>
        </select>
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL</option>
        </select>
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL</option>
        </select>
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL</option>
        </select>
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL</option>
        </select>
        <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>ALL</option>
        </select>
        <button className="bg-orange-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">Search</button>
      </div>
      <div className="flex space-x-2 mb-6">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">ALL AMC</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">Expired AMC</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">Renew In Progress AMC</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-800 rounded-t-xl">
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold rounded-tl-xl">AMC</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">CUSTOMER</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">CREATED</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">CONTACT PERIOD</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">NEXT PAYMENT</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">STATUS</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold">AMOUNT</th>
              <th className="border-b-2 border-gray-400 p-4 text-left font-semibold rounded-tr-xl">OPTION</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-300">
                <td className="border-b border-gray-200 p-4 text-gray-800">{item.amc}</td>
                <td className="border-b border-gray-200 p-4 text-gray-700">{item.customer}</td>
                <td className="border-b border-gray-200 p-4 text-gray-800">{item.created}</td>
                <td className="border-b border-gray-200 p-4 text-gray-800">{item.contactPeriod}</td>
                <td className="border-b border-gray-200 p-4 text-gray-800">{item.nextPayment}</td>
                <td className="border-b border-gray-200 p-4"><span className="bg-green-500 text-white px-3 py-1 rounded-full font-medium">{item.status}</span></td>
                <td className="border-b border-gray-200 p-4 text-gray-700">{item.amount}</td>
                <td className=" border-gray-200 p-4 text-gray-700 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                  <button className="text-green-500 hover:text-green-700"><Plus size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="text-right mt-6 text-gray-600 font-medium">Showing 1-09 of 78</div> */}
    </div>
  );
};

export default AMC;