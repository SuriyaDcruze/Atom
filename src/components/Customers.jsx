import React from 'react';
import { Edit, MoreVertical, Plus, Search, ChevronDown, ChevronUp } from 'lucide-react';

const CustomerRow = ({ siteId, siteName, address, mobile, contracts, noOfLifts, service, generatedTickets, invoices, routes }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        {/* Visible on all screens */}
        <td className="px-2 py-3 sm:px-4 whitespace-nowrap">{siteId}</td>
        <td className="px-2 py-3 sm:px-4 hidden sm:table-cell whitespace-nowrap truncate max-w-[150px]">
          {siteName}
        </td>
        
        {/* Mobile expand/collapse button */}
        <td className="px-2 py-3 sm:px-4 sm:hidden text-right">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-500 p-1 rounded-full hover:bg-orange-50"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </td>
        
        {/* Desktop-only columns */}
        <td className="px-2 py-3 sm:px-4 hidden md:table-cell whitespace-nowrap truncate max-w-[200px]">
          {address}
        </td>
        <td className="px-2 py-3 sm:px-4 hidden lg:table-cell whitespace-nowrap">{mobile}</td>
        <td className="px-2 py-3 sm:px-4 hidden sm:table-cell whitespace-nowrap">{contracts}</td>
        <td className="px-2 py-3 sm:px-4 hidden md:table-cell whitespace-nowrap">{noOfLifts}</td>
        <td className="px-2 py-3 sm:px-4 hidden lg:table-cell whitespace-nowrap">{service}</td>
        <td className="px-2 py-3 sm:px-4 hidden xl:table-cell whitespace-nowrap">{generatedTickets}</td>
        <td className="px-2 py-3 sm:px-4 hidden xl:table-cell whitespace-nowrap">{invoices}</td>
        <td className="px-2 py-3 sm:px-4 hidden md:table-cell whitespace-nowrap">{routes}</td>
        
        {/* Action buttons - always visible */}
        <td className="px-2 py-3 sm:px-4 whitespace-nowrap flex justify-end space-x-2">
          <button className="bg-orange-500 text-white p-1 sm:p-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center">
            <Edit size={16} className="hidden sm:inline mr-1" />
            <span className="hidden sm:inline">Edit</span>
            <span className="sm:hidden">
              <Edit size={16} />
            </span>
          </button>
          <button className="bg-orange-500 text-white p-1 sm:p-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors">
            <MoreVertical size={16} />
          </button>
        </td>
      </tr>
      
      {/* Expanded row for mobile */}
      {isExpanded && (
        <tr className="sm:hidden bg-gray-50">
          <td colSpan="100" className="px-4 py-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Site Name</p>
                <p>{siteName}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Address</p>
                <p className="truncate">{address}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Mobile</p>
                <p>{mobile}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Contracts</p>
                <p>{contracts}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">No. of Lifts</p>
                <p>{noOfLifts}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Service</p>
                <p>{service}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Tickets</p>
                <p>{generatedTickets}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Invoices</p>
                <p>{invoices}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Routes</p>
                <p>{routes}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const Customers = () => {
  const customers = [
    {
      siteId: "AL237",
      siteName: "Mr.Elangovan",
      address: "No:1/16,4th Main Road,Kodungaiyur, Kodungaiyur,Nagar,Kodungaiyur, Chennai-600118, Tamil Nadu, India (Branch: Chennai)",
      mobile: "Active: 0 Expired: 0",
      contracts: "2",
      noOfLifts: "Completed: 0 Due: 0 Overdue: 0",
      service: "0",
      generatedTickets: "0",
      invoices: "0",
      routes: "Chennai"
    }
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Customers</h1>
      
      {/* Filters - stacked on mobile */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <select className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap">
            <option>All Routes</option>
          </select>
          <select className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap">
            <option>All Branch</option>
          </select>
          <select className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap">
            <option>All City</option>
          </select>
          <select className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap">
            <option>All Customer</option>
          </select>
          <select className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap">
            <option>All Sector</option>
          </select>
          <button className="bg-orange-500 text-white p-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center text-sm sm:text-base whitespace-nowrap">
            <Search size={16} className="mr-1" /> Search
          </button>
        </div>
        <button className="bg-orange-500 text-white p-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center text-sm sm:text-base whitespace-nowrap">
          <Plus size={16} className="mr-1" /> Add New Customer
        </button>
      </div>
      
      {/* Table container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="px-2 py-3 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">Site ID</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden sm:table-cell text-sm sm:text-base whitespace-nowrap">Site Name</th>
                  <th className="px-2 py-3 sm:px-4 text-left sm:hidden text-sm sm:text-base whitespace-nowrap"></th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden md:table-cell text-sm sm:text-base whitespace-nowrap">Address</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden lg:table-cell text-sm sm:text-base whitespace-nowrap">Mobile</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden sm:table-cell text-sm sm:text-base whitespace-nowrap">Contracts</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden md:table-cell text-sm sm:text-base whitespace-nowrap">No.of Lifts</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden lg:table-cell text-sm sm:text-base whitespace-nowrap">Service</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden xl:table-cell text-sm sm:text-base whitespace-nowrap">Tickets</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden xl:table-cell text-sm sm:text-base whitespace-nowrap">Invoices</th>
                  <th className="px-2 py-3 sm:px-4 text-left hidden md:table-cell text-sm sm:text-base whitespace-nowrap">Routes</th>
                  <th className="px-2 py-3 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <CustomerRow key={index} {...customer} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;