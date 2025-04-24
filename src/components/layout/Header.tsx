import React, { useState } from 'react';
import { Menu, X, User, MicIcon, Volume2, Sun, MessageSquare, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// Language options with their respective codes
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'mr', name: 'मराठी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
];

// Comprehensive state data
const states = [
  {
    name: 'Uttar Pradesh',
    districts: [
      {
        name: 'Agra',
        cities: ['Agra', 'Fatehpur Sikri', 'Firozabad', 'Mathura', 'Tundla']
      },
      {
        name: 'Lucknow',
        cities: ['Lucknow', 'Mohanlalganj', 'Malihabad', 'Bakshi Ka Talab']
      },
      {
        name: 'Varanasi',
        cities: ['Varanasi', 'Ramnagar', 'Sarnath', 'Banaras', 'Mughalsarai']
      },
      {
        name: 'Kanpur',
        cities: ['Kanpur', 'Bilhaur', 'Ghatampur', 'Bhitargaon']
      }
    ]
  },
  {
    name: 'Maharashtra',
    districts: [
      {
        name: 'Mumbai',
        cities: ['Mumbai', 'Navi Mumbai', 'Thane', 'Kalyan', 'Dombivli']
      },
      {
        name: 'Pune',
        cities: ['Pune', 'Pimpri-Chinchwad', 'Lonavala', 'Talegaon']
      },
      {
        name: 'Nagpur',
        cities: ['Nagpur', 'Kamptee', 'Umred', 'Ramtek']
      }
    ]
  },
  {
    name: 'Karnataka',
    districts: [
      {
        name: 'Bangalore',
        cities: ['Bangalore', 'Electronic City', 'Whitefield', 'Yelahanka']
      },
      {
        name: 'Mysore',
        cities: ['Mysore', 'Nanjangud', 'T Narsipur', 'Bannur']
      },
      {
        name: 'Hubli-Dharwad',
        cities: ['Hubli', 'Dharwad', 'Kalghatgi', 'Kundgol']
      }
    ]
  },
  {
    name: 'Tamil Nadu',
    districts: [
      {
        name: 'Chennai',
        cities: ['Chennai', 'Tambaram', 'Ambattur', 'Avadi']
      },
      {
        name: 'Coimbatore',
        cities: ['Coimbatore', 'Mettupalayam', 'Pollachi', 'Sulur']
      },
      {
        name: 'Madurai',
        cities: ['Madurai', 'Melur', 'Thirumangalam', 'Usilampatti']
      }
    ]
  },
  {
    name: 'Gujarat',
    districts: [
      {
        name: 'Ahmedabad',
        cities: ['Ahmedabad', 'Sanand', 'Dholka', 'Bavla']
      },
      {
        name: 'Surat',
        cities: ['Surat', 'Bardoli', 'Mandvi', 'Mahuva']
      },
      {
        name: 'Vadodara',
        cities: ['Vadodara', 'Dabhoi', 'Savli', 'Waghodia']
      }
    ]
  },
  {
    name: 'Rajasthan',
    districts: [
      {
        name: 'Jaipur',
        cities: ['Jaipur', 'Chomu', 'Bagru', 'Shahpura', 'Sambhar']
      },
      {
        name: 'Jodhpur',
        cities: ['Jodhpur', 'Pipar City', 'Phalodi', 'Bilara']
      },
      {
        name: 'Udaipur',
        cities: ['Udaipur', 'Nathdwara', 'Salumber', 'Mavli']
      }
    ]
  },
  {
    name: 'Punjab',
    districts: [
      {
        name: 'Amritsar',
        cities: ['Amritsar', 'Ajnala', 'Rayya', 'Majitha']
      },
      {
        name: 'Ludhiana',
        cities: ['Ludhiana', 'Khanna', 'Jagraon', 'Samrala']
      },
      {
        name: 'Patiala',
        cities: ['Patiala', 'Nabha', 'Rajpura', 'Samana']
      }
    ]
  },
  {
    name: 'Madhya Pradesh',
    districts: [
      {
        name: 'Bhopal',
        cities: ['Bhopal', 'Berasia', 'Sehore', 'Mandideep']
      },
      {
        name: 'Indore',
        cities: ['Indore', 'Mhow', 'Depalpur', 'Sanwer']
      },
      {
        name: 'Gwalior',
        cities: ['Gwalior', 'Dabra', 'Bhitarwar', 'Morar']
      }
    ]
  },
  {
    name: 'Bihar',
    districts: [
      {
        name: 'Patna',
        cities: ['Patna', 'Danapur', 'Phulwari', 'Maner']
      },
      {
        name: 'Gaya',
        cities: ['Gaya', 'Bodh Gaya', 'Sherghati', 'Tekari']
      },
      {
        name: 'Muzaffarpur',
        cities: ['Muzaffarpur', 'Sitamarhi', 'Motihari', 'Bettiah']
      }
    ]
  },
  {
    name: 'West Bengal',
    districts: [
      {
        name: 'Kolkata',
        cities: ['Kolkata', 'Salt Lake', 'Howrah', 'Barrackpore']
      },
      {
        name: 'Darjeeling',
        cities: ['Darjeeling', 'Kurseong', 'Kalimpong', 'Siliguri']
      },
      {
        name: 'Asansol',
        cities: ['Asansol', 'Durgapur', 'Raniganj', 'Kulti']
      }
    ]
  }
];

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleLanguageChange = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict('');
    setSelectedCity('');
  };

  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrict(districtName);
    setSelectedCity('');
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
  };

  const getCurrentDistricts = () => {
    const state = states.find(s => s.name === selectedState);
    return state ? state.districts : [];
  };

  const getCurrentCities = () => {
    const state = states.find(s => s.name === selectedState);
    const district = state?.districts.find(d => d.name === selectedDistrict);
    return district ? district.cities : [];
  };

  return (
    <header className="bg-green-700 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="p-2 rounded-md hover:bg-green-600 transition-colors mr-2"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <Sun size={28} className="text-amber-300 mr-2" />
              <h1 className="text-xl font-bold">Smart Krishi Assistant</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center px-3 py-2 rounded-md bg-green-600 hover:bg-green-500 transition-colors"
              >
                <MapPin size={18} className="mr-2" />
                <span>{selectedCity || selectedDistrict || selectedState || 'Select Location'}</span>
              </button>
              
              {isLocationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <select
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full p-2 rounded border border-gray-300 text-gray-700"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedState && (
                    <div className="p-3 border-b border-gray-100">
                      <select
                        value={selectedDistrict}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300 text-gray-700"
                      >
                        <option value="">Select District</option>
                        {getCurrentDistricts().map(district => (
                          <option key={district.name} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {selectedDistrict && (
                    <div className="p-3">
                      <select
                        value={selectedCity}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300 text-gray-700"
                      >
                        <option value="">Select City</option>
                        {getCurrentCities().map(city => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Voice Commands */}
            <button 
              onClick={toggleListening}
              className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-green-600 hover:bg-green-500'} transition-colors`}
              aria-label="Voice commands"
            >
              <MicIcon size={20} />
            </button>
            
            {/* Text to Speech */}
            <button 
              onClick={toggleSpeaking}
              className={`p-2 rounded-full ${isSpeaking ? 'bg-amber-500' : 'bg-green-600 hover:bg-green-500'} transition-colors`}
              aria-label="Text to speech"
            >
              <Volume2 size={20} />
            </button>
            
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-md bg-green-600 hover:bg-green-500 transition-colors">
                <span>{currentLanguage.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden transform scale-0 group-hover:scale-100 transition-transform origin-top-right z-50">
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLanguage.code === language.code
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Help Button */}
            <button className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition-colors">
              <MessageSquare size={20} />
            </button>
            
            {/* User Profile */}
            <button className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;