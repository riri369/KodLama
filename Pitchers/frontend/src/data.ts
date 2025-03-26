import { Patient } from './types';

export const mockPatients: Patient[] = [
  {
    id: "P-001",
    name: "John Smith",
    age: 65,
    gender: "Male",
    room: "ICU-101",
    lastUpdate: new Date().toISOString(),
    vitalSigns: {
      heartRate: 115,
      bloodPressure: {
        systolic: 160,
        diastolic: 95
      },
      temperature: {
        celsius: 38.8,
        fahrenheit: 101.8
      },
      respiratoryRate: 22,
      oxygenSaturation: 92
    },
    sepsisRiskScore: 75,
    alerts: {
      active: true,
      timestamp: new Date().toISOString()
    }
  },
  {
    id: "P-002",
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    room: "ICU-102",
    lastUpdate: new Date().toISOString(),
    vitalSigns: {
      heartRate: 82,
      bloodPressure: {
        systolic: 120,
        diastolic: 80
      },
      temperature: {
        celsius: 37.2,
        fahrenheit: 98.9
      },
      respiratoryRate: 16,
      oxygenSaturation: 98
    },
    sepsisRiskScore: 25,
    alerts: {
      active: false,
      timestamp: null
    }
  }
];