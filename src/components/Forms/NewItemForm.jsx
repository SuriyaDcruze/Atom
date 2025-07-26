import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

const NewItemForm = ({ onCancel, brandOptions, floorOptions, typeOptions, doorTypeOptions, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partNo: '',
    name: '',
    type: '',
    salePrice: 0,
    purchasePrice: 0,
    taxPreference: 'Taxable',
    tax: 'GST18(18%)',
    floorID: '',
    brand: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Placeholder for fetching initial options if not passed as props
    if (!brandOptions || !floorOptions || !typeOptions || !doorTypeOptions) {
      const fetchOptions = async () => {
        try {
          const [brands, floors, types, doorTypes] = await Promise.all([
            axios.get(`${apiBaseUrl}/brands/`, { withCredentials: true }),
            axios.get(`${apiBaseUrl}/floor-ids/`, { withCredentials: true }),
            axios.get(`${apiBaseUrl}/lift-types/`, { withCredentials: true }),
            axios.get(`${apiBaseUrl}/door-types/`, { withCredentials: true }),
          ]);
          setFormData((prev) => ({
            ...prev,
            brandOptions: brands.data.map(item => item.value),
            floorOptions: floors.data.map(item => item.value),
            typeOptions: types.data.map(item => item.value),
            doorTypeOptions: doorTypes.data.map(item => item.value),
          }));
        } catch (error) {
          console.error('Error fetching options:', error);
          toast.error('Failed to load options.');
        }
      };
      fetchOptions();
    }
  }, [brandOptions, floorOptions, typeOptions, doorTypeOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salePrice' || name === 'purchasePrice' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.partNo.trim()) newErrors.partNo = 'Part Number is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.salePrice < 0) newErrors.salePrice = 'Sale Price cannot be negative';
    if (formData.purchasePrice < 0) newErrors.purchasePrice = 'Purchase Price cannot be negative';
    if (!formData.floorID) newErrors.floorID = 'Floor ID is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const [brands, floors] = await Promise.all([
        axios.get(`${apiBaseUrl}/brands/`, { withCredentials: true }),
        axios.get(`${apiBaseUrl}/floor-ids/`, { withCredentials: true }),
      ]);

      const liftData = {
        lift_code: formData.partNo,
        name: formData.name,
        price: formData.salePrice,
        floor_id: floors.data.find(f => f.value === formData.floorID)?.id,
        brand: brands.data.find(b => b.value === formData.brand)?.id,
        load_kg: formData.purchasePrice,
        lift_type: typeOptions.find(t => t === formData.type)?.id || null,
        door_type: doorTypeOptions.find(d => d === formData.doorType)?.id || null,
      };

      const response = await axios.post(`${apiBaseUrl}/add_lift/`, liftData, { withCredentials: true });
      toast.success(response.data.message || 'Item created successfully.');
      if (onSubmit) onSubmit(liftData);
      else navigate('/items');
    } catch (error) {
      console.error('Error creating item:', error.response?.data || error);
      toast.error(error.response?.data?.error || 'Failed to create item.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    setFormData({
      partNo: '',
      name: '',
      type: '',
      salePrice: 0,
      purchasePrice: 0,
      taxPreference: 'Taxable',
      tax: 'GST18(18%)',
      floorID: '',
      brand: '',
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">New Item</h1>
      <div className="bg-white rounded-xl  w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <h2 className="text-2xl font-bold text-white">Create New Item</h2>
          <p className="text-orange-100">Fill in all required fields (*) to add an item</p>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Essential Information</h3>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Part Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="partNo"
                    value={formData.partNo}
                    onChange={handleChange}
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    required
                  />
                  {errors.partNo && <p className="text-red-500 text-sm mt-1">{errors.partNo}</p>}
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor ID <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select
                      name="floorID"
                      value={formData.floorID}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                      required
                    >
                      <option value="">Select Floor</option>
                      {(floorOptions || []).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {/* Add floor logic */ }}
                      className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                    >
                      +
                    </button>
                  </div>
                  {errors.floorID && <p className="text-red-500 text-sm mt-1">{errors.floorID}</p>}
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                      required
                    >
                      <option value="">Select Brand</option>
                      {(brandOptions || []).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {/* Add brand logic */ }}
                      className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                    >
                      +
                    </button>
                  </div>
                  {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pricing & Details</h3>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleChange}
                      className="block w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      step="0.01"
                      required
                    />
                  </div>
                  {errors.salePrice && <p className="text-red-500 text-sm mt-1">{errors.salePrice}</p>}
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleChange}
                      className="block w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      step="0.01"
                      required
                    />
                  </div>
                  {errors.purchasePrice && <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>}
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <div className="flex">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                    >
                      <option value="">Select Type</option>
                      {(typeOptions || []).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {/* Add type logic */ }}
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
                      value={formData.doorType}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2.5 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none bg-white"
                    >
                      <option value="">Select Door Type</option>
                      {(doorTypeOptions || []).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {/* Add door type logic */ }}
                      className="bg-gray-100 px-3 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Preference</label>
                  <select
                    name="taxPreference"
                    value={formData.taxPreference}
                    onChange={handleChange}
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  >
                    <option value="Taxable">Taxable</option>
                    <option value="Non-Taxable">Non-Taxable</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
                  <select
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  >
                    <option value="GST18(18%)">GST18(18%)</option>
                    <option value="GST5(5%)">GST5(5%)</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
              >
                {loading ? 'Saving...' : 'Create Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewItemForm;