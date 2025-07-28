import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center fixed w-full z-10">
        <div className="flex items-center">
          <img src="/logo.png" alt="Lionsol Logo" className="h-8 mr-2" />
          <nav className="space-x-4">
            <a href="#" className="hover:text-gray-300">All Products</a>
            <a href="#" className="hover:text-gray-300">Help Center</a>
            <a href="#" className="hover:text-gray-300">Testimonial</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Toll Free: 011 6991 3323</span>
          <a href="/login" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Sign In</a>
          <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create an Account</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white pt-24 pb-12 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Business with Lionsol Cloud Solutions</h1>
          <p className="text-lg mb-6">Streamline operations, boost productivity, and drive growth with our comprehensive cloud-based software suite.</p>
          <div className="space-x-4">
            <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">Get Pricing</button>
            <button className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-800">Start Free Trial</button>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <img src="/dashboard.png" alt="Dashboard" className="max-w-xs md:max-w-md" />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Lionsol Products</h2>
        <hr className="w-16 mx-auto border-blue-700 mb-6" />
        <p className="text-gray-600">Comprehensive solutions for every business need</p>
      </section>
    </div>
  );
};

export default Home;