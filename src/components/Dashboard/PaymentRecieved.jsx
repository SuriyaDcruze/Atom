import React, { useState } from 'react';
import { Search, Calendar, User, CreditCard } from 'lucide-react';

const PaymentReceived = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customer, setCustomer] = useState('ALL');
  const [paymentMode, setPaymentMode] = useState('ALL');

  const payments = [
    {
      date: '13.05.2025',
      paymentNumber: '34',
      siteName: 'AL056 Sithalapakkam 2',
      customerName: 'Mr.Manivannan',
      invoiceNumber: 'INV1058',
      mode: 'CASH',
      amount: 'NR.1.286.00',
      unusedAmount: ''
    }
    // Add more payment data as needed
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ startDate, endDate, customer, paymentMode });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Payment Received</h1>
        
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Start Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
            
            {/* End Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
            
            {/* Customer */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">ALL</option>
                  <option value="Customer1">Customer 1</option>
                  <option value="Customer2">Customer 2</option>
                </select>
              </div>
            </div>
            
            {/* Payment Mode */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">ALL</option>
                  <option value="CASH">CASH</option>
                  <option value="CHEQUE">CHEQUE</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
              </div>
            </div>
            
            {/* Search Button */}
            <div className="md:col-span-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition duration-200"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>
        
        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 md:grid-cols-7 bg-gray-100 p-3 font-medium text-gray-700 text-sm">
            <div className="col-span-1">DATE</div>
            <div className="col-span-1 hidden md:block">PAYMENT NUMBER</div>
            <div className="col-span-2 md:col-span-1">SITE NAME</div>
            <div className="col-span-1 hidden md:block">INVOICE NUMBER</div>
            <div className="col-span-1">MODE</div>
            <div className="col-span-1">AMOUNT</div>
            <div className="col-span-1 hidden md:block">UNUSED AMOUNT</div>
          </div>
          
          {/* Table Rows */}
          {payments.map((payment, index) => (
            <div key={index} className="grid grid-cols-6 md:grid-cols-7 p-3 border-b border-gray-200 text-sm">
              <div className="col-span-1 font-medium">{payment.date}</div>
              <div className="col-span-1 hidden md:block">{payment.paymentNumber}</div>
              <div className="col-span-2 md:col-span-1">
                <div>{payment.siteName}</div>
                <div className="text-xs text-gray-500">{payment.customerName}</div>
              </div>
              <div className="col-span-1 hidden md:block">{payment.invoiceNumber}</div>
              <div className="col-span-1">{payment.mode}</div>
              <div className="col-span-1 font-medium">{payment.amount}</div>
              <div className="col-span-1 hidden md:block">{payment.unusedAmount}</div>
            </div>
          ))}
        </div>
        
        {/* Mobile view additional info */}
        {payments.map((payment, index) => (
          <div key={`mobile-${index}`} className="md:hidden bg-white rounded-lg shadow p-3 mt-3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Payment Number:</span>
              <span>{payment.paymentNumber}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Invoice Number:</span>
              <span>{payment.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Unused Amount:</span>
              <span>{payment.unusedAmount || '-'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentReceived;