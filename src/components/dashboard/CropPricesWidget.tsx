import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';

// This would typically be fetched from an API
const cropPricesData = [
  { name: 'गेहूं', price: 2250, change: 3.5, isUp: true },
  { name: 'चावल', price: 3800, change: 2.1, isUp: true },
  { name: 'मक्का', price: 1950, change: -1.2, isUp: false },
  { name: 'सोयाबीन', price: 4200, change: 5.5, isUp: true },
];

const CropPricesWidget: React.FC = () => {
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    navigate('/marketplace');
  };
  
  return (
    <Card title="फसल के भाव" className="h-full">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 text-left text-sm font-medium text-gray-500">फसल</th>
              <th className="py-2 text-right text-sm font-medium text-gray-500">मूल्य/क्विंटल</th>
              <th className="py-2 text-right text-sm font-medium text-gray-500">बदलाव</th>
            </tr>
          </thead>
          <tbody>
            {cropPricesData.map((crop, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-sm font-medium">{crop.name}</td>
                <td className="py-3 text-right text-sm font-medium">₹{crop.price}</td>
                <td className="py-3 text-right">
                  <div className={`inline-flex items-center ${
                    crop.isUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crop.isUp ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : (
                      <TrendingDown size={16} className="mr-1" />
                    )}
                    <span className="text-sm font-medium">{Math.abs(crop.change)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        onClick={handleViewAll}
        className="mt-4 flex items-center text-green-700 font-medium"
      >
        <span className="mr-2">सभी फसल के भाव देखें</span>
        <ArrowRight size={16} />
      </button>
    </Card>
  );
};

export default CropPricesWidget;