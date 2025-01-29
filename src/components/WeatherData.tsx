'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeatherRecord {
  time: string;
  temperature: number | null;
  humidity: number | null;
}

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/weather/latestWeeks`);
        
        let processedData = response.data
          .map((entry: any) => ({
            time: entry.timestamp, 
            temperature: entry.measurements?.airtempavg?.value ? parseFloat(entry.measurements.airtempavg.value) : null,
            humidity: entry.measurements?.rhavg2m?.value ? parseFloat(entry.measurements.rhavg2m.value) : null
          }))
          .filter((entry: WeatherRecord) => {
            const hour = new Date(entry.time).getHours();
            return hour === 6 || hour === 12 || hour === 18; // Keep only 6AM, 12PM, and 6PM entries
          });

        processedData = processedData.sort((a: WeatherRecord, b: WeatherRecord) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Ensure ascending order

        console.log("Processed Data:", processedData);
        setWeatherData(processedData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);
  
  const timestamps = weatherData.map(entry => entry.time.split(' ')[0]);
  const temperatures = weatherData.map(entry => entry.temperature);
  const humidity = weatherData.map(entry => entry.humidity);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Temperature (°F)',
        data: temperatures,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        yAxisID: 'y-axis-temp',
      },
      {
        label: 'Relative Humidity (%)',
        data: humidity,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        yAxisID: 'y-axis-humidity',
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weather Data - Last 2 Weeks (6AM, 12PM, 6PM)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxTicksLimit: 14, // Limits the number of labels on the x-axis
        }
      },
      'y-axis-temp': {
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°F)',
        }
      },
      'y-axis-humidity': {
        position: 'right',
        title: {
          display: true,
          text: 'Relative Humidity (%)',
        },
        grid: {
          drawOnChartArea: false,
        }
      }
    }
  };

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-red-700">
        Weather Data - Temperature & Humidity
      </h1>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeatherData;
