import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import type { Inspection } from '../App';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  inspections: Inspection[];
}

export default function Calendar({ inspections }: CalendarProps) {
  const inspectionDates = inspections.map(inspection => inspection.date);
  
  const footer = (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
        <span className="text-sm text-gray-600">Inspection Scheduled</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col items-center">
        <DayPicker
          mode="single"
          modifiers={{
            inspection: inspectionDates,
          }}
          modifiersStyles={{
            inspection: {
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '100%',
            },
          }}
          footer={footer}
          styles={{
            caption: { color: '#374151' },
            head_cell: { color: '#6B7280' },
          }}
        />
        
        <div className="w-full mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Inspections</h3>
          {inspections
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map(inspection => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{format(inspection.date, 'MMMM d, yyyy')}</p>
                  <p className="text-sm text-gray-600">{inspection.location}</p>
                  <p className="text-sm text-gray-600">Client: {inspection.client}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    inspection.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : inspection.status === 'denied'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}