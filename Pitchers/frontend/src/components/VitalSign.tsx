import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface VitalSignProps {
  label: string;
  value: string | number;
  unit: string;
  isAbnormal?: boolean;
}

export const VitalSign: React.FC<VitalSignProps> = ({ label, value, unit, isAbnormal = false }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        {isAbnormal && (
          <AlertTriangle className="w-5 h-5 text-red-500" />
        )}
        <span className="text-gray-600 font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold ${isAbnormal ? 'text-red-500' : 'text-gray-900'}`}>
          {value}
        </span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );
};