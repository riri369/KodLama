import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import { Calendar as CalendarIcon, LayoutDashboard } from 'lucide-react';

export type Inspection = {
  id: string;
  date: Date;
  location: string;
  status: 'pending' | 'approved' | 'denied';
  client: string;
};

function App() {
  const [inspections, setInspections] = useState<Inspection[]>([
    {
      id: '1',
      date: new Date(2024, 2, 15),
      location: '123 Farm Road',
      status: 'pending',
      client: 'John Doe'
    },
    {
      id: '2',
      date: new Date(2024, 2, 20),
      location: '456 Field Lane',
      status: 'pending',
      client: 'Jane Smith'
    }
  ]);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'denied') => {
    setInspections(inspections.map(inspection => 
      inspection.id === id ? { ...inspection, status: newStatus } : inspection
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Soil Inspector Portal</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="calendar">
          <TabsList className="mb-8">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <Calendar inspections={inspections} />
          </TabsContent>
          
          <TabsContent value="dashboard">
            <Dashboard 
              inspections={inspections} 
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;