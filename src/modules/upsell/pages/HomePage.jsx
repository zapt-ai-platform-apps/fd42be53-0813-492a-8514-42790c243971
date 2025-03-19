import React from 'react';
import { Link } from 'react-router-dom';
import DataUpload from '@/modules/upsell/components/DataUpload';
import FilterPanel from '@/modules/upsell/components/FilterPanel';
import { FiArrowRight } from 'react-icons/fi';
import { useUpsellContext } from '@/modules/upsell/providers/UpsellDataProvider';

const HomePage = () => {
  const {
    industries,
    currentServices,
    recommendedServices,
    opportunities,
    loading,
    filterOptions,
    processingSteps,
    loadData,
    updateFilters,
  } = useUpsellContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Data Upload Panel */}
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
        
        {/* Prompt to view analytics if data is loaded */}
        {opportunities.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-itd-navy mb-4">
              Data Analysis Complete
            </h2>
            <p className="text-gray-600 mb-4">
              Your data has been processed successfully. View the analytics dashboard to explore the upsell opportunities.
            </p>
            <Link
              to="/analytics"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-itd-teal hover:bg-itd-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itd-teal cursor-pointer"
            >
              View Analytics Dashboard <FiArrowRight className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;