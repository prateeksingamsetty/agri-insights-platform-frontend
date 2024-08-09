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
import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext'
import {
  facilitiesAndBuildingsFields,
  machineryFields,
  myDetailedMachineryFixedCosts
} from './FixedCostsVariables'
import axios from 'axios'

interface UserInputs {
  // Cattle Fixed Cost
  cowPurchaseValue: number
  overheadCostPerCow: number
  numberOfBredHeifers: number
  bredHeiferPurchaseValue: number
  numberOfOneYearOldHeifers: number
  OneYearOldHeiferPurchaseValue: number
  numberOfWeanedHeiferCalves: number
  weanedHeiferCalvesPurchaseValue: number

  // Facilities and Buildings Fixed Cost
  farmShopAndGeneralRoadsInitialInvestment: number
  farmShopAndGeneralRoadsYearsOfUsefulLife: number
  milkingParlorAndEquipmentInitialInvestment: number
  milkingParlorAndEquipmentYearsOfUsefulLife: number
  feedingEquipmentInitialInvestment: number
  feedingEquipmentYearsOfUsefulLife: number
  freestallHousingAndLanesInitialInvestment: number
  freestallHousingAndLanesYearsOfUsefulLife: number
  threePhasePowerSupplyInitialInvestment: number
  threePhasePowerSupplyYearsOfUsefulLife: number
  waterSystemInitialInvestment: number
  waterSystemYearsOfUsefulLife: number
  hayShedInitialInvestment: number
  hayShedYearsOfUsefulLife: number
  trenchSilosInitialInvestment: number
  trenchSilosYearsOfUsefulLife: number
  fencesInitialInvestment: number
  fencesYearsOfUsefulLife: number
  commodityBarnInitialInvestment: number
  commodityBarnYearsOfUsefulLife: number
  calfOrHeiferBarnInitialInvestment: number
  calfOrHeiferBarnYearsOfUsefulLife: number
  tiltTableInitialInvestment: number
  tiltTableYearsOfUsefulLife: number
  cattleHandlingFacilitiesInitialInvestment: number
  cattleHandlingFacilitiesYearsOfUsefulLife: number
  otherFacilitiesAndBuildings1InitialInvestment: number
  otherFacilitiesAndBuildings1YearsOfUsefulLife: number
  otherFacilitiesAndBuildings2InitialInvestment: number
  otherFacilitiesAndBuildings2YearsOfUsefulLife: number

  // Waste Management Fixed Costs
  wasteStoragePondInitialInvestment: number
  wasteStoragePondYearsOfUsefulLife: number
  compactClayLinerInitialInvestment: number
  compactClayLinerYearsOfUsefulLife: number
  monitoringWellsInitialInvestment: number
  monitoringWellsYearsOfUsefulLife: number

  // Machinery Fixed Costs
  machineryFixedCostTotalEstimate: number

  //Detailed Machinery Fixed Costs
  detailedMachineryFixedCosts?: Record<string, number | null>

  // Land Fixed Costs
  acres: number
  rentalCost: number

