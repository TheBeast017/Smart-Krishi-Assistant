import React from 'react';
import { ShoppingCart, Flower, Droplets, Cat, Bell } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import StatusCards from '../components/dashboard/StatusCards';
import CropPricesWidget from '../components/dashboard/CropPricesWidget';
import Button from '../components/common/Button';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">नमस्ते, रामेश जी</h1>
          <p className="text-gray-600">मौसम अच्छा है, अपनी फसलों की देखभाल करें</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary" 
            size="md" 
            icon={<Bell size={18} />}
          >
            आपकी 2 नई सूचनाएं
          </Button>
        </div>
      </div>
      
      {/* Status Cards */}
      <StatusCards />
      
      {/* Weather and Crop Prices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <CropPricesWidget />
      </div>
      
      {/* Feature Cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">सेवाएं</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="फसल बाजार" 
            description="अपनी फसल को सर्वोत्तम मूल्य पर बेचें और वर्तमान बाजार मूल्य देखें"
            icon={<ShoppingCart size={24} />}
            path="/marketplace"
            color="bg-amber-500"
            imageSrc="https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <DashboardCard 
            title="उर्वरक सलाह" 
            description="अपनी फसल की तस्वीर अपलोड करें और जैविक उर्वरक सलाह प्राप्त करें"
            icon={<Flower size={24} />}
            path="/fertilizer"
            color="bg-green-500"
            imageSrc="https://images.pexels.com/photos/5426989/pexels-photo-5426989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <DashboardCard 
            title="पानी प्रबंधन" 
            description="अपने खेत के पानी के पाइप को नियंत्रित करें और पानी का स्तर देखें"
            icon={<Droplets size={24} />}
            path="/water"
            color="bg-blue-500"
            imageSrc="https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <DashboardCard 
            title="पशुधन निगरानी" 
            description="अपने पशुओं की स्थिति देखें और स्वास्थ्य अलर्ट प्राप्त करें"
            icon={<Cat size={24} />}
            path="/livestock"
            color="bg-indigo-500"
            imageSrc="https://images.pexels.com/photos/421999/pexels-photo-421999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
      </div>
      
      {/* Offline Mode Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Bell className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <span className="font-bold">ऑफलाइन मोड उपलब्ध है:</span> खराब नेटवर्क कनेक्शन के दौरान भी ऐप का उपयोग करें। डेटा अपने आप सिंक हो जाएगा जब आप फिर से ऑनलाइन होंगे।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;