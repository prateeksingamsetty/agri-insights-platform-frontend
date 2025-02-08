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

interface AnalysisRecord {
  time: string;
  consecutive_hours_90: number | null;
  consecutive_hours_80: number | null;
}

const RelativeHumidity = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analysis/latestWeeks`);
  
        let processedData = response.data
          .map((entry: any) => ({
            time: entry.timestamp,
            consecutive_hours_90: entry.consecutive_hours ?? null,
            consecutive_hours_80: entry.continuous_uninterrupted_hours_80 ?? null,
          }))
          .filter((entry: AnalysisRecord) => {
            const dateObj = new Date(entry.time);
            const hour = dateObj.getHours();
            return hour === 0 || hour === 6 || hour === 12 || hour === 18; // Keep only 12AM, 6AM, 12PM, 6PM
          })
          .sort((a: AnalysisRecord, b: AnalysisRecord) => new Date(a.time).getTime() - new Date(b.time).getTime());
  
        // ✅ Ensure only the last 7 days are kept, assuming 4 points per day
        const last7Days = processedData.slice(-4 * 7); 
  
        console.log("Filtered Analysis Data:", last7Days);
        setAnalysisData(last7Days);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysisData();
  }, []);
  

  const timestamps = analysisData.map(entry => entry.time.split(' ')[0]);
  const consecutiveHours_90 = analysisData.map(entry => entry.consecutive_hours_90);
  const consecutiveHours_80 = analysisData.map(entry => entry.consecutive_hours_80);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Consecutive Hours (90%)',
        data: consecutiveHours_90,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Consecutive Hours (80%)',
        data: consecutiveHours_80,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
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
        text: 'Relative Humidity - Last Week (12AM, 6AM, 12PM, 6PM)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxTicksLimit: 7, // Limit x-axis labels to 7 days
        }
      },
      y: {
        title: {
          display: true,
          text: 'Hours',
        }
      }
    }
  };

  if (loading) {
    return <div>Loading Relative Humidity...</div>;
  }

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-red-700">
      Relative Humidity - Consecutive Hours (90%) & (80%)
      </h1>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RelativeHumidity;
