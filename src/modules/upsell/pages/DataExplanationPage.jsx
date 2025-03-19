import React from 'react';
import { FiDatabase, FiShield, FiLayers, FiTrendingUp, FiUsers, FiPackage, FiFileText } from 'react-icons/fi';

const DataExplanationPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-itd-navy mb-4 flex items-center">
          <FiDatabase className="mr-2" />
          Understanding Anonymized Customer Data
        </h2>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            This system analyzes anonymized customer shipping data to identify high-potential upselling opportunities.
            The data is processed securely and contains no personally identifiable information. 
            Here's what the anonymized data typically includes:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-medium text-itd-teal-dark mb-3">
                <FiShield className="mr-2" />
                Data Security & Privacy
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Customer IDs are anonymized with random identifiers</li>
                <li>No personal or contact information is used</li>
                <li>All processing happens within the secure application</li>
                <li>Only aggregated insights are displayed</li>
                <li>Raw data is never stored or transmitted outside the system</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-medium text-itd-teal-dark mb-3">
                <FiLayers className="mr-2" />
                Data Structure
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Customer metadata (industry, relationship length)</li>
                <li>Shipping volume and patterns</li>
                <li>Current service utilization</li>
                <li>Revenue information</li>
                <li>Destination patterns</li>
                <li>Historical service changes</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-itd-navy mb-4">Sample Data Structure</h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Value</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customer ID</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CUST-1042</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Anonymized unique identifier</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Industry</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fashion</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Customer's business sector</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Time as Customer</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14 months</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Duration of customer relationship</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Current Services</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">["Domestic Parcel", "Returns Management"]</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Services currently used by the customer</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Volume</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,200</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Number of monthly shipments</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Revenue</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£18,500</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Current monthly revenue from customer</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Common Destinations</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">["UK", "Ireland"]</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Most frequent shipping destinations</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-medium text-itd-teal-dark mb-3">
                <FiTrendingUp className="mr-2" />
                AI Analysis Process
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-600">
                <li>Upload anonymized customer data</li>
                <li>AI analyzes shipping patterns and service usage</li>
                <li>System compares against industry benchmarks</li>
                <li>Algorithm identifies underserved needs</li>
                <li>Revenue potential is calculated</li>
                <li>Confidence scores are assigned based on correlation strength</li>
                <li>Opportunities are ranked by potential impact</li>
              </ol>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-medium text-itd-teal-dark mb-3">
                <FiUsers className="mr-2" />
                Use Cases
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-medium">Account Management:</span> Identify growth opportunities in existing accounts</li>
                <li><span className="font-medium">Sales Planning:</span> Prioritize accounts with highest upsell potential</li>
                <li><span className="font-medium">Industry Strategy:</span> Understand service patterns by industry</li>
                <li><span className="font-medium">Product Development:</span> Identify service gaps across customer base</li>
                <li><span className="font-medium">Customer Retention:</span> Enhance service offerings for at-risk accounts</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-itd-teal bg-opacity-5 p-4 rounded-lg mb-6">
            <h3 className="flex items-center text-lg font-medium text-itd-teal-dark mb-3">
              <FiPackage className="mr-2" />
              Example AI-Generated Recommendation
            </h3>
            <div className="mb-3">
              <p className="text-gray-600 font-medium">Customer: CUST-1042 (Fashion industry)</p>
              <p className="text-gray-600">Current Services: Domestic Parcel, Returns Management</p>
              <p className="text-gray-600">Opportunity: International Express</p>
            </div>
            <div className="p-3 bg-white rounded-lg mb-2">
              <p className="text-gray-700 italic">
                "85% of Fashion retailers with similar volume utilize International Express for EU destinations. Adding this service could increase annual revenue by £12,500 with high confidence (87%)."
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <p>The AI has identified that similarly sized fashion retailers typically use International Express, suggesting this customer has an unmet need that could generate additional revenue.</p>
            </div>
          </div>
          
          <div className="flex items-start bg-gray-50 p-4 rounded-lg">
            <FiFileText className="mt-1 h-5 w-5 text-itd-teal-dark flex-shrink-0" />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-itd-teal-dark mb-2">GDPR and Data Protection Compliance</h3>
              <p className="text-gray-600">
                This tool is designed with privacy and data protection at its core. All data processing follows GDPR principles, including data minimization, purpose limitation, and privacy by design. The system only requires anonymized, aggregated data and does not process or store any personally identifiable information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplanationPage;