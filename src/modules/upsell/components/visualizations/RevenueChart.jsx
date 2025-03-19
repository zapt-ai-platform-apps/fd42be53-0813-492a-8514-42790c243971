import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { getRevenueChartData, formatCurrency } from '@/modules/data/dataUtils';

// Register Chart.js components
Chart.register(...registerables);

/**
 * Component for revenue bar chart
 * @param {Object} props - Component properties
 * @param {Array} props.opportunities - Opportunity data
 * @returns {JSX.Element} - Rendered component
 */
const RevenueChart = ({ opportunities }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Clean up previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartRef.current || opportunities.length === 0) return;

    const chartData = getRevenueChartData(opportunities);
    
    // Create chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatCurrency(context.parsed.y);
              }
            }
          },
          title: {
            display: true,
            text: 'Top Upsell Opportunities by Revenue',
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
            grid: {
              display: false,
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              callback: function(value) {
                return '£' + value.toLocaleString();
              },
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

export default RevenueChart;