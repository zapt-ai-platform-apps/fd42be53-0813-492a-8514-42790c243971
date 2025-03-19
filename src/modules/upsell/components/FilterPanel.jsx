import React from 'react';
import { FiFilter, FiSliders } from 'react-icons/fi';

/**
 * Component for filtering and sorting opportunities
 * @param {Object} props - Component properties
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Array} props.industries - Available industries
 * @param {Array} props.currentServices - Available current services
 * @param {Array} props.recommendedServices - Available recommended services
 * @returns {JSX.Element} - Rendered component
 */
const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  industries, 
  currentServices, 
  recommendedServices 
}) => {
  const handleFilterChange = (name, value) => {
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-itd-navy flex items-center">
          <FiFilter className="mr-2" />
          Filters & Sorting
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Industry Filter */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-itd-teal focus:border-itd-teal sm:text-sm rounded-md box-border border"
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        
        {/* Current Service Filter */}
        <div>
          <label htmlFor="currentService" className="block text-sm font-medium text-gray-700 mb-1">
            Current Service
          </label>
          <select
            id="currentService"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-itd-teal focus:border-itd-teal sm:text-sm rounded-md box-border border"
            value={filters.currentService}
            onChange={(e) => handleFilterChange('currentService', e.target.value)}
          >
            {currentServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        
        {/* Recommended Service Filter */}
        <div>
          <label htmlFor="recommendedService" className="block text-sm font-medium text-gray-700 mb-1">
            Recommended Service
          </label>
          <select
            id="recommendedService"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-itd-teal focus:border-itd-teal sm:text-sm rounded-md box-border border"
            value={filters.recommendedService}
            onChange={(e) => handleFilterChange('recommendedService', e.target.value)}
          >
            {recommendedServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        
        {/* Minimum Revenue Filter */}
        <div>
          <label htmlFor="minRevenue" className="block text-sm font-medium text-gray-700 mb-1">
            Min. Potential Revenue (£)
          </label>
          <input
            type="number"
            id="minRevenue"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-itd-teal focus:border-itd-teal sm:text-sm rounded-md box-border border"
            min="0"
            step="1000"
            value={filters.minRevenue}
            onChange={(e) => handleFilterChange('minRevenue', Number(e.target.value))}
          />
        </div>
        
        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FiSliders className="mr-1" />
            Sort By
          </label>
          <select
            id="sortBy"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-itd-teal focus:border-itd-teal sm:text-sm rounded-md box-border border"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="priority">Priority Score</option>
            <option value="revenue">Revenue Potential</option>
            <option value="confidence">Confidence</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;