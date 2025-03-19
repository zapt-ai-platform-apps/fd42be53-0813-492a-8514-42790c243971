import sampleData from './sampleData';
import * as Sentry from '@sentry/browser';

/**
 * Calculate priority score based on revenue potential and confidence
 * @param {Object} opportunity - The opportunity object
 * @returns {Number} - Priority score
 */
export const calculatePriorityScore = (opportunity) => {
  const revenue = opportunity.potentialRevenueIncrease;
  const confidence = opportunity.confidenceScore;
  // Weight revenue more heavily than confidence
  return (revenue * 0.7) + (confidence * 300);
};

/**
 * Extract all unique industries from the data
 * @param {Array} customers - Array of customer data
 * @returns {Array} - Unique industries
 */
export const getUniqueIndustries = (customers) => {
  const industries = new Set();
  customers.forEach(customer => {
    industries.add(customer.industry);
  });
  return [...industries].sort();
};

/**
 * Extract all unique current services from the data
 * @param {Array} customers - Array of customer data
 * @returns {Array} - Unique current services
 */
export const getUniqueCurrentServices = (customers) => {
  const services = new Set();
  customers.forEach(customer => {
    customer.currentServices.forEach(service => {
      services.add(service);
    });
  });
  return [...services].sort();
};

/**
 * Extract all unique recommended services from the data
 * @param {Array} customers - Array of customer data
 * @returns {Array} - Unique recommended services
 */
export const getUniqueRecommendedServices = (customers) => {
  const services = new Set();
  customers.forEach(customer => {
    customer.upsellOpportunities.forEach(opportunity => {
      services.add(opportunity.service);
    });
  });
  return [...services].sort();
};

/**
 * Get the top opportunities by revenue potential
 * @param {Array} customers - Array of customer data
 * @param {Number} limit - Number of opportunities to return
 * @returns {Array} - Top opportunities with customer info
 */
export const getTopOpportunitiesByRevenue = (customers, limit = 15) => {
  // First, create a flat list of opportunities with customer info
  const allOpportunities = customers.flatMap(customer => {
    return customer.upsellOpportunities.map(opportunity => ({
      customerId: customer.id,
      industry: customer.industry,
      currentServices: customer.currentServices,
      monthlyVolume: customer.monthlyVolume,
      currentMonthlyRevenue: customer.currentMonthlyRevenue,
      commonDestinations: customer.commonDestinations,
      timeAsCustomer: customer.timeAsCustomer,
      ...opportunity,
      priorityScore: calculatePriorityScore(opportunity)
    }));
  });
  
  // Sort by revenue potential and return top N
  return allOpportunities
    .sort((a, b) => b.potentialRevenueIncrease - a.potentialRevenueIncrease)
    .slice(0, limit);
};

/**
 * Filter opportunities based on selected criteria
 * @param {Array} customers - Array of customer data
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered opportunities with customer info
 */
export const filterOpportunities = (customers, filters) => {
  try {
    // Create flat list of opportunities with customer info
    let opportunities = customers.flatMap(customer => {
      return customer.upsellOpportunities.map(opportunity => ({
        customerId: customer.id,
        industry: customer.industry,
        currentServices: customer.currentServices,
        monthlyVolume: customer.monthlyVolume,
        currentMonthlyRevenue: customer.currentMonthlyRevenue,
        commonDestinations: customer.commonDestinations,
        timeAsCustomer: customer.timeAsCustomer,
        ...opportunity,
        priorityScore: calculatePriorityScore(opportunity)
      }));
    });
    
    // Debug log initial count
    console.log(`Initial opportunities count: ${opportunities.length}`);
    
    // Apply industry filter
    if (filters.industry && filters.industry !== 'All') {
      opportunities = opportunities.filter(opp => opp.industry === filters.industry);
      console.log(`After industry filter (${filters.industry}): ${opportunities.length} opportunities`);
    }
    
    // Apply current service filter
    if (filters.currentService && filters.currentService !== 'All') {
      opportunities = opportunities.filter(opp => 
        Array.isArray(opp.currentServices) && 
        opp.currentServices.includes(filters.currentService)
      );
      console.log(`After current service filter (${filters.currentService}): ${opportunities.length} opportunities`);
    }
    
    // Apply recommended service filter
    if (filters.recommendedService && filters.recommendedService !== 'All') {
      opportunities = opportunities.filter(opp => opp.service === filters.recommendedService);
      console.log(`After recommended service filter (${filters.recommendedService}): ${opportunities.length} opportunities`);
    }
    
    // Apply minimum revenue filter
    if (filters.minRevenue && filters.minRevenue > 0) {
      opportunities = opportunities.filter(opp => 
        opp.potentialRevenueIncrease >= filters.minRevenue
      );
      console.log(`After min revenue filter (${filters.minRevenue}): ${opportunities.length} opportunities`);
    }
    
    // Apply sort
    if (filters.sortBy === 'revenue') {
      opportunities.sort((a, b) => b.potentialRevenueIncrease - a.potentialRevenueIncrease);
    } else if (filters.sortBy === 'confidence') {
      opportunities.sort((a, b) => b.confidenceScore - a.confidenceScore);
    } else if (filters.sortBy === 'priority') {
      opportunities.sort((a, b) => b.priorityScore - a.priorityScore);
    }
    
    console.log(`Returning ${opportunities.length} filtered opportunities`);
    return opportunities;
  } catch (error) {
    console.error('Error in filterOpportunities:', error);
    Sentry.captureException(error);
    // Return empty array as fallback to prevent app crash
    return [];
  }
};

