import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import WaterControl from './pages/WaterControl';
import LivestockMonitoring from './pages/LivestockMonitoring';
import LocalLanguageGuide from './pages/LocalLanguageGuide';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/fertilizer" element={<FertilizerRecommendation />} />
          <Route path="/water" element={<WaterControl />} />
          <Route path="/livestock" element={<LivestockMonitoring />} />
          <Route path="/guide" element={<LocalLanguageGuide />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;