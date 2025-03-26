
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { formatHumidity, formatTemperature, formatWindSpeed } from '../services/weatherService';

interface WeatherCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  isAlert: boolean;
  formatFn: (value: number) => string;
  thresholdValue: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  value,
  unit,
  icon,
  isAlert,
  formatFn,
  thresholdValue
}) => {
  const formattedValue = formatFn(value);
  const percentToThreshold = (value / thresholdValue) * 100;
  const fillColor = isAlert ? 'bg-danger' : 
                   percentToThreshold > 75 ? 'bg-warning' : 
                   'bg-primary';
  
  return (
    <div className={`weather-card glass rounded-2xl p-6 h-full ${isAlert ? 'ring-2 ring-danger' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAlert ? 'bg-danger/10' : 'bg-primary/10'}`}>
          {icon}
        </div>
      </div>
      
      <div className="metric-value mt-6 flex items-end">
        <span className={isAlert ? 'text-danger' : 'text-foreground'}>
          {value}
        </span>
        <span className="metric-unit">{unit}</span>
        {isAlert && (
          <AlertTriangle className="h-5 w-5 ml-2 text-danger animate-pulse-slow" />
        )}
      </div>
      
      <div className="mt-4">
        <p className="metric-label mb-1">Current Status</p>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full ${fillColor} transition-all duration-700`} 
            style={{ width: `${Math.min(percentToThreshold, 100)}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>Safe</span>
        <span>Threshold: {formatFn(thresholdValue)}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
