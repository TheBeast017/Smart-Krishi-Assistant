import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-green-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2025 कृषि सहायक. सभी अधिकार सुरक्षित.
            </p>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="flex items-center mr-4">
              <Heart size={16} className="text-red-400 mr-1" />
              <span>भारतीय किसानों के लिए बनाया गया</span>
            </span>
            
            <a href="#" className="hover:text-white mr-4">नियम और शर्तें</a>
            <a href="#" className="hover:text-white mr-4">गोपनीयता नीति</a>
            <a href="#" className="hover:text-white">सहायता</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;