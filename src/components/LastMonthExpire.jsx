
import React from 'react';
import { Edit, Plus } from 'lucide-react';

const LastMonthExpire = () => {
  const mockData = [
    { 
      amc: "701", 
      customer: "AL056 # Sithalapakkam 2, Mr.Manivannan -- Chennai", 
      created: "23.06.2025", 
      contactPeriod: "21.06.2025 - 20.06.2026", 
      nextPayment: "Payments Complete", 
      status: "Active", 
      amcType: "ATOM- Primary", 
      amount: "Contract Amount: 0.00, Total Amount Paid: 0.00, Amount Due: 0.00" 
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">Last month expire AMC</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left border-b border-gray-300">AMC</th>
              <th className="py-2 px-4 text-left border-b border-gray-300">CUSTOMER</th>
              <th className="py-2 px-4 text-left border-b border-gray-300">CREATED</th>
              <th className="py-2 px-4 text-left border-b border-gray-300">CONTACT PERIOD</th>
              <th className="py-2 px-4 text-left border-b border-gray-300">NEXT PAYMENT</th>
              <th className="py-2 px-4 text-left border-b border-gray-300">STATUS</th>
              <th className="py-2 px-4 text-left border-b border-gray-300">AMC TYPE</th>
              <th className="py-2 px-4 text-left border-b border-gray-300">AMOUNT</th>
              <th className="py-2 px-4 text-left border-b border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-300">
                <td className="py-2 px-4 border-b border-gray-200">{item.amc}</td>
                <td className="py-2 px-4 border-b border-gray-200 flex items-center space-x-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">A/AL021</span>
                  <span className="text-gray-700">{item.customer}</span>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{item.created}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.contactPeriod}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.nextPayment}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">{item.status}</span>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{item.amcType}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.amount}</td>
                <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600">
                    <Plus size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastMonthExpire;
