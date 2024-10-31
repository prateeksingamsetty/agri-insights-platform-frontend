'use client'

import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Tooltip
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputDialog from './InputDialog'
import { useAuth } from 'src/context/AuthContext'

interface FeedCostType {
  // Raised Forage Variable Costs
  cornSilageTVC: number
  cornSilageTVCPerTon: number
  sorghumSilageTVC: number
  sorghumSilageTVCPerTon: number
  smallGrainSilageTVC: number
  smallGrainSilageTVCPerTon: number
  grassHayTVC: number
  grassHayTVCPerTon: number
  alfalfaHayEstablishmentTVC: number
  alfalfaHayEstablishmentTVCPerTon: number
  alfalfaHayStandTVC: number
  alfalfaHayStandTVCPerTon: number

  // Raised Forage Fixed Cost
  cornSilageFixedCostAllocation: number
  cornSilageFixedCostPerTon: number
  sorghumSilageFixedCostAllocation: number
  sorghumSilageFixedCostPerTon: number
  smallGrainSilageFixedCostAllocation: number
  smallGrainSilageFixedCostPerTon: number
  grassHayFixedCostAllocation: number
  grassHayFixedCostPerTon: number
  alfalfaHayEstablishmentFixedCostAllocation: number
  alfalfaHayEstablishmentFixedCostPerTon: number
  alfalfaHayStandFixedCostAllocation: number
  alfalfaHayStandFixedCostPerTon: number

  // Raised Forage Total Cost
  cornSilageTotalCost: number
  cornSilageTotalCostPerTon: number
  sorghumSilageTotalCost: number
  sorghumSilageTotalCostPerTon: number
  smallGrainSilageTotalCost: number
  smallGrainSilageTotalCostPerTon: number
  grassHayTotalCost: number
  grassHayTotalCostPerTon: number
  alfalfaHayEstablishmentTotalCost: number
  alfalfaHayEstablishmentTotalCostPerTon: number
  alfalfaHayStandTotalCost: number
  alfalfaHayStandTotalCostPerTon: number

  // Purchased Feed Expenses
  cornSilageTonsToBePurchased: number
  cornSilageCostOfCommodity: number
  cornSilageCostOfTrucking: number
  purchasedCornSilageTotalCost: number
  sorghumSilageTonsToBePurchased: number
  sorghumSilageCostOfCommodity: number
  sorghumSilageCostOfTrucking: number
  purchasedSorghumSilageTotalCost: number
  smallGrainSilageTonsToBePurchased: number
  smallGrainSilageCostOfCommodity: number
  smallGrainSilageCostOfTrucking: number
  purchasedSmallGrainSilageTotalCost: number
  grassHayTonsToBePurchased: number
  grassHayCostOfCommodity: number
  grassHayCostOfTrucking: number
  purchasedGrassHayTotalCost: number
  alfalfaLegumeHayTonsToBePurchased: number
  alfalfaLegumeHayCostOfCommodity: number
  alfalfaLegumeHayCostOfTrucking: number
  purchasedAlfalfaLegumeHayTotalCost: number
  peanutHullsTonsToBePurchased: number
  peanutHullsCostOfCommodity: number
  peanutHullsCostOfTrucking: number
  purchasedPeanutHullsTotalCost: number
  applePomaceNoHullsTonsToBePurchased: number
  applePomaceNoHullsCostOfCommodity: number
  applePomaceNoHullsCostOfTrucking: number
  purchasedApplePomaceNoHullsTotalCost: number
  brewersGrainWetTonsToBePurchased: number
  brewersGrainWetCostOfCommodity: number
  brewersGrainWetCostOfTrucking: number
  purchasedBrewersGrainWetTotalCost: number
  citrusPulpDryTonsToBePurchased: number
  citrusPulpDryCostOfCommodity: number
  citrusPulpDryCostOfTrucking: number
  purchasedCitrusPulpDryTotalCost: number
  cornGlutenFeedTonsToBePurchased: number
  cornGlutenFeedCostOfCommodity: number
  cornGlutenFeedCostOfTrucking: number
  purchasedCornGlutenFeedTotalCost: number
  wholeCottonseedTonsToBePurchased: number
  wholeCottonseedCostOfCommodity: number
  wholeCottonseedCostOfTrucking: number
  purchasedWholeCottonseedTotalCost: number
  cottonseedHullsTonsToBePurchased: number
  cottonseedHullsCostOfCommodity: number
  cottonseedHullsCostOfTrucking: number
  purchasedCottonseedHullsTotalCost: number
  soybeanMeal48TonsToBePurchased: number
  soybeanMeal48CostOfCommodity: number
  soybeanMeal48CostOfTrucking: number
  purchasedSoybeanMeal48TotalCost: number
  customFeedMixTonsToBePurchased: number
  customFeedMixCostOfCommodity: number
  customFeedMixCostOfTrucking: number
  purchasedCustomFeedMixTotalCost: number
  customMineralMixTonsToBePurchased: number
  customMineralMixCostOfCommodity: number
  customMineralMixCostOfTrucking: number
  purchasedCustomMineralMixTotalCost: number

  // Grown Forage Trucking Cost
  cornSilageGrownForageTruckingCost: number
  sorghumSilageGrownForageTruckingCost: number
  smallGrainSilageGrownForageTruckingCost: number
  grassHayGrownForageTruckingCost: number
  alfalfaHayEstablishmentGrownForageTruckingCost: number
  alfalfaHayStandGrownForageTruckingCost: number
}

