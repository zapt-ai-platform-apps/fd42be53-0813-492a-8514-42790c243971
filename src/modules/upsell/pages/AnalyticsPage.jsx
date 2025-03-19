import React from 'react';
import VisualizationsPanel from '@/modules/upsell/components/VisualizationsPanel';
import OpportunityTable from '@/modules/upsell/components/OpportunityTable';
import DetailView from '@/modules/upsell/components/DetailView';
import FilterPanel from '@/modules/upsell/components/FilterPanel';
import { useUpsellContext } from '@/modules/upsell/providers/UpsellDataProvider';
import { FiAlertCircle } from 'react-icons/fi';

const AnalyticsPage = () => {
  const {
    opportunities,
    customers,
    selectedOpportunity,
    selectOpportunity,
    industries,
    currentServices,
    recommendedServices,
    filterOptions,
    updateFilters
  } = useUpsellContext();

  // No need to redirect when no opportunities match the filter
  // We'll show a message instead
  const hasData = customers && customers.length > 0;
  const hasFilteredResults = opportunities && opportunities.length > 0;

  // Clear selected opportunity
  const handleCloseDetailView = () => {
    selectOpportunity(null);
  };

  // If we have no loaded data at all, show a message
  if (!hasData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <FiAlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold text-itd-navy mb-2">No Data Available</h2>
        <p className="text-gray-600 mb-4">
          Please go to the Home page and load sample data first.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-itd-teal hover:bg-itd-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itd-teal cursor-pointer"
        >
          Go to Home
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Panel */}
      <FilterPanel
        filters={filterOptions}
        onFilterChange={updateFilters}
        industries={industries}
        currentServices={currentServices}
        recommendedServices={recommendedServices}
      />
      
      {/* No Results Message - only show when we have data but no filtered results */}
      {!hasFilteredResults && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-yellow-600 mb-4">
            <FiAlertCircle className="mr-2 h-5 w-5" />
            <h3 className="text-lg font-medium">No matching opportunities found</h3>
          </div>
          <p className="text-gray-600 mb-4">
            There are no opportunities that match your current filter criteria. Try adjusting your filters to see more results.
          </p>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itd-teal cursor-pointer"
            onClick={() => updateFilters({
              industry: 'All',
              currentService: 'All',
              recommendedService: 'All',
              minRevenue: 0,
              sortBy: 'priority'
            })}
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {/* Visualizations Panel - only show when we have results */}
      {hasFilteredResults && (
        <VisualizationsPanel opportunities={opportunities} />
      )}
      
      {/* Opportunities Table - always show, the table handles empty state internally */}
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