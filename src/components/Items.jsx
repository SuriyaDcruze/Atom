import { useState } from 'react';
import { Link } from 'react-router-dom';

const Items = () => {
  const [items] = useState([
    { partNo: 277951, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
    { partNo: 277952, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
    { partNo: 277953, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
    { partNo: 277954, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
    { partNo: 277955, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
    { partNo: 277956, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
    { partNo: 277957, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
    { partNo: 277958, name: 'Inspection Box', type: 'Nos', salePrice: 0, purchasePrice: 0, taxPreference: 'Taxable', tax: 'GST18(18%)' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Items</h1>
        <div className="space-x-4">
          {/* <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 w-full md:w-auto mb-2 md:mb-0">
            Bulk Actions
          </button> */}
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 w-full md:w-auto">
            New Item
          </button>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <th className="p-4 text-left">Part No</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Units</th>
                <th className="p-4 text-left">Sale Price</th>
                <th className="p-4 text-left">Purchase Price</th>
                <th className="p-4 text-left">Tax Preference</th>
                <th className="p-4 text-left">Tax</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.partNo} className="border-t hover:bg-gray-50 transition duration-200">
                  <td className="p-4 text-gray-800">{item.partNo}</td>
                  <td className="p-4 text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-800">{item.type}</td>
                  <td className="p-4 text-gray-800">{item.units || 'N/A'}</td>
                  <td className="p-4 text-gray-800">{item.salePrice}</td>
                  <td className="p-4 text-gray-800">{item.purchasePrice}</td>
                  <td className="p-4 text-gray-800">{item.taxPreference}</td>
                  <td className="p-4 text-gray-800">{item.tax}</td>
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
          {currentItems.map((item) => (
            <div key={item.partNo} className="border-b p-4">
              <div className="text-gray-800 font-semibold">Part No: {item.partNo}</div>
              <div className="text-gray-800">Name: {item.name}</div>
              <div className="text-gray-800">Type: {item.type}</div>
              <div className="text-gray-800">Units: {item.units || 'N/A'}</div>
              <div className="text-gray-800">Sale Price: {item.salePrice}</div>
              <div className="text-gray-800">Purchase Price: {item.purchasePrice}</div>
              <div className="text-gray-800">Tax Preference: {item.taxPreference}</div>
              <div className="text-gray-800">Tax: {item.tax}</div>
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
          {/* <span>Showing {indexOfFirstItem + 1}-{indexOfLastItem > items.length ? items.length : indexOfLastItem} of {items.length}</span> */}
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

export default Items;