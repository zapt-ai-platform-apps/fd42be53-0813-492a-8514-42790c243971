import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiRefreshCw, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [currentDate] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Format refresh date
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(currentDate);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-itd-navy py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-between w-full sm:w-auto">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            DEMO: Customer Opportunity Analyzer - For Internal Use Only
          </h1>
          <button 
            className="sm:hidden text-white cursor-pointer" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:block mt-4 sm:mt-0`}>
          <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <li>
              <Link 
                to="/" 
                className={`text-white hover:text-itd-yellow ${location.pathname === '/' ? 'text-itd-yellow font-medium' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/analytics" 
                className={`text-white hover:text-itd-yellow ${location.pathname === '/analytics' ? 'text-itd-yellow font-medium' : ''}`}
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link 
                to="/data-explanation" 
                className={`text-white hover:text-itd-yellow ${location.pathname === '/data-explanation' ? 'text-itd-yellow font-medium' : ''}`}
              >
                Data Guide
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mt-2 sm:mt-0 flex items-center text-itd-yellow text-sm">
          <FiRefreshCw className="mr-2" />
          <span>Refreshed weekly | Last update: {formattedDate}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;