  // is Detailed Machinery Costs Boolean Value
  isDetailedMachineryCosts: boolean
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [userInputs, setUserInputs] = useState<UserInputs>({
    // Cattle Fixed Cost
    cowPurchaseValue: 0,
    overheadCostPerCow: 0,
    numberOfBredHeifers: 0,
    bredHeiferPurchaseValue: 0,
    numberOfOneYearOldHeifers: 0,
    OneYearOldHeiferPurchaseValue: 0,
    numberOfWeanedHeiferCalves: 0,
    weanedHeiferCalvesPurchaseValue: 0,

    // Facilities and Buildings Fixed Cost
    farmShopAndGeneralRoadsInitialInvestment: 0,
    farmShopAndGeneralRoadsYearsOfUsefulLife: 0,
    milkingParlorAndEquipmentInitialInvestment: 0,
    milkingParlorAndEquipmentYearsOfUsefulLife: 0,
    feedingEquipmentInitialInvestment: 0,
    feedingEquipmentYearsOfUsefulLife: 0,
    freestallHousingAndLanesInitialInvestment: 0,
    freestallHousingAndLanesYearsOfUsefulLife: 0,
    threePhasePowerSupplyInitialInvestment: 0,
    threePhasePowerSupplyYearsOfUsefulLife: 0,
    waterSystemInitialInvestment: 0,
    waterSystemYearsOfUsefulLife: 0,
    hayShedInitialInvestment: 0,
    hayShedYearsOfUsefulLife: 0,
    trenchSilosInitialInvestment: 0,
    trenchSilosYearsOfUsefulLife: 0,
    fencesInitialInvestment: 0,
    fencesYearsOfUsefulLife: 0,
    commodityBarnInitialInvestment: 0,
    commodityBarnYearsOfUsefulLife: 0,
    calfOrHeiferBarnInitialInvestment: 0,
    calfOrHeiferBarnYearsOfUsefulLife: 0,
    tiltTableInitialInvestment: 0,
    tiltTableYearsOfUsefulLife: 0,
    cattleHandlingFacilitiesInitialInvestment: 0,
    cattleHandlingFacilitiesYearsOfUsefulLife: 0,
    otherFacilitiesAndBuildings1InitialInvestment: 0,
    otherFacilitiesAndBuildings1YearsOfUsefulLife: 0,
    otherFacilitiesAndBuildings2InitialInvestment: 0,
    otherFacilitiesAndBuildings2YearsOfUsefulLife: 0,

    // Waste Management Fixed Costs
    wasteStoragePondInitialInvestment: 0,
    wasteStoragePondYearsOfUsefulLife: 0,
    compactClayLinerInitialInvestment: 0,
    compactClayLinerYearsOfUsefulLife: 0,
    monitoringWellsInitialInvestment: 0,
    monitoringWellsYearsOfUsefulLife: 0,

    // Machinery Fixed Costs(Example variables)
    machineryFixedCostTotalEstimate: 0,

    // Detailed machinery costs variables
    detailedMachineryFixedCosts: Object.fromEntries(
      myDetailedMachineryFixedCosts.map(field => [field.name, 1])
    ),

    // Land Fixed Costs
    acres: 0,
    rentalCost: 0,

    // is Detailed Machinery Costs Boolean
    isDetailedMachineryCosts: false
  })

