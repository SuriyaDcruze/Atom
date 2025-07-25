import React from 'react';

const QuotationTable = () => {
  const quotations = [
    {
      number: 'ALQ2/0001/25-26',
      date: '20.02.2025',
      name: '0001-AL0000',
      amcDetails: 'Annual Maintenance Contract',
      quotationType: '',
      amount: '0',
      gst: '0%',
      netAmount: '0',
      lifts: 'No Lifts',
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-700">Quotation</h1>
        <div className="flex space-x-3">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-colors">Export</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-colors">Bulk Actions</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors">+ Create Quotation</button>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-t-lg ">
        <div className="flex flex-col items-center mr-4">
          <label className="text-gray-600 text-sm mb-1">Period</label>
          <select className="border border-gray-300 rounded-lg p-2 w-40 shadow-md bg-white">
            <option>ALL TIME</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="flex flex-col items-center mr-4">
          <label className="text-gray-600 text-sm mb-1">Status</label>
          <select className="border border-gray-300 rounded-lg p-2 w-40 shadow-md bg-white">
            <option>ALL</option>
            <option>Active</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="flex flex-col items-center mr-4">
          <label className="text-gray-600 text-sm mb-1">Quotation Type</label>
          <select className="border border-gray-300 rounded-lg p-2 w-40 shadow-md bg-white">
            <option>ALL</option>
            <option>Standard</option>
            <option>Custom</option>
          </select>
        </div>
        <div className="flex flex-col items-center mr-4">
          <label className="text-gray-600 text-sm mb-1">Customer</label>
          <select className="border border-gray-300 rounded-lg p-2 w-40 shadow-md bg-white">
            <option>ALL</option>
            <option>Customer A</option>
            <option>Customer B</option>
          </select>
        </div>
        <button className="bg-orange-500 text-white p-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors">Search</button>
      </div>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200 rounded-t-lg">
              <tr>
                <th className="p-2 text-left text-gray-600 font-semibold">QUOTATION NUMBER</th>
                <th className="p-2 text-left text-gray-600 font-semibold">DATE</th>
                <th className="p-2 text-left text-gray-600 font-semibold">NAME</th>
                <th className="p-2 text-left text-gray-600 font-semibold">AMC DETAILS</th>
                <th className="p-2 text-left text-gray-600 font-semibold">QUOTATION TYPE</th>
                <th className="p-2 text-left text-gray-600 font-semibold">AMOUNT</th>
                <th className="p-2 text-left text-gray-600 font-semibold">GST</th>
                <th className="p-2 text-left text-gray-600 font-semibold">NET AMOUNT</th>
                <th className="p-2 text-left text-gray-600 font-semibold">LIFTS</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((quotation, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2">{quotation.number}</td>
                  <td className="p-2">{quotation.date}</td>
                  <td className="p-2">{quotation.name}</td>
                  <td className="p-2">{quotation.amcDetails}</td>
                  <td className="p-2">{quotation.quotationType}</td>
                  <td className="p-2">{quotation.amount}</td>
                  <td className="p-2">{quotation.gst}</td>
                  <td className="p-2">{quotation.netAmount}</td>
                  <td className="p-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition-colors">
                      {quotation.lifts}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuotationTable;