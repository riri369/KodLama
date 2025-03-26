import React from 'react';

interface RiskGaugeProps {
  score: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score }) => {
  const getRiskColor = (score: number) => {
    if (score <= 30) return 'bg-green-500';
    if (score <= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskText = (score: number) => {
    if (score <= 30) return 'Low Risk';
    if (score <= 70) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-lg font-semibold">Sepsis Risk Score</span>
        <span className={`text-2xl font-bold ${getRiskColor(score).replace('bg-', 'text-')}`}>
          {score}
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getRiskColor(score)} transition-all duration-500 ease-in-out`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="mt-2 text-right">
        <span className={`font-medium ${getRiskColor(score).replace('bg-', 'text-')}`}>
          {getRiskText(score)}
        </span>
      </div>
    </div>
  );
};