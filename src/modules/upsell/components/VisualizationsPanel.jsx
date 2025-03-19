import React from 'react';
import RevenueChart from './visualizations/RevenueChart';
import ServiceChart from './visualizations/ServiceChart';
import IndustryChart from './visualizations/IndustryChart';

/**
 * Component that combines all visualizations
 * @param {Object} props - Component properties
 * @param {Array} props.opportunities - Opportunity data
 * @returns {JSX.Element} - Rendered component
 */
const VisualizationsPanel = ({ opportunities }) => {
  if (opportunities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">
          Load sample data to view visualizations
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-itd-navy mb-4">Key Insights</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <RevenueChart opportunities={opportunities} />
        </div>
        
        <div>
          <ServiceChart opportunities={opportunities} />
        </div>
      </div>
      
      <div className="mt-8">
        <IndustryChart opportunities={opportunities} />
      </div>
    </div>
  );
};

export default VisualizationsPanel;