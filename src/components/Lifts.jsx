import { useState } from 'react';
import { Link } from 'react-router-dom';

const LiftsPage = () => {
  const [filters, setFilters] = useState({
    doorType: 'ALL',
    liftType: 'ALL',
    machineType: 'ALL',
    floorID: 'ALL',
    brand: 'ALL',
    load: 'ALL',
    noOfPassengers: 'ALL',
  });
  const [lifts] = useState([
    { id: 277951, liftCode: 'AL237', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277952, liftCode: 'AL238', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277953, liftCode: 'AL239', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277954, liftCode: 'AL240', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277955, liftCode: 'AL241', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277956, liftCode: 'AL242', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277957, liftCode: 'AL243', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277958, liftCode: 'AL244', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredLifts = lifts.filter((lift) =>
    (filters.doorType === 'ALL' || lift.doorType === filters.doorType) &&
    (filters.liftType === 'ALL' || lift.liftType === filters.liftType) &&
    (filters.machineType === 'ALL' || lift.machineType === filters.machineType) &&
    (filters.floorID === 'ALL' || lift.floorID === filters.floorID) &&
    (filters.brand === 'ALL' || lift.brand === filters.brand) &&
    (filters.load === 'ALL' || lift.load.toString() === filters.load) &&
    (filters.noOfPassengers === 'ALL' || lift.noOfPassengers === filters.noOfPassengers)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLifts = filteredLifts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLifts.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Lifts</h1>
        <div className="space-x-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 w-full md:w-auto mb-2 md:mb-0">
            Bulk Actions
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 w-full md:w-auto">
            Create Lift
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end">
          <select
            name="doorType"
            value={filters.doorType}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <select
            name="liftType"
            value={filters.liftType}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All</option>
            <option value="Passenger">Passenger</option>
            <option value="Goods">Goods</option>
          </select>
          <select
            name="machineType"
            value={filters.machineType}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All</option>
            <option value="Gearless">Gearless</option>
            <option value="Geared">Geared</option>
          </select>
          <select
            name="floorID"
            value={filters.floorID}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All</option>
            <option value="G+2">G+2</option>
            <option value="G+3">G+3</option>
          </select>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All</option>
            <option value="ATOM Lifts IPL">ATOM Lifts IPL</option>
          </select>
          <select
            name="load"
            value={filters.load}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All</option>
            <option value="408">408</option>
          </select>
          <select
            name="noOfPassengers"
            value={filters.noOfPassengers}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All</option>
            <option value="6 Persons">6 Persons</option>
          </select>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 w-full"
          >
            Search
          </button>
        </div>
      </div>

      {/* Lifts Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Lift Code</th>
                <th className="p-4 text-left">No of Passengers</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Load(kg)</th>
                <th className="p-4 text-left">Lift Type</th>
                <th className="p-4 text-left">Machine Type</th>
                <th className="p-4 text-left">Door Type</th>
                <th className="p-4 text-left">Floor ID</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLifts.map((lift) => (
                <tr key={lift.id} className="border-t hover:bg-gray-50 transition duration-200">
                  <td className="p-4 text-gray-800">{lift.id}</td>
                  <td className="p-4 text-gray-800">{lift.liftCode}</td>
                  <td className="p-4 text-gray-800">{lift.noOfPassengers}</td>
                  <td className="p-4 text-gray-800">{lift.brand}</td>
                  <td className="p-4 text-gray-800">{lift.load}</td>
                  <td className="p-4 text-gray-800">{lift.liftType}</td>
                  <td className="p-4 text-gray-800">{lift.machineType}</td>
                  <td className="p-4 text-gray-800">{lift.doorType}</td>
                  <td className="p-4 text-gray-800">{lift.floorID}</td>
                  <td className="p-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden">
          {currentLifts.map((lift) => (
            <div key={lift.id} className="border-b p-4">
              <div className="text-gray-800 font-semibold">ID: {lift.id}</div>
              <div className="text-gray-800">Lift Code: {lift.liftCode}</div>
              <div className="text-gray-800">No of Passengers: {lift.noOfPassengers}</div>
              <div className="text-gray-800">Brand: {lift.brand}</div>
              <div className="text-gray-800">Load(kg): {lift.load}</div>
              <div className="text-gray-800">Lift Type: {lift.liftType}</div>
              <div className="text-gray-800">Machine Type: {lift.machineType}</div>
              <div className="text-gray-800">Door Type: {lift.doorType}</div>
              <div className="text-gray-800">Floor ID: {lift.floorID}</div>
              <div className="p-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 text-gray-600 flex flex-col md:flex-row justify-between items-center">
          {/* <span>Showing {indexOfFirstItem + 1}-{indexOfLastItem > filteredLifts.length ? filteredLifts.length : indexOfLastItem} of {filteredLifts.length}</span> */}
          <div className="space-x-2 mt-2 md:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
            >
              
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
            >
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiftsPage;