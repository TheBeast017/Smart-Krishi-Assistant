import React from 'react';
import { Droplets, CloudRain, Plane as Plant, AlertTriangle } from 'lucide-react';
import Card from '../common/Card';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  change?: string;
  isPositive?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  color,
  iconColor,
  change,
  isPositive = true
}) => {
  return (
    <Card className="h-full">
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${color}`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="text-2xl font-bold mt-1">{value}</div>
          {change && (
            <div className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const StatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatusCard
        title="फसल की स्थिति"
        value="स्वस्थ"
        icon={<Plant size={24} />}
        color="bg-green-100"
        iconColor="text-green-700"
        change="पिछले सप्ताह से बेहतर"
        isPositive={true}
      />
      <StatusCard
        title="पानी का स्तर"
        value="65%"
        icon={<Droplets size={24} />}
        color="bg-blue-100"
        iconColor="text-blue-700"
        change="5% कम"
        isPositive={false}
      />
      <StatusCard
        title="अगली बारिश"
        value="2 दिन"
        icon={<CloudRain size={24} />}
        color="bg-indigo-100"
        iconColor="text-indigo-700"
      />
      <StatusCard
        title="चेतावनी"
        value="1 नई"
        icon={<AlertTriangle size={24} />}
        color="bg-amber-100"
        iconColor="text-amber-700"
        change="पशुधन जांच की आवश्यकता"
        isPositive={false}
      />
    </div>
  );
};

export default StatusCards;