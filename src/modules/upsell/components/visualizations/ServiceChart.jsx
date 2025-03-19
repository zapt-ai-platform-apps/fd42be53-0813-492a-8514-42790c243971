import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { getServiceChartData } from '@/modules/data/dataUtils';

// Register Chart.js components
Chart.register(...registerables);

/**
 * Component for service distribution pie chart
 * @param {Object} props - Component properties
 * @param {Array} props.opportunities - Opportunity data
 * @returns {JSX.Element} - Rendered component
 */
const ServiceChart = ({ opportunities }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Clean up previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartRef.current || opportunities.length === 0) return;

    const chartData = getServiceChartData(opportunities);
    
    // Create chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 15,
              font: {
                size: 11,
              },
            },
          },
          title: {
            display: true,
            text: 'Opportunities by Service Type',
            color: '#13232D',
            font: {
              size: 14,
              weight: 'bold',
            },
            padding: {
              bottom: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
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

export default ServiceChart;