/**
 * Load sample data for the app
 * @returns {Object} - Sample customer data
 */
export const loadSampleData = () => {
  return sampleData.customers;
};

/**
 * Get data for revenue chart
 * @param {Array} opportunities - Array of opportunity data
 * @param {Number} limit - Number of items to include in chart
 * @returns {Object} - Formatted data for chart
 */
export const getRevenueChartData = (opportunities, limit = 10) => {
  // Sort by revenue and take top N
  const topOpportunities = [...opportunities]
    .sort((a, b) => b.potentialRevenueIncrease - a.potentialRevenueIncrease)
    .slice(0, limit);
    
  return {
    labels: topOpportunities.map(opp => opp.customerId),
    datasets: [{
      label: 'Potential Annual Revenue (£)',
      data: topOpportunities.map(opp => opp.potentialRevenueIncrease),
      backgroundColor: '#04A2AB',
    }]
  };
};

/**
 * Get data for service type pie chart
 * @param {Array} opportunities - Array of opportunity data
 * @returns {Object} - Formatted data for chart
 */
export const getServiceChartData = (opportunities) => {
  // Count by service type
  const serviceCount = {};
  opportunities.forEach(opp => {
    if (!serviceCount[opp.service]) {
      serviceCount[opp.service] = 0;
    }
    serviceCount[opp.service]++;
  });
  
  // Generate colors for each service
  const colors = [
    '#16606C', '#04A2AB', '#FBE23C', '#15515D', 
    '#13232D', '#81D8D0', '#FFF68F', '#1A7F8A'
  ];
  
  return {
    labels: Object.keys(serviceCount),
    datasets: [{
      data: Object.values(serviceCount),
      backgroundColor: colors.slice(0, Object.keys(serviceCount).length),
    }]
  };
};

/**
 * Get data for industry distribution chart
 * @param {Array} opportunities - Array of opportunity data
 * @returns {Object} - Formatted data for chart
 */
export const getIndustryChartData = (opportunities) => {
  // Count by industry
  const industryCount = {};
  opportunities.forEach(opp => {
    if (!industryCount[opp.industry]) {
      industryCount[opp.industry] = 0;
    }
    industryCount[opp.industry]++;
  });
  
  // Sort by count (descending)
  const sortedIndustries = Object.entries(industryCount)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
  
  const sortedCounts = sortedIndustries
    .map(industry => industryCount[industry]);
  
  // Generate colors
  const colors = [
    '#04A2AB', '#15515D', '#16606C', '#FBE23C', 
    '#13232D', '#81D8D0', '#1A7F8A', '#FFF68F'
  ];
  
  return {
    labels: sortedIndustries,
    datasets: [{
      label: 'Opportunities',
      data: sortedCounts,
      backgroundColor: colors.slice(0, sortedIndustries.length),
    }]
  };
};

/**
 * Format currency values
 * @param {Number} value - Value to format
 * @returns {String} - Formatted currency string
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(value);
};