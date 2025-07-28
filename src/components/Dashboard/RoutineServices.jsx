import React, { useState } from 'react';
import { Search, Calendar, MapPin, ChevronDown, ChevronUp, Wrench } from 'lucide-react';

const RoutineServices = () => {
  const [expandedPeriod, setExpandedPeriod] = useState(true);
  const [expandedRoute, setExpandedRoute] = useState(true);

  const services = [
    {
      clustRefNo: 'T Nagar 10',
      liftCode: 'Chennai',
      clustName: 'AL056 # Sithalapakkam',
      serviceDate: '01.06.2026',
      gmap: 'Click to open',
      employee: 'Z',
      numServices: 'June',
      status: 'DUE',
      location: 'GMAP'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Routine Services</h1>

        {/* Period Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-gray-700 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-600" />
              Period
            </h2>
            <button onClick={() => setExpandedPeriod(!expandedPeriod)}>
              {expandedPeriod ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {expandedPeriod && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Month</div>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>ALL</option>
                </select>
              </div>
              <div>
                <div className="text-gray-500 mb-1">By Date</div>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>NONE</option>
                </select>
              </div>
              <div>
                <div className="text-gray-500 mb-1">AMC</div>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>ALL</option>
                </select>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Status</div>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>ALL</option>
                </select>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Employee</div>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>ALL</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Route Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-gray-700 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-orange-600" />
              CLUST REF NO / LIFT CODE
            </h2>
            <button onClick={() => setExpandedRoute(!expandedRoute)}>
              {expandedRoute ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {expandedRoute && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Routes</div>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>ALL ROUTE</option>
                </select>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Lift</div>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>ALL LIFT</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white rounded p-2 w-full transition-colors">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-7 bg-gray-100 p-3 font-medium text-gray-700 text-sm">
            <div>CLUST NAME</div>
            <div>ROUTES</div>
            <div>CUSTOMER</div>
            <div>SERVICE DATE</div>
            <div>GMAP</div>
            <div>EMPLOYEE</div>
            <div>STATUS</div>
          </div>
          
          {/* Table Row */}
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-7 p-3 border-b border-gray-200 text-sm">
              <div>{service.clustName}</div>
              <div>{service.liftCode}</div>
              <div>{service.clustRefNo}</div>
              <div>{service.serviceDate}</div>
              <div className="text-orange-600 hover:text-orange-800 cursor-pointer">{service.gmap}</div>
              <div>{service.employee}</div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  service.status === 'DUE' ? 'bg-yellow-100 text-yellow-800' : 
                  service.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No data to show
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutineServices;