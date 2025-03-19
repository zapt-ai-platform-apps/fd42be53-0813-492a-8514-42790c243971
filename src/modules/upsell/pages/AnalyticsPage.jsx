import React from 'react';
import { Navigate } from 'react-router-dom';
import VisualizationsPanel from '@/modules/upsell/components/VisualizationsPanel';
import OpportunityTable from '@/modules/upsell/components/OpportunityTable';
import DetailView from '@/modules/upsell/components/DetailView';
import { useUpsellContext } from '@/modules/upsell/providers/UpsellDataProvider';

const AnalyticsPage = () => {
  const {
    opportunities,
    selectedOpportunity,
    selectOpportunity
  } = useUpsellContext();

  // Redirect to home if no data is loaded
  if (opportunities.length === 0) {
    return <Navigate to="/" />;
  }

  // Clear selected opportunity
  const handleCloseDetailView = () => {
    selectOpportunity(null);
  };

  return (
    <div className="space-y-6">
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
      
      {/* Detail View Modal */}
      {selectedOpportunity && (
        <DetailView 
          opportunity={selectedOpportunity} 
          onClose={handleCloseDetailView} 
        />
      )}
    </div>
  );
};

export default AnalyticsPage;