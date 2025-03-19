import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataUpload from '@/modules/upsell/components/DataUpload';
import { useUpsellContext } from '@/modules/upsell/providers/UpsellDataProvider';

const HomePage = () => {
  const {
    opportunities,
    loading,
    processingSteps,
    loadData,
    newlyLoaded,
    clearNewlyLoaded
  } = useUpsellContext();
  
  const navigate = useNavigate();

  // Only navigate to analytics page when data is freshly loaded
  useEffect(() => {
    if (opportunities.length > 0 && !loading && newlyLoaded) {
      // Clear the newly loaded flag before navigating
      clearNewlyLoaded();
      navigate('/analytics');
    }
  }, [opportunities.length, loading, navigate, newlyLoaded, clearNewlyLoaded]);

  return (
    <div className="space-y-6">
      {opportunities.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold text-itd-navy mb-2">Data Already Loaded</h2>
          <p className="text-gray-600 mb-4">
            You already have data loaded and analyzed. You can either continue working with this data 
            or load a new dataset.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/analytics')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-itd-teal hover:bg-itd-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itd-teal cursor-pointer"
            >
              View Analytics
            </button>
            <button
              onClick={loadData}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itd-teal cursor-pointer"
            >
              Reset & Load New Data
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6">
        {/* Data Upload Panel */}
        <DataUpload 
          onLoadSampleData={loadData} 
          loading={loading}
          processingSteps={processingSteps}
        />
      </div>
    </div>
  );
};

export default HomePage;