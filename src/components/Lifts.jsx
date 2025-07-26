import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

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
  const [lifts, setLifts] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for dropdown options
  const [brandOptions, setBrandOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [machineTypeOptions, setMachineTypeOptions] = useState([]);
  const [liftTypeOptions, setLiftTypeOptions] = useState([]);
  const [doorTypeOptions, setDoorTypeOptions] = useState([]);
  const [machineBrandOptions, setMachineBrandOptions] = useState([]);
  const [doorBrandOptions, setDoorBrandOptions] = useState([]);
  const [controllerBrandOptions, setControllerBrandOptions] = useState([]);
  const [cabinOptions, setCabinOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

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
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Fetch data with retry logic
  const fetchData = async (retryCount = 3) => {
    setLoading(true);
    try {
      // Fetch lifts
      const liftsResponse = await axios.get(`${apiBaseUrl}/lift_list/`, { withCredentials: true });
      const liftsData = liftsResponse.data.map(lift => ({
        id: lift.id,
        liftCode: lift.lift_code,
        noOfPassengers: lift.no_of_passengers,
        brand: lift.brand_value,
        load: lift.load_kg,
        liftType: lift.lift_type_value,
        machineType: lift.machine_type_value,
        doorType: lift.door_type_value,
        floorID: lift.floor_id_value,
        model: lift.model || 'Standard',
        name: lift.name,
        speed: lift.speed,
        machineBrand: lift.machine_brand_value,
        doorBrand: lift.door_brand_value,
        controllerBrand: lift.controller_brand_value,
        cabin: lift.cabin_value,
        price: lift.price,
      }));
      setLifts(liftsData);

      // Derive model options from lifts
      const uniqueModels = [...new Set(liftsData.map(lift => lift.model).filter(model => model))];
      setModelOptions(uniqueModels);

      // Fetch dropdown options
      const [brands, floors, machineTypes, liftTypes, doorTypes, machineBrands, doorBrands, controllerBrands, cabins] = await Promise.all([
        axios.get(`${apiBaseUrl}/brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/floor-ids/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/machine-types/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/lift-types/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/door-types/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/machine-brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/door-brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/controller-brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/cabins/`, { withCredentials: true }),
      ]);

      setBrandOptions(brands.data.map(item => item.value));
      setFloorOptions(floors.data.map(item => item.value));
      setMachineTypeOptions(machineTypes.data.map(item => item.value));
      setLiftTypeOptions(liftTypes.data.map(item => item.value));
      setDoorTypeOptions(doorTypes.data.map(item => item.value));
      setMachineBrandOptions(machineBrands.data.map(item => item.value));
      setDoorBrandOptions(doorBrands.data.map(item => item.value));
      setControllerBrandOptions(controllerBrands.data.map(item => item.value));
      setCabinOptions(cabins.data.map(item => item.value));
    } catch (error) {
      console.error('Error fetching data:', error);
      if (retryCount > 0) {
        console.log(`Retrying fetchData... (${retryCount} attempts left)`);
        setTimeout(() => fetchData(retryCount - 1), 1000);
      } else {
        toast.error(error.response?.data?.error || 'Failed to fetch lift data.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleCreateLift = async () => {
    const requiredFields = ['liftCode', 'noOfPassengers', 'brand', 'load', 'floorID', 'cabin'];
    const isValid = requiredFields.every((field) => newLift[field]);
    if (!isValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      // Map string values to their corresponding IDs
      const [brands, floors, liftTypes, machineTypes, machineBrands, doorTypes, doorBrands, controllerBrands, cabins] = await Promise.all([
        axios.get(`${apiBaseUrl}/brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/floor-ids/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/lift-types/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/machine-types/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/machine-brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/door-types/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/door-brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/controller-brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/cabins/`, { withCredentials: true }),
      ]);

      const liftData = {
        lift_code: newLift.liftCode,
        name: newLift.name,
        price: parseFloat(newLift.price) || 0.00,
        model: newLift.model || 'Standard',
        no_of_passengers: `${newLift.noOfPassengers} Persons`,
        load_kg: newLift.load,
        speed: newLift.speed,
        floor_id: floors.data.find(f => f.value === newLift.floorID)?.id,
        brand: brands.data.find(b => b.value === newLift.brand)?.id,
        lift_type: liftTypes.data.find(l => l.value === newLift.liftType)?.id || null,
        machine_type: machineTypes.data.find(m => m.value === newLift.machineType)?.id || null,
        machine_brand: machineBrands.data.find(m => m.value === newLift.machineBrand)?.id || null,
        door_type: doorTypes.data.find(d => d.value === newLift.doorType)?.id || null,
        door_brand: doorBrands.data.find(d => d.value === newLift.doorBrand)?.id || null,
        controller_brand: controllerBrands.data.find(c => c.value === newLift.controllerBrand)?.id || null,
        cabin: cabins.data.find(c => c.value === newLift.cabin)?.id,
      };

      console.log('Creating lift with data:', liftData);

      const response = await axios.post(`${apiBaseUrl}/add_lift/`, liftData, { withCredentials: true });
      setLifts((prev) => [...prev, {
        id: response.data.lift_id,
        liftCode: liftData.lift_code,
        noOfPassengers: liftData.no_of_passengers,
        brand: newLift.brand,
        load: liftData.load_kg,
        liftType: newLift.liftType,
        machineType: newLift.machineType,
        doorType: newLift.doorType,
        floorID: newLift.floorID,
        model: liftData.model,
        name: liftData.name,
        speed: liftData.speed,
        machineBrand: newLift.machineBrand,
        doorBrand: newLift.doorBrand,
        controllerBrand: newLift.controllerBrand,
        cabin: newLift.cabin,
        price: liftData.price,
      }]);
      // Update model options
      if (newLift.model && !modelOptions.includes(newLift.model)) {
        setModelOptions((prev) => [...prev, newLift.model]);
      }
      setIsCreateModalOpen(false);
      resetForm();
      toast.success(response.data.message || 'Lift created successfully.');
    } catch (error) {
      console.error('Error creating lift:', error.response?.data || error);
      toast.error(error.response?.data?.error || 'Failed to create lift.');
    }
  };

  const handleEditLift = async () => {
    const requiredFields = ['liftCode', 'noOfPassengers', 'brand', 'load', 'floorID', 'cabin'];
    const isValid = requiredFields.every((field) => newLift[field]);
    if (!isValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      // Map string values to IDs
      const [brands, floors, liftTypes, machineTypes, machineBrands, doorTypes, doorBrands, controllerBrands, cabins] = [
        await axios.get(`${apiBaseUrl}/brands/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/floor-ids/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/lift-types/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/machine-types/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/machine-brands/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/door-types/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/door-brands/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/controller-brands/`, { withCredentials: true }),
        await axios.get(`${apiBaseUrl}/cabins/`, { withCredentials: true }),
      ];

      const liftData = {
        lift_code: newLift.liftCode,
        name: newLift.name,
        price: parseFloat(newLift.price) || 0.00,
        model: newLift.model || 'Standard',
        no_of_passengers: `${newLift.noOfPassengers} Persons`,
        load_kg: newLift.load,
        speed: newLift.speed,
        floor_id: floors.data.find(f => f.value === newLift.floorID)?.id,
        brand: brands.data.find(b => b.value === newLift.brand)?.id,
        lift_type: liftTypes.data.find(l => l.value === newLift.liftType)?.id || null,
        machine_type: machineTypes.data.find(m => m.value === newLift.machineType)?.id || null,
        machine_brand: machineBrands.data.find(m => m.value === newLift.machineBrand)?.id || null,
        door_type: doorTypes.data.find(d => d.value === newLift.doorType)?.id || null,
        door_brand: doorBrands.data.find(d => d.value === newLift.doorBrand)?.id || null,
        controller_brand: controllerBrands.data.find(c => c.value === newLift.controllerBrand)?.id || null,
        cabin: cabins.data.find(c => c.value === newLift.cabin)?.id,
      };

      console.log('Updating lift with data:', liftData);

      const response = await axios.put(`${apiBaseUrl}/edit_lift/${editLiftId}/`, liftData, { withCredentials: true });
      setLifts((prev) =>
        prev.map((lift) =>
          lift.id === editLiftId
            ? {
                ...lift,
                liftCode: liftData.lift_code,
                noOfPassengers: liftData.no_of_passengers,
                brand: newLift.brand,
                load: liftData.load_kg,
                liftType: newLift.liftType,
                machineType: newLift.machineType,
                doorType: newLift.doorType,
                floorID: newLift.floorID,
                model: liftData.model,
                name: liftData.name,
                speed: liftData.speed,
                machineBrand: newLift.machineBrand,
                doorBrand: newLift.doorBrand,
                controllerBrand: newLift.controllerBrand,
                cabin: newLift.cabin,
                price: liftData.price,
              }
            : lift
        )
      );
      // Update model options
      if (newLift.model && !modelOptions.includes(newLift.model)) {
        setModelOptions((prev) => [...prev, newLift.model]);
      }
      setIsEditModalOpen(false);
      resetForm();
      toast.success(response.data.message || 'Lift updated successfully.');
    } catch (error) {
      console.error('Error editing lift:', error.response?.data || error);
      toast.error(error.response?.data?.error || 'Failed to update lift.');
    }
  };

  const handleDeleteLift = async (id) => {
    if (window.confirm('Are you sure you want to delete this lift?')) {
      try {
        const response = await axios.delete(`${apiBaseUrl}/delete_lift/${id}/`, { withCredentials: true });
        setLifts((prev) => prev.filter((lift) => lift.id !== id));
        setCurrentPage(1);
        toast.success(response.data.message || 'Lift deleted successfully.');
      } catch (error) {
        console.error('Error deleting lift:', error.response?.data || error);
        toast.error(error.response?.data?.error || 'Failed to delete lift.');
      }
    }
  };

  const openEditModal = (lift) => {
    setNewLift({
      liftCode: lift.liftCode,
      noOfPassengers: lift.noOfPassengers.replace(' Persons', ''),
      brand: lift.brand || '',
      load: lift.load,
      liftType: lift.liftType || '',
      machineType: lift.machineType || '',
      doorType: lift.doorType || '',
      floorID: lift.floorID || '',
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

  const openAddModal = (field) => {
    setModalState((prev) => ({ ...prev, [field]: { ...prev[field], isOpen: true } }));
  };

  const closeAddModal = (field) => {
    setModalState((prev) => ({ ...prev, [field]: { isOpen: false, value: '' } }));
  };

  const handleAddSubmit = async (field, setOptions) => {
    const value = modalState[field].value.trim();
    if (!value) {
      toast.error(`Please enter a ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`);
      return;
    }

    try {
      const apiEndpoints = {
        brand: 'add-brand/',
        floorID: 'add-floor-id/',
        machineType: 'add-machine-type/',
        liftType: 'add-lift-type/',
        doorType: 'add-door-type/',
        machineBrand: 'add-machine-brand/',
        doorBrand: 'add-door-brand/',
        controllerBrand: 'add-controller-brand/',
        cabin: 'add-cabin/',
      };

      await axios.post(`${apiBaseUrl}/${apiEndpoints[field]}`, { value }, { withCredentials: true });
      setOptions((prev) => [...prev, value]);
      setNewLift((prev) => ({ ...prev, [field]: value }));
      closeAddModal(field);
      toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} added successfully.`);
    } catch (error) {
      console.error(`Error adding ${field}:`, error.response?.data || error);
      toast.error(error.response?.data?.error || `Failed to add ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`);
    }
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

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
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
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 w-full md:w-auto mb-2 md:mb-0"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4 items-end lg:w-[1000px]">
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
              {loading ? (
                <tr>
                  <td colSpan="11" className="text-center p-4">Loading...</td>
                </tr>
              ) : currentLifts.length > 0 ? (
                currentLifts.map((lift) => (
                  <tr key={lift.id} className="border-t hover:bg-gray-50 transition duration-200">
                    <td className="p-4 text-gray-800">{lift.id}</td>
                    <td className="p-4 text-gray-800">{lift.liftCode}</td>
                    <td className="p-4 text-gray-800">{lift.noOfPassengers}</td>
                    <td className="p-4 text-gray-800">{lift.brand || '-'}</td>
                    <td className="p-4 text-gray-800">{lift.load}</td>
                    <td className="p-4 text-gray-800">{lift.liftType || '-'}</td>
                    <td className="p-4 text-gray-800">{lift.machineType || '-'}</td>
                    <td className="p-4 text-gray-800">{lift.doorType || '-'}</td>
                    <td className="p-4 text-gray-800">{lift.floorID || '-'}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-4">No lifts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="md:hidden">
          {loading ? (
            <div className="text-center p-4">Loading...</div>
          ) : currentLifts.length > 0 ? (
            currentLifts.map((lift) => (
              <div key={lift.id} className="border-b p-4">
                <div className="text-gray-800 font-semibold">ID: {lift.id}</div>
                <div className="text-gray-800">Lift Code: {lift.liftCode}</div>
                <div className="text-gray-800">No of Passengers: {lift.noOfPassengers}</div>
                <div className="text-gray-800">Brand: {lift.brand || '-'}</div>
                <div className="text-gray-800">Load(kg): {lift.load}</div>
                <div className="text-gray-800">Lift Type: {lift.liftType || '-'}</div>
                <div className="text-gray-800">Machine Type: {lift.machineType || '-'}</div>
                <div className="text-gray-800">Door Type: {lift.doorType || '-'}</div>
                <div className="text-gray-800">Floor ID: {lift.floorID || '-'}</div>
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
            ))
          ) : (
            <div className="text-center p-4">No lifts found.</div>
          )}
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                      type="text"
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
                      placeholder="Enter model name"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                        className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
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
                  }[field])}
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