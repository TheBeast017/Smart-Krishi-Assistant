import React from 'react';
import { Cloud, CloudRain, Sun, Droplets, Wind } from 'lucide-react';
import Card from '../common/Card';

// This would typically be fetched from a weather API
const weatherData = {
  current: {
    temp: 32,
    humidity: 65,
    windSpeed: 12,
    condition: 'partly-cloudy',
  },
  forecast: [
    { day: 'आज', temp: 32, condition: 'partly-cloudy' },
    { day: 'कल', temp: 31, condition: 'sunny' },
    { day: 'परसों', temp: 29, condition: 'rainy' },
    { day: 'बुधवार', temp: 30, condition: 'partly-cloudy' },
  ]
};

const WeatherWidget: React.FC = () => {
  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={size} className="text-amber-500" />;
      case 'rainy':
        return <CloudRain size={size} className="text-blue-500" />;
      case 'partly-cloudy':
      default:
        return <Cloud size={size} className="text-gray-500" />;
    }
  };

  return (
    <Card title="मौसम की जानकारी" className="h-full">
      <div className="flex flex-col">
        {/* Current Weather */}
        <div className="flex items-center mb-6">
          <div className="mr-4">
            {getWeatherIcon(weatherData.current.condition, 48)}
          </div>
          <div>
            <div className="text-3xl font-bold">
              {weatherData.current.temp}°C
            </div>
            <div className="text-gray-500">आंशिक रूप से बादल</div>
          </div>
          <div className="ml-auto flex flex-col space-y-2">
            <div className="flex items-center text-gray-600">
              <Droplets size={18} className="mr-2 text-blue-500" />
              <span>{weatherData.current.humidity}% आर्द्रता</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Wind size={18} className="mr-2 text-blue-300" />
              <span>{weatherData.current.windSpeed} किमी/घंटा</span>
            </div>
          </div>
        </div>
        
        {/* Weather Forecast */}
        <div className="grid grid-cols-4 gap-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
              <div className="text-sm font-medium mb-1">{day.day}</div>
              {getWeatherIcon(day.condition, 24)}
              <div className="text-lg font-semibold mt-1">{day.temp}°</div>
            </div>
          ))}
        </div>
        
        {/* Weather Alert */}
        <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded text-amber-800">
          <p className="text-sm">
            <span className="font-bold">सावधानी:</span> कल बारिश की संभावना है, फसल की सिंचाई की योजना बनाते समय इस पर विचार करें।
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;