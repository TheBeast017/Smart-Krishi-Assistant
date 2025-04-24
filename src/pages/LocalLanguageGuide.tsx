import React, { useState } from 'react';
import { Play, Volume2, BookOpen, Info, MessageCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

interface GuideSection {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  steps: Array<{
    text: string;
    image?: string;
  }>;
}

const guideSections: GuideSection[] = [
  {
    id: 1,
    title: 'फसल बाजार का उपयोग कैसे करें',
    description: 'फसल बाजार में अपनी फसल बेचने और वर्तमान मूल्य देखने के लिए गाइड।',
    videoUrl: 'https://example.com/videos/crop-marketplace',
    steps: [
      {
        text: 'मुख्य स्क्रीन से "फसल बाजार" पर क्लिक करें।',
        image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'अपनी फसल को खोजने के लिए खोज बार का उपयोग करें या श्रेणियों से चुनें।',
        image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'वर्तमान मूल्य और सुझाव देखें।',
        image: 'https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'बेचने के लिए "सूचीबद्ध करें" बटन पर क्लिक करें और अपनी फसल के विवरण दर्ज करें।',
        image: 'https://images.pexels.com/photos/4173310/pexels-photo-4173310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  {
    id: 2,
    title: 'उर्वरक सलाह प्राप्त करना',
    description: 'अपनी फसल की तस्वीर अपलोड करके जैविक उर्वरक सलाह प्राप्त करें।',
    videoUrl: 'https://example.com/videos/fertilizer-recommendation',
    steps: [
      {
        text: 'मुख्य स्क्रीन से "उर्वरक सलाह" पर क्लिक करें।',
        image: 'https://images.pexels.com/photos/5417640/pexels-photo-5417640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'अपनी फसल की स्पष्ट तस्वीर लेने के लिए कैमरा बटन का उपयोग करें या गैलरी से अपलोड करें।',
        image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: '"विश्लेषण शुरू करें" बटन पर क्लिक करें और परिणामों की प्रतीक्षा करें।',
        image: 'https://images.pexels.com/photos/5503275/pexels-photo-5503275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'अनुशंसित जैविक उर्वरक और उनके उपयोग के निर्देश देखें।',
        image: 'https://images.pexels.com/photos/5426989/pexels-photo-5426989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  {
    id: 3,
    title: 'पानी प्रबंधन प्रणाली',
    description: 'अपने खेत के सिंचाई वॉल्व को नियंत्रित करने के लिए निर्देश।',
    videoUrl: 'https://example.com/videos/water-management',
    steps: [
      {
        text: 'मुख्य स्क्रीन से "पानी प्रबंधन" पर क्लिक करें।',
        image: 'https://images.pexels.com/photos/1068349/pexels-photo-1068349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'वॉल्व की स्थिति और पानी के स्तर को चेक करें।',
        image: 'https://images.pexels.com/photos/1662770/pexels-photo-1662770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'वॉल्व को चालू या बंद करने के लिए टॉगल बटन पर क्लिक करें।',
        image: 'https://images.pexels.com/photos/6185445/pexels-photo-6185445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        text: 'सिंचाई शेड्यूल सेट करने के लिए "शेड्यूल" बटन का उपयोग करें।',
        image: 'https://images.pexels.com/photos/4439426/pexels-photo-4439426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  }
];

const LocalLanguageGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<GuideSection | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTextToSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // In a real app, this would trigger text-to-speech functionality
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">ऐप उपयोग गाइड</h1>
        <p className="text-gray-600">ऐप के सभी फीचर्स का उपयोग करने के विस्तृत निर्देश</p>
      </div>
      
      {/* Guide Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guideSections.map((section) => (
          <Card
            key={section.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveSection(section)}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{section.description}</p>
              <div className="mt-auto flex items-center text-green-700">
                <BookOpen size={16} className="mr-2" />
                <span>गाइड देखें</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Active Section Details */}
      {activeSection && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-green-800">{activeSection.title}</h2>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleTextToSpeech}
                  icon={<Volume2 size={16} />}
                >
                  {isSpeaking ? 'आवाज बंद करें' : 'सुनें'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveSection(null)}
                >
                  बंद करें
                </Button>
              </div>
            </div>
            <p className="text-green-700 mt-2">{activeSection.description}</p>
          </div>
          
          {/* Video tutorial */}
          {activeSection.videoUrl && (
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold mb-3">वीडियो ट्यूटोरियल</h3>
              <div className="relative h-56 md:h-72 bg-black rounded-lg overflow-hidden">
                {/* This would be a video player in a real app */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    variant="secondary" 
                    icon={<Play size={24} />}
                    onClick={handlePlayVideo}
                  >
                    {isPlaying ? 'रुकें' : 'चलाएं'}
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step by step guide */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">चरण-दर-चरण निर्देश</h3>
            <div className="space-y-6">
              {activeSection.steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4 md:w-1/3">
                    {step.image && (
                      <img 
                        src={step.image} 
                        alt={`Step ${index + 1}`} 
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <h4 className="font-medium">चरण {index + 1}</h4>
                    </div>
                    <p className="text-gray-700">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tips */}
          <div className="p-4 bg-blue-50">
            <div className="flex">
              <Info size={24} className="text-blue-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">उपयोगी टिप्स</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>अधिक सहायता के लिए स्क्रीन के ऊपरी दाएं कोने में स्थित माइक बटन का उपयोग करके वॉयस कमांड का उपयोग करें।</li>
                  <li>आपकी सुविधा के लिए, ऐप ऑफलाइन मोड में भी काम करता है।</li>
                  <li>किसी भी आपात स्थिति के लिए साइडबार पर लाल "आपातकालीन सहायता" बटन का उपयोग करें।</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Community Help */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-start">
              <MessageCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">समुदाय से सहायता प्राप्त करें</h3>
                <p className="text-gray-700 mb-4">क्या आपको अभी भी सहायता की आवश्यकता है? हमारे समुदाय मंच का उपयोग करके अन्य किसानों से पूछें।</p>
                <Button variant="outline" icon={<MessageCircle size={18} />}>
                  समुदाय मंच पर जाएं
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-50 border-b border-green-100 p-4">
          <h2 className="text-xl font-semibold text-green-800">अक्सर पूछे जाने वाले प्रश्न</h2>
        </div>
        
        <div className="p-4 divide-y divide-gray-100">
          <div className="py-4">
            <h3 className="font-semibold mb-2">क्या मैं इस ऐप का उपयोग बिना इंटरनेट के कर सकता हूं?</h3>
            <p className="text-gray-700">
              हां, यह ऐप ऑफलाइन मोड में काम करता है। आप फिर से ऑनलाइन होने पर डेटा अपने आप सिंक हो जाएगा।
            </p>
          </div>
          
          <div className="py-4">
            <h3 className="font-semibold mb-2">मैं अपनी भाषा कैसे बदलूं?</h3>
            <p className="text-gray-700">
              स्क्रीन के ऊपर दाएं कोने में भाषा बटन पर क्लिक करें और अपनी पसंदीदा भाषा चुनें।
            </p>
          </div>
          
          <div className="py-4">
            <h3 className="font-semibold mb-2">क्या मैं वॉयस कमांड का उपयोग कर सकता हूं?</h3>
            <p className="text-gray-700">
              हां, सभी फीचर्स को नियंत्रित करने के लिए स्क्रीन के ऊपर स्थित माइक बटन पर क्लिक करें और अपना निर्देश बोलें।
            </p>
          </div>
          
          <div className="py-4">
            <h3 className="font-semibold mb-2">मुझे अपनी फसल के लिए उर्वरक सलाह कैसे मिलेगी?</h3>
            <p className="text-gray-700">
              "उर्वरक सलाह" अनुभाग में जाएं, अपनी फसल की तस्वीर अपलोड करें, और ऐप आपको उपयुक्त जैविक उर्वरक की सलाह देगा।
            </p>
          </div>
          
          <div className="py-4">
            <h3 className="font-semibold mb-2">मैं पशुधन निगरानी कैमरे कैसे सेट करूं?</h3>
            <p className="text-gray-700">
              आपको पहले IoT कैमरा सेट करना होगा, फिर "पशुधन निगरानी" अनुभाग में जाकर "नया कैमरा जोड़ें" विकल्प चुनें और निर्देशों का पालन करें।
            </p>
          </div>
        </div>
      </div>
      
      {/* Additional Help */}
      <div className="bg-green-50 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-green-800 mb-4">अतिरिक्त सहायता की आवश्यकता है?</h2>
        <p className="text-green-700 mb-6">
          हमारा सहायता टीम आपकी मदद के लिए उपलब्ध है। हम सुबह 9 बजे से शाम 6 बजे तक, सप्ताह के सभी दिनों में उपलब्ध हैं।
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button variant="primary" size="lg">
            सहायता से संपर्क करें
          </Button>
          <Button variant="outline" size="lg">
            वीडियो ट्यूटोरियल देखें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocalLanguageGuide;