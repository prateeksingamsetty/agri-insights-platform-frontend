'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
  const [filters, setFilters] = useState({
    ClassIWhole: { ...initialFilterState },
    ClassIIWhole: { ...initialFilterState },
    ClassIIIWhole: { ...initialFilterState },
    ClassIVWhole: { ...initialFilterState }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DairyPriceRecord[]>('http://localhost:3001/dairyPrices/allPrices')
        setAllData(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
    fetchData()
  }, [])

  const filterData = (data: DairyPriceRecord[], filter: FilterState) => {
    let filteredData = data

    if (filter.year !== 'All') {
      filteredData = filteredData.filter(record => record.report_year === filter.year)
    }

    if (filter.timeRange > 0) {
      const currentYear = new Date().getFullYear()
      filteredData = filteredData.filter(record => currentYear - parseInt(record.report_year) < filter.timeRange)
    }

    return filteredData
  }

  const createChartData = (data: DairyPriceRecord[], classType: keyof typeof filters) => {
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
          fill: true
        }
      ]
    }
  }

  const handleFilterChange = (classType: keyof typeof filters, filterType: keyof FilterState, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [classType]: {
        ...prev[classType],
        [filterType]: value,
        ...(filterType === 'year' ? { timeRange: 0 } : { year: 'All' })
      }
    }))
  }

  const years = Array.from(new Set(allData.map(record => record.report_year))).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <div className='rounded-lg bg-gray-100 p-6 shadow-md'>
      <h1 className='mb-6 text-center text-2xl font-bold text-red-700'>Dairy Prices</h1>
      {Object.keys(filters).map((classType) => (
        <div key={classType} className='mb-8'>
          <h2 className='mb-2 text-xl font-semibold text-gray-800'>{classType.replace('Whole', ' Whole Milk')}</h2>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={filters[classType as keyof typeof filters].year}
                onChange={(e) => handleFilterChange(classType as keyof typeof filters, 'year', e.target.value)}
                label="Year"
              >
                <MenuItem value="All">All Years</MenuItem>
                {years.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={filters[classType as keyof typeof filters].timeRange}
                onChange={(e) => handleFilterChange(classType as keyof typeof filters, 'timeRange', Number(e.target.value))}
                label="Time Range"
              >
                <MenuItem value={0}>All Time</MenuItem>
                {[1, 2, 3, 4, 5].map(year => (
                  <MenuItem key={year} value={year}>Last {year} Year{year > 1 ? 's' : ''}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <Line data={createChartData(allData, classType as keyof typeof filters)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DairyPrices