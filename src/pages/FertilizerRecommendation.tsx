import React, { useState } from 'react';
import { Upload, Camera, X, CheckCircle, Loader2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Mock data for fertilizer recommendations
const fertilizerRecommendations = [
  {
    id: 1,
    name: 'गोबर खाद',
    description: 'यह पौधों की वृद्धि और मिट्टी की संरचना को बेहतर बनाता है।',
    application: '5-10 किग्रा प्रति 100 वर्ग मीटर',
    benefits: ['मिट्टी की उर्वरता में सुधार', 'जैविक पदार्थों में वृद्धि', 'पानी धारण क्षमता में सुधार'],
    image: 'https://images.pexels.com/photos/14436305/pexels-photo-14436305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 800,
    availability: true
  },
  {
    id: 2,
    name: 'वर्मी कंपोस्ट',
    description: 'केंचुओं द्वारा निर्मित यह कंपोस्ट सभी फसलों के लिए उत्तम है।',
    application: '3-5 किग्रा प्रति 100 वर्ग मीटर',
    benefits: ['पोषक तत्वों से भरपूर', 'पौधे की रोग प्रतिरोधक क्षमता बढ़ाए', 'लंबे समय तक प्रभावी'],
    image: 'https://images.pexels.com/photos/5748908/pexels-photo-5748908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1200,
    availability: true
  },
  {
    id: 3,
    name: 'नीम खली',
    description: 'कीट नियंत्रण के साथ-साथ पौधों को पोषक तत्व प्रदान करता है।',
    application: '2-3 किग्रा प्रति 100 वर्ग मीटर',
    benefits: ['कीटों से सुरक्षा', 'नाइट्रोजन समृद्ध', 'मिट्टी के सूक्ष्मजीवों को बढ़ावा'],
    image: 'https://images.pexels.com/photos/5605060/pexels-photo-5605060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 950,
    availability: false
  }
];

const FertilizerRecommendation: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cropDetails, setCropDetails] = useState({
    name: 'गेहूं',
    health: 'मध्यम',
    issue: 'नाइट्रोजन की कमी',
    stage: 'विकास अवस्था'
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setSelectedImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // This would typically access the device camera
    // For demo purposes, we'll use a mock image
    setSelectedImage('https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setShowResults(false);
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">उर्वरक सलाह</h1>
        <p className="text-gray-600">अपनी फसल की तस्वीर अपलोड करें और जैविक उर्वरक सलाह प्राप्त करें</p>
      </div>
      
      {/* Image Upload Section */}
      <Card className="bg-green-50 border border-green-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-800 mb-2">फसल छवि अपलोड करें</h2>
          <p className="text-gray-600 mb-6">अच्छे विश्लेषण के लिए स्पष्ट, अच्छी रोशनी वाली तस्वीर का उपयोग करें</p>
          
          {!selectedImage ? (
            <div className="flex flex-col items-center">
              <div className="flex space-x-4 mb-6">
                <div className="relative">
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-green-300 rounded-lg cursor-pointer bg-white hover:bg-green-50 transition-colors"
                  >
                    <Upload size={32} className="text-green-500 mb-2" />
                    <span className="text-sm text-gray-600">फ़ाइल चुनें</span>
                  </label>
                </div>
                
                <div>
                  <button
                    onClick={handleCameraCapture}
                    className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-green-300 rounded-lg cursor-pointer bg-white hover:bg-green-50 transition-colors"
                  >
                    <Camera size={32} className="text-green-500 mb-2" />
                    <span className="text-sm text-gray-600">कैमरा</span>
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">अधिकतम फ़ाइल आकार: 10MB</p>
            </div>
          ) : (
            <div className="relative inline-block">
              <img 
                src={selectedImage} 
                alt="Selected crop" 
                className="max-h-80 rounded-lg shadow-md" 
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X size={20} className="text-red-500" />
              </button>
              
              {!isAnalyzing && !showResults && (
                <div className="mt-4">
                  <Button 
                    onClick={analyzeImage}
                    variant="primary"
                    size="lg"
                  >
                    विश्लेषण शुरू करें
                  </Button>
                </div>
              )}
              
              {isAnalyzing && (
                <div className="mt-4 flex flex-col items-center">
                  <Loader2 size={32} className="text-green-500 animate-spin mb-2" />
                  <p className="text-green-700">छवि का विश्लेषण किया जा रहा है...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
      
      {/* Analysis Results */}
      {showResults && (
        <div className="space-y-6">
          {/* Crop Analysis */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">फसल विश्लेषण</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">पहचानी गई फसल:</p>
                  <p className="text-lg font-medium">{cropDetails.name}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">स्वास्थ्य स्थिति:</p>
                  <p className="text-lg font-medium">{cropDetails.health}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">मुख्य समस्या:</p>
                  <p className="text-lg font-medium text-amber-600">{cropDetails.issue}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">फसल अवस्था:</p>
                  <p className="text-lg font-medium">{cropDetails.stage}</p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-lg font-medium text-amber-800 mb-2">समस्या विवरण</h3>
                <p className="text-amber-700 mb-4">
                  आपकी गेहूं की फसल नाइट्रोजन की कमी से प्रभावित है। पत्तियां पीली हो रही हैं और पौधों की वृद्धि धीमी है।
                </p>
                <p className="text-amber-700">
                  <span className="font-medium">अनुशंसा:</span> जैविक नाइट्रोजन समृद्ध उर्वरक का उपयोग करें।
                </p>
              </div>
            </div>
          </Card>
          
          {/* Fertilizer Recommendations */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">अनुशंसित जैविक उर्वरक</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fertilizerRecommendations.map(fertilizer => (
                <Card key={fertilizer.id} className="h-full">
                  <div className="relative h-40 -mx-4 -mt-4 mb-4">
                    <img 
                      src={fertilizer.image} 
                      alt={fertilizer.name} 
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{fertilizer.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{fertilizer.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600">अनुप्रयोग दर:</p>
                    <p className="text-sm">{fertilizer.application}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600">लाभ:</p>
                    <ul className="list-disc list-inside text-sm">
                      {fertilizer.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-lg font-semibold">₹{fertilizer.price}<span className="text-sm text-gray-600">/क्विंटल</span></div>
                    <div className={`flex items-center ${fertilizer.availability ? 'text-green-600' : 'text-red-600'}`}>
                      {fertilizer.availability ? (
                        <>
                          <CheckCircle size={16} className="mr-1" />
                          <span className="text-sm">उपलब्ध</span>
                        </>
                      ) : (
                        <>
                          <X size={16} className="mr-1" />
                          <span className="text-sm">अस्थायी रूप से अनुपलब्ध</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant={fertilizer.availability ? "primary" : "outline"} 
                    className="w-full mt-4"
                    disabled={!fertilizer.availability}
                  >
                    {fertilizer.availability ? 'अभी खरीदें' : 'अनुपलब्ध'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Additional Tips */}
          <Card className="bg-green-50 border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 mb-4">अतिरिक्त टिप्स</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <p>जैविक उर्वरक को बीज बोने से पहले या फसल की जड़ों के पास लगाएं।</p>
              </li>
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <p>फसल की सिंचाई के बाद उर्वरक लगाएं, जिससे पोषक तत्व मिट्टी में अच्छी तरह से घुल जाएंगे।</p>
              </li>
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <p>उर्वरक लगाने के बाद खेत में पानी न दें, इससे उर्वरक के पोषक तत्व बह सकते हैं।</p>
              </li>
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <p>जैविक खेती के लिए फसल चक्र अपनाएं - इससे मिट्टी की उर्वरता बनी रहेगी।</p>
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendation;