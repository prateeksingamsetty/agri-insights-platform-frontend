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

interface DiseaseSeverityRecord {
  time: string;
  blight_units_S: number | null;
  blight_units_MS: number | null;
  blight_units_MR: number | null;
  severity_values: number | null;
  fungicide_units: number | null;
  blitecast_severity: number | null;
}

const DiseaseSeverity = () => {
  const [diseaseData, setDiseaseData] = useState<DiseaseSeverityRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analysis/latestWeeks`);

        let processedData = response.data
          .map((entry: any) => ({
            time: entry.timestamp,
            blight_units_S: entry.blight_units_S ?? null,
            blight_units_MS: entry.blight_units_MS ?? null,
            blight_units_MR: entry.blight_units_MR ?? null,
            severity_values: entry.severity_values ?? null,
            fungicide_units: entry.fungicide_units ?? null,
            blitecast_severity: entry.blitecast_severity ?? null,
          }))
          .filter((entry: DiseaseSeverityRecord) => {
            const hour = new Date(entry.time).getHours();
            return hour === 6 || hour === 12 || hour === 18; // Keep only 6AM, 12PM, and 6PM entries
          });

        processedData = processedData.sort((a: DiseaseSeverityRecord, b: DiseaseSeverityRecord) => 
          new Date(a.time).getTime() - new Date(b.time).getTime()
        ); // Ensure ascending order

        console.log("Processed Disease Data:", processedData);
        setDiseaseData(processedData);
      } catch (error) {
        console.error("Error fetching disease data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiseaseData();
  }, []);

  const timestamps = diseaseData.map(entry => entry.time.split(' ')[0]);
  const blightS = diseaseData.map(entry => entry.blight_units_S);
  const blightMS = diseaseData.map(entry => entry.blight_units_MS);
  const blightMR = diseaseData.map(entry => entry.blight_units_MR);
  const severityValues = diseaseData.map(entry => entry.severity_values);
  const fungicideUnits = diseaseData.map(entry => entry.fungicide_units);
  const blitecastSeverity = diseaseData.map(entry => entry.blitecast_severity);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Blight Units (S)',
        data: blightS,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Blight Units (MS)',
        data: blightMS,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Blight Units (MR)',
        data: blightMR,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Severity Values',
        data: severityValues,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Fungicide Units',
        data: fungicideUnits,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Blitecast Severity',
        data: blitecastSeverity,
        borderColor: 'rgba(0, 128, 0, 1)',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
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
        text: 'Disease Severity Data - Last 2 Weeks (6AM, 12PM, 6PM)',
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
          text: 'Severity & Blight Units',
        }
      }
    }
  };

  if (loading) {
    return <div>Loading disease severity data...</div>;
  }

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-red-700">
        Disease Severity Data - Blight Units & Severity
      </h1>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DiseaseSeverity;