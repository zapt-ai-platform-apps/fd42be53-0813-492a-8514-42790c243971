import React from 'react';
import { formatCurrency } from '@/modules/data/dataUtils';
import { FiExternalLink } from 'react-icons/fi';

/**
 * Component for displaying the opportunity table
 * @param {Object} props - Component properties
 * @param {Array} props.opportunities - Opportunity data
 * @param {Function} props.onSelectOpportunity - Function to select an opportunity
 * @returns {JSX.Element} - Rendered component
 */
const OpportunityTable = ({ opportunities, onSelectOpportunity }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-itd-navy">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Customer ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Industry
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Current Services
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Recommended Service
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Revenue Impact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Confidence
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunities.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No opportunities found. Try adjusting your filters or load sample data.
                </td>
              </tr>
            ) : (
              opportunities.slice(0, 20).map((opportunity, index) => (
                <tr 
                  key={`${opportunity.customerId}-${opportunity.service}`}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {opportunity.customerId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opportunity.industry}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {opportunity.currentServices.map((service) => (
                        <span 
                          key={service} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-itd-teal bg-opacity-10 text-itd-teal-dark">
                      {opportunity.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {formatCurrency(opportunity.potentialRevenueIncrease)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            opportunity.confidenceScore >= 90
                              ? 'bg-green-500'
                              : opportunity.confidenceScore >= 80
                              ? 'bg-itd-teal'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${opportunity.confidenceScore}%` }}
                        ></div>
                      </div>
                      <span>{opportunity.confidenceScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onSelectOpportunity(opportunity)}
                      className="text-itd-teal hover:text-itd-teal-dark flex items-center cursor-pointer"
                    >
                      View Details <FiExternalLink className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityTable;