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
    model: 'ALL',
  });

  // State for lifts
  const [lifts, setLifts] = useState([
    { id: 277951, liftCode: 'AL237', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
    { id: 277952, liftCode: 'AL238', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
    { id: 277953, liftCode: 'AL239', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
    { id: 277954, liftCode: 'AL240', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
    { id: 277955, liftCode: 'AL241', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
    { id: 277956, liftCode: 'AL242', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
    { id: 277957, liftCode: 'AL243', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
    { id: 277958, liftCode: 'AL244', noOfPassengers: '6 Persons', brand: 'ATOM Lifts IPL', load: 408, liftType: 'Passenger', machineType: 'Gearless', doorType: 'Automatic', floorID: 'G+2', model: 'Standard' },
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
  const [modelOptions, setModelOptions] = useState(['Standard', 'Premium']);

  // State for create/edit modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLiftId, setEditLiftId] = useState(null);
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
    model: { isOpen: false, value: '' },
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
    resetForm();
  };

  const handleEditLift = () => {
    const requiredFields = ['liftCode', 'noOfPassengers', 'brand', 'load', 'floorID', 'cabin'];
    const isValid = requiredFields.every((field) => newLift[field]);
    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }

    setLifts((prev) =>
      prev.map((lift) =>
        lift.id === editLiftId
          ? {
              ...lift,
              ...newLift,
              noOfPassengers: `${newLift.noOfPassengers} Persons`,
              load: Number(newLift.load),
            }
          : lift
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDeleteLift = (id) => {
    if (window.confirm('Are you sure you want to delete this lift?')) {
      setLifts((prev) => prev.filter((lift) => lift.id !== id));
      setCurrentPage(1);
    }
  };

  const openEditModal = (lift) => {
    setNewLift({
      liftCode: lift.liftCode,
      noOfPassengers: lift.noOfPassengers.replace(' Persons', ''),
      brand: lift.brand,
      load: lift.load.toString(),
      liftType: lift.liftType,
      machineType: lift.machineType,
      doorType: lift.doorType,
      floorID: lift.floorID,
      name: lift.name || '',
      model: lift.model || '',
      speed: lift.speed || '',
      machineBrand: lift.machineBrand || '',
      doorBrand: lift.doorBrand || '',
      controllerBrand: lift.controllerBrand || '',
      cabin: lift.cabin || '',
      price: lift.price || '',
    });
    setEditLiftId(lift.id);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
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
    setEditLiftId(null);
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

  // Reset filters
  const resetFilters = () => {
    setFilters({
      doorType: 'ALL',
      liftType: 'ALL',
      machineType: 'ALL',
      floorID: 'ALL',
      brand: 'ALL',
      load: 'ALL',
      noOfPassengers: 'ALL',
      model: 'ALL',
    });
    setCurrentPage(1);
  };

  // Pagination logic
  const filteredLifts = lifts.filter((lift) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === 'ALL') return true;
      if (key === 'load') return lift[key].toString() === value;
      if (key === 'noOfPassengers') return lift[key] === value;
      return lift[key] === value;
    })
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4 items-end">
          <select name="doorType" value={filters.doorType} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Door Types</option>
            {doorTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="liftType" value={filters.liftType} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Lift Types</option>
            {liftTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="machineType" value={filters.machineType} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Machine Types</option>
            {machineTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="floorID" value={filters.floorID} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Floors</option>
            {floorOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="brand" value={filters.brand} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Brands</option>
            {brandOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="load" value={filters.load} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Loads</option>
            {[...new Set(lifts.map((lift) => lift.load.toString()))].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="noOfPassengers" value={filters.noOfPassengers} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Passengers</option>
            {[...new Set(lifts.map((lift) => lift.noOfPassengers))].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="model" value={filters.model} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="ALL">All Models</option>
            {modelOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="flex space-x-2">
            <button
              onClick={resetFilters}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 w-full"
            >
              Reset
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 w-full"
            >
              Search
            </button>
          </div>
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
                <th className="p-4 text-left">Model</th>
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
                  <td className="p-4 text-gray-800">{lift.model}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => openEditModal(lift)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteLift(lift.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18" />
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
              <div className="text-gray-800">Model: {lift.model}</div>
              <div className="p-2 flex space-x-2">
                <button
                  onClick={() => openEditModal(lift)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteLift(lift.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18" />
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

      {/* Create/Edit Lift Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <h2 className="text-2xl font-bold text-white">{isEditModalOpen ? 'Edit Lift' : 'Create New Lift'}</h2>
              <p className="text-orange-100">Fill in all required fields (*) to {isEditModalOpen ? 'update' : 'add'} a lift</p>
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
                    <div className="flex">
                      <select
                        name="floorID"
                        value={newLift.floorID}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                        required
                      >
                        <option value="">Select Floor</option>
                        {floorOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('floorID')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
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
                    <div className="flex">
                      <select
                        name="model"
                        value={newLift.model}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white bg-select-arrow"
                      >
                        <option value="">Select Model</option>
                        {modelOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => openAddModal('model')}
                        className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                      >
                        +
                      </button>
                    </div>
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
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={isEditModalOpen ? handleEditLift : handleCreateLift}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
              >
                {isEditModalOpen ? 'Update Lift' : 'Create Lift'}
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
                    model: setModelOptions,
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