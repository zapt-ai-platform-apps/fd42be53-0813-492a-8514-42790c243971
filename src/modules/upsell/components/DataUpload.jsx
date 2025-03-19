import React from 'react';
import { FiUploadCloud, FiDatabase } from 'react-icons/fi';

/**
 * Component for the data upload interface
 * @param {Object} props - Component properties
 * @param {Function} props.onLoadSampleData - Function to load sample data
 * @param {Boolean} props.loading - Loading state
 * @returns {JSX.Element} - Rendered component
 */
const DataUpload = ({ onLoadSampleData, loading }) => {
  const handleFileChange = (e) => {
    // In a real implementation this would parse the CSV
    // For this demo, we'll just show an alert
    alert('This demo uses pre-loaded sample data only. File upload would be implemented in production.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-itd-navy mb-4">Data Source</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          This demo uses pre-loaded sample data. In production, this interface would accept weekly anonymized customer data exports.
        </p>
        
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
          {loading ? 'Loading...' : 'Load Sample Data'}
        </button>
      </div>
    </div>
  );
};

export default DataUpload;