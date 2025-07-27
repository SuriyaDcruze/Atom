import { useState } from 'react';
import { Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile: '',
    otp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleSendOtp = () => {
    console.log('OTP sent to:', formData.mobile);
    // In a real app, you would call an API to send OTP here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-orange-100 mt-1">Login to your business account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Login Method Toggle */}
            <div className="flex mb-6 rounded-lg bg-orange-50 p-1">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'email' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-orange-600'}`}
              >
                Email Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('mobile')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'mobile' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-orange-600'}`}
              >
                Mobile OTP
              </button>
            </div>

            {loginMethod === 'email' ? (
              <>
                {/* Email Field */}
                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right mb-6">
                  <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-500">
                    Forgot password?
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* Mobile Field */}
                <div className="mb-5">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="+1 234 567 8900"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="absolute inset-y-0 right-0 m-1 px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                {/* OTP Field */}
                <div className="mb-6">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                    OTP *
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter 6-digit OTP"
                    required
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
            >
              {loginMethod === 'email' ? 'Login' : 'Verify & Login'}
            </button>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;