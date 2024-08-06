import { Box, Button, Container, TextField, Typography } from '@mui/material'
import InputDialog from './InputDialog'
import { useState } from 'react'
import { useAuth } from 'src/context/AuthContext'
import axios from 'axios'

interface FixedCostsType {
  totalCattleFixedCost: number
  totalFacilitiesAndBuildingsFixedCost: number
  totalWasteManagementSystemsFixedCost: number
  totalMachineryFixedCost: number
  totalLandFixedCost: number
  overheadCost: number
  totalDairyFixedCost: number
}

const FixedCosts = () => {
  const { email } = useAuth()

  const [details, setDetails] = useState<FixedCostsType>({
    totalCattleFixedCost: 0,
    totalFacilitiesAndBuildingsFixedCost: 0,
    totalWasteManagementSystemsFixedCost: 0,
    totalMachineryFixedCost: 0,
    totalLandFixedCost: 0,
    overheadCost: 0,
    totalDairyFixedCost: 0
  })
  const [open, setOpen] = useState(false)

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleSubmit = async (userInputs: any) => {
    try {
      const transformedInputs = {
        cattleFixedCost: {
          cowPurchaseValue: userInputs.cowPurchaseValue,
          numberOfBredHeifers: userInputs.numberOfBredHeifers,
          bredHeiferPurchaseValue: userInputs.bredHeiferPurchaseValue,
          numberOfOneYearOldHeifers: userInputs.numberOfOneYearOldHeifers,
          oneYearOldHeiferPurchaseValue:
            userInputs.OneYearOldHeiferPurchaseValue,
          numberOfWeanedHeiferCalves: userInputs.numberOfWeanedHeiferCalves,
          weanedHeiferCalvesPurchaseValue:
            userInputs.weanedHeiferCalvesPurchaseValue
        },
        facilitiesAndBuildingsFixedCost: {
          farmShopAndGeneralRoadsInitialInvestement:
            userInputs.farmShopAndGeneralRoadsInitialInvestement,
          farmShopAndGeneralRoadsYearsOfUsefulLife:
            userInputs.farmShopAndGeneralRoadsYearsOfUsefulLife,
          milkingParlorAndEquipmentInitialInvestment:
            userInputs.milkingParlorAndEquipmentInitialInvestment,
          milkingParlorAndEquipmentYearsOfUsefulLife:
            userInputs.milkingParlorAndEquipmentYearsOfUsefulLife,
          feedingEquipmentYearsOfUsefulLife:
            userInputs.feedingEquipmentYearsOfUsefulLife,
          freestallHousingAndLanesYearsOfUsefulLife:
            userInputs.FreestallHousingAndLanesYearsOfUsefulLife,
          threePhasePowerSupplyInitialInvestment:
            userInputs.ThreePhasePowerSupplyInitialInvestment,
          threePhasePowerSupplyYearsOfUsefulLife:
            userInputs.ThreePhasePowerSupplyYearsOfUsefulLife
        },
        wasteManagementFixedCosts: {
          wasteStoragePondInitialInvestment:
            userInputs.wasteStoragePondInitialInvestment,
          wasteStoragePondYearsOfUsefulLife:
            userInputs.wasteStoragePondYearsOfUsefulLife,
          compactClayLinerInitialInvestment:
            userInputs.compactClayLinerInitialInvestment,
          compactClayLinerYearsOfUsefulLife:
            userInputs.compactClayLinerYearsOfUsefulLife,
          monitoringWellsInitialInvestment:
            userInputs.monitoringWellsInitialInvestment,
          monitoringWellsYearsOfUsefulLife:
            userInputs.monitoringWellsYearsOfUsefulLife
        },
        machineryFixedCosts: {
          machineryFixedCostTotalEstimate:
            userInputs.machineryFixedCostTotalEstimate
        },
        landFixedCosts: {
          acres: userInputs.acres,
          rentalCost: userInputs.rentalCost
        }
      }

      const response = await axios.patch(
        `http://localhost:3001/fixed-costs/updateInput/${email}`,
        transformedInputs
      )
      if (response && response.data) {
        setDetails({
          totalCattleFixedCost: response.data.totalCattleFixedCost || 0,
          totalFacilitiesAndBuildingsFixedCost:
            response.data.totalFacilitiesAndBuildingsFixedCost || 0,
          totalWasteManagementSystemsFixedCost:
            response.data.totalWasteManagementSystemsFixedCost || 0,
          totalMachineryFixedCost: response.data.totalMachineryFixedCost || 0,
          totalLandFixedCost: response.data.totalLandFixedCost || 0,
          overheadCost: response.data.overheadCost || 0,
          totalDairyFixedCost: response.data.totalDairyFixedCost || 0
        })
      }
    } catch (error) {
      console.error('Error updating user inputs:', error)
    }
  }

  const textFields = [
    {
      label: 'Total Cattle Fixed Cost($)',
      value: details.totalCattleFixedCost
    },
    {
      label: 'Total Facilities and Buildings Fixed Cost($)',
      value: details.totalFacilitiesAndBuildingsFixedCost
    },
    {
      label: 'Total Waste Management Systems Fixed Cost($)',
      value: details.totalWasteManagementSystemsFixedCost
    },
    {
      label: 'Total Machinery Fixed Cost($)',
      value: details.totalMachineryFixedCost
    },
    { label: 'Total Land Fixed Cost($)', value: details.totalLandFixedCost },
    { label: 'Overhead Cost($)', value: details.overheadCost },
    {
      label: 'Total Dairy Fixed Cost($)',
      value: details.totalDairyFixedCost
    }
  ]

  return (
    <div>
      <Typography
        className='mt-5 text-center'
        variant='h4'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Fixed Costs
      </Typography>
      <Container maxWidth='sm' className='mb-10 mt-10'>
        <Box
          className='space-y-6'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {textFields.map(field => (
            <TextField
              key={field.label}
              label={field.label}
              variant='outlined'
              value={field.value}
              InputProps={{
                readOnly: true
              }}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          ))}
          <Button
            variant='contained'
            sx={{
              bgcolor: '#c8102e',
              '&:hover': { bgcolor: '#a50f2e' },
              mt: 2,
              py: 1.5
            }}
            onClick={handleDialogOpen}
          >
            Input Fixed Costs
          </Button>
        </Box>
      </Container>
      <InputDialog
        open={open}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default FixedCosts
