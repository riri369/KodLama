import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Patient } from '../types';
import { VitalSign } from './VitalSign';
import { RiskGauge } from './RiskGauge';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
            <div className="flex gap-4 text-sm text-gray-600 mt-1">
              <span>ID: {patient.id}</span>
              <span>Age: {patient.age}</span>
              <span>Gender: {patient.gender}</span>
              <span>Room: {patient.room}</span>
            </div>
          </div>
          {patient.alerts.active && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">High Risk Alert</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {formatTime(patient.lastUpdate)}</span>
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <VitalSign
            label="Heart Rate"
            value={patient.vitalSigns.heartRate}
            unit="BPM"
            isAbnormal={patient.vitalSigns.heartRate > 100 || patient.vitalSigns.heartRate < 60}
          />
          <VitalSign
            label="Blood Pressure"
            value={`${patient.vitalSigns.bloodPressure.systolic}/${patient.vitalSigns.bloodPressure.diastolic}`}
            unit="mmHg"
            isAbnormal={
              patient.vitalSigns.bloodPressure.systolic > 140 ||
              patient.vitalSigns.bloodPressure.diastolic > 90
            }
          />
          <VitalSign
            label="Temperature"
            value={patient.vitalSigns.temperature.celsius.toFixed(1)}
            unit="°C"
            isAbnormal={patient.vitalSigns.temperature.celsius > 38.3}
          />
          <VitalSign
            label="Respiratory Rate"
            value={patient.vitalSigns.respiratoryRate}
            unit="breaths/min"
            isAbnormal={patient.vitalSigns.respiratoryRate > 20}
          />
          <VitalSign
            label="O₂ Saturation"
            value={patient.vitalSigns.oxygenSaturation}
            unit="%"
            isAbnormal={patient.vitalSigns.oxygenSaturation < 95}
          />
        </div>

        {/* Risk Score */}
        <div className="mt-6">
          <RiskGauge score={patient.sepsisRiskScore} />
        </div>

        {/* Alert History */}
        {patient.alerts.active && patient.alerts.timestamp && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Alert triggered at {formatTime(patient.alerts.timestamp)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};