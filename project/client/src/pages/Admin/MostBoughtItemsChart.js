import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const MostBoughtItemsChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostBoughtItems = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/v1/product/mostboughtitems');
        const data = response.data;

        // Extracting labels and data for the chart
        const labels = data.mostBoughtItems.map(item => item._id);
        const quantities = data.mostBoughtItems.map(item => item.totalQuantity);

        // Setting chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Quantity',
              data: quantities,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching most bought items:', error);
        setLoading(false);
      }
    };

    fetchMostBoughtItems();
  }, []);

  return (
    <div>
      <h2>Most Bought Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Items',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Quantity',
                },
              },
            },
            elements: {
              point: {
                radius: 4, // Adjust the point radius as needed
                hoverRadius: 6, // Adjust the hover radius as needed
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default MostBoughtItemsChart;
