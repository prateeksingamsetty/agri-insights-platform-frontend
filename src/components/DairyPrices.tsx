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

interface ApiDairyPriceRecord {
  _id: string
  week_ending_date: string
  report_year: number
  report_month: string
  class_2_Price: string
  class_3_Price: string
  class_4_Price: string
  published_date: string
}

interface DairyPriceRecord {
  _id: string
  report_year: string
  report_month: string
  ClassIWhole: number
  ClassIIWhole: number
  ClassIIIWhole: number
  ClassIVWhole: number
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

const DairyPrices = () => {
  const [allData, setAllData] = useState<DairyPriceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    ClassIWhole: { ...initialFilterState },
    ClassIIWhole: { ...initialFilterState },
    ClassIIIWhole: { ...initialFilterState },
    ClassIVWhole: { ...initialFilterState }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiDairyPriceRecord[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dairyPrices/allPrices`
        )
        const processedData = response.data.map(item => ({
          _id: item._id,
          report_year: item.report_year.toString(),
          report_month: item.report_month,
          ClassIWhole: 0, // You might need to calculate this or get it from another field
          ClassIIWhole: parseFloat(item.class_2_Price),
          ClassIIIWhole: parseFloat(item.class_3_Price),
          ClassIVWhole: parseFloat(item.class_4_Price),
          published_date: item.published_date
        }))
        setAllData(processedData)
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filterData = (data: DairyPriceRecord[], filter: FilterState) => {
    let filteredData = data

    if (filter.year !== 'All') {
      filteredData = filteredData.filter(
        record => record.report_year === filter.year
      )
    }

    if (filter.timeRange > 0) {
      const currentYear = new Date().getFullYear()
      filteredData = filteredData.filter(
        record => currentYear - parseInt(record.report_year) < filter.timeRange
      )
    }

    return filteredData
  }

  const createChartData = (
    data: DairyPriceRecord[],
    classType: keyof typeof filters
  ) => {
    const filteredData = filterData(data, filters[classType])
    const values: number[] = []
    const labels: string[] = []

    filteredData.forEach(record => {
      labels.push(`${record.report_month} ${record.report_year}`)
      values.push(record[classType])
    })

    return {
      labels,
      datasets: [
        {
          label: classType,
          data: values,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    }
  }

  const handleFilterChange = (
    classType: keyof typeof filters,
    filterType: keyof FilterState,
    value: string | number
  ) => {
    setFilters(prev => ({
      ...prev,
      [classType]: {
        ...prev[classType],
        [filterType]: value,
        ...(filterType === 'year' ? { timeRange: 0 } : { year: 'All' })
      }
    }))
  }

  const years = Array.from(
    new Set(allData.map(record => record.report_year))
  ).sort((a, b) => parseInt(b) - parseInt(a))

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Dairy Prices Chart',
      },
    },
    scales: {
      x: {
        reverse: true,
      },
      y: {
        beginAtZero: false,
      }
    }
  }

  if (loading) {
    return <div>Loading data...</div>
  }

  return (
    <div className='rounded-lg bg-gray-100 p-6 shadow-md'>
      <h1 className='mb-6 text-center text-2xl font-bold text-red-700'>
        Dairy Prices
      </h1>
      {Object.keys(filters).map(classType => (
        <div key={classType} className='mb-8'>
          <h2 className='mb-2 text-xl font-semibold text-gray-800'>
            {classType.replace('Whole', ' Whole Milk')}
          </h2>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}
          >
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={filters[classType as keyof typeof filters].year}
                onChange={e =>
                  handleFilterChange(
                    classType as keyof typeof filters,
                    'year',
                    e.target.value
                  )
                }
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
                value={filters[classType as keyof typeof filters].timeRange}
                onChange={e =>
                  handleFilterChange(
                    classType as keyof typeof filters,
                    'timeRange',
                    Number(e.target.value)
                  )
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
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <Line
              data={createChartData(allData, classType as keyof typeof filters)}
              options={chartOptions}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DairyPrices