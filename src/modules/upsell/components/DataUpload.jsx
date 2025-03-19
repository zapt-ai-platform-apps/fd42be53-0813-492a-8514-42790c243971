import React from 'react';
import { FiUploadCloud, FiDatabase, FiZap } from 'react-icons/fi';

/**
 * Component for the data upload interface
 * @param {Object} props - Component properties
 * @param {Function} props.onLoadSampleData - Function to load sample data
 * @param {Boolean} props.loading - Loading state
 * @param {Object} props.processingSteps - Current processing state
 * @returns {JSX.Element} - Rendered component
 */
const DataUpload = ({ onLoadSampleData, loading, processingSteps }) => {
  const handleFileChange = (e) => {
    // In a real implementation this would parse the CSV
    alert('This demo uses pre-loaded sample data only. File upload would be implemented in production.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-itd-navy mb-4">Data Source</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          This demo simulates an LLM-powered recommendation engine that analyzes customer data to identify upsell opportunities.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">How This Works:</h3>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal pl-5">
            <li>You upload anonymized customer data</li>
            <li>Our AI analyzes shipping patterns and service utilization</li>
            <li>The system identifies underserved needs based on industry patterns</li>
            <li>Recommendations are generated with potential revenue impact</li>
            <li>Results are displayed in order of opportunity size</li>
          </ol>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">Key Benefits:</h3>
          <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
            <li><span className="font-medium">No pre-processing required:</span> ITD only needs to export basic data</li>
            <li><span className="font-medium">Privacy preserved:</span> All processing happens within the app, using only anonymized data</li>
            <li><span className="font-medium">Intelligence in the app:</span> The recommendation intelligence comes from the LLM integration</li>
            <li><span className="font-medium">Up-to-date insights:</span> Each new upload generates fresh recommendations based on current data</li>
            <li><span className="font-medium">Zero configuration:</span> No need to set up complex rules or algorithms on ITD's side</li>
          </ul>
        </div>
        
        {/* File upload area (for display only) */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop a CSV file here, or click to select a file
          </p>
          <label 
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={handleFileChange}
            />
            Select CSV
          </label>
        </div>
      </div>
      
      {/* Sample data button */}
      <div className="text-center">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-itd-teal hover:bg-itd-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itd-teal cursor-pointer"
          onClick={onLoadSampleData}
          disabled={loading}
        >
          <FiDatabase className="mr-2" />
          {loading ? 'Processing...' : 'Load Sample Data'}
        </button>
      </div>
      
      {/* Processing steps */}
      {processingSteps && processingSteps.current && (
        <div className="mt-4 p-4 bg-itd-teal bg-opacity-5 rounded-lg">
          <div className="flex items-center mb-2">
            <FiZap className="mr-2 text-itd-teal" />
            <h3 className="text-md font-medium text-itd-navy">AI Processing</h3>
          </div>
          <p className="text-sm text-itd-teal-dark font-medium">
            {processingSteps.message}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-itd-teal h-2 rounded-full transition-all duration-500"
              style={{ width: `${processingSteps.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataUpload;