import React, { useState, useEffect } from 'react';
import { Edit, MoreVertical, Plus, Search, ChevronDown, ChevronUp, Sliders, List, Trash2 } from 'lucide-react';
import CustomerForm from '../Dashboard/Forms/CustomerForm';
import { toast } from 'react-toastify';

const CustomerRow = ({ 
  customer, 
  onEdit,
  expandedRow,
  toggleExpand,
  isSelected,
  onSelect
}) => {
  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 whitespace-nowrap">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onSelect}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
        </td>
        <td className="px-4 py-3 whitespace-nowrap">{customer.siteId}</td>
        <td className="px-4 py-3 hidden sm:table-cell whitespace-nowrap truncate max-w-[150px]">
          {customer.siteName}
        </td>
        
        <td className="px-4 py-3 sm:hidden text-right">
          <button 
            onClick={toggleExpand}
            className="text-orange-500 p-1 rounded-full hover:bg-orange-50"
          >
            {expandedRow === customer.siteId ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </td>
        
        <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap truncate max-w-[200px]">
          {customer.siteAddress}
        </td>
        <td className="px-4 py-3 hidden lg:table-cell whitespace-nowrap">{customer.mobile}</td>
        <td className="px-4 py-3 hidden sm:table-cell whitespace-nowrap">{customer.contracts}</td>
        <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap">{customer.noOfLifts}</td>
        <td className="px-4 py-3 hidden lg:table-cell whitespace-nowrap">{customer.service}</td>
        <td className="px-4 py-3 hidden xl:table-cell whitespace-nowrap">{customer.generatedTickets}</td>
        <td className="px-4 py-3 hidden xl:table-cell whitespace-nowrap">{customer.invoices}</td>
        <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap">{customer.routes}</td>
        
      <td className="px-4 py-3 whitespace-nowrap flex justify-end space-x-2">
        {/* Edit Button - No background color */}
        <button 
          onClick={() => onEdit(customer)}
          className="text-orange-500 hover:text-orange-700 p-1 transition-colors"
          title="Edit"
        >
          <Edit size={18} />
        </button>

        {/* Delete Button with Lucide Trash2 icon */}
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this customer?')) {
              // Handle delete logic here
              onDelete(customer.id);
            }
          }}
          className="text-red-500 hover:text-red-700 p-1 transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </td>
      </tr>
      
      {expandedRow === customer.siteId && (
        <tr className="sm:hidden bg-gray-50">
          <td colSpan="100" className="px-4 py-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Site Name</p>
                <p>{customer.siteName}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Address</p>
                <p className="truncate">{customer.siteAddress}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Mobile</p>
                <p>{customer.mobile}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Contracts</p>
                <p>{customer.contracts}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">No. of Lifts</p>
                <p>{customer.noOfLifts}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Service</p>
                <p>{customer.service}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Tickets</p>
                <p>{customer.generatedTickets}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Invoices</p>
                <p>{customer.invoices}</p>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-medium text-gray-500">Routes</p>
                <p>{customer.routes}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const Customers = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);
  const [filters, setFilters] = useState({
    routes: '',
    branch: '',
    city: '',
    sector: '',
    search: ''
  });
  
  // Sample customer data
  const sampleCustomers = [
    {
      id: "AL237",
      siteId: "AL237",
      siteName: "Mr.Elangovan",
      siteAddress: "No:1/16,4th Main Road,Kodungaiyur, Chennai-600118",
      email: "example@example.com",
      phone: "9876543210",
      mobile: "9876543210",
      contracts: "2",
      noOfLifts: "3",
      service: "Monthly",
      generatedTickets: "5",
      invoices: "2",
      routes: "Chennai",
      officeAddress: "Same as above",
      contactPersonName: "Mr. Elangovan",
      designation: "Manager",
      pinCode: "600118",
      country: "India",
      state: "Tamil Nadu",
      city: "Chennai",
      sector: "Residential",
      branch: "Chennai",
      gstNumber: "22AAAAA0000A1Z5",
      panNumber: "AAAAA1234A",
      handoverDate: "2023-01-01",
      billingName: "Mr. Elangovan",
      referenceId: "REF123",
      jobNo: "JOB456"
    },
    {
      id: "AL238",
      siteId: "AL238",
      siteName: "Tech Park",
      siteAddress: "IT Highway, Bangalore-560001",
      email: "tech@example.com",
      phone: "9876543211",
      mobile: "9876543211",
      contracts: "3",
      noOfLifts: "5",
      service: "Quarterly",
      generatedTickets: "8",
      invoices: "3",
      routes: "Bangalore",
      officeAddress: "Tech Park Office",
      contactPersonName: "Ms. Sharma",
      designation: "Director",
      pinCode: "560001",
      country: "India",
      state: "Karnataka",
      city: "Bangalore",
      sector: "Commercial",
      branch: "Bangalore",
      gstNumber: "22BBBBB0000B1Z5",
      panNumber: "BBBBB1234B",
      handoverDate: "2023-02-15",
      billingName: "Tech Park Inc",
      referenceId: "REF124",
      jobNo: "JOB457"
    }
  ];

  const [customers, setCustomers] = useState(sampleCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(sampleCustomers);

  const [dropdownOptions, setDropdownOptions] = useState({
    countryOptions: ['India', 'USA', 'UK'],
    stateOptions: ['Tamil Nadu', 'Karnataka', 'Maharashtra'],
    cityOptions: ['Chennai', 'Bangalore', 'Mumbai'],
    sectorOptions: ['Residential', 'Commercial', 'Industrial'],
    routesOptions: ['Chennai', 'Bangalore', 'Mumbai'],
    branchOptions: ['Chennai', 'Bangalore', 'Mumbai'],
  });

  const apiBaseUrl = 'https://your-api-endpoint.com/api';

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = customers.filter(customer => {
      return (
        (filters.routes === '' || customer.routes === filters.routes) &&
        (filters.branch === '' || customer.branch === filters.branch) &&
        (filters.city === '' || customer.city === filters.city) &&
        (filters.sector === '' || customer.sector === filters.sector) &&
        (filters.search === '' || 
          customer.siteName.toLowerCase().includes(filters.search.toLowerCase()) ||
          customer.siteId.toLowerCase().includes(filters.search.toLowerCase()) ||
          customer.mobile.includes(filters.search))
      );
    });
    setFilteredCustomers(filtered);
  }, [filters, customers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filtering is handled automatically by the useEffect
  };

  const resetFilters = () => {
    setFilters({
      routes: '',
      branch: '',
      city: '',
      sector: '',
      search: ''
    });
  };

  // Customer selection handlers
  const toggleCustomerSelection = (customerId) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAllCustomers = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    }
  };

  // Bulk action handlers
  const handleBulkAssignBranch = () => {
    if (selectedCustomers.length === 0) {
      toast.error('Please select at least one customer');
      return;
    }
    toast.success(`Branch assigned to ${selectedCustomers.length} customers`);
  };

  const handleBulkAction = (action) => {
    if (selectedCustomers.length === 0) {
      toast.error('Please select at least one customer');
      return;
    }
    toast.success(`${action} performed on ${selectedCustomers.length} customers`);
  };

  // Customer form handlers
  const handleAddNewCustomer = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer) => {
    setEditData(customer);
    setShowForm(true);
  };

  const handleFormSubmitSuccess = (newCustomer) => {
    if (editData) {
      setCustomers(customers.map(c => 
        c.id === editData.id ? { ...c, ...newCustomer } : c
      ));
      toast.success('Customer updated successfully');
    } else {
      setCustomers([...customers, { ...newCustomer, id: `CUST${Date.now()}` }]);
      toast.success('Customer added successfully');
    }
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  const updateDropdownOptions = (field, newValue) => {
    setDropdownOptions(prev => ({
      ...prev,
      [`${field}Options`]: [...prev[`${field}Options`], newValue]
    }));
  };

  const toggleExpandRow = (siteId) => {
    setExpandedRow(expandedRow === siteId ? null : siteId);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Customers</h1>
        
        {/* Action Buttons Row - In specified order */}
        <div className="flex flex-wrap justify-end gap-2 mt-2 sm:gap-3 sm:flex-nowrap">
          {/* Bulk Assign Branch */}
          <button 
            onClick={handleBulkAssignBranch}
            className="flex items-center bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            <Sliders size={16} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Bulk Assign Branch</span>
            <span className="sm:hidden">Assign</span>
          </button>
          
          {/* Bulk Action Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowBulkMenu(!showBulkMenu)}
              className="flex items-center bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <List size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Bulk Action</span>
              <span className="sm:hidden">Action</span>
            </button>
            
            {showBulkMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Export Selected
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Delete Selected
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Three Dot Menu Button */}
          <div className="relative">
            <button 
              onClick={() => setShowThreeDotMenu(!showThreeDotMenu)}
              className="flex items-center justify-center bg-white text-gray-700 p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <MoreVertical size={16} />
            </button>
            
            {showThreeDotMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Import Customers
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Export All
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add New Customer */}
          <button 
            onClick={handleAddNewCustomer}
            className="flex items-center bg-orange-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            <Plus size={16} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add New Customer</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-3">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 w-full">
          <select 
            name="routes"
            value={filters.routes}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap"
          >
            <option value="">All Routes</option>
            {dropdownOptions.routesOptions.map(route => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
          <select 
            name="branch"
            value={filters.branch}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap"
          >
            <option value="">All Branch</option>
            {dropdownOptions.branchOptions.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <select 
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap"
          >
            <option value="">All City</option>
            {dropdownOptions.cityOptions.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select 
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base whitespace-nowrap"
          >
            <option value="">All Sector</option>
            {dropdownOptions.sectorOptions.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          <div className="flex space-x-2">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search..."
              className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition text-sm sm:text-base flex-1"
            />
            <button 
              type="submit"
              className="bg-orange-500 text-white p-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
            >
              <Search size={16} />
            </button>
            <button 
              type="button"
              onClick={resetFilters}
              className="bg-gray-200 text-gray-700 p-2 rounded-lg shadow-sm hover:bg-gray-300 transition-colors flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      
      {/* Table container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={selectAllCustomers}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Site ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:table-cell">Site Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap sm:hidden"></th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden md:table-cell">Address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden lg:table-cell">Mobile</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:table-cell">Contracts</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden md:table-cell">No.of Lifts</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden lg:table-cell">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden xl:table-cell">Tickets</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden xl:table-cell">Invoices</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap hidden md:table-cell">Routes</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <CustomerRow 
                    key={customer.id}
                    customer={customer}
                    onEdit={handleEditCustomer}
                    expandedRow={expandedRow}
                    toggleExpand={() => toggleExpandRow(customer.siteId)}
                    isSelected={selectedCustomers.includes(customer.id)}
                    onSelect={() => toggleCustomerSelection(customer.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Form Modal */}
      {showForm && (
        <CustomerForm
          isEdit={!!editData}
          initialData={editData || {}}
          onClose={handleCloseForm}
          onSubmitSuccess={handleFormSubmitSuccess}
          apiBaseUrl={apiBaseUrl}
          dropdownOptions={{
            ...dropdownOptions,
            setCountryOptions: (value) => updateDropdownOptions('country', value),
            setStateOptions: (value) => updateDropdownOptions('state', value),
            setCityOptions: (value) => updateDropdownOptions('city', value),
            setSectorOptions: (value) => updateDropdownOptions('sector', value),
            setRoutesOptions: (value) => updateDropdownOptions('routes', value),
            setBranchOptions: (value) => updateDropdownOptions('branch', value),
          }}
        />
      )}
    </div>
  );
};

export default Customers;