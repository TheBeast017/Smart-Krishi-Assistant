import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color?: string;
  imageSrc?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  path,
  color = 'bg-green-500',
  imageSrc,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Card className="h-full transition-transform hover:scale-102 cursor-pointer" onClick={handleClick}>
      <div className="flex flex-col h-full">
        {imageSrc && (
          <div className="h-36 overflow-hidden rounded-t-lg -mx-4 -mt-4 mb-4">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${color} text-white`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center text-green-700 font-medium">
          <span className="mr-2">अधिक देखें</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;