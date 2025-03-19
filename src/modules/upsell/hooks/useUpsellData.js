import { useState, useEffect, useRef } from 'react';
import { loadSampleData, filterOpportunities, getUniqueIndustries, getUniqueCurrentServices, getUniqueRecommendedServices } from '@/modules/data/dataUtils';
import * as Sentry from '@sentry/browser';

/**
 * Custom hook for managing upsell data state and operations
 * @returns {Object} - Data state and operations
 */
const useUpsellData = () => {
  const [customers, setCustomers] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [currentServices, setCurrentServices] = useState([]);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newlyLoaded, setNewlyLoaded] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    industry: 'All',
    currentService: 'All',
    recommendedService: 'All',
    minRevenue: 0,
    sortBy: 'priority'
  });
  
  // Track processing steps for visual feedback
  const processingSteps = useRef({
    current: false,
    progress: 0,
    message: ''
  });

  // Simulate AI processing with visual feedback
  const simulateProcessing = async (data) => {
    const steps = [
      { message: "Analyzing customer data using AI...", duration: 800 },
      { message: "Identifying upsell patterns...", duration: 1200 },
      { message: "Generating recommendations...", duration: 1000 },
      { message: "Calculating potential revenue impact...", duration: 700 },
      { message: "Finalizing results...", duration: 500 }
    ];
    
    processingSteps.current = {
      current: true,
      progress: 0,
      message: steps[0].message
    };
    
    let totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      processingSteps.current = {
        current: true,
        progress: Math.round((elapsed / totalDuration) * 100),
        message: step.message
      };
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
      elapsed += step.duration;
    }
    
    processingSteps.current = {
      current: true,
      progress: 100,
      message: "Analysis complete!"
    };
    
    // Delay final completion
    await new Promise(resolve => setTimeout(resolve, 500));
    processingSteps.current = { current: false };
    
    return data;
  };
  
  // Load sample data with simulated AI processing
  const loadData = async () => {
    setLoading(true);
    try {
      console.log('Loading sample data and simulating AI processing...');
      const data = loadSampleData();
      
      // Simulate AI processing
      await simulateProcessing(data);
      
      setCustomers(data);
      
      // Extract unique values for filter dropdowns
      setIndustries(['All', ...getUniqueIndustries(data)]);
      setCurrentServices(['All', ...getUniqueCurrentServices(data)]);
      setRecommendedServices(['All', ...getUniqueRecommendedServices(data)]);
      
      // Set initial filtered opportunities
      const filtered = filterOpportunities(data, filterOptions);
      setOpportunities(filtered);
      
      // Set the newly loaded flag to true
      setNewlyLoaded(true);
      
      console.log('Sample data processed successfully');
    } catch (error) {
      console.error('Error loading sample data:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Update filters and apply them
  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filterOptions, ...newFilters };
    setFilterOptions(updatedFilters);
    
    if (customers.length > 0) {
      console.log('Applying filters:', updatedFilters);
      try {
        const filtered = filterOpportunities(customers, updatedFilters);
        console.log(`Found ${filtered.length} opportunities matching filters`);
        setOpportunities(filtered);
      } catch (error) {
        console.error('Error applying filters:', error);
        Sentry.captureException(error);
      }
    }
  };
  
  // Select an opportunity for detail view
  const selectOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };
  
  // Reset the newly loaded flag
  const clearNewlyLoaded = () => {
    setNewlyLoaded(false);
  };
  
  // Apply filters whenever they change
  useEffect(() => {
    if (customers.length > 0) {
      try {
        console.log('Filters changed, updating opportunities');
        const filtered = filterOpportunities(customers, filterOptions);
        console.log(`Found ${filtered.length} opportunities after filter change`);
        setOpportunities(filtered);
      } catch (error) {
        console.error('Error applying filters in useEffect:', error);
        Sentry.captureException(error);
      }
    }
  }, [filterOptions, customers]);
  
  return {
    customers,
    opportunities,
    industries,
    currentServices,
    recommendedServices,
    selectedOpportunity,
    loading,
    filterOptions,
    processingSteps,
    newlyLoaded,
    loadData,
    updateFilters,
    selectOpportunity,
    clearNewlyLoaded
  };
};

export default useUpsellData;