import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LiftForm = ({
  isEdit = false,
  initialData = {},
  onClose,
  onSubmitSuccess,
  apiBaseUrl,
  dropdownOptions = {},
}) => {
  // Form state
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
    ...initialData,
  });

  // Modal state for adding new dropdown options
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLift((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal to add new dropdown option
  const openAddModal = (field) => {
    setModalState((prev) => ({ 
      ...prev, 
      [field]: { ...prev[field], isOpen: true } 
    }));
  };

  // Close modal to add new dropdown option
  const closeAddModal = (field) => {
    setModalState((prev) => ({ 
      ...prev, 
      [field]: { isOpen: false, value: '' } 
    }));
  };

  // Handle adding new dropdown option
  const handleAddOption = async (field) => {
    const value = modalState[field].value.trim();
    if (!value) {
      toast.error(`Please enter a ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
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

      await axios.post(
        `${apiBaseUrl}/auth/${apiEndpoints[field]}`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the form state with the new value
      setNewLift(prev => ({ ...prev, [field]: value }));

      // Close the modal
      closeAddModal(field);

      // Show success message
      toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} added successfully.`);

      // Trigger parent component to refresh options
      onSubmitSuccess();

    } catch (error) {
      console.error(`Error adding ${field}:`, error.response?.data || error);
      toast.error(
        error.response?.data?.error || 
        `Failed to add ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`
      );
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const requiredFields = ['liftCode', 'noOfPassengers', 'brand', 'load', 'floorID', 'cabin'];
    const isValid = requiredFields.every((field) => newLift[field]);
    
    if (!isValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      // Fetch all reference data to map values to IDs
      const [
        brands, 
        floors, 
        liftTypes, 
        machineTypes, 
        machineBrands, 
        doorTypes, 
        doorBrands, 
        controllerBrands, 
        cabins
      ] = await Promise.all([
        axios.get(`${apiBaseUrl}/auth/brands/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/floor-ids/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/lift-types/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/machine-types/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/machine-brands/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/door-types/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/door-brands/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/controller-brands/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/auth/cabins/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Prepare lift data for API
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

      // Make API call based on edit or create mode
      if (isEdit) {
        await axios.put(
          `${apiBaseUrl}/auth/edit_lift/${initialData.id}/`, 
          liftData, 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Lift updated successfully.');
      } else {
        await axios.post(
          `${apiBaseUrl}/auth/add_lift/`, 
          liftData, 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Lift created successfully.');
      }

      // Notify parent component of successful submission
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error(`Error ${isEdit ? 'editing' : 'creating'} lift:`, error.response?.data || error);
      toast.error(
        error.response?.data?.error || 
        `Failed to ${isEdit ? 'update' : 'create'} lift.`
      );
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Main Form Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2D3A6B] to-[#243158] p-6">
          <h2 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Lift' : 'Create New Lift'}
          </h2>
          <p className="text-white">
            Fill in all required fields (*) to {isEdit ? 'update' : 'add'} a lift
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Essential Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Essential Information
              </h3>

              {/* Lift Code */}
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

              {/* Name */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newLift.name}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Floor ID */}
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
                    {dropdownOptions.floorOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Brand */}
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
                    {dropdownOptions.brandOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Number of Passengers */}
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

              {/* Load (KG) */}
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

            {/* Right Column - Technical Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Technical Specifications
              </h3>

              {/* Model */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={newLift.model}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Enter model name"
                />
              </div>

              {/* Speed */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speed
                </label>
                <input
                  type="text"
                  name="speed"
                  value={newLift.speed}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="e.g. 1.0 m/s"
                />
              </div>

              {/* Machine Type */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Machine Type
                </label>
                <div className="flex">
                  <select
                    name="machineType"
                    value={newLift.machineType}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Type</option>
                    {dropdownOptions.machineTypeOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Machine Brand */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Machine Brand
                </label>
                <div className="flex">
                  <select
                    name="machineBrand"
                    value={newLift.machineBrand}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Brand</option>
                    {dropdownOptions.machineBrandOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Lift Type */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lift Type
                </label>
                <div className="flex">
                  <select
                    name="liftType"
                    value={newLift.liftType}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Type</option>
                    {dropdownOptions.liftTypeOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Door Type */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Door Type
                </label>
                <div className="flex">
                  <select
                    name="doorType"
                    value={newLift.doorType}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Type</option>
                    {dropdownOptions.doorTypeOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Door Brand */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Door Brand
                </label>
                <div className="flex">
                  <select
                    name="doorBrand"
                    value={newLift.doorBrand}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Brand</option>
                    {dropdownOptions.doorBrandOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Controller Brand */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Controller Brand
                </label>
                <div className="flex">
                  <select
                    name="controllerBrand"
                    value={newLift.controllerBrand}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Brand</option>
                    {dropdownOptions.controllerBrandOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Cabin */}
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
                    {dropdownOptions.cabinOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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

              {/* Price */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
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

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-[#2D3A6B] to-[#243158] rounded-lg text-white font-medium hover:from-[#213066] hover:to-[#182755] transition-all duration-200 shadow-md"
          >
            {isEdit ? 'Update Lift' : 'Create Lift'}
          </button>
        </div>
      </div>

      {/* Secondary Modals for Adding Options */}
      {Object.entries(modalState).map(([field, { isOpen, value }]) => (
        isOpen && (
          <div key={field} className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Add New {field.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <input
                type="text"
                value={value}
                onChange={(e) => setModalState((prev) => ({ 
                  ...prev, 
                  [field]: { ...prev[field], value: e.target.value } 
                }))}
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
                  onClick={() => handleAddOption(field)}
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

export default LiftForm;