const RaisedForage = () => {
  const { email, loggedIn } = useAuth()
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  const [details, setDetails] = useState<FeedCostType>({
    // Raised Forage Variable Costs
    cornSilageTVC: 0,
    cornSilageTVCPerTon: 0,
    sorghumSilageTVC: 0,
    sorghumSilageTVCPerTon: 0,
    smallGrainSilageTVC: 0,
    smallGrainSilageTVCPerTon: 0,
    grassHayTVC: 0,
    grassHayTVCPerTon: 0,
    alfalfaHayEstablishmentTVC: 0,
    alfalfaHayEstablishmentTVCPerTon: 0,
    alfalfaHayStandTVC: 0,
    alfalfaHayStandTVCPerTon: 0,

    // Raised Forage Fixed Cost
    cornSilageFixedCostAllocation: 0,
    cornSilageFixedCostPerTon: 0,
    sorghumSilageFixedCostAllocation: 0,
    sorghumSilageFixedCostPerTon: 0,
    smallGrainSilageFixedCostAllocation: 0,
    smallGrainSilageFixedCostPerTon: 0,
    grassHayFixedCostAllocation: 0,
    grassHayFixedCostPerTon: 0,
    alfalfaHayEstablishmentFixedCostAllocation: 0,
    alfalfaHayEstablishmentFixedCostPerTon: 0,
    alfalfaHayStandFixedCostAllocation: 0,
    alfalfaHayStandFixedCostPerTon: 0,

    // Raised Forage Total Cost
    cornSilageTotalCost: 0,
    cornSilageTotalCostPerTon: 0,
    sorghumSilageTotalCost: 0,
    sorghumSilageTotalCostPerTon: 0,
    smallGrainSilageTotalCost: 0,
    smallGrainSilageTotalCostPerTon: 0,
    grassHayTotalCost: 0,
    grassHayTotalCostPerTon: 0,
    alfalfaHayEstablishmentTotalCost: 0,
    alfalfaHayEstablishmentTotalCostPerTon: 0,
    alfalfaHayStandTotalCost: 0,
    alfalfaHayStandTotalCostPerTon: 0,

    // Purchased Feed Expenses
    cornSilageTonsToBePurchased: 0,
    cornSilageCostOfCommodity: 0,
    cornSilageCostOfTrucking: 0,
    purchasedCornSilageTotalCost: 0,
    sorghumSilageTonsToBePurchased: 0,
    sorghumSilageCostOfCommodity: 0,
    sorghumSilageCostOfTrucking: 0,
    purchasedSorghumSilageTotalCost: 0,
    smallGrainSilageTonsToBePurchased: 0,
    smallGrainSilageCostOfCommodity: 0,
    smallGrainSilageCostOfTrucking: 0,
    purchasedSmallGrainSilageTotalCost: 0,
    grassHayTonsToBePurchased: 0,
    grassHayCostOfCommodity: 0,
    grassHayCostOfTrucking: 0,
    purchasedGrassHayTotalCost: 0,
    alfalfaLegumeHayTonsToBePurchased: 0,
    alfalfaLegumeHayCostOfCommodity: 0,
    alfalfaLegumeHayCostOfTrucking: 0,
    purchasedAlfalfaLegumeHayTotalCost: 0,
    peanutHullsTonsToBePurchased: 0,
    peanutHullsCostOfCommodity: 0,
    peanutHullsCostOfTrucking: 0,
    purchasedPeanutHullsTotalCost: 0,
    applePomaceNoHullsTonsToBePurchased: 0,
    applePomaceNoHullsCostOfCommodity: 0,
    applePomaceNoHullsCostOfTrucking: 0,
    purchasedApplePomaceNoHullsTotalCost: 0,
    brewersGrainWetTonsToBePurchased: 0,
    brewersGrainWetCostOfCommodity: 0,
    brewersGrainWetCostOfTrucking: 0,
    purchasedBrewersGrainWetTotalCost: 0,
    citrusPulpDryTonsToBePurchased: 0,
    citrusPulpDryCostOfCommodity: 0,
    citrusPulpDryCostOfTrucking: 0,
    purchasedCitrusPulpDryTotalCost: 0,
    cornGlutenFeedTonsToBePurchased: 0,
    cornGlutenFeedCostOfCommodity: 0,
    cornGlutenFeedCostOfTrucking: 0,
    purchasedCornGlutenFeedTotalCost: 0,
    wholeCottonseedTonsToBePurchased: 0,
    wholeCottonseedCostOfCommodity: 0,
    wholeCottonseedCostOfTrucking: 0,
    purchasedWholeCottonseedTotalCost: 0,
    cottonseedHullsTonsToBePurchased: 0,
    cottonseedHullsCostOfCommodity: 0,
    cottonseedHullsCostOfTrucking: 0,
    purchasedCottonseedHullsTotalCost: 0,
    soybeanMeal48TonsToBePurchased: 0,
    soybeanMeal48CostOfCommodity: 0,
    soybeanMeal48CostOfTrucking: 0,
    purchasedSoybeanMeal48TotalCost: 0,
    customFeedMixTonsToBePurchased: 0,
    customFeedMixCostOfCommodity: 0,
    customFeedMixCostOfTrucking: 0,
    purchasedCustomFeedMixTotalCost: 0,
    customMineralMixTonsToBePurchased: 0,
    customMineralMixCostOfCommodity: 0,
    customMineralMixCostOfTrucking: 0,
    purchasedCustomMineralMixTotalCost: 0,

    // Grown Forage Trucking Cost
    cornSilageGrownForageTruckingCost: 0,
    sorghumSilageGrownForageTruckingCost: 0,
    smallGrainSilageGrownForageTruckingCost: 0,
    grassHayGrownForageTruckingCost: 0,
    alfalfaHayEstablishmentGrownForageTruckingCost: 0,
    alfalfaHayStandGrownForageTruckingCost: 0
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log('BASE_URL ', BASE_URL)
    console.log(
      'process.env.NEXT_PUBLIC_BACKEND_URL ',
      process.env.NEXT_PUBLIC_BACKEND_URL
    )

    // This checks if the user is alredy logged in or if not then it checks stored session storage and calculat ouput and display
    if (loggedIn && email != null) {
      console.log('Called because user logged in ', email)
      fetchUserOutputRecord()
    } else {
      console.log('User not logged in')
      const storedInputs = localStorage.getItem('productionInputs')
      if (storedInputs) {
        console.log('Stored inputs true')
        const parsedInputs = JSON.parse(storedInputs)
        handleSubmit(parsedInputs)
      }
    }
  }, [loggedIn, email])

  const fetchUserOutputRecord = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/production-details/outputDetails/${email}`
        // `http://localhost:3001/production-details/outputDetails/${email}`
      )
      if (response && response.data) {
        setDetails({
          // Raised Forage Variable Costs
          cornSilageTVC: response.data.cornSilageTVC || 0,
          cornSilageTVCPerTon: response.data.cornSilageTVCPerTon || 0,
          sorghumSilageTVC: response.data.sorghumSilageTVC || 0,
          sorghumSilageTVCPerTon: response.data.sorghumSilageTVCPerTon || 0,
          smallGrainSilageTVC: response.data.smallGrainSilageTVC || 0,
          smallGrainSilageTVCPerTon:
            response.data.smallGrainSilageTVCPerTon || 0,
          grassHayTVC: response.data.grassHayTVC || 0,
          grassHayTVCPerTon: response.data.grassHayTVCPerTon || 0,
          alfalfaHayEstablishmentTVC:
            response.data.alfalfaHayEstablishmentTVC || 0,
          alfalfaHayEstablishmentTVCPerTon:
            response.data.alfalfaHayEstablishmentTVCPerTon || 0,
          alfalfaHayStandTVC: response.data.alfalfaHayStandTVC || 0,
          alfalfaHayStandTVCPerTon: response.data.alfalfaHayStandTVCPerTon || 0,

          // Raised Forage Fixed Cost
          cornSilageFixedCostAllocation:
            response.data.cornSilageFixedCostAllocation || 0,
          cornSilageFixedCostPerTon:
            response.data.cornSilageFixedCostPerTon || 0,
          sorghumSilageFixedCostAllocation:
            response.data.sorghumSilageFixedCostAllocation || 0,
          sorghumSilageFixedCostPerTon:
            response.data.sorghumSilageFixedCostPerTon || 0,
          smallGrainSilageFixedCostAllocation:
            response.data.smallGrainSilageFixedCostAllocation || 0,
          smallGrainSilageFixedCostPerTon:
            response.data.smallGrainSilageFixedCostPerTon || 0,
          grassHayFixedCostAllocation:
            response.data.grassHayFixedCostAllocation || 0,
          grassHayFixedCostPerTon: response.data.grassHayFixedCostPerTon || 0,
          alfalfaHayEstablishmentFixedCostAllocation:
            response.data.alfalfaHayEstablishmentFixedCostAllocation || 0,
          alfalfaHayEstablishmentFixedCostPerTon:
            response.data.alfalfaHayEstablishmentFixedCostPerTon || 0,
          alfalfaHayStandFixedCostAllocation:
            response.data.alfalfaHayStandFixedCostAllocation || 0,
          alfalfaHayStandFixedCostPerTon:
            response.data.alfalfaHayStandFixedCostPerTon || 0,

          // Raised Forage Total Cost
          cornSilageTotalCost: response.data.cornSilageTotalCost || 0,
          cornSilageTotalCostPerTon:
            response.data.cornSilageTotalCostPerTon || 0,
          sorghumSilageTotalCost: response.data.sorghumSilageTotalCost || 0,
          sorghumSilageTotalCostPerTon:
            response.data.sorghumSilageTotalCostPerTon || 0,
          smallGrainSilageTotalCost:
            response.data.smallGrainSilageTotalCost || 0,
          smallGrainSilageTotalCostPerTon:
            response.data.smallGrainSilageTotalCostPerTon || 0,
          grassHayTotalCost: response.data.grassHayTotalCost || 0,
          grassHayTotalCostPerTon: response.data.grassHayTotalCostPerTon || 0,
          alfalfaHayEstablishmentTotalCost:
            response.data.alfalfaHayEstablishmentTotalCost || 0,
          alfalfaHayEstablishmentTotalCostPerTon:
            response.data.alfalfaHayEstablishmentTotalCostPerTon || 0,
          alfalfaHayStandTotalCost: response.data.alfalfaHayStandTotalCost || 0,
          alfalfaHayStandTotalCostPerTon:
            response.data.alfalfaHayStandTotalCostPerTon || 0,

          // Purchased Feed Expenses
          cornSilageTonsToBePurchased:
            response.data.cornSilageTonsToBePurchased || 0,
          cornSilageCostOfCommodity:
            response.data.cornSilageCostOfCommodity || 0,
          cornSilageCostOfTrucking: response.data.cornSilageCostOfTrucking || 0,
          purchasedCornSilageTotalCost:
            response.data.purchasedCornSilageTotalCost || 0,
          sorghumSilageTonsToBePurchased:
            response.data.sorghumSilageTonsToBePurchased || 0,
          sorghumSilageCostOfCommodity:
            response.data.sorghumSilageCostOfCommodity || 0,
          sorghumSilageCostOfTrucking:
            response.data.sorghumSilageCostOfTrucking || 0,
          purchasedSorghumSilageTotalCost:
            response.data.purchasedSorghumSilageTotalCost || 0,
          smallGrainSilageTonsToBePurchased:
            response.data.smallGrainSilageTonsToBePurchased || 0,
          smallGrainSilageCostOfCommodity:
            response.data.smallGrainSilageCostOfCommodity || 0,
          smallGrainSilageCostOfTrucking:
            response.data.smallGrainSilageCostOfTrucking || 0,
          purchasedSmallGrainSilageTotalCost:
            response.data.purchasedSmallGrainSilageTotalCost || 0,
          grassHayTonsToBePurchased:
            response.data.grassHayTonsToBePurchased || 0,
          grassHayCostOfCommodity: response.data.grassHayCostOfCommodity || 0,
          grassHayCostOfTrucking: response.data.grassHayCostOfTrucking || 0,
          purchasedGrassHayTotalCost:
            response.data.purchasedGrassHayTotalCost || 0,
          alfalfaLegumeHayTonsToBePurchased:
            response.data.alfalfaLegumeHayTonsToBePurchased || 0,
          alfalfaLegumeHayCostOfCommodity:
            response.data.alfalfaLegumeHayCostOfCommodity || 0,
          alfalfaLegumeHayCostOfTrucking:
            response.data.alfalfaLegumeHayCostOfTrucking || 0,
          purchasedAlfalfaLegumeHayTotalCost:
            response.data.purchasedAlfalfaLegumeHayTotalCost || 0,
          peanutHullsTonsToBePurchased:
            response.data.peanutHullsTonsToBePurchased || 0,
          peanutHullsCostOfCommodity:
            response.data.peanutHullsCostOfCommodity || 0,
          peanutHullsCostOfTrucking:
            response.data.peanutHullsCostOfTrucking || 0,
          purchasedPeanutHullsTotalCost:
            response.data.purchasedPeanutHullsTotalCost || 0,
          applePomaceNoHullsTonsToBePurchased:
            response.data.applePomaceNoHullsTonsToBePurchased || 0,
          applePomaceNoHullsCostOfCommodity:
            response.data.applePomaceNoHullsCostOfCommodity || 0,
          applePomaceNoHullsCostOfTrucking:
            response.data.applePomaceNoHullsCostOfTrucking || 0,
          purchasedApplePomaceNoHullsTotalCost:
            response.data.purchasedApplePomaceNoHullsTotalCost || 0,
          brewersGrainWetTonsToBePurchased:
            response.data.brewersGrainWetTonsToBePurchased || 0,
          brewersGrainWetCostOfCommodity:
            response.data.brewersGrainWetCostOfCommodity || 0,
          brewersGrainWetCostOfTrucking:
            response.data.brewersGrainWetCostOfTrucking || 0,
          purchasedBrewersGrainWetTotalCost:
            response.data.purchasedBrewersGrainWetTotalCost || 0,
          citrusPulpDryTonsToBePurchased:
            response.data.citrusPulpDryTonsToBePurchased || 0,
          citrusPulpDryCostOfCommodity:
            response.data.citrusPulpDryCostOfCommodity || 0,
          citrusPulpDryCostOfTrucking:
            response.data.citrusPulpDryCostOfTrucking || 0,
          purchasedCitrusPulpDryTotalCost:
            response.data.purchasedCitrusPulpDryTotalCost || 0,
          cornGlutenFeedTonsToBePurchased:
            response.data.cornGlutenFeedTonsToBePurchased || 0,
          cornGlutenFeedCostOfCommodity:
            response.data.cornGlutenFeedCostOfCommodity || 0,
          cornGlutenFeedCostOfTrucking:
            response.data.cornGlutenFeedCostOfTrucking || 0,
          purchasedCornGlutenFeedTotalCost:
            response.data.purchasedCornGlutenFeedTotalCost || 0,
          wholeCottonseedTonsToBePurchased:
            response.data.wholeCottonseedTonsToBePurchased || 0,
          wholeCottonseedCostOfCommodity:
            response.data.wholeCottonseedCostOfCommodity || 0,
          wholeCottonseedCostOfTrucking:
            response.data.wholeCottonseedCostOfTrucking || 0,
          purchasedWholeCottonseedTotalCost:
            response.data.purchasedWholeCottonseedTotalCost || 0,
          cottonseedHullsTonsToBePurchased:
            response.data.cottonseedHullsTonsToBePurchased || 0,
          cottonseedHullsCostOfCommodity:
            response.data.cottonseedHullsCostOfCommodity || 0,
          cottonseedHullsCostOfTrucking:
            response.data.cottonseedHullsCostOfTrucking || 0,
          purchasedCottonseedHullsTotalCost:
            response.data.purchasedCottonseedHullsTotalCost || 0,
          soybeanMeal48TonsToBePurchased:
            response.data.soybeanMeal48TonsToBePurchased || 0,
          soybeanMeal48CostOfCommodity:
            response.data.soybeanMeal48CostOfCommodity || 0,
          soybeanMeal48CostOfTrucking:
            response.data.soybeanMeal48CostOfTrucking || 0,
          purchasedSoybeanMeal48TotalCost:
            response.data.purchasedSoybeanMeal48TotalCost || 0,
          customFeedMixTonsToBePurchased:
            response.data.customFeedMixTonsToBePurchased || 0,
          customFeedMixCostOfCommodity:
            response.data.customFeedMixCostOfCommodity || 0,
          customFeedMixCostOfTrucking:
            response.data.customFeedMixCostOfTrucking || 0,
          purchasedCustomFeedMixTotalCost:
            response.data.purchasedCustomFeedMixTotalCost || 0,
          customMineralMixTonsToBePurchased:
            response.data.customMineralMixTonsToBePurchased || 0,
          customMineralMixCostOfCommodity:
            response.data.customMineralMixCostOfCommodity || 0,
          customMineralMixCostOfTrucking:
            response.data.customMineralMixCostOfTrucking || 0,
          purchasedCustomMineralMixTotalCost:
            response.data.purchasedCustomMineralMixTotalCost || 0,

          // Grown Forage Trucking Cost
          cornSilageGrownForageTruckingCost:
            response.data.cornSilageGrownForageTruckingCost || 0,
          sorghumSilageGrownForageTruckingCost:
            response.data.sorghumSilageGrownForageTruckingCost || 0,
          smallGrainSilageGrownForageTruckingCost:
            response.data.smallGrainSilageGrownForageTruckingCost || 0,
          grassHayGrownForageTruckingCost:
            response.data.grassHayGrownForageTruckingCost || 0,
          alfalfaHayEstablishmentGrownForageTruckingCost:
            response.data.alfalfaHayEstablishmentGrownForageTruckingCost || 0,
          alfalfaHayStandGrownForageTruckingCost:
            response.data.alfalfaHayStandGrownForageTruckingCost || 0
        })
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn('No user output record found for the given email')
      } else {
        console.error('Error fetching user output record:', error)
      }
    }
  }

  const handleDialogOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleSubmit = async (userInputs: any) => {
    console.log('Production details userInputs ', userInputs)
    try {
      const transformedInputs = {
        milkProduction: {
          totalNumberOfCows: userInputs.totalNumberOfCows,
          expectedMilkPrice: userInputs.expectedMilkPrice,
          calvingInterval: userInputs.calvingInterval,
          expectedMilkProduction: userInputs.expectedMilkProduction
        },
        heiferProduction: {
          cullingRate: userInputs.cullingRate,
          cowDeathLossRate: userInputs.cowDeathLossRate,
          heiferRaisingDeathLossRate: userInputs.heiferRaisingDeathLossRate,
          numberOfHeifersRaised: userInputs.numberOfHeifersRaised,
          bullCalfDeath: userInputs.bullCalfDeath,
          expectedPercentMaleWithSexedSemen:
            userInputs.expectedPercentMaleWithSexedSemen,
          expectedPercentMaleWithConventional:
            userInputs.expectedPercentMaleWithConventional
        },
        beefCrossDetails: {
          beefCrossPercent: userInputs.beefCrossPercent,
          beefCrossDeathRate: userInputs.beefCrossDeathRate
        }
      }

      let response
      if (loggedIn && email) {
        response = await axios.patch(
          `${BASE_URL}/production-details/updateInput/${email}`,
          transformedInputs
        )
      } else {
        response = await axios.post(
          `${BASE_URL}/production-details/calculateProductionDetails`,
          transformedInputs
        )
        localStorage.setItem('productionInputs', JSON.stringify(userInputs))
      }

      if (response && response.data) {
        setDetails({
          // Raised Forage Variable Costs
          cornSilageTVC: response.data.cornSilageTVC || 0,
          cornSilageTVCPerTon: response.data.cornSilageTVCPerTon || 0,
          sorghumSilageTVC: response.data.sorghumSilageTVC || 0,
          sorghumSilageTVCPerTon: response.data.sorghumSilageTVCPerTon || 0,
          smallGrainSilageTVC: response.data.smallGrainSilageTVC || 0,
          smallGrainSilageTVCPerTon:
            response.data.smallGrainSilageTVCPerTon || 0,
          grassHayTVC: response.data.grassHayTVC || 0,
          grassHayTVCPerTon: response.data.grassHayTVCPerTon || 0,
          alfalfaHayEstablishmentTVC:
            response.data.alfalfaHayEstablishmentTVC || 0,
          alfalfaHayEstablishmentTVCPerTon:
            response.data.alfalfaHayEstablishmentTVCPerTon || 0,
          alfalfaHayStandTVC: response.data.alfalfaHayStandTVC || 0,
          alfalfaHayStandTVCPerTon: response.data.alfalfaHayStandTVCPerTon || 0,

          // Raised Forage Fixed Cost
          cornSilageFixedCostAllocation:
            response.data.cornSilageFixedCostAllocation || 0,
          cornSilageFixedCostPerTon:
            response.data.cornSilageFixedCostPerTon || 0,
          sorghumSilageFixedCostAllocation:
            response.data.sorghumSilageFixedCostAllocation || 0,
          sorghumSilageFixedCostPerTon:
            response.data.sorghumSilageFixedCostPerTon || 0,
          smallGrainSilageFixedCostAllocation:
            response.data.smallGrainSilageFixedCostAllocation || 0,
          smallGrainSilageFixedCostPerTon:
            response.data.smallGrainSilageFixedCostPerTon || 0,
          grassHayFixedCostAllocation:
            response.data.grassHayFixedCostAllocation || 0,
          grassHayFixedCostPerTon: response.data.grassHayFixedCostPerTon || 0,
          alfalfaHayEstablishmentFixedCostAllocation:
            response.data.alfalfaHayEstablishmentFixedCostAllocation || 0,
          alfalfaHayEstablishmentFixedCostPerTon:
            response.data.alfalfaHayEstablishmentFixedCostPerTon || 0,
          alfalfaHayStandFixedCostAllocation:
            response.data.alfalfaHayStandFixedCostAllocation || 0,
          alfalfaHayStandFixedCostPerTon:
            response.data.alfalfaHayStandFixedCostPerTon || 0,

          // Raised Forage Total Cost
          cornSilageTotalCost: response.data.cornSilageTotalCost || 0,
          cornSilageTotalCostPerTon:
            response.data.cornSilageTotalCostPerTon || 0,
          sorghumSilageTotalCost: response.data.sorghumSilageTotalCost || 0,
          sorghumSilageTotalCostPerTon:
            response.data.sorghumSilageTotalCostPerTon || 0,
          smallGrainSilageTotalCost:
            response.data.smallGrainSilageTotalCost || 0,
          smallGrainSilageTotalCostPerTon:
            response.data.smallGrainSilageTotalCostPerTon || 0,
          grassHayTotalCost: response.data.grassHayTotalCost || 0,
          grassHayTotalCostPerTon: response.data.grassHayTotalCostPerTon || 0,
          alfalfaHayEstablishmentTotalCost:
            response.data.alfalfaHayEstablishmentTotalCost || 0,
          alfalfaHayEstablishmentTotalCostPerTon:
            response.data.alfalfaHayEstablishmentTotalCostPerTon || 0,
          alfalfaHayStandTotalCost: response.data.alfalfaHayStandTotalCost || 0,
          alfalfaHayStandTotalCostPerTon:
            response.data.alfalfaHayStandTotalCostPerTon || 0,

          // Purchased Feed Expenses
          cornSilageTonsToBePurchased:
            response.data.cornSilageTonsToBePurchased || 0,
          cornSilageCostOfCommodity:
            response.data.cornSilageCostOfCommodity || 0,
          cornSilageCostOfTrucking: response.data.cornSilageCostOfTrucking || 0,
          purchasedCornSilageTotalCost:
            response.data.purchasedCornSilageTotalCost || 0,
          sorghumSilageTonsToBePurchased:
            response.data.sorghumSilageTonsToBePurchased || 0,
          sorghumSilageCostOfCommodity:
            response.data.sorghumSilageCostOfCommodity || 0,
          sorghumSilageCostOfTrucking:
            response.data.sorghumSilageCostOfTrucking || 0,
          purchasedSorghumSilageTotalCost:
            response.data.purchasedSorghumSilageTotalCost || 0,
          smallGrainSilageTonsToBePurchased:
            response.data.smallGrainSilageTonsToBePurchased || 0,
          smallGrainSilageCostOfCommodity:
            response.data.smallGrainSilageCostOfCommodity || 0,
          smallGrainSilageCostOfTrucking:
            response.data.smallGrainSilageCostOfTrucking || 0,
          purchasedSmallGrainSilageTotalCost:
            response.data.purchasedSmallGrainSilageTotalCost || 0,
          grassHayTonsToBePurchased:
            response.data.grassHayTonsToBePurchased || 0,
          grassHayCostOfCommodity: response.data.grassHayCostOfCommodity || 0,
          grassHayCostOfTrucking: response.data.grassHayCostOfTrucking || 0,
          purchasedGrassHayTotalCost:
            response.data.purchasedGrassHayTotalCost || 0,
          alfalfaLegumeHayTonsToBePurchased:
            response.data.alfalfaLegumeHayTonsToBePurchased || 0,
          alfalfaLegumeHayCostOfCommodity:
            response.data.alfalfaLegumeHayCostOfCommodity || 0,
          alfalfaLegumeHayCostOfTrucking:
            response.data.alfalfaLegumeHayCostOfTrucking || 0,
          purchasedAlfalfaLegumeHayTotalCost:
            response.data.purchasedAlfalfaLegumeHayTotalCost || 0,
          peanutHullsTonsToBePurchased:
            response.data.peanutHullsTonsToBePurchased || 0,
          peanutHullsCostOfCommodity:
            response.data.peanutHullsCostOfCommodity || 0,
          peanutHullsCostOfTrucking:
            response.data.peanutHullsCostOfTrucking || 0,
          purchasedPeanutHullsTotalCost:
            response.data.purchasedPeanutHullsTotalCost || 0,
          applePomaceNoHullsTonsToBePurchased:
            response.data.applePomaceNoHullsTonsToBePurchased || 0,
          applePomaceNoHullsCostOfCommodity:
            response.data.applePomaceNoHullsCostOfCommodity || 0,
          applePomaceNoHullsCostOfTrucking:
            response.data.applePomaceNoHullsCostOfTrucking || 0,
          purchasedApplePomaceNoHullsTotalCost:
            response.data.purchasedApplePomaceNoHullsTotalCost || 0,
          brewersGrainWetTonsToBePurchased:
            response.data.brewersGrainWetTonsToBePurchased || 0,
          brewersGrainWetCostOfCommodity:
            response.data.brewersGrainWetCostOfCommodity || 0,
          brewersGrainWetCostOfTrucking:
            response.data.brewersGrainWetCostOfTrucking || 0,
          purchasedBrewersGrainWetTotalCost:
            response.data.purchasedBrewersGrainWetTotalCost || 0,
          citrusPulpDryTonsToBePurchased:
            response.data.citrusPulpDryTonsToBePurchased || 0,
          citrusPulpDryCostOfCommodity:
            response.data.citrusPulpDryCostOfCommodity || 0,
          citrusPulpDryCostOfTrucking:
            response.data.citrusPulpDryCostOfTrucking || 0,
          purchasedCitrusPulpDryTotalCost:
            response.data.purchasedCitrusPulpDryTotalCost || 0,
          cornGlutenFeedTonsToBePurchased:
            response.data.cornGlutenFeedTonsToBePurchased || 0,
          cornGlutenFeedCostOfCommodity:
            response.data.cornGlutenFeedCostOfCommodity || 0,
          cornGlutenFeedCostOfTrucking:
            response.data.cornGlutenFeedCostOfTrucking || 0,
          purchasedCornGlutenFeedTotalCost:
            response.data.purchasedCornGlutenFeedTotalCost || 0,
          wholeCottonseedTonsToBePurchased:
            response.data.wholeCottonseedTonsToBePurchased || 0,
          wholeCottonseedCostOfCommodity:
            response.data.wholeCottonseedCostOfCommodity || 0,
          wholeCottonseedCostOfTrucking:
            response.data.wholeCottonseedCostOfTrucking || 0,
          purchasedWholeCottonseedTotalCost:
            response.data.purchasedWholeCottonseedTotalCost || 0,
          cottonseedHullsTonsToBePurchased:
            response.data.cottonseedHullsTonsToBePurchased || 0,
          cottonseedHullsCostOfCommodity:
            response.data.cottonseedHullsCostOfCommodity || 0,
          cottonseedHullsCostOfTrucking:
            response.data.cottonseedHullsCostOfTrucking || 0,
          purchasedCottonseedHullsTotalCost:
            response.data.purchasedCottonseedHullsTotalCost || 0,
          soybeanMeal48TonsToBePurchased:
            response.data.soybeanMeal48TonsToBePurchased || 0,
          soybeanMeal48CostOfCommodity:
            response.data.soybeanMeal48CostOfCommodity || 0,
          soybeanMeal48CostOfTrucking:
            response.data.soybeanMeal48CostOfTrucking || 0,
          purchasedSoybeanMeal48TotalCost:
            response.data.purchasedSoybeanMeal48TotalCost || 0,
          customFeedMixTonsToBePurchased:
            response.data.customFeedMixTonsToBePurchased || 0,
          customFeedMixCostOfCommodity:
            response.data.customFeedMixCostOfCommodity || 0,
          customFeedMixCostOfTrucking:
            response.data.customFeedMixCostOfTrucking || 0,
          purchasedCustomFeedMixTotalCost:
            response.data.purchasedCustomFeedMixTotalCost || 0,
          customMineralMixTonsToBePurchased:
            response.data.customMineralMixTonsToBePurchased || 0,
          customMineralMixCostOfCommodity:
            response.data.customMineralMixCostOfCommodity || 0,
          customMineralMixCostOfTrucking:
            response.data.customMineralMixCostOfTrucking || 0,
          purchasedCustomMineralMixTotalCost:
            response.data.purchasedCustomMineralMixTotalCost || 0,

          // Grown Forage Trucking Cost
          cornSilageGrownForageTruckingCost:
            response.data.cornSilageGrownForageTruckingCost || 0,
          sorghumSilageGrownForageTruckingCost:
            response.data.sorghumSilageGrownForageTruckingCost || 0,
          smallGrainSilageGrownForageTruckingCost:
            response.data.smallGrainSilageGrownForageTruckingCost || 0,
          grassHayGrownForageTruckingCost:
            response.data.grassHayGrownForageTruckingCost || 0,
          alfalfaHayEstablishmentGrownForageTruckingCost:
            response.data.alfalfaHayEstablishmentGrownForageTruckingCost || 0,
          alfalfaHayStandGrownForageTruckingCost:
            response.data.alfalfaHayStandGrownForageTruckingCost || 0
        })
      }
    } catch (error) {
      console.error('Error updating user inputs:', error)
    }
  }

  const textFields = [
    // Raised Forage Variable Cost
    [
      { label: 'Corn Silage TVC', value: details.cornSilageTVC },
      { label: 'Corn Silage TVC/Ton', value: details.cornSilageTVCPerTon }
    ],
    [
      { label: 'Sorghum Silage TVC', value: details.sorghumSilageTVC },
      { label: 'Sorghum Silage TVC/Ton', value: details.sorghumSilageTVCPerTon }
    ],
    [
      { label: 'Small Grain Silage TVC', value: details.smallGrainSilageTVC },
      {
        label: 'Small Grain Silage TVC/Ton',
        value: details.smallGrainSilageTVCPerTon
      }
    ],
    [
      { label: 'Grass Hay TVC', value: details.grassHayTVC },
      { label: 'Grass Hay TVC/Ton', value: details.grassHayTVCPerTon }
    ],
    [
      {
        label: 'Alfalfa Hay Establishment TVC',
        value: details.alfalfaHayEstablishmentTVC
      },
      {
        label: 'Alfalfa Hay Establishment TVC/Ton',
        value: details.alfalfaHayEstablishmentTVCPerTon
      }
    ],
    [
      { label: 'Alfalfa Hay Stand TVC', value: details.alfalfaHayStandTVC },
      {
        label: 'Alfalfa Hay Stand TVC/Ton',
        value: details.alfalfaHayStandTVCPerTon
      }
    ],

    // Raised Forage Fixed Cost
    [
      {
        label: 'Corn Silage Fixed Cost Allocation',
        value: details.cornSilageFixedCostAllocation
      },
      {
        label: 'Corn Silage Fixed Cost/Ton',
        value: details.cornSilageFixedCostPerTon
      }
    ],
    [
      {
        label: 'Sorghum Silage Fixed Cost Allocation',
        value: details.sorghumSilageFixedCostAllocation
      },
      {
        label: 'Sorghum Silage Fixed Cost/Ton',
        value: details.sorghumSilageFixedCostPerTon
      }
    ],
    [
      {
        label: 'Small Grain Silage Fixed Cost Allocation',
        value: details.smallGrainSilageFixedCostAllocation
      },
      {
        label: 'Small Grain Silage Fixed Cost/Ton',
        value: details.smallGrainSilageFixedCostPerTon
      }
    ],
    [
      {
        label: 'Grass Hay Fixed Cost Allocation',
        value: details.grassHayFixedCostAllocation
      },
      {
        label: 'Grass Hay Fixed Cost/Ton',
        value: details.grassHayFixedCostPerTon
      }
    ],
    [
      {
        label: 'Alfalfa Hay Establishment Fixed Cost Allocation',
        value: details.alfalfaHayEstablishmentFixedCostAllocation
      },
      {
        label: 'Alfalfa Hay Establishment Fixed Cost/Ton',
        value: details.alfalfaHayEstablishmentFixedCostPerTon
      }
    ],
    [
      {
        label: 'Alfalfa Hay Stand Fixed Cost Allocation',
        value: details.alfalfaHayStandFixedCostAllocation
      },
      {
        label: 'Alfalfa Hay Stand Fixed Cost/Ton',
        value: details.alfalfaHayStandFixedCostPerTon
      }
    ],

    // Raised Forage Total Cost
    [
      { label: 'Corn Silage Total Cost', value: details.cornSilageTotalCost },
      {
        label: 'Corn Silage Total Cost/Ton',
        value: details.cornSilageTotalCostPerTon
      }
    ],
    [
      {
        label: 'Sorghum Silage Total Cost',
        value: details.sorghumSilageTotalCost
      },
      {
        label: 'Sorghum Silage Total Cost/Ton',
        value: details.sorghumSilageTotalCostPerTon
      }
    ],
    [
      {
        label: 'Small Grain Silage Total Cost',
        value: details.smallGrainSilageTotalCost
      },
      {
        label: 'Small Grain Silage Total Cost/Ton',
        value: details.smallGrainSilageTotalCostPerTon
      }
    ],
    [
      { label: 'Grass Hay Total Cost', value: details.grassHayTotalCost },
      {
        label: 'Grass Hay Total Cost/Ton',
        value: details.grassHayTotalCostPerTon
      }
    ],
    [
      {
        label: 'Alfalfa Hay Establishment Total Cost',
        value: details.alfalfaHayEstablishmentTotalCost
      },
      {
        label: 'Alfalfa Hay Establishment Total Cost/Ton',
        value: details.alfalfaHayEstablishmentTotalCostPerTon
      }
    ],
    [
      {
        label: 'Alfalfa Hay Stand Total Cost',
        value: details.alfalfaHayStandTotalCost
      },
      {
        label: 'Alfalfa Hay Stand Total Cost/Ton',
        value: details.alfalfaHayStandTotalCostPerTon
      }
    ],

    // Purchased Feed Expenses
    [
      {
        label: 'Corn Silage Tons to be Purchased',
        value: details.cornSilageTonsToBePurchased
      },
      {
        label: 'Corn Silage Cost of Commodity',
        value: details.cornSilageCostOfCommodity
      },
      {
        label: 'Corn Silage Cost of Trucking',
        value: details.cornSilageCostOfTrucking
      },
      {
        label: 'Purchased Corn Silage Total Cost',
        value: details.purchasedCornSilageTotalCost
      }
    ],
    [
      {
        label: 'Sorghum Silage Tons to be Purchased',
        value: details.sorghumSilageTonsToBePurchased
      },
      {
        label: 'Sorghum Silage Cost of Commodity',
        value: details.sorghumSilageCostOfCommodity
      },
      {
        label: 'Sorghum Silage Cost of Trucking',
        value: details.sorghumSilageCostOfTrucking
      },
      {
        label: 'Purchased Sorghum Silage Total Cost',
        value: details.purchasedSorghumSilageTotalCost
      }
    ],
    [
      {
        label: 'Small Grain Silage Tons to be Purchased',
        value: details.smallGrainSilageTonsToBePurchased
      },
      {
        label: 'Small Grain Silage Cost of Commodity',
        value: details.smallGrainSilageCostOfCommodity
      },
      {
        label: 'Small Grain Silage Cost of Trucking',
        value: details.smallGrainSilageCostOfTrucking
      },
      {
        label: 'Purchased Small Grain Silage Total Cost',
        value: details.purchasedSmallGrainSilageTotalCost
      }
    ],
    [
      {
        label: 'Grass Hay Tons to be Purchased',
        value: details.grassHayTonsToBePurchased
      },
      {
        label: 'Grass Hay Cost of Commodity',
        value: details.grassHayCostOfCommodity
      },
      {
        label: 'Grass Hay Cost of Trucking',
        value: details.grassHayCostOfTrucking
      },
      {
        label: 'Purchased Grass Hay Total Cost',
        value: details.purchasedGrassHayTotalCost
      }
    ],
    [
      {
        label: 'Alfalfa/Legume Hay Tons to be Purchased',
        value: details.alfalfaLegumeHayTonsToBePurchased
      },
      {
        label: 'Alfalfa/Legume Hay Cost of Commodity',
        value: details.alfalfaLegumeHayCostOfCommodity
      },
      {
        label: 'Alfalfa/Legume Hay Cost of Trucking',
        value: details.alfalfaLegumeHayCostOfTrucking
      },
      {
        label: 'Purchased Alfalfa/Legume Hay Total Cost',
        value: details.purchasedAlfalfaLegumeHayTotalCost
      }
    ],
    [
      {
        label: 'Peanut Hulls Tons to be Purchased',
        value: details.peanutHullsTonsToBePurchased
      },
      {
        label: 'Peanut Hulls Cost of Commodity',
        value: details.peanutHullsCostOfCommodity
      },
      {
        label: 'Peanut Hulls Cost of Trucking',
        value: details.peanutHullsCostOfTrucking
      },
      {
        label: 'Purchased Peanut Hulls Total Cost',
        value: details.purchasedPeanutHullsTotalCost
      }
    ],
    [
      {
        label: 'Apple Pomace (No Hulls) Tons to be Purchased',
        value: details.applePomaceNoHullsTonsToBePurchased
      },
      {
        label: 'Apple Pomace (No Hulls) Cost of Commodity',
        value: details.applePomaceNoHullsCostOfCommodity
      },
      {
        label: 'Apple Pomace (No Hulls) Cost of Trucking',
        value: details.applePomaceNoHullsCostOfTrucking
      },
      {
        label: 'Purchased Apple Pomace (No Hulls) Total Cost',
        value: details.purchasedApplePomaceNoHullsTotalCost
      }
    ],
    [
      {
        label: "Brewer's Grain (Wet) Tons to be Purchased",
        value: details.brewersGrainWetTonsToBePurchased
      },
      {
        label: "Brewer's Grain (Wet) Cost of Commodity",
        value: details.brewersGrainWetCostOfCommodity
      },
      {
        label: "Brewer's Grain (Wet) Cost of Trucking",
        value: details.brewersGrainWetCostOfTrucking
      },
      {
        label: "Purchased Brewer's Grain (Wet) Total Cost",
        value: details.purchasedBrewersGrainWetTotalCost
      }
    ],
    [
      {
        label: 'Citrus Pulp (Dry) Tons to be Purchased',
        value: details.citrusPulpDryTonsToBePurchased
      },
      {
        label: 'Citrus Pulp (Dry) Cost of Commodity',
        value: details.citrusPulpDryCostOfCommodity
      },
      {
        label: 'Citrus Pulp (Dry) Cost of Trucking',
        value: details.citrusPulpDryCostOfTrucking
      },
      {
        label: 'Purchased Citrus Pulp (Dry) Total Cost',
        value: details.purchasedCitrusPulpDryTotalCost
      }
    ],
    [
      {
        label: 'Corn Gluten (Feed) Tons to be Purchased',
        value: details.cornGlutenFeedTonsToBePurchased
      },
      {
        label: 'Corn Gluten (Feed) Cost of Commodity',
        value: details.cornGlutenFeedCostOfCommodity
      },
      {
        label: 'Corn Gluten (Feed) Cost of Trucking',
        value: details.cornGlutenFeedCostOfTrucking
      },
      {
        label: 'Purchased Corn Gluten (Feed) Total Cost',
        value: details.purchasedCornGlutenFeedTotalCost
      }
    ],
    [
      {
        label: 'Whole Cottonseed Tons to be Purchased',
        value: details.wholeCottonseedTonsToBePurchased
      },
      {
        label: 'Whole Cottonseed Cost of Commodity',
        value: details.wholeCottonseedCostOfCommodity
      },
      {
        label: 'Whole Cottonseed Cost of Trucking',
        value: details.wholeCottonseedCostOfTrucking
      },
      {
        label: 'Purchased Whole Cottonseed Total Cost',
        value: details.purchasedWholeCottonseedTotalCost
      }
    ],
    [
      {
        label: 'Cottonseed Hulls Tons to be Purchased',
        value: details.cottonseedHullsTonsToBePurchased
      },
      {
        label: 'Cottonseed Hulls Cost of Commodity',
        value: details.cottonseedHullsCostOfCommodity
      },
      {
        label: 'Cottonseed Hulls Cost of Trucking',
        value: details.cottonseedHullsCostOfTrucking
      },
      {
        label: 'Purchased Cottonseed Hulls Total Cost',
        value: details.purchasedCottonseedHullsTotalCost
      }
    ],
    [
      {
        label: 'Soybean Meal 48 Tons to be Purchased',
        value: details.soybeanMeal48TonsToBePurchased
      },
      {
        label: 'Soybean Meal 48 Cost of Commodity',
        value: details.soybeanMeal48CostOfCommodity
      },
      {
        label: 'Soybean Meal 48 Cost of Trucking',
        value: details.soybeanMeal48CostOfTrucking
      },
      {
        label: 'Purchased Soybean Meal 48 Total Cost',
        value: details.purchasedSoybeanMeal48TotalCost
      }
    ],
    [
      {
        label: 'Custom Feed Mix Tons to be Purchased',
        value: details.customFeedMixTonsToBePurchased
      },
      {
        label: 'Custom Feed Mix Cost of Commodity',
        value: details.customFeedMixCostOfCommodity
      },
      {
        label: 'Custom Feed Mix Cost of Trucking',
        value: details.customFeedMixCostOfTrucking
      },
      {
        label: 'Purchased Custom Feed Mix Total Cost',
        value: details.purchasedCustomFeedMixTotalCost
      }
    ],
    [
      {
        label: 'Custom Mineral Mix Tons to be Purchased',
        value: details.customMineralMixTonsToBePurchased
      },
      {
        label: 'Custom Mineral Mix Cost of Commodity',
        value: details.customMineralMixCostOfCommodity
      },
      {
        label: 'Custom Mineral Mix Cost of Trucking',
        value: details.customMineralMixCostOfTrucking
      },
      {
        label: 'Purchased Custom Mineral Mix Total Cost',
        value: details.purchasedCustomMineralMixTotalCost
      }
    ],

    // Grown Forage Trucking Costs (Single Entries)
    [
      {
        label: 'Corn Silage Grown Forage Trucking Cost',
        value: details.cornSilageGrownForageTruckingCost
      }
    ],
    [
      {
        label: 'Sorghum Silage Grown Forage Trucking Cost',
        value: details.sorghumSilageGrownForageTruckingCost
      }
    ],
    [
      {
        label: 'Small Grain Silage Grown Forage Trucking Cost',
        value: details.smallGrainSilageGrownForageTruckingCost
      }
    ],
    [
      {
        label: 'Grass Hay Grown Forage Trucking Cost',
        value: details.grassHayGrownForageTruckingCost
      }
    ],
    [
      {
        label: 'Alfalfa Hay Establishment Grown Forage Trucking Cost',
        value: details.alfalfaHayEstablishmentGrownForageTruckingCost
      }
    ],
    [
      {
        label: 'Alfalfa Hay Stand Grown Forage Trucking Cost',
        value: details.alfalfaHayStandGrownForageTruckingCost
      }
    ]
  ]

  return (
    <div>
      <Typography
        className='mt-5 text-center'
        variant='h4'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Raised Forage Costs
      </Typography>
      <Container maxWidth='sm' className='mb-10 mt-10'>
        <Box
          className='space-y-6'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {textFields.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}
            >
              {row.map(field => (
                <Tooltip title={field.label} placement='top'>
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
                    sx={{
                      flex: 1 // Make each TextField flexible in size to fill available space nicely
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
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
            Input Raised Forage Costs
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

export default RaisedForage
