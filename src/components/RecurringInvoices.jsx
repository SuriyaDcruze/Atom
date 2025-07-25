import React, { useState } from 'react';
import { Plus, FileText, Calendar, RefreshCw, User, CheckCircle2, MoreVertical } from 'lucide-react';

const RecurringInvoices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const recurringInvoices = [
    {
      customerName: 'TEST: 001-AL000',
      profileName: 'Test',
      frequency: 'Week',
      lastInvoiceDate: '13.02.2025',
      nextInvoiceDate: '20.02.2025',
      status: 'ACTIVE',
      amount: 'INR. 1,286.00'
    }
    // Add more recurring invoices as needed
  ];

  const statusColors = {
    ACTIVE: 'bg-green-100 text-green-800',
    PAUSED: 'bg-yellow-100 text-yellow-800',
    CANCELLED: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Recurring Invoices</h1>
          
          <button className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition duration-200 mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Create Recurring Invoice
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recurring invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-7 bg-gray-100 p-3 font-medium text-gray-700 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              CUSTOMER NAME
            </div>
            <div>PROFILE NAME</div>
            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              FREQUENCY
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              LAST INVOICE DATE
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              NEXT INVOICE DATE
            </div>
            <div>STATUS</div>
            <div>AMOUNT</div>
          </div>
          
          {/* Table Rows */}
          {recurringInvoices.map((invoice, index) => (
            <div key={index} className="grid grid-cols-7 p-3 border-b border-gray-200 text-sm">
              <div className="font-medium">{invoice.customerName}</div>
              <div>{invoice.profileName}</div>
              <div>{invoice.frequency}</div>
              <div>{invoice.lastInvoiceDate}</div>
              <div>{invoice.nextInvoiceDate}</div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status] || 'bg-gray-100 text-gray-800'}`}>
                  {invoice.status}
                </span>
              </div>
              <div className="font-medium">{invoice.amount}</div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {recurringInvoices.map((invoice, index) => (
            <div key={`mobile-${index}`} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{invoice.customerName}</h3>
                  <p className="text-sm text-gray-500">{invoice.profileName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status] || 'bg-gray-100 text-gray-800'}`}>
                  {invoice.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{invoice.frequency}</span>
                </div>
                <div className="font-medium text-right">{invoice.amount}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Last Invoice</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{invoice.lastInvoiceDate}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Next Invoice</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{invoice.nextInvoiceDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Button for Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <button className="flex items-center justify-center bg-orange-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-200">
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringInvoices;