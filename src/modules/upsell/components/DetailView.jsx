import React from 'react';
import { formatCurrency } from '@/modules/data/dataUtils';
import { FiX, FiBarChart2, FiPackage, FiTruck, FiCalendar, FiMapPin } from 'react-icons/fi';

/**
 * Component for detailed view of a selected opportunity
 * @param {Object} props - Component properties
 * @param {Object} props.opportunity - Selected opportunity data
 * @param {Function} props.onClose - Function to close detail view
 * @returns {JSX.Element} - Rendered component
 */
const DetailView = ({ opportunity, onClose }) => {
  if (!opportunity) return null;

  // Calculate projected annual revenue
  const annualRevenue = opportunity.currentMonthlyRevenue * 12;
  const projectedAnnualRevenue = annualRevenue + opportunity.potentialRevenueIncrease;
  const percentageIncrease = ((opportunity.potentialRevenueIncrease / annualRevenue) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-itd-navy flex items-center">
            <span className="mr-2">Opportunity Detail: {opportunity.customerId}</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-itd-teal bg-opacity-10 text-itd-teal-dark">
              {opportunity.industry}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Profile</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FiBarChart2 className="mt-1 h-5 w-5 text-itd-teal flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Current Monthly Volume</h4>
                  <p className="text-sm text-gray-500">{opportunity.monthlyVolume.toLocaleString()} shipments</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiPackage className="mt-1 h-5 w-5 text-itd-teal flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Current Services</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {opportunity.currentServices.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiTruck className="mt-1 h-5 w-5 text-itd-teal flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Recommended Service</h4>
                  <p className="text-sm text-gray-500">{opportunity.service}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiCalendar className="mt-1 h-5 w-5 text-itd-teal flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Time as Customer</h4>
                  <p className="text-sm text-gray-500">{opportunity.timeAsCustomer} months</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiMapPin className="mt-1 h-5 w-5 text-itd-teal flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Common Destinations</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {opportunity.commonDestinations.map((destination) => (
                      <span
                        key={destination}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rationale */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Recommendation Rationale</h3>
              <div className="bg-itd-teal bg-opacity-5 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{opportunity.rationale}</p>
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Impact</h3>
            
            {/* Revenue calculation */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Current Annual Revenue</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(annualRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Potential Increase</span>
                  <span className="text-sm font-medium text-green-600">+{formatCurrency(opportunity.potentialRevenueIncrease)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">Projected Annual Revenue</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(projectedAnnualRevenue)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Percentage Increase</span>
                    <span className="text-xs font-medium text-green-600">+{percentageIncrease}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Confidence score */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Confidence Score</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                  <div
                    className={`h-4 rounded-full ${
                      opportunity.confidenceScore >= 90
                        ? 'bg-green-500'
                        : opportunity.confidenceScore >= 80
                        ? 'bg-itd-teal'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${opportunity.confidenceScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{opportunity.confidenceScore}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Based on industry benchmarks and customer data analysis
              </p>
            </div>
            
            {/* Talking points */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Account Manager Talking Points</h3>
              <ul className="space-y-2">
                {opportunity.talkingPoints.map((point, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                  >
                    <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-itd-teal bg-opacity-10 text-itd-teal text-xs font-medium mr-2">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-itd-teal hover:bg-itd-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itd-teal cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;