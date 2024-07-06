'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface DairyPriceRecord {
  _id: string
  report_month: string
  report_year: string
  MarketingArea: string
  order_no: string
  ClassIWhole: number
  ClassIIWhole: number
  ClassIIIWhole: number
  ClassIVWhole: number
  market_type: string
  published_date: string
}

const DairyPrices = () => {
  const [chartData, setChartData] = useState({
    ClassIWhole: [] as number[],
    ClassIIWhole: [] as number[],
    ClassIIIWhole: [] as number[],
    ClassIVWhole: [] as number[]
  })

  const [labels, setLabels] = useState<string[]>([])
  const [view, setView] = useState<'1year' | '5years'>('1year')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DairyPriceRecord[]>(
          'http://localhost:3000/dairyPrices/allPrices'
        )
        const data = response.data

        const classIWhole: number[] = []
        const classIIWhole: number[] = []
        const classIIIWhole: number[] = []
        const classIVWhole: number[] = []
        const labels: string[] = []

        data.forEach(record => {
          labels.push(`${record.report_month} ${record.report_year}`)
          classIWhole.push(record.ClassIWhole)
          classIIWhole.push(record.ClassIIWhole)
          classIIIWhole.push(record.ClassIIIWhole)
          classIVWhole.push(record.ClassIVWhole)
        })

        setChartData({
          ClassIWhole: classIWhole,
          ClassIIWhole: classIIWhole,
          ClassIIIWhole: classIIIWhole,
          ClassIVWhole: classIVWhole
        })

        setLabels(labels)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [view])

  const filterData = (data: DairyPriceRecord[]) => {
    const now = new Date()
    const cutoffDate = new Date()

    if (view === '1year') {
      cutoffDate.setFullYear(now.getFullYear() - 1)
    } else if (view === '5years') {
      cutoffDate.setFullYear(now.getFullYear() - 5)
    }

    return data.filter(record => {
      const recordDate = new Date(
        `${record.report_year}-${record.report_month}-01`
      )
      return recordDate >= cutoffDate
    })
  }

  const createChart = (data: number[], label: string) => {
    return {
      labels,
      datasets: [
        {
          label: label,
          data,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          fill: true
        }
      ]
    }
  }

  return (
    <div className='rounded-lg bg-gray-100 p-6 shadow-md'>
      <h1 className='mb-6 text-center text-2xl font-bold text-red-700'>
        Dairy Prices
      </h1>
      <div className='space-y-8'>
        <div>
          <h2 className='mb-2 text-xl font-semibold text-gray-800'>
            Class I Whole Milk
          </h2>
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <Line data={createChart(chartData.ClassIWhole, 'Class I Whole')} />
          </div>
        </div>
        <div>
          <h2 className='mb-2 text-xl font-semibold text-gray-800'>
            Class II Whole Milk
          </h2>
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <Line
              data={createChart(chartData.ClassIIWhole, 'Class II Whole')}
            />
          </div>
        </div>
        <div>
          <h2 className='mb-2 text-xl font-semibold text-gray-800'>
            Class III Whole Milk
          </h2>
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <Line
              data={createChart(chartData.ClassIIIWhole, 'Class III Whole')}
            />
          </div>
        </div>
        <div>
          <h2 className='mb-2 text-xl font-semibold text-gray-800'>
            Class IV Whole Milk
          </h2>
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <Line
              data={createChart(chartData.ClassIVWhole, 'Class IV Whole')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DairyPrices
