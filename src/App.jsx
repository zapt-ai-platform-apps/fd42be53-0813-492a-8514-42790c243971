import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/modules/core/components/Header';
import Footer from '@/modules/core/components/Footer';
import HomePage from '@/modules/upsell/pages/HomePage';
import AnalyticsPage from '@/modules/upsell/pages/AnalyticsPage';
import DataExplanationPage from '@/modules/upsell/pages/DataExplanationPage';
import UpsellDataProvider from '@/modules/upsell/providers/UpsellDataProvider';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
        <Header />
        
        <UpsellDataProvider>
          <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/data-explanation" element={<DataExplanationPage />} />
            </Routes>
          </main>
        </UpsellDataProvider>
        
        <Footer />
      </div>
    </Router>
  );
}