
// Weather Service for fetching and processing weather data

// Define thresholds for alerts
export const THRESHOLDS = {
  HUMIDITY: 80, // 80%
  TEMPERATURE: 40, // 40°C
  WIND_SPEED: 100 // 100 km/h
};

// Weather data interface
export interface WeatherData {
  humidity: number;
  temperature: number;
  windSpeed: number;
  location: string;
  timestamp: Date;
  alerts: AlertStatus;
}

// Alert status interface
export interface AlertStatus {
  humidity: boolean;
  temperature: boolean;
  windSpeed: boolean;
  isAnyAlertActive: boolean;
}

// Mock weather data for development purposes
const generateMockWeatherData = (): WeatherData => {
  // Generate random values
  const humidity = Math.floor(Math.random() * 100);
  const temperature = Math.floor(Math.random() * 50);
  const windSpeed = Math.floor(Math.random() * 150);
  
  // Check if any values exceed thresholds
  const alerts = {
    humidity: humidity > THRESHOLDS.HUMIDITY,
    temperature: temperature > THRESHOLDS.TEMPERATURE,
    windSpeed: windSpeed > THRESHOLDS.WIND_SPEED,
    isAnyAlertActive: false
  };
  
  // Set overall alert status
  alerts.isAnyAlertActive = alerts.humidity || alerts.temperature || alerts.windSpeed;
  
  return {
    humidity,
    temperature,
    windSpeed,
    location: "San Francisco, CA",
    timestamp: new Date(),
    alerts
  };
};

// Function to fetch real weather data (to be implemented with actual API)
const fetchRealWeatherData = async (): Promise<WeatherData> => {
  try {
    // In a real application, this would be an API call
    // const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=San Francisco');
    // const data = await response.json();
    
    // For now, return mock data
    return generateMockWeatherData();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return generateMockWeatherData(); // Fallback to mock data
  }
};

// Get current weather data
export const getCurrentWeatherData = async (): Promise<WeatherData> => {
  // For now, we'll use mock data, but this can be replaced with real API calls
  return fetchRealWeatherData();
};

// Format services for display
export const formatHumidity = (value: number): string => `${value}%`;
export const formatTemperature = (value: number): string => `${value}°C`;
export const formatWindSpeed = (value: number): string => `${value} km/h`;

// Get alert message based on current weather data
export const getAlertMessage = (data: WeatherData): string => {
  if (!data.alerts.isAnyAlertActive) return "";
  
  const alerts = [];
  
  if (data.alerts.humidity) {
    alerts.push(`Humidity (${formatHumidity(data.humidity)}) exceeds safe levels`);
  }
  
  if (data.alerts.temperature) {
    alerts.push(`Temperature (${formatTemperature(data.temperature)}) exceeds safe levels`);
  }
  
  if (data.alerts.windSpeed) {
    alerts.push(`Wind speed (${formatWindSpeed(data.windSpeed)}) exceeds safe levels`);
  }
  
  return alerts.join(". ");
};
