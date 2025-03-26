
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Droplets, 
  Thermometer, 
  Wind 
} from 'lucide-react';
import WeatherCard from './WeatherCard';
import AlertBanner from './AlertBanner';
import EmergencyGuide from './EmergencyGuide';
import { 
  THRESHOLDS, 
  WeatherData,
  getCurrentWeatherData, 
  getAlertMessage,
  formatHumidity,
  formatTemperature,
  formatWindSpeed
} from '@/services/weatherService';

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const [showEmergencyGuide, setShowEmergencyGuide] = useState(false);
  const [currentAlertType, setCurrentAlertType] = useState('general');
  const { toast } = useToast();
  
  // Fetch weather data periodically
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const data = await getCurrentWeatherData();
        setWeatherData(data);
        setError(null);
        
        // Check if any alert thresholds are exceeded
        if (data.alerts.isAnyAlertActive && !showAlertBanner) {
          setShowAlertBanner(true);
          
          // Determine which alert is active for emergency guide
          if (data.alerts.humidity) {
            setCurrentAlertType('humidity');
          } else if (data.alerts.temperature) {
            setCurrentAlertType('temperature');
          } else if (data.alerts.windSpeed) {
            setCurrentAlertType('windspeed');
          }
          
          // Show toast notification
          toast({
            title: "Emergency Alert",
            description: getAlertMessage(data),
            variant: "destructive",
          });
        }
      } catch (err) {
        setError("Failed to fetch weather data. Please try again later.");
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch immediately
    fetchWeatherData();
    
    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(fetchWeatherData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [toast, showAlertBanner]);
  
  const handleCloseAlert = () => {
    setShowAlertBanner(false);
  };
  
  const handleShowGuide = () => {
    setShowEmergencyGuide(true);
  };
  
  if (loading && !weatherData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary/30 rounded-full mb-4"></div>
          <div className="h-4 w-40 bg-primary/30 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center p-8 glass rounded-2xl">
        <h3 className="text-lg font-medium text-destructive mb-2">Error</h3>
        <p className="text-muted-foreground">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <>
      <div className="mb-6 glass rounded-xl p-6 animate-fade-in">
        <h2 className="text-2xl font-light">Current Weather Conditions</h2>
        <p className="text-muted-foreground">
          {weatherData?.location} • {weatherData?.timestamp.toLocaleTimeString()}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {weatherData && (
          <>
            <WeatherCard
              title="Humidity"
              value={weatherData.humidity}
              unit="%"
              icon={<Droplets className="h-6 w-6 text-primary" />}
              isAlert={weatherData.alerts.humidity}
              formatFn={formatHumidity}
              thresholdValue={THRESHOLDS.HUMIDITY}
            />
            
            <WeatherCard
              title="Temperature"
              value={weatherData.temperature}
              unit="°C"
              icon={<Thermometer className="h-6 w-6 text-primary" />}
              isAlert={weatherData.alerts.temperature}
              formatFn={formatTemperature}
              thresholdValue={THRESHOLDS.TEMPERATURE}
            />
            
            <WeatherCard
              title="Wind Speed"
              value={weatherData.windSpeed}
              unit="km/h"
              icon={<Wind className="h-6 w-6 text-primary" />}
              isAlert={weatherData.alerts.windSpeed}
              formatFn={formatWindSpeed}
              thresholdValue={THRESHOLDS.WIND_SPEED}
            />
          </>
        )}
      </div>
      
      <div className="glass rounded-xl p-6 animate-fade-in">
        <h2 className="text-xl font-medium mb-4">Weather Map</h2>
        <div className="bg-secondary/50 h-96 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">
            Interactive map will be integrated here with Google Maps API
          </p>
        </div>
      </div>
      
      {weatherData && (
        <AlertBanner
          message={getAlertMessage(weatherData)}
          isVisible={showAlertBanner}
          onClose={handleCloseAlert}
          onShowGuide={handleShowGuide}
        />
      )}
      
      <EmergencyGuide
        isOpen={showEmergencyGuide}
        onClose={() => setShowEmergencyGuide(false)}
        alertType={currentAlertType}
      />
    </>
  );
};

export default Dashboard;
