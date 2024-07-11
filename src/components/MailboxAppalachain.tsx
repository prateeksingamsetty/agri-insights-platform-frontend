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

interface MailboxAppalachainPriceRecord {
  _id: string
  report_month: string
  report_year: number
  Reporting_Area: string
  Jan: string
  Feb: string
  Mar: string
  Apr: string
  May: string
  Jun: string
  Jul: string
  Aug: string
  Sep: string
  Oct: string
  Nov: string
  Dec: string
  Avg: string
  market_location_city: string
  published_date: string
}

const MailboxAppalachainPrices = () => {
  const [chartData, setChartData] = useState<{
    labels: string[]
    data: number[]
  }>({ labels: [], data: [] })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MailboxAppalachainPriceRecord[]>(
          'http://localhost:3001/mailboxAppalachainPrices/allYears'
        )
        const data = response.data

        // Prepare the data for the chart
        const labels: string[] = []
        const prices: number[] = []

        const months: (keyof MailboxAppalachainPriceRecord)[] = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]

        data.forEach(record => {
          // For each year, push monthly data into the arrays
          months.forEach(month => {
            labels.push(`${month} ${record.report_year}`)
            prices.push(parseFloat(record[month] as string))
          })
        })

        setChartData({ labels, data: prices })
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [])

  const createChart = (data: number[], labels: string[]) => {
    return {
      labels, // x-axis
      datasets: [
        {
          label: 'Monthly Prices',
          data, // y-axis
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: true
        }
      ]
    }
  }

  return (
    <div>
      <div className='mb-6 text-center text-xl text-red-600'>Dairy Prices</div>
      <div className='mx-auto w-full max-w-4xl'>
        <div className='h-96 w-full'>
          <Line
            data={createChart(chartData.data, chartData.labels)}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  )
}

export default MailboxAppalachainPrices
