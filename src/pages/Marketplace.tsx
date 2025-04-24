import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, MapPin, Filter, ShoppingCart } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Mock data for crop prices
const cropData = [
  { 
    id: 1, 
    name: 'गेहूं', 
    variety: 'HD-2967', 
    currentPrice: 2250, 
    previousPrice: 2175, 
    recommendation: 'अभी बेचें', 
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 2, 
    name: 'चावल', 
    variety: 'बासमती', 
    currentPrice: 3800, 
    previousPrice: 3720, 
    recommendation: 'अभी बेचें', 
    image: 'https://images.pexels.com/photos/1241547/pexels-photo-1241547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 3, 
    name: 'मक्का', 
    variety: 'संकर', 
    currentPrice: 1950, 
    previousPrice: 1975, 
    recommendation: 'रुकें', 
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 4, 
    name: 'सोयाबीन', 
    variety: 'JS-335', 
    currentPrice: 4200, 
    previousPrice: 3980, 
    recommendation: 'अभी बेचें', 
    image: 'https://images.pexels.com/photos/6157041/pexels-photo-6157041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 5, 
    name: 'अरहर दाल', 
    variety: 'UPAS-120', 
    currentPrice: 6800, 
    previousPrice: 7200, 
    recommendation: 'रुकें', 
    image: 'https://images.pexels.com/photos/6248842/pexels-photo-6248842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 6, 
    name: 'कपास', 
    variety: 'देशी', 
    currentPrice: 6200, 
    previousPrice: 5850, 
    recommendation: 'अभी बेचें', 
    image: 'https://images.pexels.com/photos/4021257/pexels-photo-4021257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

// Mock data for markets
const marketData = [
  { id: 1, name: 'भारतीय खाद्य निगम केंद्र', distance: '5 किमी', crops: ['गेहूं', 'चावल'] },
  { id: 2, name: 'कृषि उपज मंडी', distance: '12 किमी', crops: ['गेहूं', 'मक्का', 'सोयाबीन', 'अरहर दाल'] },
  { id: 3, name: 'आदर्श कृषि बाजार', distance: '18 किमी', crops: ['चावल', 'गेहूं', 'कपास'] },
  { id: 4, name: 'राष्ट्रीय कृषि सहकारी विपणन संघ', distance: '25 किमी', crops: ['सोयाबीन', 'कपास', 'मक्का'] },
];

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  
  // Filter crops based on search term
  const filteredCrops = cropData.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">फसल बाजार</h1>
        <p className="text-gray-600">वर्तमान बाजार मूल्य देखें और अपनी उपज बेचें</p>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="फसल या किस्म खोजें..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            icon={<Filter size={18} />}
          >
            फ़िल्टर
          </Button>
          <Button 
            variant="outline" 
            icon={<MapPin size={18} />}
          >
            मेरे नज़दीकी बाज़ार
          </Button>
        </div>
      </div>
      
      {/* Market Selection */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-green-800 mb-4">मंडियां जहां आप बेच सकते हैं</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData.map(market => (
            <div 
              key={market.id} 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedMarket === market.id 
                  ? 'border-green-500 bg-white shadow-md' 
                  : 'border-transparent bg-white hover:bg-green-50'
              }`}
              onClick={() => setSelectedMarket(market.id)}
            >
              <h3 className="font-medium">{market.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{market.distance} दूर</p>
              <div className="flex flex-wrap gap-1">
                {market.crops.map((crop, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Crop Listings */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">फसल के वर्तमान भाव</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map(crop => (
            <Card key={crop.id} className="overflow-hidden">
              <div className="relative h-40 -mx-4 -mt-4 mb-4">
                <img 
                  src={crop.image} 
                  alt={crop.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{crop.name}</h3>
                  <p className="text-sm text-gray-500">{crop.variety}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xl font-bold">₹{crop.currentPrice}</div>
                  <div className={`flex items-center ${
                    crop.currentPrice > crop.previousPrice ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crop.currentPrice > crop.previousPrice ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : (
                      <TrendingDown size={16} className="mr-1" />
                    )}
                    <span className="text-sm">
                      {Math.abs(((crop.currentPrice - crop.previousPrice) / crop.previousPrice) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">पिछला मूल्य:</span>
                  <span>₹{crop.previousPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">सिफारिश:</span>
                  <span className={`font-medium ${
                    crop.recommendation === 'अभी बेचें' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {crop.recommendation}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  icon={<ShoppingCart size={18} />}
                >
                  बेचने के लिए सूचीबद्ध करें
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Price Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">मूल्य प्रवृत्ति विश्लेषण</h2>
        <p className="text-gray-600 mb-4">गेहूं की पिछले 3 महीनों की कीमत:</p>
        
        {/* This would typically be a chart component */}
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">मूल्य प्रवृत्ति चार्ट यहां प्रदर्शित होगा</p>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">विश्लेषण:</span> पिछले 3 महीनों में गेहूं की कीमतों में 5.2% की वृद्धि हुई है। अगले 30 दिनों में कीमतें स्थिर रहने की उम्मीद है।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;