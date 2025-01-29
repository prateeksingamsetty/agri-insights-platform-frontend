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

const AnalysisData = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analysis/latestWeeks`);

        let processedData = response.data
          .map((entry: any) => ({
            time: entry.timestamp,
            consecutive_hours_90: entry.consecutive_hours ?? null, // Renamed for display
            consecutive_hours_80: entry.continuous_uninterrupted_hours_80 ?? null, // Renamed for display
          }))
          .filter((entry: AnalysisRecord) => {
            const hour = new Date(entry.time).getHours();
            return hour === 6 || hour === 12 || hour === 18; // Keep only 6AM, 12PM, and 6PM entries
          });

        processedData = processedData.sort((a: AnalysisRecord, b: AnalysisRecord) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Ensure ascending order

        console.log("Processed Analysis Data:", processedData);
        setAnalysisData(processedData);
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
        text: 'Analysis Data - Last 2 Weeks (6AM, 12PM, 6PM)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxTicksLimit: 14, // Limit x-axis labels
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
    return <div>Loading analysis data...</div>;
  }

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-red-700">
        Analysis Data - Consecutive Hours (90%) & (80%)
      </h1>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AnalysisData;