  useEffect(() => {
    if (!open) return

    console.log(
      'User Inputs State isDetailed:',
      userInputs.isDetailedMachineryCosts
    )

    const fetchUserInputRecord = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/fixed-costs/inputDetails/${email}`
        )
        if (response && response.data) {
          setUserInputs({
            cowPurchaseValue:
              response.data.cattleFixedCost.cowPurchaseValue || 0,
            overheadCostPerCow:
              response.data.cattleFixedCost.overheadCostPerCow || 0,
            numberOfBredHeifers:
              response.data.cattleFixedCost.numberOfBredHeifers || 0,
            bredHeiferPurchaseValue:
              response.data.cattleFixedCost.bredHeiferPurchaseValue || 0,
            numberOfOneYearOldHeifers:
              response.data.cattleFixedCost.numberOfOneYearOldHeifers || 0,
            OneYearOldHeiferPurchaseValue:
              response.data.cattleFixedCost.oneYearOldHeiferPurchaseValue || 0,
            numberOfWeanedHeiferCalves:
              response.data.cattleFixedCost.numberOfWeanedHeiferCalves || 0,
            weanedHeiferCalvesPurchaseValue:
              response.data.cattleFixedCost.weanedHeiferCalvesPurchaseValue ||
              0,

            farmShopAndGeneralRoadsInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .farmShopAndGeneralRoadsInitialInvestment || 0,
            farmShopAndGeneralRoadsYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .farmShopAndGeneralRoadsYearsOfUsefulLife || 0,
            milkingParlorAndEquipmentInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .milkingParlorAndEquipmentInitialInvestment || 0,
            milkingParlorAndEquipmentYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .milkingParlorAndEquipmentYearsOfUsefulLife || 0,
            feedingEquipmentInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .feedingEquipmentInitialInvestment || 0,
            feedingEquipmentYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .feedingEquipmentYearsOfUsefulLife || 0,
            freestallHousingAndLanesInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .freestallHousingAndLanesInitialInvestment || 0,
            freestallHousingAndLanesYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .freestallHousingAndLanesYearsOfUsefulLife || 0,
            threePhasePowerSupplyInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .threePhasePowerSupplyInitialInvestment || 0,
            threePhasePowerSupplyYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .threePhasePowerSupplyYearsOfUsefulLife || 0,
            waterSystemInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .waterSystemInitialInvestment || 0,
            waterSystemYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .waterSystemYearsOfUsefulLife || 0,
            hayShedInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .hayShedInitialInvestment || 0,
            hayShedYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .hayShedYearsOfUsefulLife || 0,
            trenchSilosInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .trenchSilosInitialInvestment || 0,
            trenchSilosYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .trenchSilosYearsOfUsefulLife || 0,
            fencesInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .fencesInitialInvestment || 0,
            fencesYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .fencesYearsOfUsefulLife || 0,
            commodityBarnInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .commodityBarnInitialInvestment || 0,
            commodityBarnYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .commodityBarnYearsOfUsefulLife || 0,
            calfOrHeiferBarnInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .calfOrHeiferBarnInitialInvestment || 0,
            calfOrHeiferBarnYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .calfOrHeiferBarnYearsOfUsefulLife || 0,
            tiltTableInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .tiltTableInitialInvestment || 0,
            tiltTableYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .tiltTableYearsOfUsefulLife || 0,
            cattleHandlingFacilitiesInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .cattleHandlingFacilitiesInitialInvestment || 0,
            cattleHandlingFacilitiesYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .cattleHandlingFacilitiesYearsOfUsefulLife || 0,
            otherFacilitiesAndBuildings1InitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings1InitialInvestment || 0,
            otherFacilitiesAndBuildings1YearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings1YearsOfUsefulLife || 0,
            otherFacilitiesAndBuildings2InitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings2InitialInvestment || 0,
            otherFacilitiesAndBuildings2YearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings2YearsOfUsefulLife || 0,

            wasteStoragePondInitialInvestment:
              response.data.wasteManagementFixedCosts
                .wasteStoragePondInitialInvestment || 0,
            wasteStoragePondYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .wasteStoragePondYearsOfUsefulLife || 0,
            compactClayLinerInitialInvestment:
              response.data.wasteManagementFixedCosts
                .compactClayLinerInitialInvestment || 0,
            compactClayLinerYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .compactClayLinerYearsOfUsefulLife || 0,
            monitoringWellsInitialInvestment:
              response.data.wasteManagementFixedCosts
                .monitoringWellsInitialInvestment || 0,
            monitoringWellsYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .monitoringWellsYearsOfUsefulLife || 0,

            machineryFixedCostTotalEstimate:
              response.data.machineryFixedCosts
                .machineryFixedCostTotalEstimate || 0,
            detailedMachineryFixedCosts:
              response.data.detailedMachineryFixedCosts || {},

            acres: response.data.landFixedCosts.acres || 0,
            rentalCost: response.data.landFixedCosts.rentalCost || 0,

            isDetailedMachineryCosts:
              response.data.isDetailedMachineryCosts ?? false
            // response.data.isDetailedMachineryCosts || !useTotalEstimate
          })
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.warn('No user input record found for the given email')
        } else {
          console.error('Error fetching user input record:', error)
        }
      }
    }

    fetchUserInputRecord()
  }, [open, email])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = Number(value)
    console.log('name ', name)

    // Check if the field is part of the facilities and buildings
    if (facilitiesAndBuildingsFixedCostFields.includes(name)) {
      let error = ''

      // Handle empty input separately
      if (value === '') {
        error = ''
      } else if (numericValue < 1 || numericValue > 12) {
        error = `${name.replace(/([A-Z])/g, ' $1')} must be between 1 and 12.`
      }

      // Update the errors state
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }))

      // If there's an error, return early
      if (error) {
        return
      }
    }

    // Update the userInputs state
    setUserInputs(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value) // Ensure value is always a number, but allow empty string
    }))
  }

  // const handleDetailedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   console.log('name ', name)

  //   let error = ''
  //   let parsedValue: number | null = null

  //   // Handle empty input separately
  //   if (value === '') {
  //     error = ''
  //     parsedValue = null // Keep the field empty
  //   } else {
  //     const numericValue = Number(value)

  //     if (numericValue < 1 || numericValue > 12) {
  //       error = `${name.replace(/([A-Z])/g, ' $1')} must be between 1 and 12.`
  //     } else {
  //       parsedValue = numericValue
  //     }
  //   }

  //   // Update the errors state
  //   setErrors(prevErrors => ({
  //     ...prevErrors,
  //     [name]: error
  //   }))

  //   // If there's an error, return early
  //   if (error) {
  //     return
  //   }

  //   // Update the userInputs state
  //   setUserInputs(prev => ({
  //     ...prev,
  //     detailedMachineryFixedCosts: {
  //       ...prev.detailedMachineryFixedCosts,
  //       [name]: parsedValue // This will be null if the input is empty
  //     }
  //   }))
  // }

  const handleDetailedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let error = ''
    let parsedValue: number | null = value === '' ? null : Number(value) // Handle empty input by setting parsedValue to null

    // Check if the field is part of the detailedMachineryFixedCostsFields
    if (detailedMachineryFixedCostsFields.includes(name)) {
      console.log('Hi1')

      // Handle empty input separately
      if (value === '') {
        error = ''
        parsedValue = null // Keep the field empty
      } else {
        const numericValue = Number(value)

        if (numericValue < 1 || numericValue > 12) {
          error = `${name.replace(/([A-Z])/g, ' $1')} must be between 1 and 12.`
        } else {
          parsedValue = numericValue
        }
      }

      // Update the errors state
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }))

      // If there's an error, return early
      if (error) {
        return
      }
    }

    console.log('Hi2')

    // Update the userInputs state
    setUserInputs(prev => ({
      ...prev,
      detailedMachineryFixedCosts: {
        ...prev.detailedMachineryFixedCosts,
        [name]: parsedValue // This will be null if the input is empty or outside valid range
      }
    }))
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(userInputs.isDetailedMachineryCosts)
    handleSubmit(userInputs)
    handleClose()
  }

  const textFields = [
    // Cattle Fixed Cost
    { name: 'cowPurchaseValue', label: 'Cow Purchase Value' },
    { name: 'overheadCostPerCow', label: 'Overhead Cost Per Cow' },
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
      name: 'farmShopAndGeneralRoadsInitialInvestment',
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
      name: 'feedingEquipmentInitialInvestment',
      label: 'Feeding Equipment Initial Investment'
    },
    {
      name: 'feedingEquipmentYearsOfUsefulLife',
      label: 'Feeding Equipment Years of Useful Life'
    },
    {
      name: 'freestallHousingAndLanesInitialInvestment',
      label: 'Freestall Housing and Lanes Initial Investment'
    },
    {
      name: 'freestallHousingAndLanesYearsOfUsefulLife',
      label: 'Freestall Housing and Lanes Years of Useful Life'
    },
    {
      name: 'threePhasePowerSupplyInitialInvestment',
      label: 'Three-Phase Power Supply Initial Investment'
    },
    {
      name: 'threePhasePowerSupplyYearsOfUsefulLife',
      label: 'Three-Phase Power Supply Years of Useful Life'
    },
    {
      name: 'waterSystemInitialInvestment',
      label: 'Water System Initial Investment'
    },
    {
      name: 'waterSystemYearsOfUsefulLife',
      label: 'Water System Years of Useful Life'
    },
    {
      name: 'hayShedInitialInvestment',
      label: 'Hay Shed Initial Investment'
    },
    {
      name: 'hayShedYearsOfUsefulLife',
      label: 'Hay Shed Years of Useful Life'
    },
    {
      name: 'trenchSilosInitialInvestment',
      label: 'Trench Silos Initial Investment'
    },
    {
      name: 'trenchSilosYearsOfUsefulLife',
      label: 'Trench Silos Years of Useful Life'
    },
    {
      name: 'fencesInitialInvestment',
      label: 'Fences Initial Investment'
    },
    {
      name: 'fencesYearsOfUsefulLife',
      label: 'Fences Years of Useful Life'
    },
    {
      name: 'commodityBarnInitialInvestment',
      label: 'Commodity Barn Initial Investment'
    },
    {
      name: 'commodityBarnYearsOfUsefulLife',
      label: 'Commodity Barn Years of Useful Life'
    },
    {
      name: 'calfOrHeiferBarnInitialInvestment',
      label: 'Calf or Heifer Barn Initial Investment'
    },
    {
      name: 'calfOrHeiferBarnYearsOfUsefulLife',
      label: 'Calf or Heifer Barn Years of Useful Life'
    },
    {
      name: 'tiltTableInitialInvestment',
      label: 'Tilt Table Initial Investment'
    },
    {
      name: 'tiltTableYearsOfUsefulLife',
      label: 'Tilt Table Years of Useful Life'
    },
    {
      name: 'cattleHandlingFacilitiesInitialInvestment',
      label: 'Cattle Handling Facilities Initial Investment'
    },
    {
      name: 'cattleHandlingFacilitiesYearsOfUsefulLife',
      label: 'Cattle Handling Facilities Years of Useful Life'
    },
    {
      name: 'otherFacilitiesAndBuildings1InitialInvestment',
      label: 'Other Facilities and Buildings 1 Initial Investment'
    },
    {
      name: 'otherFacilitiesAndBuildings1YearsOfUsefulLife',
      label: 'Other Facilities and Buildings 1 Years of Useful Life'
    },
    {
      name: 'otherFacilitiesAndBuildings2InitialInvestment',
      label: 'Other Facilities and Buildings 2 Initial Investment'
    },
    {
      name: 'otherFacilitiesAndBuildings2YearsOfUsefulLife',
      label: 'Other Facilities and Buildings 2 Years of Useful Life'
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

  const detailedMachineryFixedCostsFields = machineryFields
  const detailedMachineryFixedCosts = myDetailedMachineryFixedCosts
  const facilitiesAndBuildingsFixedCostFields = facilitiesAndBuildingsFields

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
            <div key={field.name}>
              {/* Display the error message if it exists */}
              {errors[field.name] && (
                <div style={{ color: 'red', marginBottom: '4px' }}>
                  {errors[field.name]}
                </div>
              )}

              <TextField
                margin='dense'
                name={field.name}
                label={field.label}
                type='number'
                fullWidth
                required
                value={userInputs[field.name as keyof UserInputs]}
                onChange={handleChange}
                inputProps={
                  detailedMachineryFixedCostsFields.includes(field.name)
                    ? { min: 1, max: 12 }
                    : {}
                }
              />
            </div>
          ))}

          <FormControlLabel
            control={
              <Checkbox
                checked={useTotalEstimate}
                onChange={event => {
                  const isChecked = event.target.checked
                  setUseTotalEstimate(isChecked)
                  setUserInputs(prevInputs => ({
                    ...prevInputs,
                    isDetailedMachineryCosts: !isChecked // Toggle based on checkbox
                  }))
                }}
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
            detailedMachineryFixedCosts.map(field => (
              <div key={field.name}>
                {/* Display the error message if it exists */}
                {errors[field.name] && (
                  <div style={{ color: 'red', marginBottom: '4px' }}>
                    {errors[field.name]}
                  </div>
                )}

                <TextField
                  margin='dense'
                  name={field.name}
                  label={field.label}
                  type='number'
                  fullWidth
                  required
                  value={
                    userInputs.detailedMachineryFixedCosts?.[field.name] ?? ''
                  }
                  onChange={handleDetailedChange}
                />
              </div>
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
