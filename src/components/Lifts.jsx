import { useState } from 'react';
import { Link } from 'react-router-dom';

const LiftsPage = () => {
  // State for filters
  const [filters, setFilters] = useState({
    doorType: 'ALL',
    liftType: 'ALL',
    machineType: 'ALL',
    floorID: 'ALL',
    brand: 'ALL',
    load: 'ALL',
    noOfPassengers: 'ALL',
  });

  // State for lifts
  const [lifts, setLifts] = useState([
    { id: 277951, liftCode: 'AL237', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277952, liftCode: 'AL238', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277953, liftCode: 'AL239', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277954, liftCode: 'AL240', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277955, liftCode: 'AL241', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277956, liftCode: 'AL242', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277957, liftCode: 'AL243', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
    { id: 277958, liftCode: 'AL244', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2' },
  ]);

  // State for dropdown options
  const [brandOptions, setBrandOptions] = useState(['ATOM Lifts IPL', 'Otis', 'Schindler']);
  const [floorOptions, setFloorOptions] = useState(['G+2', 'G+3']);
  const [machineTypeOptions, setMachineTypeOptions] = useState(['Gearless', 'Geared']);
  const [liftTypeOptions, setLiftTypeOptions] = useState(['Passenger', 'Goods', 'Hospital']);
  const [doorTypeOptions, setDoorTypeOptions] = useState(['Automatic', 'Manual']);
  const [machineBrandOptions, setMachineBrandOptions] = useState(['ATOM', 'Otis']);
  const [doorBrandOptions, setDoorBrandOptions] = useState(['ATOM', 'Otis']);
  const [controllerBrandOptions, setControllerBrandOptions] = useState(['ATOM', 'Otis']);
  const [cabinOptions, setCabinOptions] = useState(['Standard', 'Premium']);

  // State for create modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newLift, setNewLift] = useState({
    liftCode: '',
    noOfPassengers: '',
    brand: '',
    load: '',
    liftType: '',
    machineType: '',
    doorType: '',
    floorID: '',
    name: '',
    model: '',
    speed: '',
    machineBrand: '',
    doorBrand: '',
    controllerBrand: '',
    cabin: '',
    price: '',
  });

  // State for secondary modals
  const [modalState, setModalState] = useState({
    brand: { isOpen: false, value: '' },
    floorID: { isOpen: false, value: '' },
    machineType: { isOpen: false, value: '' },
    liftType: { isOpen: false, value: '' },
    doorType: { isOpen: false, value: '' },
    machineBrand: { isOpen: false, value: '' },
    doorBrand: { isOpen: false, value: '' },
    controllerBrand: { isOpen: false, value: '' },
    cabin: { isOpen: false, value: '' },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLift((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateLift = () => {
    const requiredFields = ['liftCode', 'noOfPassengers', 'brand', 'load', 'floorID', 'cabin'];
    const isValid = requiredFields.every((field) => newLift[field]);
    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }

    const newLiftData = {
      id: Math.max(...lifts.map((lift) => lift.id), 0) + 1,
      ...newLift,
      noOfPassengers: `${newLift.noOfPassengers} Persons`,
      load: Number(newLift.load),
    };

    setLifts((prev) => [...prev, newLiftData]);
    setIsCreateModalOpen(false);
    setNewLift({
      liftCode: '',
      noOfPassengers: '',
      brand: '',
      load: '',
      liftType: '',
      machineType: '',
      doorType: '',
      floorID: '',
      name: '',
      model: '',
      speed: '',
      machineBrand: '',
      doorBrand: '',
      controllerBrand: '',
      cabin: '',
      price: '',
    });
  };

  const openAddModal = (field) => {
    setModalState((prev) => ({ ...prev, [field]: { ...prev[field], isOpen: true } }));
  };

  const closeAddModal = (field) => {
    setModalState((prev) => ({ ...prev, [field]: { isOpen: false, value: '' } }));
  };

  const handleAddSubmit = (field, setOptions, stateField) => {
    const value = modalState[field].value.trim();
    if (value) {
      setOptions((prev) => [...prev, value]);
      setNewLift((prev) => ({ ...prev, [stateField]: value }));
      closeAddModal(field);
    }
  };

  // Pagination logic
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
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 w-full md:w-auto"
          >
            Create Lift
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end">
          <select name="doorType" value={filters.doorType} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All</option>
            {doorTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="liftType" value={filters.liftType} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All</option>
            {liftTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="machineType" value={filters.machineType} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All</option>
            {machineTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="floorID" value={filters.floorID} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All</option>
            {floorOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="brand" value={filters.brand} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All</option>
            {brandOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="load" value={filters.load} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All</option>
            {[...new Set(lifts.map((lift) => lift.load.toString()))].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="noOfPassengers" value={filters.noOfPassengers} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All</option>
            {[...new Set(lifts.map((lift) => lift.noOfPassengers))].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 w-full">
            Search
          </button>
        </div>
      </div>

      {/* Lifts Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
          <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredLifts.length)} of {filteredLifts.length}</span>
          <div className="space-x-2 mt-2 md:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create Lift Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <h2 className="text-2xl font-bold text-white">Create New Lift</h2>
              <p className="text-orange-100">Fill in all required fields (*) to add a new lift</p>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Essential Information</h3>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="liftCode"
                      value={newLift.liftCode}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newLift.name}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Floor ID <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="floorID"
                      value={newLift.floorID}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      required
                    >
                      <option value="">Select Floor</option>
                      {floorOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                      <option value="+">Add New</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <select
                        name="brand"
                        value={newLift.brand}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                        required
                      >
                        <option value="">Select Brand</option>
                        {brandOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('brand')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Passengers <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="noOfPassengers"
                      value={newLift.noOfPassengers}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Load (KG) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="load"
                      value={newLift.load}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Technical Specifications</h3>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={newLift.model}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speed</label>
                    <input
                      type="text"
                      name="speed"
                      value={newLift.speed}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="e.g. 1.0 m/s"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Machine Type</label>
                    <div className="flex">
                      <select
                        name="machineType"
                        value={newLift.machineType}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      >
                        <option value="">Select Type</option>
                        {machineTypeOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('machineType')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Machine Brand</label>
                    <div className="flex">
                      <select
                        name="machineBrand"
                        value={newLift.machineBrand}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      >
                        <option value="">Select Brand</option>
                        {machineBrandOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('machineBrand')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lift Type</label>
                    <div className="flex">
                      <select
                        name="liftType"
                        value={newLift.liftType}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      >
                        <option value="">Select Type</option>
                        {liftTypeOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('liftType')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Door Type</label>
                    <div className="flex">
                      <select
                        name="doorType"
                        value={newLift.doorType}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      >
                        <option value="">Select Type</option>
                        {doorTypeOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('doorType')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Door Brand</label>
                    <div className="flex">
                      <select
                        name="doorBrand"
                        value={newLift.doorBrand}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      >
                        <option value="">Select Brand</option>
                        {doorBrandOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('doorBrand')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Controller Brand</label>
                    <div className="flex">
                      <select
                        name="controllerBrand"
                        value={newLift.controllerBrand}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      >
                        <option value="">Select Brand</option>
                        {controllerBrandOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('controllerBrand')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cabin <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <select
                        name="cabin"
                        value={newLift.cabin}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                        required
                      >
                        <option value="">Select Cabin</option>
                        {cabinOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('cabin')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="price"
                        value={newLift.price}
                        onChange={handleInputChange}
                        className="block w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLift}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
              >
                Create Lift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Modals */}
      {Object.entries(modalState).map(([field, { isOpen, value }]) => (
        isOpen && (
          <div key={field} className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New {field.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <input
                type="text"
                value={value}
                onChange={(e) => setModalState((prev) => ({ ...prev, [field]: { ...prev[field], value: e.target.value } }))}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 mb-4"
                placeholder={`Enter new ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => closeAddModal(field)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddSubmit(field, {
                    brand: setBrandOptions,
                    floorID: setFloorOptions,
                    machineType: setMachineTypeOptions,
                    liftType: setLiftTypeOptions,
                    doorType: setDoorTypeOptions,
                    machineBrand: setMachineBrandOptions,
                    doorBrand: setDoorBrandOptions,
                    controllerBrand: setControllerBrandOptions,
                    cabin: setCabinOptions,
                  }[field], field)}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  Add {field.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default LiftsPage;