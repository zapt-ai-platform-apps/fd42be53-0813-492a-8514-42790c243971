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
  } = useUpsellContext();
  
  const navigate = useNavigate();

  // Automatically navigate to analytics page when data is loaded
  useEffect(() => {
    if (opportunities.length > 0 && !loading) {
      navigate('/analytics');
    }
  }, [opportunities.length, loading, navigate]);

  return (
    <div className="space-y-6">
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