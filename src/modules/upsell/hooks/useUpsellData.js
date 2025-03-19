import { useState, useEffect } from 'react';
import { loadSampleData, filterOpportunities, getUniqueIndustries, getUniqueCurrentServices, getUniqueRecommendedServices } from '@/modules/data/dataUtils';

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
  const [filterOptions, setFilterOptions] = useState({
    industry: 'All',
    currentService: 'All',
    recommendedService: 'All',
    minRevenue: 0,
    sortBy: 'priority'
  });
  
  // Load sample data
  const loadData = () => {
    setLoading(true);
    try {
      console.log('Loading sample data...');
      const data = loadSampleData();
      setCustomers(data);
      
      // Extract unique values for filter dropdowns
      setIndustries(['All', ...getUniqueIndustries(data)]);
      setCurrentServices(['All', ...getUniqueCurrentServices(data)]);
      setRecommendedServices(['All', ...getUniqueRecommendedServices(data)]);
      
      // Set initial filtered opportunities
      const filtered = filterOpportunities(data, filterOptions);
      setOpportunities(filtered);
      
      console.log('Sample data loaded successfully');
    } catch (error) {
      console.error('Error loading sample data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Update filters and apply them
  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filterOptions, ...newFilters };
    setFilterOptions(updatedFilters);
    
    if (customers.length > 0) {
      const filtered = filterOpportunities(customers, updatedFilters);
      setOpportunities(filtered);
    }
  };
  
  // Select an opportunity for detail view
  const selectOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };
  
  // Apply filters whenever they change
  useEffect(() => {
    if (customers.length > 0) {
      const filtered = filterOpportunities(customers, filterOptions);
      setOpportunities(filtered);
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
    loadData,
    updateFilters,
    selectOpportunity
  };
};

export default useUpsellData;