import React from 'react';
import {
  Bug,
  Thermometer,
  Cloud,
  Droplets,
  Sprout,
  Store,
  Microscope,
  ArrowRight,
  Sun,
  Wind,
  Leaf
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
            alt="Farm landscape"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">
              AgriSense
              <span className="inline-block ml-2">
                <Leaf className="w-12 h-12 text-green-600 inline" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Smart Agriculture Solutions for Modern Farmers
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center gap-2 mx-auto">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Comprehensive Agricultural Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pest Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Bug className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pest Analysis</h3>
            <p className="text-gray-600">
              AI-powered pest identification and treatment recommendations for your crops
            </p>
          </div>

          {/* Temperature Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Thermometer className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Temperature Analysis</h3>
            <p className="text-gray-600">
              Real-time temperature monitoring and historical data analysis
            </p>
          </div>

          {/* Weather Forecast */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Cloud className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Weather Forecast</h3>
            <p className="text-gray-600">
              Accurate weather predictions to plan your farming activities
            </p>
          </div>

          {/* Humidity Monitoring */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-cyan-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Droplets className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Humidity Monitor</h3>
            <p className="text-gray-600">
              Track humidity levels to optimize crop growth and prevent diseases
            </p>
          </div>

          {/* Crop Help */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Sprout className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Crop Help</h3>
            <p className="text-gray-600">
              Expert guidance on crop management and disease prevention
            </p>
          </div>

          {/* Marketplace */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Store className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketplace</h3>
            <p className="text-gray-600">
              Buy and sell agricultural products directly with other farmers
            </p>
          </div>
        </div>
      </section>

      {/* Live Soil Inspector Section */}
      <section className="bg-green-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Live Soil Inspector Visit</h2>
              <p className="text-lg mb-8">
                Book our expert soil analysts for an on-site inspection. Get detailed reports
                about your soil's health, nutrient content, and recommendations for improvement.
              </p>
              <button className="bg-white text-green-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition-colors duration-300 flex items-center gap-2">
                Schedule Visit
                <Microscope className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80"
                alt="Soil inspection"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
              <Sun className="w-12 h-12 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">28°C</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
              <Wind className="w-12 h-12 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-900">12 km/h</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
              <Droplets className="w-12 h-12 text-cyan-500" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">65%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center justify-center gap-2">
            <Leaf className="w-6 h-6" />
            AgriSense
          </h2>
          <p className="text-gray-600">
            Empowering farmers with smart agricultural solutions
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;