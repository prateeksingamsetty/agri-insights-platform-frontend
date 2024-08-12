'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
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
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'

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

interface FilterState {
  year: string
  timeRange: number
}

const initialFilterState: FilterState = {
  year: 'All',
  timeRange: 0
}

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

const MailboxAppalachainPrices = () => {
  const [allData, setAllData] = useState<MailboxAppalachainPriceRecord[]>([])
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [chartData, setChartData] = useState<{
    labels: string[]
    data: number[]
  }>({ labels: [], data: [] })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MailboxAppalachainPriceRecord[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/mailboxAppalachainPrices/allYears`
        )
        setAllData(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    updateChartData()
  }, [allData, filters])

  const filterData = (data: MailboxAppalachainPriceRecord[]) => {
    let filteredData = data

    if (filters.year !== 'All') {
      filteredData = filteredData.filter(
        record => record.report_year.toString() === filters.year
      )
    }

    if (filters.timeRange > 0) {
      const currentYear = new Date().getFullYear()
      filteredData = filteredData.filter(
        record => currentYear - record.report_year < filters.timeRange
      )
    }

    return filteredData
  }

  const updateChartData = () => {
    const filteredData = filterData(allData)
    const labels: string[] = []
    const prices: number[] = []

    filteredData.forEach(record => {
      months.forEach(month => {
        labels.push(`${month} ${record.report_year}`)
        prices.push(parseFloat(record[month] as string))
      })
    })

    setChartData({ labels, data: prices })
  }

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string | number
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
      ...(filterType === 'year' ? { timeRange: 0 } : { year: 'All' })
    }))
  }

  const createChart = (data: number[], labels: string[]) => {
    return {
      labels,
      datasets: [
        {
          label: 'Monthly Prices',
          data,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: true
        }
      ]
    }
  }

  const years = Array.from(
    new Set(allData.map(record => record.report_year.toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <div className='rounded-lg bg-gray-100 p-6 shadow-md'>
      <h1 className='mb-6 text-center text-2xl font-bold text-red-700'>
        Mailbox Appalachian Prices
      </h1>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={filters.year}
            onChange={e => handleFilterChange('year', e.target.value)}
            label='Year'
          >
            <MenuItem value='All'>All Years</MenuItem>
            {years.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={filters.timeRange}
            onChange={e =>
              handleFilterChange('timeRange', Number(e.target.value))
            }
            label='Time Range'
          >
            <MenuItem value={0}>All Time</MenuItem>
            {[1, 2, 3, 4, 5].map(year => (
              <MenuItem key={year} value={year}>
                Last {year} Year{year > 1 ? 's' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className='mx-auto w-full max-w-4xl'>
        <div className='h-96 w-full rounded-lg bg-white p-4 shadow-sm'>
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
