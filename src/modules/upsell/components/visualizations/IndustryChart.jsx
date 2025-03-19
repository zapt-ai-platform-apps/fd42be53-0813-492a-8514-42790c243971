import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { getIndustryChartData } from '@/modules/data/dataUtils';

// Register Chart.js components
Chart.register(...registerables);

/**
 * Component for industry distribution chart
 * @param {Object} props - Component properties
 * @param {Array} props.opportunities - Opportunity data
 * @returns {JSX.Element} - Rendered component
 */
const IndustryChart = ({ opportunities }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Clean up previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartRef.current || opportunities.length === 0) return;

    const chartData = getIndustryChartData(opportunities);
    
    // Create chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Opportunities by Industry',
            color: '#13232D',
            font: {
              size: 14,
              weight: 'bold',
            },
            padding: {
              bottom: 10,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              precision: 0,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [opportunities]);

  return (
    <div className="h-64">
      <canvas ref={chartRef} />
    </div>
  );
};

export default IndustryChart;