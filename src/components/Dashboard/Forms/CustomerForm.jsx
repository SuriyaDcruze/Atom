import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CustomerForm = ({
  isEdit = false,
  initialData = {},
  onClose,
  onSubmitSuccess,
  apiBaseUrl,
  dropdownOptions = {},
}) => {
  // Form state
  const [newCustomer, setNewCustomer] = useState({
    referenceId: '',
    jobNo: '',
    siteName: '',
    siteAddress: '',
    email: '',
    phone: '',
    mobile: '',
    sameAsSiteAddress: false,
    officeAddress: '',
    contactPersonName: '',
    designation: '',
    pinCode: '',
    country: '',
    state: '',
    city: '',
    sector: '',
    routes: '',
    branch: '',
    gstNumber: '',
    panNumber: '',
    handoverDate: '',
    billingName: '',
    ...initialData,
  });

  // Modal state for adding new dropdown options (only for routes and branch)
  const [modalState, setModalState] = useState({
    routes: { isOpen: false, value: '' },
    branch: { isOpen: false, value: '' },
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCustomer((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));

    // If "Same as Site Address" is checked, update office address
    if (name === 'sameAsSiteAddress' && checked) {
      setNewCustomer((prev) => ({ 
        ...prev, 
        officeAddress: prev.siteAddress 
      }));
    }
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

  // Handle adding new dropdown option (only for routes and branch)
  const handleAddOption = async (field) => {
    const value = modalState[field].value.trim();
    if (!value) {
      toast.error(`Please enter a ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`);
      return;
    }

    try {
      const apiEndpoints = {
        routes: 'add-route/',
        branch: 'add-branch/',
      };

      await axios.post(
        `${apiBaseUrl}/${apiEndpoints[field]}`,
        { value },
        { withCredentials: true }
      );

      // Update the dropdown options in parent component
      const setterName = `set${field.charAt(0).toUpperCase() + field.slice(1)}Options`;
      if (dropdownOptions[setterName]) {
        dropdownOptions[setterName]((prev) => [...prev, value]);
      }

      // Update the current form field with the new value
      setNewCustomer((prev) => ({ ...prev, [field]: value }));
      closeAddModal(field);
      toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} added successfully.`);
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
    const requiredFields = ['referenceId', 'siteName'];
    const isValid = requiredFields.every((field) => newCustomer[field]);
    
    if (!isValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      // Prepare customer data for API
      const customerData = {
        reference_id: newCustomer.referenceId,
        job_no: newCustomer.jobNo,
        site_name: newCustomer.siteName,
        site_address: newCustomer.siteAddress,
        email: newCustomer.email,
        phone: newCustomer.phone,
        mobile: newCustomer.mobile,
        office_address: newCustomer.officeAddress,
        contact_person_name: newCustomer.contactPersonName,
        designation: newCustomer.designation,
        pin_code: newCustomer.pinCode,
        country: newCustomer.country,
        state: newCustomer.state,
        city: newCustomer.city,
        sector: newCustomer.sector,
        routes: newCustomer.routes,
        branch: newCustomer.branch,
        gst_number: newCustomer.gstNumber,
        pan_number: newCustomer.panNumber,
        handover_date: newCustomer.handoverDate,
        billing_name: newCustomer.billingName,
      };

      // Make API call based on edit or create mode
      if (isEdit) {
        await axios.put(
          `${apiBaseUrl}/edit_customer/${initialData.id}/`, 
          customerData, 
          { withCredentials: true }
        );
        toast.success('Customer updated successfully.');
      } else {
        await axios.post(
          `${apiBaseUrl}/add_customer/`, 
          customerData, 
          { withCredentials: true }
        );
        toast.success('Customer created successfully.');
      }

      // Notify parent component of successful submission
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error(`Error ${isEdit ? 'editing' : 'creating'} customer:`, error.response?.data || error);
      toast.error(
        error.response?.data?.error || 
        `Failed to ${isEdit ? 'update' : 'create'} customer.`
      );
    }
  };

  // Render a standard select input (for fields without add option)
  const renderStandardSelect = (name, label, options) => (
    <div className="form-group">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={newCustomer[name]}
        onChange={handleInputChange}
        className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
      >
        <option value="">Select {label}</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  // Render a select input with add option (for routes and branch)
  const renderSelectWithAdd = (name, label, options) => (
    <div className="form-group">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex">
        <select
          name={name}
          value={newCustomer[name]}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => openAddModal(name)}
          className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Main Form Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <h2 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Customer' : 'Create New Customer'}
          </h2>
          <p className="text-orange-100">
            Fill in all required fields (*) to {isEdit ? 'update' : 'add'} a customer
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Basic Information
              </h3>

              {/* Reference ID */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  REFERENCE ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="referenceId"
                  value={newCustomer.referenceId}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Job No */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  JOB NO
                </label>
                <input
                  type="text"
                  name="jobNo"
                  value={newCustomer.jobNo}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Site Name */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SITE NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={newCustomer.siteName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>

        

               {/* Office Address */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OFFICE ADDRESS
                </label>
                <textarea
                  name="officeAddress"
                  value={newCustomer.officeAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  disabled={newCustomer.sameAsSiteAddress}
                />
              </div>

              {/* Same as Site Address */}
              <div className="form-group flex items-center">
                <input
                  type="checkbox"
                  name="sameAsSiteAddress"
                  checked={newCustomer.sameAsSiteAddress}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Same as Site Address
                </label>
              </div>


                    {/* Site Address */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SITE ADDRESS
                </label>
                <textarea
                  name="siteAddress"
                  value={newCustomer.siteAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

             

              {/* Contact Person Name */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CONTACT PERSON NAME
                </label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={newCustomer.contactPersonName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Designation */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DESIGNATION
                </label>
                <input
                  type="text"
                  name="designation"
                  value={newCustomer.designation}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Column - Contact & Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Contact & Location
              </h3>

              {/* Email */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PHONE
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Mobile (SMS Notification) */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MOBILE (SMS NOTIFICATION)
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={newCustomer.mobile}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Pin Code */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN CODE
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={newCustomer.pinCode}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Country */}
              {renderStandardSelect('country', 'Country', dropdownOptions.countryOptions)}

              {/* Province/State */}
              {renderStandardSelect('state', 'State', dropdownOptions.stateOptions)}

              {/* City */}
              {renderStandardSelect('city', 'City', dropdownOptions.cityOptions)}

              {/* Sector */}
              {renderStandardSelect('sector', 'Sector', dropdownOptions.sectorOptions)}

              {/* Routes */}
              {renderSelectWithAdd('routes', 'Route', dropdownOptions.routesOptions)}

              {/* Branch */}
              {renderSelectWithAdd('branch', 'Branch', dropdownOptions.branchOptions)}

              {/* GST Number */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST NUMBER
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={newCustomer.gstNumber}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* PAN Number */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN NUMBER
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={newCustomer.panNumber}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Handover Date */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HANDOVER DATE
                </label>
                <input
                  type="date"
                  name="handoverDate"
                  value={newCustomer.handoverDate}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Billing Name */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BILLING NAME
                </label>
                <input
                  type="text"
                  name="billingName"
                  value={newCustomer.billingName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
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
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
          >
            {isEdit ? 'Update Customer' : 'Create Customer'}
          </button>
        </div>
      </div>

      {/* Secondary Modals for Adding Options (only for routes and branch) */}
      {Object.entries(modalState).map(([field, { isOpen, value }]) => (
        isOpen && (
          <div key={field} className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
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

export default CustomerForm;