import React from 'react';
import { Search, Printer, Trash2, User, Plus } from 'lucide-react';

const Invoice = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-4 mt-4">
          {/* Due this month card */}
          <div className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-md w-full md:w-auto">
            <div className="flex flex-col items-center">
              <span className="text-gray-800 text-sm">Due this month</span>
              <span className="text-2xl font-bold">10</span>
            </div>
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-purple-500" />
            </div>
          </div>

          {/* Paid this month card */}
          <div className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-md w-full md:w-auto">
            <div className="flex flex-col items-center">
              <span className="text-gray-800 text-sm">Paid this month</span>
              <span className="text-2xl font-bold">2</span>
            </div>
            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-yellow-500" />
            </div>
          </div>

          {/* Export button */}
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md w-full md:w-auto">
            Export
          </button>

          {/* Bulk Actions button */}
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md w-full md:w-auto">
            Bulk Actions
          </button>

          {/* New Invoice button */}
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md w-full md:w-auto flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            New Invoice
          </button>
        </div>
      </div>
      {/* Rest of the code remains the same */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <select className="p-2 border rounded-lg shadow-md w-full md:w-auto">
          <option>ALL TIME</option>
        </select>
        <select className="p-2 border rounded-lg shadow-md w-full md:w-auto">
          <option>ALL</option>
        </select>
        <select className="p-2 border rounded-lg shadow-md w-full md:w-auto">
          <option>ALL</option>
        </select>
        <select className="p-2 border rounded-lg shadow-md w-full md:w-auto">
          <option>ALL</option>
        </select>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md w-full md:w-auto">
          <Search className="inline mr-2" /> Search
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg shadow-md">Invoices</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md">Transaction History</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md">Check Transaction History</button>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 min-w-[80px]">INVOICE ID</th>
              <th className="p-2 min-w-[150px]">CUSTOMER</th>
              <th className="p-2 min-w-[120px]">INVOICE DATE</th>
              <th className="p-2 min-w-[120px]">DUE DATE</th>
              <th className="p-2 min-w-[100px]">VALUE</th>
              <th className="p-2 min-w-[100px]">DUE BALANCE</th>
              <th className="p-2 min-w-[100px]">STATUS</th>
              <th className="p-2 min-w-[100px]">DOCUMENT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="p-2">1056</td>
              <td className="p-2">Sithalapakkam 2 Mr.Manivannan</td>
              <td className="p-2">09.05.2025</td>
              <td className="p-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                  13.05.2025
                </span>
              </td>
              <td className="p-2">INR 0.00</td>
              <td className="p-2">INR 0.00</td>
              <td className="p-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                  PAID
                </span>
              </td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <Printer className="cursor-pointer" />
                  <Trash2 className="cursor-pointer" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;