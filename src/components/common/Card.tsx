import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  icon, 
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {(title || icon) && (
        <div className="flex items-center px-4 py-3 bg-green-50 border-b border-green-100">
          {icon && <span className="mr-2 text-green-700">{icon}</span>}
          {title && <h3 className="font-medium text-lg text-green-900">{title}</h3>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;