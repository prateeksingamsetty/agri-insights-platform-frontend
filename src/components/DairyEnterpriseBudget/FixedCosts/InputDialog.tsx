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
  solidsSeparatorInitialInvestment: number
  solidsSeparatorYearsOfUsefulLife: number
  lagoonPumpInitialInvestment: number
  lagoonPumpYearsOfUsefulLife: number
  pipesInitialInvestment: number
  pipesYearsOfUsefulLife: number
  powerUnitInitialInvestment: number
  powerUnitYearsOfUsefulLife: number
  irrigationSystemInitialInvestment: number
  irrigationSystemYearsOfUsefulLife: number
  agitatorInitialInvestment: number
  agitatorYearsOfUsefulLife: number
  manureSpreaderInitialInvestment: number
  manureSpreaderYearsOfUsefulLife: number
  otherManureManagementStructure1InitialInvestment: number
  otherManureManagementStructure1YearsOfUsefulLife: number
  otherManureManagementStructure2InitialInvestment: number
  otherManureManagementStructure2YearsOfUsefulLife: number

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
    cowPurchaseValue: 2800,
    overheadCostPerCow: 0,
    numberOfBredHeifers: 200,
    bredHeiferPurchaseValue: 2500,
    numberOfOneYearOldHeifers: 0,
    OneYearOldHeiferPurchaseValue: 0,
    numberOfWeanedHeiferCalves: 0,
    weanedHeiferCalvesPurchaseValue: 0,

    // Facilities and Buildings Fixed Cost
    farmShopAndGeneralRoadsInitialInvestment: 200000,
    farmShopAndGeneralRoadsYearsOfUsefulLife: 20,
    milkingParlorAndEquipmentInitialInvestment: 1250000,
    milkingParlorAndEquipmentYearsOfUsefulLife: 15,
    feedingEquipmentInitialInvestment: 500000,
    feedingEquipmentYearsOfUsefulLife: 10,
    freestallHousingAndLanesInitialInvestment: 800000,
    freestallHousingAndLanesYearsOfUsefulLife: 20,
    threePhasePowerSupplyInitialInvestment: 35000,
    threePhasePowerSupplyYearsOfUsefulLife: 15,
    waterSystemInitialInvestment: 70000,
    waterSystemYearsOfUsefulLife: 15,
    hayShedInitialInvestment: 75000,
    hayShedYearsOfUsefulLife: 20,
    trenchSilosInitialInvestment: 200000,
    trenchSilosYearsOfUsefulLife: 15,
    fencesInitialInvestment: 100000,
    fencesYearsOfUsefulLife: 15,
    commodityBarnInitialInvestment: 250000,
    commodityBarnYearsOfUsefulLife: 20,
    calfOrHeiferBarnInitialInvestment: 115000,
    calfOrHeiferBarnYearsOfUsefulLife: 5,
    tiltTableInitialInvestment: 10000,
    tiltTableYearsOfUsefulLife: 5,
    cattleHandlingFacilitiesInitialInvestment: 50000,
    cattleHandlingFacilitiesYearsOfUsefulLife: 5,
    otherFacilitiesAndBuildings1InitialInvestment: 0,
    otherFacilitiesAndBuildings1YearsOfUsefulLife: 0,
    otherFacilitiesAndBuildings2InitialInvestment: 0,
    otherFacilitiesAndBuildings2YearsOfUsefulLife: 0,

    // Waste Management Fixed Costs
    wasteStoragePondInitialInvestment: 66000,
    wasteStoragePondYearsOfUsefulLife: 20,
    compactClayLinerInitialInvestment: 28000,
    compactClayLinerYearsOfUsefulLife: 20,
    monitoringWellsInitialInvestment: 37500,
    monitoringWellsYearsOfUsefulLife: 20,
    solidsSeparatorInitialInvestment: 110000,
    solidsSeparatorYearsOfUsefulLife: 10,
    lagoonPumpInitialInvestment: 15000,
    lagoonPumpYearsOfUsefulLife: 7,
    pipesInitialInvestment: 20000,
    pipesYearsOfUsefulLife: 10,
    powerUnitInitialInvestment: 20000,
    powerUnitYearsOfUsefulLife: 10,
    irrigationSystemInitialInvestment: 1000000,
    irrigationSystemYearsOfUsefulLife: 15,
    agitatorInitialInvestment: 35000,
    agitatorYearsOfUsefulLife: 15,
    manureSpreaderInitialInvestment: 40000,
    manureSpreaderYearsOfUsefulLife: 15,
    otherManureManagementStructure1InitialInvestment: 0,
    otherManureManagementStructure1YearsOfUsefulLife: 15,
    otherManureManagementStructure2InitialInvestment: 0,
    otherManureManagementStructure2YearsOfUsefulLife: 15,

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/fixed-costs/inputDetails/${email}`
        )
        if (response && response.data) {
          setUserInputs({
            cowPurchaseValue: response.data.cattleFixedCost.cowPurchaseValue,
            overheadCostPerCow:
              response.data.cattleFixedCost.overheadCostPerCow,
            numberOfBredHeifers:
              response.data.cattleFixedCost.numberOfBredHeifers,
            bredHeiferPurchaseValue:
              response.data.cattleFixedCost.bredHeiferPurchaseValue,
            numberOfOneYearOldHeifers:
              response.data.cattleFixedCost.numberOfOneYearOldHeifers,
            OneYearOldHeiferPurchaseValue:
              response.data.cattleFixedCost.oneYearOldHeiferPurchaseValue,
            numberOfWeanedHeiferCalves:
              response.data.cattleFixedCost.numberOfWeanedHeiferCalves,
            weanedHeiferCalvesPurchaseValue:
              response.data.cattleFixedCost.weanedHeiferCalvesPurchaseValue,

            farmShopAndGeneralRoadsInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .farmShopAndGeneralRoadsInitialInvestment,
            farmShopAndGeneralRoadsYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .farmShopAndGeneralRoadsYearsOfUsefulLife,
            milkingParlorAndEquipmentInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .milkingParlorAndEquipmentInitialInvestment,
            milkingParlorAndEquipmentYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .milkingParlorAndEquipmentYearsOfUsefulLife,
            feedingEquipmentInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .feedingEquipmentInitialInvestment,
            feedingEquipmentYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .feedingEquipmentYearsOfUsefulLife,
            freestallHousingAndLanesInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .freestallHousingAndLanesInitialInvestment,
            freestallHousingAndLanesYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .freestallHousingAndLanesYearsOfUsefulLife,
            threePhasePowerSupplyInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .threePhasePowerSupplyInitialInvestment,
            threePhasePowerSupplyYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .threePhasePowerSupplyYearsOfUsefulLife,
            waterSystemInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .waterSystemInitialInvestment,
            waterSystemYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .waterSystemYearsOfUsefulLife,
            hayShedInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .hayShedInitialInvestment,
            hayShedYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .hayShedYearsOfUsefulLife,
            trenchSilosInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .trenchSilosInitialInvestment,
            trenchSilosYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .trenchSilosYearsOfUsefulLife,
            fencesInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .fencesInitialInvestment,
            fencesYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .fencesYearsOfUsefulLife,
            commodityBarnInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .commodityBarnInitialInvestment,
            commodityBarnYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .commodityBarnYearsOfUsefulLife,
            calfOrHeiferBarnInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .calfOrHeiferBarnInitialInvestment,
            calfOrHeiferBarnYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .calfOrHeiferBarnYearsOfUsefulLife,
            tiltTableInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .tiltTableInitialInvestment,
            tiltTableYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .tiltTableYearsOfUsefulLife,
            cattleHandlingFacilitiesInitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .cattleHandlingFacilitiesInitialInvestment,
            cattleHandlingFacilitiesYearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .cattleHandlingFacilitiesYearsOfUsefulLife,
            otherFacilitiesAndBuildings1InitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings1InitialInvestment,
            otherFacilitiesAndBuildings1YearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings1YearsOfUsefulLife,
            otherFacilitiesAndBuildings2InitialInvestment:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings2InitialInvestment,
            otherFacilitiesAndBuildings2YearsOfUsefulLife:
              response.data.facilitiesAndBuildingsFixedCost
                .otherFacilitiesAndBuildings2YearsOfUsefulLife,

            wasteStoragePondInitialInvestment:
              response.data.wasteManagementFixedCosts
                .wasteStoragePondInitialInvestment,
            wasteStoragePondYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .wasteStoragePondYearsOfUsefulLife,
            compactClayLinerInitialInvestment:
              response.data.wasteManagementFixedCosts
                .compactClayLinerInitialInvestment,
            compactClayLinerYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .compactClayLinerYearsOfUsefulLife,
            monitoringWellsInitialInvestment:
              response.data.wasteManagementFixedCosts
                .monitoringWellsInitialInvestment,
            monitoringWellsYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .monitoringWellsYearsOfUsefulLife,
            solidsSeparatorInitialInvestment:
              response.data.wasteManagementFixedCosts
                .solidsSeparatorInitialInvestment,
            solidsSeparatorYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .solidsSeparatorYearsOfUsefulLife,
            lagoonPumpInitialInvestment:
              response.data.wasteManagementFixedCosts
                .lagoonPumpInitialInvestment,
            lagoonPumpYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .lagoonPumpYearsOfUsefulLife,
            pipesInitialInvestment:
              response.data.wasteManagementFixedCosts.pipesInitialInvestment,
            pipesYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts.pipesYearsOfUsefulLife,
            powerUnitInitialInvestment:
              response.data.wasteManagementFixedCosts
                .powerUnitInitialInvestment,
            powerUnitYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .powerUnitYearsOfUsefulLife,
            irrigationSystemInitialInvestment:
              response.data.wasteManagementFixedCosts
                .irrigationSystemInitialInvestment,
            irrigationSystemYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .irrigationSystemYearsOfUsefulLife,
            agitatorInitialInvestment:
              response.data.wasteManagementFixedCosts.agitatorInitialInvestment,
            agitatorYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts.agitatorYearsOfUsefulLife,
            manureSpreaderInitialInvestment:
              response.data.wasteManagementFixedCosts
                .manureSpreaderInitialInvestment,
            manureSpreaderYearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .manureSpreaderYearsOfUsefulLife,
            otherManureManagementStructure1InitialInvestment:
              response.data.wasteManagementFixedCosts
                .otherManureManagementStructure1InitialInvestment,
            otherManureManagementStructure1YearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .otherManureManagementStructure1YearsOfUsefulLife,
            otherManureManagementStructure2InitialInvestment:
              response.data.wasteManagementFixedCosts
                .otherManureManagementStructure2InitialInvestment,
            otherManureManagementStructure2YearsOfUsefulLife:
              response.data.wasteManagementFixedCosts
                .otherManureManagementStructure2YearsOfUsefulLife,

            machineryFixedCostTotalEstimate:
              response.data.machineryFixedCosts.machineryFixedCostTotalEstimate,
            detailedMachineryFixedCosts:
              response.data.detailedMachineryFixedCosts || {},

            acres: response.data.landFixedCosts.acres,
            rentalCost: response.data.landFixedCosts.rentalCost,

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

    // Update the userInputs state
    setUserInputs(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value) // Ensure value is always a number, but allow empty string
    }))
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   const numericValue = Number(value)
  //   console.log('name ', name)

  //   // Check if the field is part of the facilities and buildings
  //   if (facilitiesAndBuildingsFixedCostFields.includes(name)) {
  //     let error = ''

  //     if (/YearsOfUsefulLife$/.test(name)) {
  //       // Handle empty input separately
  //       if (value === '') {
  //         error = ''
  //       } else if (numericValue < 1 || numericValue > 12) {
  //         error = `${name.replace(/([A-Z])/g, ' $1')} must be between 1 and 12.`
  //       }
  //     }

  //     // Update the errors state
  //     setErrors(prevErrors => ({
  //       ...prevErrors,
  //       [name]: error
  //     }))

  //     // If there's an error, return early
  //     if (error) {
  //       return
  //     }
  //   }

  //   // Update the userInputs state
  //   setUserInputs(prev => ({
  //     ...prev,
  //     [name]: value === '' ? '' : parseFloat(value) // Ensure value is always a number, but allow empty string
  //   }))
  // }

  const handleDetailedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let error = ''
    let parsedValue: number | null = value === '' ? null : Number(value) // Handle empty input by setting parsedValue to null

    // Check if the field is part of the detailedMachineryFixedCostsFields
    if (detailedMachineryFixedCostsFields.includes(name)) {
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
    { name: 'cowPurchaseValue', label: 'Cow Purchase Value($/Head)' },
    { name: 'overheadCostPerCow', label: 'Overhead Cost Per Cow' },
    { name: 'numberOfBredHeifers', label: 'Number of Bred Heifers' },
    {
      name: 'bredHeiferPurchaseValue',
      label: 'Bred Heifer Purchase Value($/Head)'
    },
    {
      name: 'numberOfOneYearOldHeifers',
      label: 'Number of One-Year-Old Heifers'
    },
    {
      name: 'OneYearOldHeiferPurchaseValue',
      label: 'One-Year-Old Heifer Purchase Value($/Head)'
    },
    {
      name: 'numberOfWeanedHeiferCalves',
      label: 'Number of Weaned Heifer Calves'
    },
    {
      name: 'weanedHeiferCalvesPurchaseValue',
      label: 'Weaned Heifer Calves Purchase Value($/Head)'
    },

    // Facilities and Buildings Fixed Cost
    {
      name: 'farmShopAndGeneralRoadsInitialInvestment',
      label: 'Farm Shop and General Roads Initial Investment($)'
    },
    {
      name: 'farmShopAndGeneralRoadsYearsOfUsefulLife',
      label: 'Farm Shop and General Roads Years of Useful Life(years)'
    },
    {
      name: 'milkingParlorAndEquipmentInitialInvestment',
      label: 'Milking Parlor and Equipment Initial Investment($)'
    },
    {
      name: 'milkingParlorAndEquipmentYearsOfUsefulLife',
      label: 'Milking Parlor and Equipment Years of Useful Life(years)'
    },
    {
      name: 'feedingEquipmentInitialInvestment',
      label: 'Feeding Equipment Initial Investment($)'
    },
    {
      name: 'feedingEquipmentYearsOfUsefulLife',
      label: 'Feeding Equipment Years of Useful Life(years)'
    },
    {
      name: 'freestallHousingAndLanesInitialInvestment',
      label: 'Freestall Housing and Lanes Initial Investment($)'
    },
    {
      name: 'freestallHousingAndLanesYearsOfUsefulLife',
      label: 'Freestall Housing and Lanes Years of Useful Life(years)'
    },
    {
      name: 'threePhasePowerSupplyInitialInvestment',
      label: 'Three-Phase Power Supply Initial Investment($)'
    },
    {
      name: 'threePhasePowerSupplyYearsOfUsefulLife',
      label: 'Three-Phase Power Supply Years of Useful Life(years)'
    },
    {
      name: 'waterSystemInitialInvestment',
      label: 'Water System Initial Investment($)'
    },
    {
      name: 'waterSystemYearsOfUsefulLife',
      label: 'Water System Years of Useful Life(years)'
    },
    {
      name: 'hayShedInitialInvestment',
      label: 'Hay Shed Initial Investment($)'
    },
    {
      name: 'hayShedYearsOfUsefulLife',
      label: 'Hay Shed Years of Useful Life(years)'
    },
    {
      name: 'trenchSilosInitialInvestment',
      label: 'Trench Silos Initial Investment($)'
    },
    {
      name: 'trenchSilosYearsOfUsefulLife',
      label: 'Trench Silos Years of Useful Life(years)'
    },
    {
      name: 'fencesInitialInvestment',
      label: 'Fences Initial Investment($)'
    },
    {
      name: 'fencesYearsOfUsefulLife',
      label: 'Fences Years of Useful Life(years)'
    },
    {
      name: 'commodityBarnInitialInvestment',
      label: 'Commodity Barn Initial Investment($)'
    },
    {
      name: 'commodityBarnYearsOfUsefulLife',
      label: 'Commodity Barn Years of Useful Life(years)'
    },
    {
      name: 'calfOrHeiferBarnInitialInvestment',
      label: 'Calf or Heifer Barn Initial Investment($)'
    },
    {
      name: 'calfOrHeiferBarnYearsOfUsefulLife',
      label: 'Calf or Heifer Barn Years of Useful Life(years)'
    },
    {
      name: 'tiltTableInitialInvestment',
      label: 'Tilt Table Initial Investment($)'
    },
    {
      name: 'tiltTableYearsOfUsefulLife',
      label: 'Tilt Table Years of Useful Life(years)'
    },
    {
      name: 'cattleHandlingFacilitiesInitialInvestment',
      label: 'Cattle Handling Facilities Initial Investment($)'
    },
    {
      name: 'cattleHandlingFacilitiesYearsOfUsefulLife',
      label: 'Cattle Handling Facilities Years of Useful Life(years)'
    },
    {
      name: 'otherFacilitiesAndBuildings1InitialInvestment',
      label: 'Other Facilities and Buildings 1 Initial Investment($)'
    },
    {
      name: 'otherFacilitiesAndBuildings1YearsOfUsefulLife',
      label: 'Other Facilities and Buildings 1 Years of Useful Life(years)'
    },
    {
      name: 'otherFacilitiesAndBuildings2InitialInvestment',
      label: 'Other Facilities and Buildings 2 Initial Investment($)'
    },
    {
      name: 'otherFacilitiesAndBuildings2YearsOfUsefulLife',
      label: 'Other Facilities and Buildings 2 Years of Useful Life(years)'
    },

    // Waste Management Fixed Costs
    {
      name: 'wasteStoragePondInitialInvestment',
      label: 'Waste Storage Pond Initial Investment($)'
    },
    {
      name: 'wasteStoragePondYearsOfUsefulLife',
      label: 'Waste Storage Pond Years of Useful Life(years)'
    },
    {
      name: 'compactClayLinerInitialInvestment',
      label: 'Compact Clay Liner Initial Investment($)'
    },
    {
      name: 'compactClayLinerYearsOfUsefulLife',
      label: 'Compact Clay Liner Years of Useful Life(years)'
    },
    {
      name: 'monitoringWellsInitialInvestment',
      label: 'Monitoring Wells Initial Investment($)'
    },
    {
      name: 'monitoringWellsYearsOfUsefulLife',
      label: 'Monitoring Wells Years of Useful Life(years)'
    },
    {
      name: 'solidsSeparatorInitialInvestment',
      label: 'Solids Separator Initial Investment($)'
    },
    {
      name: 'solidsSeparatorYearsOfUsefulLife',
      label: 'Solids Separator Years of Useful Life(years)'
    },
    {
      name: 'lagoonPumpInitialInvestment',
      label: 'Lagoon Pump Initial Investment($)'
    },
    {
      name: 'lagoonPumpYearsOfUsefulLife',
      label: 'Lagoon Pump Years of Useful Life(years)'
    },
    {
      name: 'pipesInitialInvestment',
      label: 'Pipes Initial Investment($)'
    },
    {
      name: 'pipesYearsOfUsefulLife',
      label: 'Pipes Years of Useful Life(years)'
    },
    {
      name: 'powerUnitInitialInvestment',
      label: 'Power Unit Initial Investment($)'
    },
    {
      name: 'powerUnitYearsOfUsefulLife',
      label: 'Power Unit Years of Useful Life(years)'
    },
    {
      name: 'irrigationSystemInitialInvestment',
      label: 'Irrigation System Initial Investment($)'
    },
    {
      name: 'irrigationSystemYearsOfUsefulLife',
      label: 'Irrigation System Years of Useful Life(years)'
    },
    {
      name: 'agitatorInitialInvestment',
      label: 'Agitator Initial Investment($)'
    },
    {
      name: 'agitatorYearsOfUsefulLife',
      label: 'Agitator Years of Useful Life(years)'
    },
    {
      name: 'manureSpreaderInitialInvestment',
      label: 'Manure Spreader Initial Investment($)'
    },
    {
      name: 'manureSpreaderYearsOfUsefulLife',
      label: 'Manure Spreader Years of Useful Life(years)'
    },
    {
      name: 'otherManureManagementStructure1InitialInvestment',
      label: 'Other Manure Management Structure 1 Initial Investment($)'
    },
    {
      name: 'otherManureManagementStructure1YearsOfUsefulLife',
      label: 'Other Manure Management Structure 1 Years of Useful Life(years)'
    },
    {
      name: 'otherManureManagementStructure2InitialInvestment',
      label: 'Other Manure Management Structure 2 Initial Investment($)'
    },
    {
      name: 'otherManureManagementStructure2YearsOfUsefulLife',
      label: 'Other Manure Management Structure 2 Years of Useful Life(years)'
    },

    // Land Fixed Costs
    { name: 'acres', label: 'Acres' },
    { name: 'rentalCost', label: 'Rental Cost($/Acre)' }
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
