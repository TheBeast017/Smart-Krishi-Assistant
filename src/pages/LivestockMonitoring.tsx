import React, { useState, useEffect } from 'react';
import { Bell, Play, Pause, Calendar, Camera, Heart, Thermometer, AlertTriangle, X } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Mock data for livestock
const livestockData = [
  { 
    id: 1, 
    name: 'गाय #103', 
    status: 'स्वस्थ', 
    lastUpdate: '10 मिनट पहले',
    age: '4 वर्ष',
    breed: 'साहीवाल',
    weight: '420 किग्रा',
    milk: '18 लीटर/दिन',
    temperature: '38.5°C',
    heartRate: '65 बीपीएम',
    lastMedicalCheck: '15 दिन पहले',
    imageSrc: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 2, 
    name: 'गाय #107', 
    status: 'चिंताजनक', 
    lastUpdate: '5 मिनट पहले',
    age: '3 वर्ष',
    breed: 'गिर',
    weight: '380 किग्रा',
    milk: '12 लीटर/दिन',
    temperature: '39.8°C',
    heartRate: '78 बीपीएम',
    lastMedicalCheck: '25 दिन पहले',
    imageSrc: 'https://images.pexels.com/photos/635577/pexels-photo-635577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 3, 
    name: 'बछड़ा #24', 
    status: 'स्वस्थ', 
    lastUpdate: '15 मिनट पहले',
    age: '8 महीने',
    breed: 'साहीवाल',
    weight: '180 किग्रा',
    milk: 'N/A',
    temperature: '38.6°C',
    heartRate: '72 बीपीएम',
    lastMedicalCheck: '10 दिन पहले',
    imageSrc: 'https://images.pexels.com/photos/162801/calf-dairy-cow-heifer-black-and-white-162801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Mock alerts
const alertsData = [
  {
    id: 1,
    animal: 'गाय #107',
    message: 'उच्च तापमान का पता चला',
    time: '1 घंटे पहले',
    severity: 'high',
    read: false
  },
  {
    id: 2,
    animal: 'बाड़े का क्षेत्र',
    message: 'संभावित घुसपैठिया का पता चला',
    time: '3 घंटे पहले',
    severity: 'medium',
    read: false
  },
  {
    id: 3,
    animal: 'गाय #103',
    message: 'नियमित चिकित्सा जांच बकाया',
    time: '1 दिन पहले',
    severity: 'low',
    read: true
  }
];

const LivestockMonitoring: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [alerts, setAlerts] = useState(alertsData);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const toggleAlertRead = (id: number) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, read: !alert.read } : alert
      )
    );
  };
  
  const dismissAlert = (id: number) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };
  
  const toggleStream = () => {
    setIsStreaming(!isStreaming);
  };
  
  const animal = selectedAnimal ? livestockData.find(a => a.id === selectedAnimal) : null;
  
  useEffect(() => {
    // Set the first animal as selected by default
    if (livestockData.length > 0 && selectedAnimal === null) {
      setSelectedAnimal(livestockData[0].id);
    }
  }, [selectedAnimal]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">पशुधन निगरानी</h1>
          <p className="text-gray-600">अपने पशुओं की स्थिति देखें और स्वास्थ्य अलर्ट प्राप्त करें</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant="outline" 
            icon={<Calendar size={18} />}
          >
            इतिहास
          </Button>
          <Button 
            variant="outline" 
            icon={<Camera size={18} />}
          >
            सभी कैमरे
          </Button>
        </div>
      </div>
      
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-amber-50 border-b border-amber-100 px-4 py-3 flex items-center">
            <Bell size={20} className="text-amber-500 mr-2" />
            <h2 className="text-lg font-semibold text-amber-800">पशु स्वास्थ्य अलर्ट</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`px-4 py-3 flex items-center justify-between ${alert.read ? 'bg-white' : 'bg-amber-50'}`}
              >
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                    alert.severity === 'high' ? 'bg-red-500' : 
                    alert.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium">{alert.animal}</p>
                    <p className="text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleAlertRead(alert.id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    {alert.read ? 'पढ़ा गया' : 'पढ़ें'}
                  </button>
                  <button 
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Animal List */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">पशु सूची</h2>
          <div className="space-y-4">
            {livestockData.map(animal => (
              <div
                key={animal.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedAnimal === animal.id
                    ? 'bg-green-100 border-l-4 border-green-500'
                    : 'bg-white hover:bg-gray-50 border border-gray-100'
                }`}
                onClick={() => setSelectedAnimal(animal.id)}
              >
                <div className="flex-shrink-0 w-16 h-16 mr-4">
                  <img 
                    src={animal.imageSrc} 
                    alt={animal.name} 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{animal.name}</h3>
                  <p className={`text-sm ${
                    animal.status === 'स्वस्थ' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {animal.status}
                  </p>
                  <p className="text-xs text-gray-500">{animal.lastUpdate}</p>
                </div>
                {animal.status !== 'स्वस्थ' && (
                  <AlertTriangle size={18} className="ml-auto text-amber-500" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Animal Details and Camera Feed */}
        <div className="md:col-span-2 space-y-6">
          {animal && (
            <>
              {/* Camera Feed */}
              <Card className="overflow-hidden">
                <div className="relative -mx-4 -mt-4 h-64 md:h-80 bg-black">
                  {isStreaming ? (
                    <img 
                      src={animal.imageSrc} 
                      alt={`Live feed of ${animal.name}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-white">लाइव फीड अनुपलब्ध</p>
                    </div>
                  )}
                  
                  <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-white text-xs flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                    LIVE
                  </div>
                  
                  <div className="absolute bottom-2 right-2">
                    <Button 
                      variant={isStreaming ? "danger" : "secondary"} 
                      size="sm"
                      onClick={toggleStream}
                      icon={isStreaming ? <Pause size={16} /> : <Play size={16} />}
                    >
                      {isStreaming ? 'रोकें' : 'देखें'}
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{animal.name} - लाइव फीड</h3>
                  <p className="text-gray-600 text-sm">दिखा रहा है: पशु बाड़ा क्षेत्र</p>
                </div>
              </Card>
              
              {/* Animal Details */}
              <Card title="पशु के विवरण">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">नस्ल:</p>
                    <p className="font-medium">{animal.breed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">आयु:</p>
                    <p className="font-medium">{animal.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">वजन:</p>
                    <p className="font-medium">{animal.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">दूध उत्पादन:</p>
                    <p className="font-medium">{animal.milk}</p>
                  </div>
                  <div className="flex items-center">
                    <Thermometer size={16} className="text-red-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">तापमान:</p>
                      <p className={`font-medium ${animal.temperature > '39.0°C' ? 'text-red-600' : 'text-gray-800'}`}>
                        {animal.temperature}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Heart size={16} className="text-red-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">हृदय गति:</p>
                      <p className={`font-medium ${Number(animal.heartRate.split(' ')[0]) > 70 ? 'text-red-600' : 'text-gray-800'}`}>
                        {animal.heartRate}
                      </p>
                    </div>
                  </div>
                </div>
                
                {animal.status !== 'स्वस्थ' && (
                  <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-md">
                    <div className="flex">
                      <AlertTriangle size={18} className="text-amber-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-amber-800 font-medium">स्वास्थ्य चेतावनी</p>
                        <p className="text-sm text-amber-700">
                          उच्च तापमान का पता चला। संभावित बुखार का संकेत हो सकता है। पशुचिकित्सक को बुलाने पर विचार करें।
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    स्वास्थ्य रिकॉर्ड
                  </Button>
                  <Button variant={animal.status !== 'स्वस्थ' ? "primary" : "outline"} className="flex-1">
                    पशुचिकित्सक को कॉल करें
                  </Button>
                </div>
              </Card>
              
              {/* Scheduled Activities */}
              <Card title="आगामी गतिविधियां">
                <ul className="divide-y divide-gray-100">
                  <li className="py-3 flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-4 flex-shrink-0">
                      <span>आज</span>
                    </div>
                    <div>
                      <p className="font-medium">दैनिक स्वास्थ्य जांच</p>
                      <p className="text-sm text-gray-600">तापमान और हृदय गति की निगरानी करें</p>
                    </div>
                  </li>
                  <li className="py-3 flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-4 flex-shrink-0">
                      <span>3 दिन</span>
                    </div>
                    <div>
                      <p className="font-medium">टीकाकरण</p>
                      <p className="text-sm text-gray-600">नियमित टीकाकरण शेड्यूल</p>
                    </div>
                  </li>
                  <li className="py-3 flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-4 flex-shrink-0">
                      <span>7 दिन</span>
                    </div>
                    <div>
                      <p className="font-medium">पशुचिकित्सक जांच</p>
                      <p className="text-sm text-gray-600">नियमित स्वास्थ्य परीक्षण</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivestockMonitoring;