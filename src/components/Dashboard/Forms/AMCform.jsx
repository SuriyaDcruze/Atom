import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Edit, Trash2 } from 'lucide-react';

const AMCForm = ({
  isEdit = false,
  initialData = {},
  onClose,
  onSubmitSuccess,
  apiBaseUrl,
  dropdownOptions = {},
}) => {
  // Form state
  const [newAMC, setNewAMC] = useState({
    customer: '',
    referenceId: '',
    amc: '',
    invoiceFrequency: '',
    amcType: '',
    paymentTerms: '',
    startDate: '',
    endDate: '',
    equipmentNo: '',
    notes: '',
    isGenerateContractNow: false,
    noOfServices: '',
    files: null,
    ...initialData,
  });

  // Modal state for adding/editing/deleting dropdown options
  const [modalState, setModalState] = useState({
    amcType: { isOpen: false, value: '', isEditing: false, editId: null },
    paymentTerms: { isOpen: false, value: '', isEditing: false, editId: null },
  });

  // State for existing options
  const [existingAmcTypes, setExistingAmcTypes] = useState([]);
  const [existingPaymentTerms, setExistingPaymentTerms] = useState([]);

  // Fetch existing AMC Types and Payment Terms
  const fetchOptions = async (field) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please log in to continue.');
        window.location.href = '/login';
        return;
      }
      const endpoint = field === 'amcType' ? 'amc-types' : 'payment-terms';
      const response = await axios.get(`${apiBaseUrl}/amc/${endpoint}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (field === 'amcType') {
        setExistingAmcTypes(response.data);
      } else {
        setExistingPaymentTerms(response.data);
      }
    } catch (error) {
      console.error(`Error fetching ${field}:`, error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      } else {
        toast.error(`Failed to fetch ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`);
      }
    }
  };

  // Fetch options on component mount
  useEffect(() => {
    fetchOptions('amcType');
    fetchOptions('paymentTerms');
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setNewAMC((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = files[0];
      if (file && file.size > 1024 * 1024) { // 1 MB limit
        toast.error('File size exceeds 1 MB limit.');
        return;
      }
      setNewAMC((prev) => ({ ...prev, [name]: file }));
    } else {
      setNewAMC((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Open modal to add/edit dropdown option
  const openAddModal = (field, isEditing = false, editId = null, editValue = '') => {
    setModalState((prev) => ({
      ...prev,
      [field]: { isOpen: true, value: editValue, isEditing, editId },
    }));
  };

  // Close modal
  const closeAddModal = (field) => {
    setModalState((prev) => ({
      ...prev,
      [field]: { isOpen: false, value: '', isEditing: false, editId: null },
    }));
  };

  // Handle adding or editing dropdown option
  const handleAddOption = async (field) => {
    const value = modalState[field].value.trim();
    if (!value) {
      toast.error(`Please enter a ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please log in to continue.');
        window.location.href = '/login';
        return;
      }
      const apiEndpoints = {
        amcType: 'amc-types',
        paymentTerms: 'payment-terms',
      };
      const isEditing = modalState[field].isEditing;
      const editId = modalState[field].editId;

      if (isEditing) {
        // Edit existing option
        await axios.put(
          `${apiBaseUrl}/amc/${apiEndpoints[field]}/${editId}/`,
          { name: value },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} updated successfully.`);
      } else {
        // Add new option
        await axios.post(
          `${apiBaseUrl}/amc/${apiEndpoints[field]}/add/`,
          { name: value },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNewAMC((prev) => ({ ...prev, [field]: value }));
        toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} added successfully.`);
      }

      // Refresh options
      fetchOptions(field);
      dropdownOptions[`set${field.charAt(0).toUpperCase() + field.slice(1)}Options`](
        [...(field === 'amcType' ? existingAmcTypes : existingPaymentTerms)
          .filter(item => !isEditing || item.id !== editId)
          .map(item => item.name), isEditing ? value : value]
      );
      closeAddModal(field);
      onSubmitSuccess();
    } catch (error) {
      console.error(`Error ${isEditing ? 'editing' : 'adding'} ${field}:`, error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      } else {
        toast.error(
          error.response?.data?.error ||
          `Failed to ${isEditing ? 'update' : 'add'} ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`
        );
      }
    }
  };

  // Handle deleting dropdown option
  const handleDeleteOption = async (field, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please log in to continue.');
        window.location.href = '/login';
        return;
      }
      const apiEndpoints = {
        amcType: 'amc-types',
        paymentTerms: 'payment-terms',
      };
      await axios.delete(
        `${apiBaseUrl}/amc/${apiEndpoints[field]}/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} deleted successfully.`);
      fetchOptions(field);
      dropdownOptions[`set${field.charAt(0).toUpperCase() + field.slice(1)}Options`](
        (field === 'amcType' ? existingAmcTypes : existingPaymentTerms)
          .filter(item => item.id !== id)
          .map(item => item.name)
      );
    } catch (error) {
      console.error(`Error deleting ${field}:`, error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      } else {
        toast.error(
          error.response?.data?.error ||
          `Failed to delete ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}.`
        );
      }
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const requiredFields = ['referenceId', 'startDate', 'endDate'];
    const isValid = requiredFields.every((field) => newAMC[field]);

    if (!isValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please log in to continue.');
        window.location.href = '/login';
        return;
      }
      // Fetch reference data to map values to IDs
      const [customers, amcTypes, paymentTerms] = await Promise.all([
        axios.get(`${apiBaseUrl}/sales/customer-list/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/amc/amc-types/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiBaseUrl}/amc/payment-terms/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Prepare form data for API
      const formData = new FormData();
      formData.append('customer', customers.data.find(c => c.site_name === newAMC.customer)?.id || null);
      formData.append('reference_id', newAMC.referenceId);
      formData.append('amc', newAMC.amc);
      formData.append('invoice_frequency', dropdownOptions.invoiceFrequencyOptions.find(f => f === newAMC.invoiceFrequency) || null);
      formData.append('amc_type', amcTypes.data.find(t => t.name === newAMC.amcType)?.id || null);
      formData.append('payment_terms', paymentTerms.data.find(p => p.name === newAMC.paymentTerms)?.id || null);
      formData.append('start_date', newAMC.startDate);
      formData.append('end_date', newAMC.endDate);
      formData.append('equipment_no', newAMC.equipmentNo);
      formData.append('notes', newAMC.notes);
      formData.append('is_generate_contract_now', newAMC.isGenerateContractNow);
      formData.append('no_of_services', newAMC.noOfServices);
      if (newAMC.files) {
        formData.append('files', newAMC.files);
      }

      // Make API call based on edit or create mode
      if (isEdit) {
        await axios.put(
          `${apiBaseUrl}/amc/amc-update/${initialData.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('AMC updated successfully.');
      } else {
        await axios.post(
          `${apiBaseUrl}/amc/amc-add/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('AMC created successfully.');
      }

      // Notify parent component of successful submission
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error(`Error ${isEdit ? 'editing' : 'creating'} AMC:`, error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      } else {
        toast.error(
          error.response?.data?.error ||
          `Failed to ${isEdit ? 'update' : 'create'} AMC.`
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Main Form Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2D3A6B] to-[#243158] p-6">
          <h2 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit AMC' : 'Create New AMC'}
          </h2>
          <p className="text-white">
            Fill in all required fields (*) to {isEdit ? 'update' : 'add'} an AMC
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - General Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                General Information
              </h3>

              {/* Customer */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer
                </label>
                <select
                  name="customer"
                  value={newAMC.customer}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select Customer</option>
                  {dropdownOptions.customerOptions?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reference ID */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="referenceId"
                  value={newAMC.referenceId}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>

              {/* AMC */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AMC
                </label>
                <input
                  type="text"
                  name="amc"
                  value={newAMC.amc}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Invoice Frequency */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Frequency
                </label>
                <select
                  name="invoiceFrequency"
                  value={newAMC.invoiceFrequency}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select Frequency</option>
                  {dropdownOptions.invoiceFrequencyOptions?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* AMC Type */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AMC Type
                </label>
                <div className="flex">
                  <select
                    name="amcType"
                    value={newAMC.amcType}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Type</option>
                    {dropdownOptions.amcTypeOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => openAddModal('amcType')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:from-blue-600 hover:to-blue-700 transition-all text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Payment Terms */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms
                </label>
                <div className="flex">
                  <select
                    name="paymentTerms"
                    value={newAMC.paymentTerms}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Terms</option>
                    {dropdownOptions.paymentTermsOptions?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => openAddModal('paymentTerms')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:from-blue-600 hover:to-blue-700 transition-all text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Contract Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Contract Details
              </h3>

              {/* Start Date */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={newAMC.startDate}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>

              {/* End Date */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={newAMC.endDate}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Upload Files */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Files (Max 1 MB)
                </label>
                <input
                  type="file"
                  name="files"
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Equipment No */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment No
                </label>
                <input
                  type="text"
                  name="equipmentNo"
                  value={newAMC.equipmentNo}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={newAMC.notes}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  rows="4"
                />
              </div>

              {/* Is Generate Contract Now */}
              <div className="form-group">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="isGenerateContractNow"
                    checked={newAMC.isGenerateContractNow}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  Generate Contract Now
                </label>
              </div>

              {/* No of Services */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No of Services (Routine Services)
                </label>
                <input
                  type="number"
                  name="noOfServices"
                  value={newAMC.noOfServices}
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
            className="px-6 py-2.5 bg-gradient-to-r from-[#2D3A6B] to-[#243158] rounded-lg text-white font-medium hover:from-[#213066] hover:to-[#182755] transition-all duration-200 shadow-md"
          >
            {isEdit ? 'Update AMC' : 'Create AMC'}
          </button>
        </div>
      </div>

      {/* Secondary Modals for Adding/Editing/Deleting AMC Type and Payment Terms */}
      {Object.entries(modalState).map(([field, { isOpen, value, isEditing, editId }]) => (
        isOpen && (
          <div key={field} className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {isEditing ? `Edit ${field.replace(/([A-Z])/g, ' $1').trim()}` : `Add New ${field.replace(/([A-Z])/g, ' $1').trim()}`}
              </h3>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  setModalState((prev) => ({
                    ...prev,
                    [field]: { ...prev[field], value: e.target.value },
                  }))
                }
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mb-4"
                placeholder={`Enter new ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`}
              />
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Existing {field.replace(/([A-Z])/g, ' $1').trim()}s</h4>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(field === 'amcType' ? existingAmcTypes : existingPaymentTerms).length > 0 ? (
                        (field === 'amcType' ? existingAmcTypes : existingPaymentTerms).map((option) => (
                          <tr key={option.id} className="border-t">
                            <td className="p-2">{option.name}</td>
                            <td className="p-2 text-right">
                              <button
                                onClick={() => openAddModal(field, true, option.id, option.name)}
                                className="text-blue-500 hover:text-blue-700 mr-2"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteOption(field, option.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="p-2 text-center text-gray-500">
                            No {field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}s found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => closeAddModal(field)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddOption(field)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                >
                  {isEditing ? `Update ${field.replace(/([A-Z])/g, ' $1').trim()}` : `Add ${field.replace(/([A-Z])/g, ' $1').trim()}`}
                </button>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default AMCForm;