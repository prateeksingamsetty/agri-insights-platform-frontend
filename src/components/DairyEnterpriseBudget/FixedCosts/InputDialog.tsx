import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from 'src/context/AuthContext'

interface UserInputs {
  // Cattle Fixed Cost
  cowPurchaseValue: number
  numberOfBredHeifers: number
  bredHeiferPurchaseValue: number
  numberOfOneYearOldHeifers: number
  OneYearOldHeiferPurchaseValue: number
  numberOfWeanedHeiferCalves: number
  weanedHeiferCalvesPurchaseValue: number

  // Facilities and Buildings Fixed Cost
  farmShopAndGeneralRoadsInitialInvestement: number
  farmShopAndGeneralRoadsYearsOfUsefulLife: number
  milkingParlorAndEquipmentInitialInvestment: number
  milkingParlorAndEquipmentYearsOfUsefulLife: number
  feedingEquipmentYearsOfUsefulLife: number
  FreestallHousingAndLanesYearsOfUsefulLife: number
  ThreePhasePowerSupplyInitialInvestment: number
  ThreePhasePowerSupplyYearsOfUsefulLife: number

  // Waste Management Fixed Costs
  wasteStoragePondInitialInvestment: number
  wasteStoragePondYearsOfUsefulLife: number
  compactClayLinerInitialInvestment: number
  compactClayLinerYearsOfUsefulLife: number
  monitoringWellsInitialInvestment: number
  monitoringWellsYearsOfUsefulLife: number

  // Machinery Fixed Costs
  machineryFixedCostTotalEstimate: number
  machineryCost1: number
  machineryCost2: number
  machineryCost3: number

  // Land Fixed Costs
  acres: number
  rentalCost: number
}

