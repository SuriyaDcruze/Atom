import React, { useState } from 'react';
import { 
  Search, Calendar, MapPin, Wrench, 
  ChevronDown, ChevronUp, Filter, 
  List, Map, User, CheckCircle, 
  Clock, AlertCircle, MoreVertical 
} from 'lucide-react';

const TodayServices = () => {
  const [expandedFilters, setExpandedFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      clustRefNo: 'T Nagar 10',
      liftCode: 'Chennai',
      clustName: 'AL056 # Sithalapakkam',
      customer: '2 Mr.Manivannan - Chennai',
      serviceDate: '01.06.2026',
      gmap: 'Click to open',
      employee: 'Z',
      status: 'DUE',
      location: 'GMAP'
    }
    // Add more services as needed
  ];

  const statusIcons = {
    DUE: <Clock className="h-4 w-4 text-yellow-500" />,
    COMPLETED: <CheckCircle className="h-4 w-4 text-green-500" />,
    OVERDUE: <AlertCircle className="h-4 w-4 text-red-500" />
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <Wrench className="h-6 w-6 mr-2 text-orange-600" />
            Today Services
          </h1>
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

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-gray-700 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-600" />
              Today's Services - {new Date().toLocaleDateString()}
            </h2>
            <button onClick={() => setExpandedFilters(!expandedFilters)}>
              {expandedFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
          
          {expandedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Routes</option>
                  <option>Route 1</option>
                  <option>Route 2</option>
                </select>
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Statuses</option>
                  <option>Due</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>
                <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Employees</option>
                  <option>Employee 1</option>
                  <option>Employee 2</option>
                </select>
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Services Table - Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-8 bg-gray-100 p-3 font-medium text-gray-700 text-sm">
            <div className="flex items-center">CLUST REF NO</div>
            <div className="flex items-center">LIFT CODE</div>
            <div className="flex items-center">CLUST NAME</div>
            <div className="flex items-center">CUSTOMER</div>
            <div className="flex items-center">SERVICE DATE</div>
            <div className="flex items-center">EMPLOYEE</div>
            <div className="flex items-center">STATUS</div>
            <div className="flex items-center">ACTION</div>
          </div>
          
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-8 p-3 border-b border-gray-200 text-sm">
              <div className="font-medium">{service.clustRefNo}</div>
              <div>{service.liftCode}</div>
              <div>{service.clustName}</div>
              <div>{service.customer}</div>
              <div>{service.serviceDate}</div>
              <div>{service.employee}</div>
              <div className="flex items-center">
                {statusIcons[service.status]}
                <span className="ml-1">{service.status}</span>
              </div>
              <div className="text-orange-600 hover:text-orange-800 cursor-pointer">
                {service.gmap}
              </div>
            </div>
          ))}
        </div>

        {/* Services Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {services.map((service, index) => (
            <div key={`mobile-${index}`} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{service.clustRefNo}</h3>
                  <p className="text-sm text-gray-500">{service.liftCode}</p>
                </div>
                <div className="flex items-center">
                  {statusIcons[service.status]}
                  <span className="ml-1 text-sm">{service.status}</span>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cluster Name:</span>
                  <span>{service.clustName}</span>
                </div>
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
                  <Wrench className="h-4 w-4 mr-1" />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Wrench className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No services scheduled for today</h3>
            <p className="text-gray-500 mt-1">Check back later or schedule new services</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayServices;