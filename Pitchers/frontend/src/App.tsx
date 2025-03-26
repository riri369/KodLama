import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Patient } from './types';
import { PatientCard } from './components/PatientCard';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients');
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatients(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchPatients();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchPatients, 5000); // Poll every 5 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600">Loading patient data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-medium text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SepSense Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;