interface InputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: any) => void
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  handleClose,
  handleSubmit
}) => {
  const { email } = useAuth()
  const [useTotalEstimate, setUseTotalEstimate] = useState<boolean>(true)

  const [userInputs, setUserInputs] = useState<UserInputs>({
    // Cattle Fixed Cost
    cowPurchaseValue: 0,
    numberOfBredHeifers: 0,
    bredHeiferPurchaseValue: 0,
    numberOfOneYearOldHeifers: 0,
    OneYearOldHeiferPurchaseValue: 0,
    numberOfWeanedHeiferCalves: 0,
    weanedHeiferCalvesPurchaseValue: 0,
    // Facilities and Buildings Fixed Cost
    farmShopAndGeneralRoadsInitialInvestement: 0,
    farmShopAndGeneralRoadsYearsOfUsefulLife: 0,
    milkingParlorAndEquipmentInitialInvestment: 0,
    milkingParlorAndEquipmentYearsOfUsefulLife: 0,
    feedingEquipmentYearsOfUsefulLife: 0,
    FreestallHousingAndLanesYearsOfUsefulLife: 0,
    ThreePhasePowerSupplyInitialInvestment: 0,
    ThreePhasePowerSupplyYearsOfUsefulLife: 0,
    // Waste Management Fixed Costs
    wasteStoragePondInitialInvestment: 0,
    wasteStoragePondYearsOfUsefulLife: 0,
    compactClayLinerInitialInvestment: 0,
    compactClayLinerYearsOfUsefulLife: 0,
    monitoringWellsInitialInvestment: 0,
    monitoringWellsYearsOfUsefulLife: 0,
    // Machinery Fixed Costs
    machineryFixedCostTotalEstimate: 0,
    machineryCost1: 0,
    machineryCost2: 0,
    machineryCost3: 0,
    // Land Fixed Costs
    acres: 0,
    rentalCost: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(userInputs)
    handleClose()
  }

  const textFields = [
    // Cattle Fixed Cost
    { name: 'cowPurchaseValue', label: 'Cow Purchase Value' },
    { name: 'numberOfBredHeifers', label: 'Number of Bred Heifers' },
    { name: 'bredHeiferPurchaseValue', label: 'Bred Heifer Purchase Value' },
    {
      name: 'numberOfOneYearOldHeifers',
      label: 'Number of One-Year-Old Heifers'
    },
    {
      name: 'OneYearOldHeiferPurchaseValue',
      label: 'One-Year-Old Heifer Purchase Value'
    },
    {
      name: 'numberOfWeanedHeiferCalves',
      label: 'Number of Weaned Heifer Calves'
    },
    {
      name: 'weanedHeiferCalvesPurchaseValue',
      label: 'Weaned Heifer Calves Purchase Value'
    },

    // Facilities and Buildings Fixed Cost
    {
      name: 'farmShopAndGeneralRoadsInitialInvestement',
      label: 'Farm Shop and General Roads Initial Investment'
    },
    {
      name: 'farmShopAndGeneralRoadsYearsOfUsefulLife',
      label: 'Farm Shop and General Roads Years of Useful Life'
    },
    {
      name: 'milkingParlorAndEquipmentInitialInvestment',
      label: 'Milking Parlor and Equipment Initial Investment'
    },
    {
      name: 'milkingParlorAndEquipmentYearsOfUsefulLife',
      label: 'Milking Parlor and Equipment Years of Useful Life'
    },
    {
      name: 'feedingEquipmentYearsOfUsefulLife',
      label: 'Feeding Equipment Years of Useful Life'
    },
    {
      name: 'FreestallHousingAndLanesYearsOfUsefulLife',
      label: 'Freestall Housing and Lanes Years of Useful Life'
    },
    {
      name: 'ThreePhasePowerSupplyInitialInvestment',
      label: 'Three-Phase Power Supply Initial Investment'
    },
    {
      name: 'ThreePhasePowerSupplyYearsOfUsefulLife',
      label: 'Three-Phase Power Supply Years of Useful Life'
    },

    // Waste Management Fixed Costs
    {
      name: 'wasteStoragePondInitialInvestment',
      label: 'Waste Storage Pond Initial Investment'
    },
    {
      name: 'wasteStoragePondYearsOfUsefulLife',
      label: 'Waste Storage Pond Years of Useful Life'
    },
    {
      name: 'compactClayLinerInitialInvestment',
      label: 'Compact Clay Liner Initial Investment'
    },
    {
      name: 'compactClayLinerYearsOfUsefulLife',
      label: 'Compact Clay Liner Years of Useful Life'
    },
    {
      name: 'monitoringWellsInitialInvestment',
      label: 'Monitoring Wells Initial Investment'
    },
    {
      name: 'monitoringWellsYearsOfUsefulLife',
      label: 'Monitoring Wells Years of Useful Life'
    },

    // Land Fixed Costs
    { name: 'acres', label: 'Acres' },
    { name: 'rentalCost', label: 'Rental Cost' }
  ]

  const machineryFields = [
    { name: 'machineryCost1', label: 'Machinery Cost 1' },
    { name: 'machineryCost2', label: 'Machinery Cost 2' },
    { name: 'machineryCost3', label: 'Machinery Cost 3' }
  ]

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Enter Your Inputs</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your inputs for the Dairy Enterprise Budget Model.
        </DialogContentText>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {textFields.map(field => (
            <TextField
              key={field.name}
              margin='dense'
              name={field.name}
              label={field.label}
              type='number'
              fullWidth
              required
              value={userInputs[field.name as keyof UserInputs]}
              onChange={handleChange}
            />
          ))}

          <FormControlLabel
            control={
              <Checkbox
                checked={useTotalEstimate}
                onChange={() => setUseTotalEstimate(prev => !prev)}
                color='primary'
              />
            }
            label='Use Total Machinery Fixed Costs Estimate'
            style={{ alignSelf: 'center' }}
          />

          {useTotalEstimate ? (
            <TextField
              margin='dense'
              name='machineryFixedCostTotalEstimate'
              label='Machinery Fixed Cost Total Estimate'
              type='number'
              fullWidth
              required
              value={userInputs.machineryFixedCostTotalEstimate}
              onChange={handleChange}
            />
          ) : (
            machineryFields.map(field => (
              <TextField
                key={field.name}
                margin='dense'
                name={field.name}
                label={field.label}
                type='number'
                fullWidth
                required
                value={userInputs[field.name as keyof UserInputs]}
                onChange={handleChange}
              />
            ))
          )}

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InputDialog
