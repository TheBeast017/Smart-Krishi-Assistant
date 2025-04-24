import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Flower, 
  Droplets, 
  Cat, 
  HelpCircle, 
  MessageCircle, 
  Bell,
  Wifi,
  WifiOff 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  // Simulate network status for demo
  const [isOnline, setIsOnline] = React.useState(true);

  const toggleNetworkStatus = () => {
    setIsOnline(!isOnline);
    // In a real app, this would be determined by the actual network status
  };

  const navItems = [
    { path: '/', label: 'डैशबोर्ड', icon: <Home size={24} /> },
    { path: '/marketplace', label: 'फसल बाजार', icon: <ShoppingCart size={24} /> },
    { path: '/fertilizer', label: 'उर्वरक सलाह', icon: <Flower size={24} /> },
    { path: '/water', label: 'पानी प्रबंधन', icon: <Droplets size={24} /> },
    { path: '/livestock', label: 'पशुधन निगरानी', icon: <Cat size={24} /> },
    { path: '/guide', label: 'सहायता', icon: <HelpCircle size={24} /> },
  ];
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 bg-green-800 text-white w-64 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 flex flex-col`}
    >
      <div className="p-4 flex items-center justify-center border-b border-green-700">
        <h2 className="text-xl font-bold text-center">कृषि सहायक</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-green-700 text-white' 
                      : 'text-green-100 hover:bg-green-700'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-green-700 space-y-2">
        {/* Network Status Indicator */}
        <div className="flex items-center justify-between px-4 py-2 bg-green-700 rounded-lg">
          <div className="flex items-center">
            {isOnline ? (
              <Wifi size={20} className="text-green-300 mr-2" />
            ) : (
              <WifiOff size={20} className="text-amber-400 mr-2" />
            )}
            <span>{isOnline ? 'ऑनलाइन' : 'ऑफलाइन'}</span>
          </div>
          <button 
            onClick={toggleNetworkStatus}
            className="text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-500"
          >
            {isOnline ? 'ऑफलाइन जाएं' : 'ऑनलाइन जाएं'}
          </button>
        </div>
        
        {/* Emergency Alert Button */}
        <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Bell size={20} className="mr-2" />
          <span className="font-medium">आपातकालीन सहायता</span>
        </button>
        
        {/* Community Forum Button */}
        <button className="w-full flex items-center justify-center px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
          <MessageCircle size={20} className="mr-2" />
          <span className="font-medium">समुदाय मंच</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;