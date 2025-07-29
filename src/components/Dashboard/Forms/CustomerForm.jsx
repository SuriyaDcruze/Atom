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
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    state: { isOpen: false, value: '' },
    city: { isOpen: false, value: '' },
    routes: { isOpen: false, value: '' },
    branch: { isOpen: false, value: '' },
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));

    if (name === 'sameAsSiteAddress' && checked) {
      setFormData(prev => ({ ...prev, officeAddress: prev.siteAddress }));
    }
  };

  // Open modal to add new dropdown option
  const openAddModal = (field) => {
    setModalState(prev => ({ 
      ...prev, 
      [field]: { ...prev[field], isOpen: true } 
    }));
  };

  // Close modal to add new dropdown option
  const closeAddModal = (field) => {
    setModalState(prev => ({ 
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
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      const apiEndpoints = {
        state: 'add-province-state/',
        city: 'add-city/',
        routes: 'add-route/',
        branch: 'add-branch/',
      };

      const response = await axios.post(
        `${apiBaseUrl}/sales/${apiEndpoints[field]}`,
        { value: value }, // Changed from { name: value } to { value: value }
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update dropdown options in parent component
      const setterName = `set${field.charAt(0).toUpperCase() + field.slice(1)}Options`;
      if (dropdownOptions[setterName]) {
        dropdownOptions[setterName](prev => [...prev, value]);
      }

      // Update form field with new value
      setFormData(prev => ({ ...prev, [field]: value }));
      closeAddModal(field);
      toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} added successfully.`);
    } catch (error) {
      console.error(`Error adding ${field}:`, error);
      toast.error(
        error.response?.data?.message || 
        `Failed to add ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.referenceId || !formData.siteName) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      const customerData = {
        reference_id: formData.referenceId,
        job_no: formData.jobNo,
        site_name: formData.siteName,
        site_address: formData.siteAddress,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.mobile,
        office_address: formData.officeAddress,
        contact_person_name: formData.contactPersonName,
        designation: formData.designation,
        pin_code: formData.pinCode,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        sector: formData.sector,
        routes: formData.routes,
        branch: formData.branch,
        gst_number: formData.gstNumber,
        pan_number: formData.panNumber,
        handover_date: formData.handoverDate,
        billing_name: formData.billingName,
      };

      if (isEdit) {
        await axios.put(
          `${apiBaseUrl}/sales/edit-customer/${initialData.id}/`, 
          customerData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Customer updated successfully.');
      } else {
        await axios.post(
          `${apiBaseUrl}/sales/add-customer/`, 
          customerData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Customer created successfully.');
      }

      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} customer:`, error);
      toast.error(
        error.response?.data?.message || 
        `Failed to ${isEdit ? 'update' : 'create'} customer.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Render input field
  const renderInput = (name, label, type = 'text', required = false) => (
    <div className="form-group mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
        required={required}
        disabled={loading}
      />
    </div>
  );

  // Render textarea field
  const renderTextarea = (name, label, rows = 3) => (
    <div className="form-group mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        rows={rows}
        className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
        disabled={loading || (name === 'officeAddress' && formData.sameAsSiteAddress)}
      />
    </div>
  );

  // Render select field with add option
  const renderSelectWithAdd = (name, label, options, required = false) => (
    <div className="form-group mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex">
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all appearance-none bg-white"
          disabled={loading}
          required={required}
        >
          <option value="">Select {label}</option>
          {options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => openAddModal(name)}
          className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
          disabled={loading}
        >
          +
        </button>
      </div>
    </div>
  );

  // Render checkbox field
  const renderCheckbox = (name, label) => (
    <div className="form-group mb-4 flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={formData[name]}
        onChange={handleInputChange}
        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
        disabled={loading}
      />
      <label className="ml-2 block text-sm text-gray-700">{label}</label>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Main Form Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <h2 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Customer' : 'Create New Customer'}
          </h2>
          <p className="text-orange-100">
            {isEdit ? 'Update customer details' : 'Fill in all required fields (*) to add a customer'}
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

              {renderInput('referenceId', 'REFERENCE ID', 'text', true)}
              {renderInput('jobNo', 'JOB NO')}
              {renderInput('siteName', 'SITE NAME', 'text', true)}
              {renderTextarea('siteAddress', 'SITE ADDRESS')}
              {renderTextarea('officeAddress', 'OFFICE ADDRESS')}
              {renderCheckbox('sameAsSiteAddress', 'Same as Site Address')}
              {renderInput('contactPersonName', 'CONTACT PERSON NAME')}
              {renderInput('designation', 'DESIGNATION')}
            </div>

            {/* Right Column - Contact & Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Contact & Location
              </h3>

              {renderInput('email', 'EMAIL', 'email')}
              {renderInput('phone', 'PHONE', 'tel')}
              {renderInput('mobile', 'MOBILE (SMS NOTIFICATION)', 'tel')}
              {renderInput('pinCode', 'PIN CODE')}
              {renderInput('country', 'COUNTRY')}
              {renderSelectWithAdd('state', 'STATE', dropdownOptions.stateOptions)}
              {renderSelectWithAdd('city', 'CITY', dropdownOptions.cityOptions)}
              {renderSelectWithAdd('sector', 'SECTOR', dropdownOptions.sectorOptions)}
              {renderSelectWithAdd('routes', 'ROUTE', dropdownOptions.routesOptions)}
              {renderSelectWithAdd('branch', 'BRANCH', dropdownOptions.branchOptions)}
              {renderInput('gstNumber', 'GST NUMBER')}
              {renderInput('panNumber', 'PAN NUMBER')}
              {renderInput('handoverDate', 'HANDOVER DATE', 'date')}
              {renderInput('billingName', 'BILLING NAME')}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-md ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEdit ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              isEdit ? 'Update Customer' : 'Create Customer'
            )}
          </button>
        </div>
      </div>

      {/* Modals for adding new options */}
      {Object.entries(modalState).map(([field, { isOpen, value }]) => (
        isOpen && (
          <div key={field} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Add New {field.charAt(0).toUpperCase() + field.slice(1)}
              </h3>
              <input
                type="text"
                value={value}
                onChange={(e) => setModalState(prev => ({ 
                  ...prev, 
                  [field]: { ...prev[field], value: e.target.value } 
                }))}
                className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                placeholder={`Enter new ${field}`}
                disabled={loading}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => closeAddModal(field)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddOption(field)}
                  className={`px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add'}
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