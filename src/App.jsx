import React, { useEffect, useState } from 'react';
import DataUpload from '@/modules/upsell/components/DataUpload';
import FilterPanel from '@/modules/upsell/components/FilterPanel';
import OpportunityTable from '@/modules/upsell/components/OpportunityTable';
import DetailView from '@/modules/upsell/components/DetailView';
import VisualizationsPanel from '@/modules/upsell/components/VisualizationsPanel';
import useUpsellData from '@/modules/upsell/hooks/useUpsellData';
import { FiRefreshCw } from 'react-icons/fi';

export default function App() {
  const {
    opportunities,
    industries,
    currentServices,
    recommendedServices,
    selectedOpportunity,
    loading,
    filterOptions,
    processingSteps,
    loadData,
    updateFilters,
    selectOpportunity
  } = useUpsellData();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Format refresh date
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(currentDate);
  
  // Clear selected opportunity
  const handleCloseDetailView = () => {
    selectOpportunity(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-itd-navy py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              DEMO: Customer Opportunity Analyzer - For Internal Use Only
            </h1>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center text-itd-yellow text-sm">
            <FiRefreshCw className="mr-2" />
            <span>Refreshed weekly | Last update: {formattedDate}</span>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Data Upload Panel with LLM explanation */}
            <DataUpload 
              onLoadSampleData={loadData} 
              loading={loading}
              processingSteps={processingSteps}
            />
            
            {/* Filter Panel */}
            <FilterPanel
              filters={filterOptions}
              onFilterChange={updateFilters}
              industries={industries}
              currentServices={currentServices}
              recommendedServices={recommendedServices}
            />
            
            {/* Data Loaded State */}
            {opportunities.length > 0 && (
              <>
                {/* Visualizations Panel */}
                <VisualizationsPanel opportunities={opportunities} />
                
                {/* Opportunities Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-itd-navy mb-4">
                    Customer Upsell Opportunities
                  </h2>
                  <OpportunityTable 
                    opportunities={opportunities} 
                    onSelectOpportunity={selectOpportunity} 
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="container mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              This demo uses static sample data to simulate AI-powered analysis. A production version would process actual customer data through our LLM to generate tailored recommendations. 
              No customer data is used in this demonstration.
            </p>
            <div className="flex justify-center items-center">
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Made on ZAPT
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Detail View Modal */}
      {selectedOpportunity && (
        <DetailView 
          opportunity={selectedOpportunity} 
          onClose={handleCloseDetailView} 
        />
      )}
    </div>
  );
}