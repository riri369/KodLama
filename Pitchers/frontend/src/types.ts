export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  room: string;
  lastUpdate: string;
  vitalSigns: {
    heartRate: number;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    temperature: {
      celsius: number;
      fahrenheit: number;
    };
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  sepsisRiskScore: number;
  alerts: {
    active: boolean;
    timestamp: string | null;
  };
}