import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">
            This demo uses static sample data to simulate AI-powered analysis. A production version would process actual customer data through our LLM to generate tailored recommendations. 
            No customer data is used in this demonstration.
          </p>
          <div className="flex justify-center items-center">
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;