import React, { useState, useEffect } from 'react';
import { Droplets, Power, BarChart3, Zap, AlertTriangle, Info } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const valveData = [
  { id: 1, name: 'उत्तरी खेत', status: true, waterLevel: 75, battery: 90, lastActive: '1 घंटे पहले' },
  { id: 2, name: 'दक्षिणी खेत', status: false, waterLevel: 30, battery: 65, lastActive: '3 घंटे पहले' },
  { id: 3, name: 'पश्चिमी खेत', status: false, waterLevel: 45, battery: 80, lastActive: '5 घंटे पहले' },
];

interface ValveProps {
  valve: typeof valveData[0];
  onToggle: (id: number) => void;
}

const Valve: React.FC<ValveProps> = ({ valve, onToggle }) => {
  const batteryColor = valve.battery > 70 ? 'text-green-500' : valve.battery > 30 ? 'text-amber-500' : 'text-red-500';
  const waterLevelColor = valve.waterLevel > 70 ? 'text-blue-500' : valve.waterLevel > 30 ? 'text-blue-300' : 'text-gray-400';

  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{valve.name}</h3>
            <p className="text-sm text-gray-500">{valve.lastActive}</p>
          </div>
          <div>
            <button
              onClick={() => onToggle(valve.id)}
              className={`relative inline-flex h-10 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 ${
                valve.status ? 'bg-green-500 border-green-600' : 'bg-gray-300 border-gray-400'
              } transition-colors ease-in-out duration-300 focus:outline-none`}
            >
              <span className="sr-only">टॉगल वॉल्व</span>
              <span
                className={`pointer-events-none relative inline-block h-9 w-9 transform rounded-full bg-white shadow-md ring-0 transition ease-in-out duration-300 ${
                  valve.status ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                <span
                  className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                    valve.status ? 'opacity-0 ease-out duration-300' : 'opacity-100 ease-in duration-200'
                  }`}
                >
                  <Power size={16} className="text-gray-500" />
                </span>
                <span
                  className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                    valve.status ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-300'
                  }`}
                >
                  <Power size={16} className="text-green-600" />
                </span>
              </span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Droplets size={16} className={waterLevelColor} />
              <span className="ml-1">पानी का स्तर</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${valve.waterLevel}%` }}
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">{valve.waterLevel}%</div>
          </div>
          
          <div className="flex-1 ml-4">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Zap size={16} className={batteryColor} />
              <span className="ml-1">बैटरी</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  valve.battery > 70 ? 'bg-green-500' : valve.battery > 30 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${valve.battery}%` }}
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">{valve.battery}%</div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-auto">
          <Button 
            variant="outline" 
            className="flex-1"
            icon={<BarChart3 size={18} />}
          >
            इतिहास
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            icon={<Info size={18} />}
          >
            विवरण
          </Button>
        </div>
      </div>
    </Card>
  );
};

const WaterControl: React.FC = () => {
  const [valves, setValves] = useState(valveData);
  const [waterSchedule, setWaterSchedule] = useState<boolean>(false);

  const toggleValve = (id: number) => {
    setValves(prevValves =>
      prevValves.map(valve =>
        valve.id === id ? { ...valve, status: !valve.status } : valve
      )
    );
  };

  const toggleAllValves = (status: boolean) => {
    setValves(prevValves =>
      prevValves.map(valve => ({ ...valve, status }))
    );
  };

  const toggleSchedule = () => {
    setWaterSchedule(!waterSchedule);
  };

  // Update water levels to simulate water flow
  useEffect(() => {
    const timer = setInterval(() => {
      setValves(prevValves =>
        prevValves.map(valve =>
          valve.status
            ? { ...valve, waterLevel: Math.max(0, valve.waterLevel - 1) }
            : valve
        )
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">पानी प्रबंधन</h1>
        <p className="text-gray-600">अपने सिंचाई प्रणाली को नियंत्रित करें और पानी का स्तर देखें</p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">वॉल्व नियंत्रण</h2>
          <p className="text-gray-600">
            {valves.filter(v => v.status).length} वॉल्व चालू,{' '}
            {valves.filter(v => !v.status).length} वॉल्व बंद
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => toggleAllValves(true)}
          >
            सभी चालू करें
          </Button>
          <Button 
            variant="outline" 
            onClick={() => toggleAllValves(false)}
          >
            सभी बंद करें
          </Button>
          <Button 
            variant={waterSchedule ? "primary" : "outline"} 
            onClick={toggleSchedule}
          >
            {waterSchedule ? 'शेड्यूल चालू है' : 'शेड्यूल बंद है'}
          </Button>
        </div>
      </div>
      
      {/* Water Alert */}
      {valves.some(v => v.waterLevel < 30 && v.status) && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                <span className="font-bold">कम पानी चेतावनी:</span> कुछ वॉल्व के पानी का स्तर कम है। कृपया जल स्रोत की जाँच करें।
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Weather Info */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">सिंचाई सुझाव</h2>
        <p className="text-blue-700 mb-4">
          आने वाले 2 दिनों में बारिश की संभावना है। आप पानी का संरक्षण करने के लिए सिंचाई को स्थगित कर सकते हैं।
        </p>
        <p className="text-sm text-blue-600">
          <span className="font-semibold">मिट्टी की नमी:</span> मध्यम स्तर (25-30%)
        </p>
      </div>
      
      {/* Schedule (when enabled) */}
      {waterSchedule && (
        <Card title="सिंचाई शेड्यूल">
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि'].map((day, index) => (
                <div key={index} className="text-center">
                  <div className="font-medium mb-1">{day}</div>
                  <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center ${
                    [0, 2, 4].includes(index) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {[0, 2, 4].includes(index) ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">दैनिक सिंचाई समय</p>
                <p className="text-sm text-gray-600">सुबह 6:00 - 8:00</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
              >
                संपादित करें
              </Button>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
              यह शेड्यूल आपकी फसल के लिए अनुशंसित है और इससे 20% पानी की बचत होगी।
            </div>
          </div>
        </Card>
      )}
      
      {/* Valves */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">सिंचाई वॉल्व</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valves.map(valve => (
            <Valve key={valve.id} valve={valve} onToggle={toggleValve} />
          ))}
        </div>
      </div>
      
      {/* Water Usage Statistics */}
      <Card title="पानी के उपयोग का इतिहास">
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">पानी उपयोग चार्ट यहां प्रदर्शित होगा</p>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">आज</p>
            <p className="text-lg font-semibold">2,500 लीटर</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">इस सप्ताह</p>
            <p className="text-lg font-semibold">12,250 लीटर</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">पिछले सप्ताह की तुलना</p>
            <p className="text-lg font-semibold text-green-600">-15%</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">सुझाव:</span> आप वॉल्व #2 पर फसल के अनुसार ड्रिप सिंचाई का उपयोग करके 30% अधिक पानी बचा सकते हैं।
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WaterControl;