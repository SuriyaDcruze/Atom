import React, { useState } from 'react';
import { 
  Search, MapPin, ChevronDown, Filter, 
  List, Map, Check, Calendar, User 
} from 'lucide-react';

const RouteWiseServices = () => {
  const [selectedRoute, setSelectedRoute] = useState('ALL TIME');
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      custRefNo: 'T Nagar 10',
      liftCode: 'Chennai',
      blockWing: '',
      customer: 'AL056 # Sithalapakkam 2 Mr.Manivannan - Chennai',
      serviceDate: '01.06.2026 June',
      gmap: 'Click to open GMAP',
      employee: '12',
      numServices: '✅',
      status: 'DUE',
      location: '✅'
    }
    // Add more services as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Route wise Services</h1>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button className="flex items-center bg-orange-600 text-white rounded-md px-3 py-2 text-sm">
              <List className="h-4 w-4 mr-2" />
              List View
            </button>
            <button className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
              <Map className="h-4 w-4 mr-2" />
              Map View
            </button>
          </div>
        </div>

        {/* Route Filter */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                Routes
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option>ALL TIME</option>
                <option>Route 1</option>
                <option>Route 2</option>
                <option>Route 3</option>
              </select>
            </div>
            {/* <div className="md:col-span-3 relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div> */}
          </div>
        </div>

        {/* Services Table - Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CUST REF NO</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">LIFT CODE</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ROUTES</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">BLOCK/WING</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CUSTOMER</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">SERVICE DATE</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">GMAP</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">EMPLOYEE</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">NO.OF SERVICES</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">STATUS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">LOCATION</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{service.custRefNo}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service.liftCode}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service.liftCode}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service.blockWing}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service.serviceDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-orange-600 hover:text-orange-800 cursor-pointer">
                      {service.gmap}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service.employee}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <Check className="h-4 w-4 text-green-500" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        service.status === 'DUE' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <Check className="h-4 w-4 text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Services Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {services.map((service, index) => (
            <div key={`mobile-${index}`} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{service.custRefNo}</h3>
                  <p className="text-sm text-gray-500">{service.liftCode}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  service.status === 'DUE' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {service.status}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer:</span>
                  <span>{service.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Date:</span>
                  <span>{service.serviceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Employee:</span>
                  <span>{service.employee}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                <button className="flex items-center text-orange-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  View Map
                </button>
                <button className="flex items-center text-gray-600 text-sm">
                  <User className="h-4 w-4 mr-1" />
                  Assign
                </button>
                <button className="flex items-center text-gray-600 text-sm">
                  <Check className="h-4 w-4 mr-1" />
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No services found for this route</h3>
            <p className="text-gray-500 mt-1">Try selecting a different route or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteWiseServices;