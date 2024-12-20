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
import { useAuth } from 'src/context/AuthContext'
import CombinedInputDialog from './CombinedInputDialog'

interface FeedRequirementsType {
  // Corn Silage
  cornSilageTonsRequired: number
  cornSilageTonsProduced: number
  cornSilageBalanceToBePurchasedOrSold: number

  // Sorghum Silage
  sorghumSilageTonsRequired: number
  sorghumSilageTonsProduced: number
  sorghumSilageBalanceToBePurchasedOrSold: number

  // Small Grain Silage
  smallGrainSilageTonsRequired: number
  smallGrainSilageTonsProduced: number
  smallGrainSilageBalanceToBePurchasedOrSold: number

  // Grass Hay
  grassHayTonsRequired: number
  grassHayTonsProduced: number
  grassHayBalanceToBePurchasedOrSold: number

  // Alfalfa Hay
  alfalfaHayTonsRequired: number
  alfalfaHayTonsProduced: number
  alfalfaHayBalanceToBePurchasedOrSold: number

  // Peanut Hulls
  peanutHullsTonsRequired: number

  // Apple Pomace
  applePomaceTonsRequired: number

  // Distiller's Grain
  distillersGrainTonsRequired: number

  // Brewer's Grain
  brewersGrainTonsRequired: number

  // Citrus Pulp
  citrusPulpTonsRequired: number

  // Corn Gluten
  cornGlutenTonsRequired: number

  // Whole Cottonseed
  wholeCottonseedTonsRequired: number

  // Cottonseed Hulls
  cottonseedHullsTonsRequired: number

  // Soybean Meal 48
  soybeanMeal48TonsRequired: number

  // Custom Feed Mix
  customFeedMixTonsRequired: number

  // Custom Mineral Mix
  customMineralMixTonsRequired: number
}



interface RaisedForageType {
  // Variable Costs
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
  alfalfaHayTonsToBePurchased: number
  alfalfaHayCostOfCommodity: number
  alfalfaHayCostOfTrucking: number
  purchasedAlfalfaHayTotalCost: number
  peanutHullsTonsToBePurchased: number
  peanutHullsCostOfCommodity: number
  peanutHullsCostOfTrucking: number
  purchasedPeanutHullsTotalCost: number
  applePomaceNoHullsTonsToBePurchased: number
  applePomaceNoHullsCostOfCommodity: number
  applePomaceNoHullsCostOfTrucking: number
  purchasedApplePomaceNoHullsTotalCost: number
  distillersGrainWetTonsToBePurchased: number
  distillersGrainWetCostOfCommodity: number
  distillersGrainWetCostOfTrucking: number
  purchasedDistillersGrainWetTotalCost: number
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
  alfalfaHayGrownForageTruckingCost: number
}

const FeedRequirements = () => {
  const { email, loggedIn } = useAuth()
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  const [details, setDetails] = useState<FeedRequirementsType>({
    // Corn Silage
    cornSilageTonsRequired: 0,
    cornSilageTonsProduced: 0,
    cornSilageBalanceToBePurchasedOrSold: 0,

    // Sorghum Silage
    sorghumSilageTonsRequired: 0,
    sorghumSilageTonsProduced: 0,
    sorghumSilageBalanceToBePurchasedOrSold: 0,

    // Small Grain Silage
    smallGrainSilageTonsRequired: 0,
    smallGrainSilageTonsProduced: 0,
    smallGrainSilageBalanceToBePurchasedOrSold: 0,

    // Grass Hay
    grassHayTonsRequired: 0,
    grassHayTonsProduced: 0,
    grassHayBalanceToBePurchasedOrSold: 0,

    // Alfalfa Hay
    alfalfaHayTonsRequired: 0,
    alfalfaHayTonsProduced: 0,
    alfalfaHayBalanceToBePurchasedOrSold: 0,

    // Peanut Hulls
    peanutHullsTonsRequired: 0,

    // Apple Pomace
    applePomaceTonsRequired: 0,

    // Distiller's Grain
    distillersGrainTonsRequired: 0,

    // Brewer's Grain
    brewersGrainTonsRequired: 0,

    // Citrus Pulp
    citrusPulpTonsRequired: 0,

    // Corn Gluten
    cornGlutenTonsRequired: 0,

    // Whole Cottonseed
    wholeCottonseedTonsRequired: 0,

    // Cottonseed Hulls
    cottonseedHullsTonsRequired: 0,

    // Soybean Meal 48
    soybeanMeal48TonsRequired: 0,

    // Custom Feed Mix
    customFeedMixTonsRequired: 0,

    // Custom Mineral Mix
    customMineralMixTonsRequired: 0

    
  })

  const [detailsforage, setDetailsforage] = useState<RaisedForageType>({
    // Corn Silage
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
    alfalfaHayTonsToBePurchased: 0,
    alfalfaHayCostOfCommodity: 0,
    alfalfaHayCostOfTrucking: 0,
    purchasedAlfalfaHayTotalCost: 0,
    peanutHullsTonsToBePurchased: 0,
    peanutHullsCostOfCommodity: 0,
    peanutHullsCostOfTrucking: 0,
    purchasedPeanutHullsTotalCost: 0,
    applePomaceNoHullsTonsToBePurchased: 0,
    applePomaceNoHullsCostOfCommodity: 0,
    applePomaceNoHullsCostOfTrucking: 0,
    purchasedApplePomaceNoHullsTotalCost: 0,
    distillersGrainWetTonsToBePurchased: 0,
    distillersGrainWetCostOfCommodity: 0,
    distillersGrainWetCostOfTrucking: 0,
    purchasedDistillersGrainWetTotalCost: 0,
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
    alfalfaHayGrownForageTruckingCost: 0
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
    }
  }, [loggedIn, email])

  const fetchUserOutputRecord = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed-details/outputDetails/${email}`
      )
      if (response && response.data) {
        setDetails({
          // Corn Silage
          cornSilageTonsRequired: response.data.cornSilageTonsRequired || 0,
          cornSilageTonsProduced: response.data.cornSilageTonsProduced || 0,
          cornSilageBalanceToBePurchasedOrSold:
            response.data.cornSilageBalanceToBePurchasedOrSold || 0,

          // Sorghum Silage
          sorghumSilageTonsRequired:
            response.data.sorghumSilageTonsRequired || 0,
          sorghumSilageTonsProduced:
            response.data.sorghumSilageTonsProduced || 0,
          sorghumSilageBalanceToBePurchasedOrSold:
            response.data.sorghumSilageBalanceToBePurchasedOrSold || 0,

          // Small Grain Silage
          smallGrainSilageTonsRequired:
            response.data.smallGrainSilageTonsRequired || 0,
          smallGrainSilageTonsProduced:
            response.data.smallGrainSilageTonsProduced || 0,
          smallGrainSilageBalanceToBePurchasedOrSold:
            response.data.smallGrainSilageBalanceToBePurchasedOrSold || 0,

          // Grass Hay
          grassHayTonsRequired: response.data.grassHayTonsRequired || 0,
          grassHayTonsProduced: response.data.grassHayTonsProduced || 0,
          grassHayBalanceToBePurchasedOrSold:
            response.data.grassHayBalanceToBePurchasedOrSold || 0,

          // Alfalfa Hay
          alfalfaHayTonsRequired: response.data.alfalfaHayTonsRequired || 0,
          alfalfaHayTonsProduced: response.data.alfalfaHayTonsProduced || 0,
          alfalfaHayBalanceToBePurchasedOrSold:
            response.data.alfalfaHayBalanceToBePurchasedOrSold || 0,

          // Peanut Hulls
          peanutHullsTonsRequired: response.data.peanutHullsTonsRequired || 0,

          // Apple Pomace
          applePomaceTonsRequired: response.data.applePomaceTonsRequired || 0,

          // Distiller's Grain
          distillersGrainTonsRequired:
            response.data.distillersGrainTonsRequired || 0,

          // Brewer's Grain
          brewersGrainTonsRequired: response.data.brewersGrainTonsRequired || 0,

          // Citrus Pulp
          citrusPulpTonsRequired: response.data.citrusPulpTonsRequired || 0,

          // Corn Gluten
          cornGlutenTonsRequired: response.data.cornGlutenTonsRequired || 0,

          // Whole Cottonseed
          wholeCottonseedTonsRequired:
            response.data.wholeCottonseedTonsRequired || 0,

          // Cottonseed Hulls
          cottonseedHullsTonsRequired:
            response.data.cottonseedHullsTonsRequired || 0,

          // Soybean Meal 48
          soybeanMeal48TonsRequired:
            response.data.soybeanMeal48TonsRequired || 0,

          // Custom Feed Mix
          customFeedMixTonsRequired:
            response.data.customFeedMixTonsRequired || 0,

          // Custom Mineral Mix
          customMineralMixTonsRequired:
            response.data.customMineralMixTonsRequired || 0
        })


        setDetailsforage({
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
          alfalfaHayTonsToBePurchased:
            response.data.alfalfaHayTonsToBePurchased || 0,
          alfalfaHayCostOfCommodity:
            response.data.alfalfaHayCostOfCommodity || 0,
          alfalfaHayCostOfTrucking:
            response.data.alfalfaHayCostOfTrucking || 0,
          purchasedAlfalfaHayTotalCost:
            response.data.purchasedAlfalfaHayTotalCost || 0,
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
          distillersGrainWetTonsToBePurchased:
            response.data.distillersGrainWetTonsToBePurchased || 0,
          distillersGrainWetCostOfCommodity:
            response.data.distillersGrainWetCostOfCommodity || 0,
          distillersGrainWetCostOfTrucking:
            response.data.distillersGrainWetCostOfTrucking || 0,
          purchasedDistillersGrainWetTotalCost:
            response.data.purchasedDistillersGrainWetTotalCost || 0,
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
          alfalfaHayGrownForageTruckingCost:
            response.data.alfalfaHayGrownForageTruckingCost || 0
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
    console.log('Feed Requirements userInputs ', userInputs)
    try {
      const transformedInputs = {
        milkingHerd: {
          milkingHerdCornSilageLbsAsFedPerDay:
            userInputs.milkingHerdCornSilageLbsAsFedPerDay,
          milkingHerdCornSilageDaysOnFeed:
            userInputs.milkingHerdCornSilageDaysOnFeed,
          milkingHerdSorghumSilageLbsAsFedPerDay:
            userInputs.milkingHerdSorghumSilageLbsAsFedPerDay,
          milkingHerdSorghumSilageDaysOnFeed:
            userInputs.milkingHerdSorghumSilageDaysOnFeed,
          milkingHerdSmallGrainSilageLbsAsFedPerDay:
            userInputs.milkingHerdSmallGrainSilageLbsAsFedPerDay,
          milkingHerdSmallGrainSilageDaysOnFeed:
            userInputs.milkingHerdSmallGrainSilageDaysOnFeed,
          milkingHerdGrassHayLbsAsFedPerDay:
            userInputs.milkingHerdGrassHayLbsAsFedPerDay,
          milkingHerdGrassHayDaysOnFeed:
            userInputs.milkingHerdGrassHayDaysOnFeed,
          milkingHerdAlfalfaHayLbsAsFedPerDay:
            userInputs.milkingHerdAlfalfaHayLbsAsFedPerDay,
          milkingHerdAlfalfaHayDaysOnFeed:
            userInputs.milkingHerdAlfalfaHayDaysOnFeed,
          milkingHerdPeanutHullsLbsAsFedPerDay:
            userInputs.milkingHerdPeanutHullsLbsAsFedPerDay,
          milkingHerdPeanutHullsDaysOnFeed:
            userInputs.milkingHerdPeanutHullsDaysOnFeed,
          milkingHerdApplePomaceNoHullsLbsAsFedPerDay:
            userInputs.milkingHerdApplePomaceNoHullsLbsAsFedPerDay,
          milkingHerdApplePomaceNoHullsDaysOnFeed:
            userInputs.milkingHerdApplePomaceNoHullsDaysOnFeed,
          milkingHerdDistillersGrainWetLbsAsFedPerDay:
            userInputs.milkingHerdDistillersGrainWetLbsAsFedPerDay,
          milkingHerdDistillersGrainWetDaysOnFeed:
            userInputs.milkingHerdDistillersGrainWetDaysOnFeed,
          milkingHerdBrewersGrainWetLbsAsFedPerDay:
            userInputs.milkingHerdBrewersGrainWetLbsAsFedPerDay,
          milkingHerdBrewersGrainWetDaysOnFeed:
            userInputs.milkingHerdBrewersGrainWetDaysOnFeed,
          milkingHerdCitrusPulpDryLbsAsFedPerDay:
            userInputs.milkingHerdCitrusPulpDryLbsAsFedPerDay,
          milkingHerdCitrusPulpDryDaysOnFeed:
            userInputs.milkingHerdCitrusPulpDryDaysOnFeed,
          milkingHerdCornGlutenFeedLbsAsFedPerDay:
            userInputs.milkingHerdCornGlutenFeedLbsAsFedPerDay,
          milkingHerdCornGlutenFeedDaysOnFeed:
            userInputs.milkingHerdCornGlutenFeedDaysOnFeed,
          milkingHerdWholeCottonseedLbsAsFedPerDay:
            userInputs.milkingHerdWholeCottonseedLbsAsFedPerDay,
          milkingHerdWholeCottonseedDaysOnFeed:
            userInputs.milkingHerdWholeCottonseedDaysOnFeed,
          milkingHerdCottonseedHullsLbsAsFedPerDay:
            userInputs.milkingHerdCottonseedHullsLbsAsFedPerDay,
          milkingHerdCottonseedHullsDaysOnFeed:
            userInputs.milkingHerdCottonseedHullsDaysOnFeed,
          milkingHerdSoybeanMeal48LbsAsFedPerDay:
            userInputs.milkingHerdSoybeanMeal48LbsAsFedPerDay,
          milkingHerdSoybeanMeal48DaysOnFeed:
            userInputs.milkingHerdSoybeanMeal48DaysOnFeed,
          milkingHerdCustomFeedMixLbsAsFedPerDay:
            userInputs.milkingHerdCustomFeedMixLbsAsFedPerDay,
          milkingHerdCustomFeedMixDaysOnFeed:
            userInputs.milkingHerdCustomFeedMixDaysOnFeed,
          milkingHerdCustomMineralMixLbsAsFedPerDay:
            userInputs.milkingHerdCustomMineralMixLbsAsFedPerDay,
          milkingHerdCustomMineralMixDaysOnFeed:
            userInputs.milkingHerdCustomMineralMixDaysOnFeed
        },
        dryHerd: {
          dryHerdCornSilageLbsAsFedPerDay:
            userInputs.dryHerdCornSilageLbsAsFedPerDay,
          dryHerdCornSilageDaysOnFeed: userInputs.dryHerdCornSilageDaysOnFeed,
          dryHerdSorghumSilageLbsAsFedPerDay:
            userInputs.dryHerdSorghumSilageLbsAsFedPerDay,
          dryHerdSorghumSilageDaysOnFeed:
            userInputs.dryHerdSorghumSilageDaysOnFeed,
          dryHerdSmallGrainSilageLbsAsFedPerDay:
            userInputs.dryHerdSmallGrainSilageLbsAsFedPerDay,
          dryHerdSmallGrainSilageDaysOnFeed:
            userInputs.dryHerdSmallGrainSilageDaysOnFeed,
          dryHerdGrassHayLbsAsFedPerDay:
            userInputs.dryHerdGrassHayLbsAsFedPerDay,
          dryHerdGrassHayDaysOnFeed: userInputs.dryHerdGrassHayDaysOnFeed,
          dryHerdAlfalfaHayLbsAsFedPerDay:
            userInputs.dryHerdAlfalfaHayLbsAsFedPerDay,
          dryHerdAlfalfaHayDaysOnFeed: userInputs.dryHerdAlfalfaHayDaysOnFeed,
          dryHerdPeanutHullsLbsAsFedPerDay:
            userInputs.dryHerdPeanutHullsLbsAsFedPerDay,
          dryHerdPeanutHullsDaysOnFeed: userInputs.dryHerdPeanutHullsDaysOnFeed,
          dryHerdApplePomaceNoHullsLbsAsFedPerDay:
            userInputs.dryHerdApplePomaceNoHullsLbsAsFedPerDay,
          dryHerdApplePomaceNoHullsDaysOnFeed:
            userInputs.dryHerdApplePomaceNoHullsDaysOnFeed,
          dryHerdDistillersGrainWetLbsAsFedPerDay:
            userInputs.dryHerdDistillersGrainWetLbsAsFedPerDay,
          dryHerdDistillersGrainWetDaysOnFeed:
            userInputs.dryHerdDistillersGrainWetDaysOnFeed,
          dryHerdBrewersGrainWetLbsAsFedPerDay:
            userInputs.dryHerdBrewersGrainWetLbsAsFedPerDay,
          dryHerdBrewersGrainWetDaysOnFeed:
            userInputs.dryHerdBrewersGrainWetDaysOnFeed,
          dryHerdCitrusPulpDryLbsAsFedPerDay:
            userInputs.dryHerdCitrusPulpDryLbsAsFedPerDay,
          dryHerdCitrusPulpDryDaysOnFeed:
            userInputs.dryHerdCitrusPulpDryDaysOnFeed,
          dryHerdCornGlutenFeedLbsAsFedPerDay:
            userInputs.dryHerdCornGlutenFeedLbsAsFedPerDay,
          dryHerdCornGlutenFeedDaysOnFeed:
            userInputs.dryHerdCornGlutenFeedDaysOnFeed,
          dryHerdWholeCottonseedLbsAsFedPerDay:
            userInputs.dryHerdWholeCottonseedLbsAsFedPerDay,
          dryHerdWholeCottonseedDaysOnFeed:
            userInputs.dryHerdWholeCottonseedDaysOnFeed,
          dryHerdCottonseedHullsLbsAsFedPerDay:
            userInputs.dryHerdCottonseedHullsLbsAsFedPerDay,
          dryHerdCottonseedHullsDaysOnFeed:
            userInputs.dryHerdCottonseedHullsDaysOnFeed,
          dryHerdSoybeanMeal48LbsAsFedPerDay:
            userInputs.dryHerdSoybeanMeal48LbsAsFedPerDay,
          dryHerdSoybeanMeal48DaysOnFeed:
            userInputs.dryHerdSoybeanMeal48DaysOnFeed,
          dryHerdCustomFeedMixLbsAsFedPerDay:
            userInputs.dryHerdCustomFeedMixLbsAsFedPerDay,
          dryHerdCustomFeedMixDaysOnFeed:
            userInputs.dryHerdCustomFeedMixDaysOnFeed,
          dryHerdCustomMineralMixLbsAsFedPerDay:
            userInputs.dryHerdCustomMineralMixLbsAsFedPerDay,
          dryHerdCustomMineralMixDaysOnFeed:
            userInputs.dryHerdCustomMineralMixDaysOnFeed
        },
        bredHeifers: {
          bredHeifersCornSilageLbsAsFedPerDay:
            userInputs.bredHeifersCornSilageLbsAsFedPerDay,
          bredHeifersCornSilageDaysOnFeed:
            userInputs.bredHeifersCornSilageDaysOnFeed,
          bredHeifersSorghumSilageLbsAsFedPerDay:
            userInputs.bredHeifersSorghumSilageLbsAsFedPerDay,
          bredHeifersSorghumSilageDaysOnFeed:
            userInputs.bredHeifersSorghumSilageDaysOnFeed,
          bredHeifersSmallGrainSilageLbsAsFedPerDay:
            userInputs.bredHeifersSmallGrainSilageLbsAsFedPerDay,
          bredHeifersSmallGrainSilageDaysOnFeed:
            userInputs.bredHeifersSmallGrainSilageDaysOnFeed,
          bredHeifersGrassHayLbsAsFedPerDay:
            userInputs.bredHeifersGrassHayLbsAsFedPerDay,
          bredHeifersGrassHayDaysOnFeed:
            userInputs.bredHeifersGrassHayDaysOnFeed,
          bredHeifersAlfalfaHayLbsAsFedPerDay:
            userInputs.bredHeifersAlfalfaHayLbsAsFedPerDay,
          bredHeifersAlfalfaHayDaysOnFeed:
            userInputs.bredHeifersAlfalfaHayDaysOnFeed,
          bredHeifersPeanutHullsLbsAsFedPerDay:
            userInputs.bredHeifersPeanutHullsLbsAsFedPerDay,
          bredHeifersPeanutHullsDaysOnFeed:
            userInputs.bredHeifersPeanutHullsDaysOnFeed,
          bredHeifersApplePomaceNoHullsLbsAsFedPerDay:
            userInputs.bredHeifersApplePomaceNoHullsLbsAsFedPerDay,
          bredHeifersApplePomaceNoHullsDaysOnFeed:
            userInputs.bredHeifersApplePomaceNoHullsDaysOnFeed,
          bredHeifersDistillersGrainWetLbsAsFedPerDay:
            userInputs.bredHeifersDistillersGrainWetLbsAsFedPerDay,
          bredHeifersDistillersGrainWetDaysOnFeed:
            userInputs.bredHeifersDistillersGrainWetDaysOnFeed,
          bredHeifersBrewersGrainWetLbsAsFedPerDay:
            userInputs.bredHeifersBrewersGrainWetLbsAsFedPerDay,
          bredHeifersBrewersGrainWetDaysOnFeed:
            userInputs.bredHeifersBrewersGrainWetDaysOnFeed,
          bredHeifersCitrusPulpDryLbsAsFedPerDay:
            userInputs.bredHeifersCitrusPulpDryLbsAsFedPerDay,
          bredHeifersCitrusPulpDryDaysOnFeed:
            userInputs.bredHeifersCitrusPulpDryDaysOnFeed,
          bredHeifersCornGlutenFeedLbsAsFedPerDay:
            userInputs.bredHeifersCornGlutenFeedLbsAsFedPerDay,
          bredHeifersCornGlutenFeedDaysOnFeed:
            userInputs.bredHeifersCornGlutenFeedDaysOnFeed,
          bredHeifersWholeCottonseedLbsAsFedPerDay:
            userInputs.bredHeifersWholeCottonseedLbsAsFedPerDay,
          bredHeifersWholeCottonseedDaysOnFeed:
            userInputs.bredHeifersWholeCottonseedDaysOnFeed,
          bredHeifersCottonseedHullsLbsAsFedPerDay:
            userInputs.bredHeifersCottonseedHullsLbsAsFedPerDay,
          bredHeifersCottonseedHullsDaysOnFeed:
            userInputs.bredHeifersCottonseedHullsDaysOnFeed,
          bredHeifersSoybeanMeal48LbsAsFedPerDay:
            userInputs.bredHeifersSoybeanMeal48LbsAsFedPerDay,
          bredHeifersSoybeanMeal48DaysOnFeed:
            userInputs.bredHeifersSoybeanMeal48DaysOnFeed,
          bredHeifersCustomFeedMixLbsAsFedPerDay:
            userInputs.bredHeifersCustomFeedMixLbsAsFedPerDay,
          bredHeifersCustomFeedMixDaysOnFeed:
            userInputs.bredHeifersCustomFeedMixDaysOnFeed,
          bredHeifersCustomMineralMixLbsAsFedPerDay:
            userInputs.bredHeifersCustomMineralMixLbsAsFedPerDay,
          bredHeifersCustomMineralMixDaysOnFeed:
            userInputs.bredHeifersCustomMineralMixDaysOnFeed
        },
        youngHeifers: {
          youngHeifersCornSilageLbsAsFedPerDay:
            userInputs.youngHeifersCornSilageLbsAsFedPerDay,
          youngHeifersCornSilageDaysOnFeed:
            userInputs.youngHeifersCornSilageDaysOnFeed,
          youngHeifersSorghumSilageLbsAsFedPerDay:
            userInputs.youngHeifersSorghumSilageLbsAsFedPerDay,
          youngHeifersSorghumSilageDaysOnFeed:
            userInputs.youngHeifersSorghumSilageDaysOnFeed,
          youngHeifersSmallGrainSilageLbsAsFedPerDay:
            userInputs.youngHeifersSmallGrainSilageLbsAsFedPerDay,
          youngHeifersSmallGrainSilageDaysOnFeed:
            userInputs.youngHeifersSmallGrainSilageDaysOnFeed,
          youngHeifersGrassHayLbsAsFedPerDay:
            userInputs.youngHeifersGrassHayLbsAsFedPerDay,
          youngHeifersGrassHayDaysOnFeed:
            userInputs.youngHeifersGrassHayDaysOnFeed,
          youngHeifersAlfalfaHayLbsAsFedPerDay:
            userInputs.youngHeifersAlfalfaHayLbsAsFedPerDay,
          youngHeifersAlfalfaHayDaysOnFeed:
            userInputs.youngHeifersAlfalfaHayDaysOnFeed,
          youngHeifersPeanutHullsLbsAsFedPerDay:
            userInputs.youngHeifersPeanutHullsLbsAsFedPerDay,
          youngHeifersPeanutHullsDaysOnFeed:
            userInputs.youngHeifersPeanutHullsDaysOnFeed,
          youngHeifersApplePomaceNoHullsLbsAsFedPerDay:
            userInputs.youngHeifersApplePomaceNoHullsLbsAsFedPerDay,
          youngHeifersApplePomaceNoHullsDaysOnFeed:
            userInputs.youngHeifersApplePomaceNoHullsDaysOnFeed,
          youngHeifersDistillersGrainWetLbsAsFedPerDay:
            userInputs.youngHeifersDistillersGrainWetLbsAsFedPerDay,
          youngHeifersDistillersGrainWetDaysOnFeed:
            userInputs.youngHeifersDistillersGrainWetDaysOnFeed,
          youngHeifersBrewersGrainWetLbsAsFedPerDay:
            userInputs.youngHeifersBrewersGrainWetLbsAsFedPerDay,
          youngHeifersBrewersGrainWetDaysOnFeed:
            userInputs.youngHeifersBrewersGrainWetDaysOnFeed,
          youngHeifersCitrusPulpDryLbsAsFedPerDay:
            userInputs.youngHeifersCitrusPulpDryLbsAsFedPerDay,
          youngHeifersCitrusPulpDryDaysOnFeed:
            userInputs.youngHeifersCitrusPulpDryDaysOnFeed,
          youngHeifersCornGlutenFeedLbsAsFedPerDay:
            userInputs.youngHeifersCornGlutenFeedLbsAsFedPerDay,
          youngHeifersCornGlutenFeedDaysOnFeed:
            userInputs.youngHeifersCornGlutenFeedDaysOnFeed,
          youngHeifersWholeCottonseedLbsAsFedPerDay:
            userInputs.youngHeifersWholeCottonseedLbsAsFedPerDay,
          youngHeifersWholeCottonseedDaysOnFeed:
            userInputs.youngHeifersWholeCottonseedDaysOnFeed,
          youngHeifersCottonseedHullsLbsAsFedPerDay:
            userInputs.youngHeifersCottonseedHullsLbsAsFedPerDay,
          youngHeifersCottonseedHullsDaysOnFeed:
            userInputs.youngHeifersCottonseedHullsDaysOnFeed,
          youngHeifersSoybeanMeal48LbsAsFedPerDay:
            userInputs.youngHeifersSoybeanMeal48LbsAsFedPerDay,
          youngHeifersSoybeanMeal48DaysOnFeed:
            userInputs.youngHeifersSoybeanMeal48DaysOnFeed,
          youngHeifersCustomFeedMixLbsAsFedPerDay:
            userInputs.youngHeifersCustomFeedMixLbsAsFedPerDay,
          youngHeifersCustomFeedMixDaysOnFeed:
            userInputs.youngHeifersCustomFeedMixDaysOnFeed,
          youngHeifersCustomMineralMixLbsAsFedPerDay:
            userInputs.youngHeifersCustomMineralMixLbsAsFedPerDay,
          youngHeifersCustomMineralMixDaysOnFeed:
            userInputs.youngHeifersCustomMineralMixDaysOnFeed
        },
        calves: {
          calvesMilkReplacerLbsAsFedPerDay:
            userInputs.calvesMilkReplacerLbsAsFedPerDay,
          calvesMilkReplacerDaysOnFeed: userInputs.calvesMilkReplacerDaysOnFeed,
          calvesRaisedMilkUsedForCalvesLbsAsFedPerDay:
            userInputs.calvesRaisedMilkUsedForCalvesLbsAsFedPerDay,
          calvesRaisedMilkUsedForCalvesDaysOnFeed:
            userInputs.calvesRaisedMilkUsedForCalvesDaysOnFeed,
          calvesCalfStarterFeedLbsAsFedPerDay:
            userInputs.calvesCalfStarterFeedLbsAsFedPerDay,
          calvesCalfStarterFeedDaysOnFeed:
            userInputs.calvesCalfStarterFeedDaysOnFeed
        },
        cornSilage: {
          cornSilageExpectedYieldTonsPerAcre: userInputs.cornSilageExpectedYieldTonsPerAcre,
          cornSilageHarvestedAcres: userInputs.cornSilageHarvestedAcres,
          cornSilageEstimatedTotalOperatingCost: userInputs.cornSilageEstimatedTotalOperatingCost,
          cornSilagePercentOfForageFixedCostAllocated: userInputs.cornSilagePercentOfForageFixedCostAllocated,
          cornSilageShrinkLossPercentage: userInputs.cornSilageShrinkLossPercentage
        },
        sorghumSilage: {
          sorghumSilageExpectedYieldTonsPerAcre: userInputs.sorghumSilageExpectedYieldTonsPerAcre,
          sorghumSilageHarvestedAcres: userInputs.sorghumSilageHarvestedAcres,
          sorghumSilageEstimatedTotalOperatingCost: userInputs.sorghumSilageEstimatedTotalOperatingCost,
          sorghumSilagePercentOfForageFixedCostAllocated: userInputs.sorghumSilagePercentOfForageFixedCostAllocated,
          sorghumSilageShrinkLossPercentage: userInputs.sorghumSilageShrinkLossPercentage
        },
        smallGrainSilage: {
          smallGrainSilageExpectedYieldTonsPerAcre: userInputs.smallGrainSilageExpectedYieldTonsPerAcre,
          smallGrainSilageHarvestedAcres: userInputs.smallGrainSilageHarvestedAcres,
          smallGrainSilageEstimatedTotalOperatingCost: userInputs.smallGrainSilageEstimatedTotalOperatingCost,
          smallGrainSilagePercentOfForageFixedCostAllocated: userInputs.smallGrainSilagePercentOfForageFixedCostAllocated,
          smallGrainSilageShrinkLossPercentage: userInputs.smallGrainSilageShrinkLossPercentage
        },
        grassHay: {
          grassHayExpectedYieldTonsPerAcre: userInputs.grassHayExpectedYieldTonsPerAcre,
          grassHayHarvestedAcres: userInputs.grassHayHarvestedAcres,
          grassHayEstimatedTotalOperatingCost: userInputs.grassHayEstimatedTotalOperatingCost,
          grassHayPercentOfForageFixedCostAllocated: userInputs.grassHayPercentOfForageFixedCostAllocated,
          grassHayShrinkLossPercentage: userInputs.grassHayShrinkLossPercentage
        },
        alfalfaHayEstablishment: {
          alfalfaHayEstablishmentExpectedYieldTonsPerAcre: userInputs.alfalfaHayEstablishmentExpectedYieldTonsPerAcre,
          alfalfaHayEstablishmentHarvestedAcres: userInputs.alfalfaHayEstablishmentHarvestedAcres,
          alfalfaHayEstablishmentEstimatedTotalOperatingCost: userInputs.alfalfaHayEstablishmentEstimatedTotalOperatingCost,
          alfalfaHayEstablishmentPercentOfForageFixedCostAllocated: userInputs.alfalfaHayEstablishmentPercentOfForageFixedCostAllocated
        },
        alfalfaHayStand: {
          alfalfaHayStandExpectedYieldTonsPerAcre: userInputs.alfalfaHayStandExpectedYieldTonsPerAcre,
          alfalfaHayStandHarvestedAcres: userInputs.alfalfaHayStandHarvestedAcres,
          alfalfaHayStandEstimatedTotalOperatingCost: userInputs.alfalfaHayStandEstimatedTotalOperatingCost,
          alfalfaHayStandPercentOfForageFixedCostAllocated: userInputs.alfalfaHayStandPercentOfForageFixedCostAllocated,
        },
        alfalfaHayShrinkLoss: {
          alfalfaHayShrinkLossPercentage: userInputs.alfalfaHayShrinkLossPercentage
        },

        averageCostOfTruckingPerTonMile: userInputs.averageCostOfTruckingPerTonMile,

cornSilageTransportAndCost: {
  cornSilageCostOfCommodityPerTon: userInputs.cornSilageCostOfCommodityPerTon,
  cornSilageAvgPurchasedFeedMilesTruckedToDairy: userInputs.cornSilageAvgPurchasedFeedMilesTruckedToDairy,
  cornSilageAvgGrownForageMilesTruckedToDairy: userInputs.cornSilageAvgGrownForageMilesTruckedToDairy
},
sorghumSilageTransportAndCost: {
  sorghumSilageCostOfCommodityPerTon: userInputs.sorghumSilageCostOfCommodityPerTon,
  sorghumSilageAvgPurchasedFeedMilesTruckedToDairy: userInputs.sorghumSilageAvgPurchasedFeedMilesTruckedToDairy,
  sorghumSilageAvgGrownForageMilesTruckedToDairy: userInputs.sorghumSilageAvgGrownForageMilesTruckedToDairy
},
smallGrainSilageTransportAndCost: {
  smallGrainSilageCostOfCommodityPerTon: userInputs.smallGrainSilageCostOfCommodityPerTon,
  smallGrainSilageAvgPurchasedFeedMilesTruckedToDairy: userInputs.smallGrainSilageAvgPurchasedFeedMilesTruckedToDairy,
  smallGrainSilageAvgGrownForageMilesTruckedToDairy: userInputs.smallGrainSilageAvgGrownForageMilesTruckedToDairy
},
grassHayTransportAndCost: {
  grassHayCostOfCommodityPerTon: userInputs.grassHayCostOfCommodityPerTon,
  grassHayAvgPurchasedFeedMilesTruckedToDairy: userInputs.grassHayAvgPurchasedFeedMilesTruckedToDairy,
  grassHayAvgGrownForageMilesTruckedToDairy: userInputs.grassHayAvgGrownForageMilesTruckedToDairy
},
alfalfaHayTransportAndCost: {
  alfalfaHayCostOfCommodityPerTon: userInputs.alfalfaHayCostOfCommodityPerTon,
  alfalfaHayAvgPurchasedFeedMilesTruckedToDairy: userInputs.alfalfaHayAvgPurchasedFeedMilesTruckedToDairy,
  alfalfaHayAvgGrownForageMilesTruckedToDairy: userInputs.alfalfaHayAvgGrownForageMilesTruckedToDairy
},
peanutHullsTransportAndCost: {
  peanutHullsCostOfCommodityPerTon: userInputs.peanutHullsCostOfCommodityPerTon,
  peanutHullsAvgPurchasedFeedMilesTruckedToDairy: userInputs.peanutHullsAvgPurchasedFeedMilesTruckedToDairy,
  peanutHullsAvgGrownForageMilesTruckedToDairy: userInputs.peanutHullsAvgGrownForageMilesTruckedToDairy
},
applePomaceTransportAndCost: {
  applePomaceCostOfCommodityPerTon: userInputs.applePomaceCostOfCommodityPerTon,
  applePomaceAvgPurchasedFeedMilesTruckedToDairy: userInputs.applePomaceAvgPurchasedFeedMilesTruckedToDairy,
  applePomaceAvgGrownForageMilesTruckedToDairy: userInputs.applePomaceAvgGrownForageMilesTruckedToDairy
},
distillersGrainTransportAndCost: {
  distillersGrainCostOfCommodityPerTon: userInputs.distillersGrainCostOfCommodityPerTon,
  distillersGrainAvgPurchasedFeedMilesTruckedToDairy: userInputs.distillersGrainAvgPurchasedFeedMilesTruckedToDairy,
  distillersGrainAvgGrownForageMilesTruckedToDairy: userInputs.distillersGrainAvgGrownForageMilesTruckedToDairy
},
brewersGrainTransportAndCost: {
  brewersGrainCostOfCommodityPerTon: userInputs.brewersGrainCostOfCommodityPerTon,
  brewersGrainAvgPurchasedFeedMilesTruckedToDairy: userInputs.brewersGrainAvgPurchasedFeedMilesTruckedToDairy,
  brewersGrainAvgGrownForageMilesTruckedToDairy: userInputs.brewersGrainAvgGrownForageMilesTruckedToDairy
},
citrusPulpTransportAndCost: {
  citrusPulpCostOfCommodityPerTon: userInputs.citrusPulpCostOfCommodityPerTon,
  citrusPulpAvgPurchasedFeedMilesTruckedToDairy: userInputs.citrusPulpAvgPurchasedFeedMilesTruckedToDairy,
  citrusPulpAvgGrownForageMilesTruckedToDairy: userInputs.citrusPulpAvgGrownForageMilesTruckedToDairy
},
cornGlutenTransportAndCost: {
  cornGlutenCostOfCommodityPerTon: userInputs.cornGlutenCostOfCommodityPerTon,
  cornGlutenAvgPurchasedFeedMilesTruckedToDairy: userInputs.cornGlutenAvgPurchasedFeedMilesTruckedToDairy,
  cornGlutenAvgGrownForageMilesTruckedToDairy: userInputs.cornGlutenAvgGrownForageMilesTruckedToDairy
},
wholeCottonseedTransportAndCost: {
  wholeCottonseedCostOfCommodityPerTon: userInputs.wholeCottonseedCostOfCommodityPerTon,
  wholeCottonseedAvgPurchasedFeedMilesTruckedToDairy: userInputs.wholeCottonseedAvgPurchasedFeedMilesTruckedToDairy,
  wholeCottonseedAvgGrownForageMilesTruckedToDairy: userInputs.wholeCottonseedAvgGrownForageMilesTruckedToDairy
},
cottonseedHullsTransportAndCost: {
  cottonseedHullsCostOfCommodityPerTon: userInputs.cottonseedHullsCostOfCommodityPerTon,
  cottonseedHullsAvgPurchasedFeedMilesTruckedToDairy: userInputs.cottonseedHullsAvgPurchasedFeedMilesTruckedToDairy,
  cottonseedHullsAvgGrownForageMilesTruckedToDairy: userInputs.cottonseedHullsAvgGrownForageMilesTruckedToDairy
},
soybeanMealTransportAndCost: {
  soybeanMealCostOfCommodityPerTon: userInputs.soybeanMealCostOfCommodityPerTon,
  soybeanMealAvgPurchasedFeedMilesTruckedToDairy: userInputs.soybeanMealAvgPurchasedFeedMilesTruckedToDairy,
  soybeanMealAvgGrownForageMilesTruckedToDairy: userInputs.soybeanMealAvgGrownForageMilesTruckedToDairy
},
customFeedMixTransportAndCost: {
  customFeedMixCostOfCommodityPerTon: userInputs.customFeedMixCostOfCommodityPerTon,
  customFeedMixAvgPurchasedFeedMilesTruckedToDairy: userInputs.customFeedMixAvgPurchasedFeedMilesTruckedToDairy,
  customFeedMixAvgGrownForageMilesTruckedToDairy: userInputs.customFeedMixAvgGrownForageMilesTruckedToDairy
},
customMineralMixTransportAndCost: {
  customMineralMixCostOfCommodityPerTon: userInputs.customMineralMixCostOfCommodityPerTon,
  customMineralMixAvgPurchasedFeedMilesTruckedToDairy: userInputs.customMineralMixAvgPurchasedFeedMilesTruckedToDairy,
  customMineralMixAvgGrownForageMilesTruckedToDairy: userInputs.customMineralMixAvgGrownForageMilesTruckedToDairy
}
}

      let response
      if (loggedIn && email) {
        console.log('Entered this too')
        console.log(transformedInputs)
        response = await axios.patch(
          `${BASE_URL}/feed-details/updateInput/${email}`,
          transformedInputs
        )
      }

      if (response && response.data) {
        setDetails({
          // Corn Silage
          cornSilageTonsRequired: response.data.cornSilageTonsRequired || 0,
          cornSilageTonsProduced: response.data.cornSilageTonsProduced || 0,
          cornSilageBalanceToBePurchasedOrSold:
            response.data.cornSilageBalanceToBePurchasedOrSold || 0,

          // Sorghum Silage
          sorghumSilageTonsRequired:
            response.data.sorghumSilageTonsRequired || 0,
          sorghumSilageTonsProduced:
            response.data.sorghumSilageTonsProduced || 0,
          sorghumSilageBalanceToBePurchasedOrSold:
            response.data.sorghumSilageBalanceToBePurchasedOrSold || 0,

          // Small Grain Silage
          smallGrainSilageTonsRequired:
            response.data.smallGrainSilageTonsRequired || 0,
          smallGrainSilageTonsProduced:
            response.data.smallGrainSilageTonsProduced || 0,
          smallGrainSilageBalanceToBePurchasedOrSold:
            response.data.smallGrainSilageBalanceToBePurchasedOrSold || 0,

          // Grass Hay
          grassHayTonsRequired: response.data.grassHayTonsRequired || 0,
          grassHayTonsProduced: response.data.grassHayTonsProduced || 0,
          grassHayBalanceToBePurchasedOrSold:
            response.data.grassHayBalanceToBePurchasedOrSold || 0,

          // Alfalfa Hay
          alfalfaHayTonsRequired: response.data.alfalfaHayTonsRequired || 0,
          alfalfaHayTonsProduced: response.data.alfalfaHayTonsProduced || 0,
          alfalfaHayBalanceToBePurchasedOrSold:
            response.data.alfalfaHayBalanceToBePurchasedOrSold || 0,

          // Peanut Hulls
          peanutHullsTonsRequired: response.data.peanutHullsTonsRequired || 0,

          // Apple Pomace
          applePomaceTonsRequired: response.data.applePomaceTonsRequired || 0,

          // Distiller's Grain
          distillersGrainTonsRequired:
            response.data.distillersGrainTonsRequired || 0,

          // Brewer's Grain
          brewersGrainTonsRequired: response.data.brewersGrainTonsRequired || 0,

          // Citrus Pulp
          citrusPulpTonsRequired: response.data.citrusPulpTonsRequired || 0,

          // Corn Gluten
          cornGlutenTonsRequired: response.data.cornGlutenTonsRequired || 0,

          // Whole Cottonseed
          wholeCottonseedTonsRequired:
            response.data.wholeCottonseedTonsRequired || 0,

          // Cottonseed Hulls
          cottonseedHullsTonsRequired:
            response.data.cottonseedHullsTonsRequired || 0,

          // Soybean Meal 48
          soybeanMeal48TonsRequired:
            response.data.soybeanMeal48TonsRequired || 0,

          // Custom Feed Mix
          customFeedMixTonsRequired:
            response.data.customFeedMixTonsRequired || 0,

          // Custom Mineral Mix
          customMineralMixTonsRequired:
            response.data.customMineralMixTonsRequired || 0
        })

        
      }
    } catch (error) {
      console.error('Error updating user inputs:', error)
    }

  }

  const textFields = [
    // Corn Silage Group
    [
      {
        label: 'Corn Silage Tons Required',
        value: details.cornSilageTonsRequired
      },
      {
        label: 'Corn Silage Tons Produced',
        value: details.cornSilageTonsProduced
      },
      {
        label: 'Corn Silage Balance to be Purchased/Sold',
        value: details.cornSilageBalanceToBePurchasedOrSold
      }
    ],

    // Sorghum Silage Group
    [
      {
        label: 'Sorghum Silage Tons Required',
        value: details.sorghumSilageTonsRequired
      },
      {
        label: 'Sorghum Silage Tons Produced',
        value: details.sorghumSilageTonsProduced
      },
      {
        label: 'Sorghum Silage Balance to be Purchased/Sold',
        value: details.sorghumSilageBalanceToBePurchasedOrSold
      }
    ],

    // Small Grain Silage Group
    [
      {
        label: 'Small Grain Silage Tons Required',
        value: details.smallGrainSilageTonsRequired
      },
      {
        label: 'Small Grain Silage Tons Produced',
        value: details.smallGrainSilageTonsProduced
      },
      {
        label: 'Small Grain Silage Balance to be Purchased/Sold',
        value: details.smallGrainSilageBalanceToBePurchasedOrSold
      }
    ],

    // Grass Hay Group
    [
      { label: 'Grass Hay Tons Required', value: details.grassHayTonsRequired },
      { label: 'Grass Hay Tons Produced', value: details.grassHayTonsProduced },
      {
        label: 'Grass Hay Balance to be Purchased/Sold',
        value: details.grassHayBalanceToBePurchasedOrSold
      }
    ],

    // Alfalfa Hay Group
    [
      {
        label: 'Alfalfa Hay Tons Required',
        value: details.alfalfaHayTonsRequired
      },
      {
        label: 'Alfalfa Hay Tons Produced',
        value: details.alfalfaHayTonsProduced
      },
      {
        label: 'Alfalfa Hay Balance to be Purchased/Sold',
        value: details.alfalfaHayBalanceToBePurchasedOrSold
      }
    ],

    // Peanut Hulls Group
    [
      {
        label: 'Peanut Hulls Tons Required',
        value: details.peanutHullsTonsRequired
      }
    ],

    // Apple Pomace Group
    [
      {
        label: 'Apple Pomace Tons Required',
        value: details.applePomaceTonsRequired
      }
    ],

    // Distiller's Grain Group
    [
      {
        label: "Distiller's Grain Tons Required",
        value: details.distillersGrainTonsRequired
      }
    ],
    // Brewer's Grain Group
    [
      {
        label: "Brewer's Grain Tons Required",
        value: details.brewersGrainTonsRequired
      }
    ],

    // Citrus Pulp Group
    [
      {
        label: 'Citrus Pulp Tons Required',
        value: details.citrusPulpTonsRequired
      }
    ],

    // Corn Gluten Group
    [
      {
        label: 'Corn Gluten Tons Required',
        value: details.cornGlutenTonsRequired
      }
    ],

    // Whole Cottonseed Group
    [
      {
        label: 'Whole Cottonseed Tons Required',
        value: details.wholeCottonseedTonsRequired
      }
    ],
    // Cottonseed Hulls Group
    [
      {
        label: 'Cottonseed Hulls Tons Required',
        value: details.cottonseedHullsTonsRequired
      }
    ],
    // Soybean Meal 48 Group
    [
      {
        label: 'Soybean Meal 48 Tons Required',
        value: details.soybeanMeal48TonsRequired
      }
    ],

    // Custom Feed Mix Group
    [
      {
        label: 'Custom Feed Mix Tons Required',
        value: details.customFeedMixTonsRequired
      }
    ],

    // Custom Mineral Mix Group
    [
      {
        label: 'Custom Mineral Mix Tons Required',
        value: details.customMineralMixTonsRequired
      }
    ]
    
  ]


  const textFieldsforage = {
    // Variable Costs Section
    variableCosts: [
      {
        headers: ['Forage', 'TVC', 'TVC/Ton'],
        rows: [
          [
            { label: 'Corn Silage', value: detailsforage.cornSilageTVC, valuePerTon: detailsforage.cornSilageTVCPerTon }
          ],
          [
            { label: 'Sorghum Silage', value: detailsforage.sorghumSilageTVC, valuePerTon: detailsforage.sorghumSilageTVCPerTon }
          ],
          [
            { label: 'Small Grain Silage', value: detailsforage.smallGrainSilageTVC, valuePerTon: detailsforage.smallGrainSilageTVCPerTon }
          ],
          [
            { label: 'Grass Hay', value: detailsforage.grassHayTVC, valuePerTon: detailsforage.grassHayTVCPerTon }
          ],
          [
            { label: 'Alfalfa Hay Establishment', value: detailsforage.alfalfaHayEstablishmentTVC, valuePerTon: detailsforage.alfalfaHayEstablishmentTVCPerTon }
          ],
          [
            { label: 'Alfalfa Hay Stand', value: detailsforage.alfalfaHayStandTVC, valuePerTon: detailsforage.alfalfaHayStandTVCPerTon }
          ]
        ]
      }
    ],
  
    // Fixed Costs Section
    fixedCosts: [
      {
        headers: ['Forage', 'Fixed Cost Allocation', 'Fixed Cost/Ton'],
        rows: [
          [
            { label: 'Corn Silage', allocation: detailsforage.cornSilageFixedCostAllocation, costPerTon: detailsforage.cornSilageFixedCostPerTon }
          ],
          [
            { label: 'Sorghum Silage', allocation: detailsforage.sorghumSilageFixedCostAllocation, costPerTon: detailsforage.sorghumSilageFixedCostPerTon }
          ],
          [
            { label: 'Small Grain Silage', allocation: detailsforage.smallGrainSilageFixedCostAllocation, costPerTon: detailsforage.smallGrainSilageFixedCostPerTon }
          ],
          [
            { label: 'Grass Hay', allocation: detailsforage.grassHayFixedCostAllocation, costPerTon: detailsforage.grassHayFixedCostPerTon }
          ],
          [
            { label: 'Alfalfa Hay Establishment', allocation: detailsforage.alfalfaHayEstablishmentFixedCostAllocation, costPerTon: detailsforage.alfalfaHayEstablishmentFixedCostPerTon }
          ],
          [
            { label: 'Alfalfa Hay Stand', allocation: detailsforage.alfalfaHayStandFixedCostAllocation, costPerTon: detailsforage.alfalfaHayStandFixedCostPerTon }
          ]
        ]
      }
    ],
  
    // Total Costs Section
    totalCosts: [
      {
        headers: ['Forage', 'Total Cost', 'Total Cost/Ton'],
        rows: [
          [
            { label: 'Corn Silage', totalCost: detailsforage.cornSilageTotalCost, totalCostPerTon: detailsforage.cornSilageTotalCostPerTon }
          ],
          [
            { label: 'Sorghum Silage', totalCost: detailsforage.sorghumSilageTotalCost, totalCostPerTon: detailsforage.sorghumSilageTotalCostPerTon }
          ],
          [
            { label: 'Small Grain Silage', totalCost: detailsforage.smallGrainSilageTotalCost, totalCostPerTon: detailsforage.smallGrainSilageTotalCostPerTon }
          ],
          [
            { label: 'Grass Hay', totalCost: detailsforage.grassHayTotalCost, totalCostPerTon: detailsforage.grassHayTotalCostPerTon }
          ],
          [
            { label: 'Alfalfa Hay Establishment', totalCost: detailsforage.alfalfaHayEstablishmentTotalCost, totalCostPerTon: detailsforage.alfalfaHayEstablishmentTotalCostPerTon }
          ],
          [
            { label: 'Alfalfa Hay Stand', totalCost: detailsforage.alfalfaHayStandTotalCost, totalCostPerTon: detailsforage.alfalfaHayStandTotalCostPerTon }
          ]
        ]
      }
    ]

  }


  const purchasedFeedFields = {
    purchasedFeed: [
      {
        headers: ['Feed/Forage', 'Tons to Purchase', 'Cost of Commodity', 'Cost of Trucking', 'Total Cost'],
        rows: [
          [
            {
              label: 'Corn Silage',
              tonsToPurchase: detailsforage.cornSilageTonsToBePurchased,
              costOfCommodity: detailsforage.cornSilageCostOfCommodity,
              costOfTrucking: detailsforage.cornSilageCostOfTrucking,
              totalCost: detailsforage.purchasedCornSilageTotalCost
            }
          ],
          [
            {
              label: 'Sorghum Silage',
              tonsToPurchase: detailsforage.sorghumSilageTonsToBePurchased,
              costOfCommodity: detailsforage.sorghumSilageCostOfCommodity,
              costOfTrucking: detailsforage.sorghumSilageCostOfTrucking,
              totalCost: detailsforage.purchasedSorghumSilageTotalCost
            }
          ],
          [
            {
              label: 'Small Grain Silage',
              tonsToPurchase: detailsforage.smallGrainSilageTonsToBePurchased,
              costOfCommodity: detailsforage.smallGrainSilageCostOfCommodity,
              costOfTrucking: detailsforage.smallGrainSilageCostOfTrucking,
              totalCost: detailsforage.purchasedSmallGrainSilageTotalCost
            }
          ],
          [
            {
              label: 'Grass Hay',
              tonsToPurchase: detailsforage.grassHayTonsToBePurchased,
              costOfCommodity: detailsforage.grassHayCostOfCommodity,
              costOfTrucking: detailsforage.grassHayCostOfTrucking,
              totalCost: detailsforage.purchasedGrassHayTotalCost
            }
          ],
          [
            {
              label: 'Alfalfa/Legume Hay',
              tonsToPurchase: detailsforage.alfalfaHayTonsToBePurchased,
              costOfCommodity: detailsforage.alfalfaHayCostOfCommodity,
              costOfTrucking: detailsforage.alfalfaHayCostOfTrucking,
              totalCost: detailsforage.purchasedAlfalfaHayTotalCost
            }
          ],
          [
            {
              label: 'Peanut Hulls',
              tonsToPurchase: detailsforage.peanutHullsTonsToBePurchased,
              costOfCommodity: detailsforage.peanutHullsCostOfCommodity,
              costOfTrucking: detailsforage.peanutHullsCostOfTrucking,
              totalCost: detailsforage.purchasedPeanutHullsTotalCost
            }
          ],
          [
            {
              label: 'Apple Pomace (No Hulls)',
              tonsToPurchase: detailsforage.applePomaceNoHullsTonsToBePurchased,
              costOfCommodity: detailsforage.applePomaceNoHullsCostOfCommodity,
              costOfTrucking: detailsforage.applePomaceNoHullsCostOfTrucking,
              totalCost: detailsforage.purchasedApplePomaceNoHullsTotalCost
            }
          ],
          [
            {
              label: 'Distillers Grain (Wet)',
              tonsToPurchase: detailsforage.distillersGrainWetTonsToBePurchased,
              costOfCommodity: detailsforage.distillersGrainWetCostOfCommodity,
              costOfTrucking: detailsforage.distillersGrainWetCostOfTrucking,
              totalCost: detailsforage.purchasedDistillersGrainWetTotalCost
            }
          ],
          [
            {
              label: "Brewer's Grain (Wet)",
              tonsToPurchase: detailsforage.brewersGrainWetTonsToBePurchased,
              costOfCommodity: detailsforage.brewersGrainWetCostOfCommodity,
              costOfTrucking: detailsforage.brewersGrainWetCostOfTrucking,
              totalCost: detailsforage.purchasedBrewersGrainWetTotalCost
            }
          ],
          [
            {
              label: 'Citrus Pulp (Dry)',
              tonsToPurchase: detailsforage.citrusPulpDryTonsToBePurchased,
              costOfCommodity: detailsforage.citrusPulpDryCostOfCommodity,
              costOfTrucking: detailsforage.citrusPulpDryCostOfTrucking,
              totalCost: detailsforage.purchasedCitrusPulpDryTotalCost
            }
          ],
          [
            {
              label: 'Corn Gluten (Feed)',
              tonsToPurchase: detailsforage.cornGlutenFeedTonsToBePurchased,
              costOfCommodity: detailsforage.cornGlutenFeedCostOfCommodity,
              costOfTrucking: detailsforage.cornGlutenFeedCostOfTrucking,
              totalCost: detailsforage.purchasedCornGlutenFeedTotalCost
            }
          ],
          [
            {
              label: 'Whole Cottonseed',
              tonsToPurchase: detailsforage.wholeCottonseedTonsToBePurchased,
              costOfCommodity: detailsforage.wholeCottonseedCostOfCommodity,
              costOfTrucking: detailsforage.wholeCottonseedCostOfTrucking,
              totalCost: detailsforage.purchasedWholeCottonseedTotalCost
            }
          ],
          [
            {
              label: 'Cottonseed Hulls',
              tonsToPurchase: detailsforage.cottonseedHullsTonsToBePurchased,
              costOfCommodity: detailsforage.cottonseedHullsCostOfCommodity,
              costOfTrucking: detailsforage.cottonseedHullsCostOfTrucking,
              totalCost: detailsforage.purchasedCottonseedHullsTotalCost
            }
          ],
          [
            {
              label: 'Soybean Meal 48',
              tonsToPurchase: detailsforage.soybeanMeal48TonsToBePurchased,
              costOfCommodity: detailsforage.soybeanMeal48CostOfCommodity,
              costOfTrucking: detailsforage.soybeanMeal48CostOfTrucking,
              totalCost: detailsforage.purchasedSoybeanMeal48TotalCost
            }
          ],
          [
            {
              label: 'Custom Feed Mix',
              tonsToPurchase: detailsforage.customFeedMixTonsToBePurchased,
              costOfCommodity: detailsforage.customFeedMixCostOfCommodity,
              costOfTrucking: detailsforage.customFeedMixCostOfTrucking,
              totalCost: detailsforage.purchasedCustomFeedMixTotalCost
            }
          ],
          [
            {
              label: 'Custom Mineral Mix',
              tonsToPurchase: detailsforage.customMineralMixTonsToBePurchased,
              costOfCommodity: detailsforage.customMineralMixCostOfCommodity,
              costOfTrucking: detailsforage.customMineralMixCostOfTrucking,
              totalCost: detailsforage.purchasedCustomMineralMixTotalCost
            }
          ]
        ]
      }
    ],
  
    // Grown Forage Trucking Costs
    grownForageTrucking: [
      {
        headers: ['Forage', 'Trucking Cost'],
        rows: [
          [
            {
              label: 'Corn Silage',
              truckingCost: detailsforage.cornSilageGrownForageTruckingCost
            }
          ],
          [
            {
              label: 'Sorghum Silage',
              truckingCost: detailsforage.sorghumSilageGrownForageTruckingCost
            }
          ],
          [
            {
              label: 'Small Grain Silage',
              truckingCost: detailsforage.smallGrainSilageGrownForageTruckingCost
            }
          ],
          [
            {
              label: 'Grass Hay',
              truckingCost: detailsforage.grassHayGrownForageTruckingCost
            }
          ],
          [
            {
              label: 'Alfalfa Hay',
              truckingCost: detailsforage.alfalfaHayGrownForageTruckingCost
            }
          ]
        ]
      }
    ]
  }

  return (
    <div>
      {/* Header Section with Input Button */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa', 
        padding: '2rem', 
        textAlign: 'center',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant='h4' sx={{ color: '#c8102e', fontWeight: 'bold', mb: 2 }}>
          Feed Management Dashboard
        </Typography>
        <Typography variant='body1' sx={{ mb: 3, color: '#666' }}>
          Please input your feed details to view the comprehensive analysis of feed requirements and costs
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: '#c8102e',
            '&:hover': {
              backgroundColor: '#a50d26'
            },
            mb: 2
          }}
        >
          Input Feed Details
        </Button>
      </Box>

      <Container maxWidth='lg' className='mb-10 mt-10'>
        {/* Feed Requirements Section */}
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 600 }}>
          Feed Requirements
        </Typography>
        <Box sx={{ width: '100%', mb: 6 }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 2,
            mb: 3,
            pb: 2,
            borderBottom: '2px solid #f0f0f0'
          }}>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Feed/Forage</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Tons Required</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Tons Produced</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Balance to be purchased</Typography>
          </Box>

          {textFields.map((row, rowIndex) => (
            <Box 
              key={row[0].label}
              sx={{ 
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: 2,
                mb: 2,
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#fafafa'
                },
                padding: '8px 0'
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {row[0].label.split(' Tons')[0]}
              </Typography>
              {row.map((field) => (
                <Tooltip key={field.label} title={field.label} placement='top'>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={field.value}
                    InputProps={{
                      readOnly: true,
                      sx: { 
                        backgroundColor: '#f5f5f5',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e0e0e0'
                        }
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          ))}
        </Box>

        {/* Raised Forage Variable Cost Section */}
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 600 }}>
          Raised Forage Variable Cost
        </Typography>
        <Box sx={{ width: '100%', mb: 6 }}>
          {textFieldsforage.variableCosts.map((section, index) => (
            <div key={index}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: 2,
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #f0f0f0'
              }}>
                {section.headers.map((header, headerIndex) => (
                  <Typography key={headerIndex} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {header}
                  </Typography>
                ))}
              </Box>
              {section.rows.map((row, rowIndex) => (
                <Box 
                  key={rowIndex}
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: 2,
                    mb: 2,
                    backgroundColor: rowIndex % 2 === 0 ? '#f8f9fa' : 'white',
                    padding: '8px'
                  }}
                >
                  <Typography>{row[0].label}</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].value}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].valuePerTon}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                </Box>
              ))}
            </div>
          ))}
        </Box>

        {/* Fixed Costs Section */}
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 600 }}>
          Raised Forage Fixed Cost
        </Typography>
        <Box sx={{ width: '100%', mb: 6 }}>
          {textFieldsforage.fixedCosts.map((section, index) => (
            <div key={index}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: 2,
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #f0f0f0'
              }}>
                {section.headers.map((header, headerIndex) => (
                  <Typography key={headerIndex} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {header}
                  </Typography>
                ))}
              </Box>
              {section.rows.map((row, rowIndex) => (
                <Box 
                  key={rowIndex}
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: 2,
                    mb: 2,
                    backgroundColor: rowIndex % 2 === 0 ? '#f8f9fa' : 'white',
                    padding: '8px'
                  }}
                >
                  <Typography>{row[0].label}</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].allocation}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].costPerTon}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                </Box>
              ))}
            </div>
          ))}
        </Box>

        {/* Total Costs Section */}
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 600 }}>
          Raised Forage Total Cost
        </Typography>
        <Box sx={{ width: '100%', mb: 6 }}>
          {textFieldsforage.totalCosts.map((section, index) => (
            <div key={index}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: 2,
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #f0f0f0'
              }}>
                {section.headers.map((header, headerIndex) => (
                  <Typography key={headerIndex} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {header}
                  </Typography>
                ))}
              </Box>
              {section.rows.map((row, rowIndex) => (
                <Box 
                  key={rowIndex}
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: 2,
                    mb: 2,
                    backgroundColor: rowIndex % 2 === 0 ? '#f8f9fa' : 'white',
                    padding: '8px'
                  }}
                >
                  <Typography>{row[0].label}</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].totalCost}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].totalCostPerTon}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                </Box>
              ))}
            </div>
          ))}
        </Box>

        {/* Purchased Feed Expenses Section */}
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 600 }}>
          Purchased Feed Expenses
        </Typography>
        <Box sx={{ width: '100%', mb: 6 }}>
          {purchasedFeedFields.purchasedFeed.map((section, index) => (
            <div key={index}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                gap: 2,
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #f0f0f0'
              }}>
                {section.headers.map((header, headerIndex) => (
                  <Typography key={headerIndex} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {header}
                  </Typography>
                ))}
              </Box>
              {section.rows.map((row, rowIndex) => (
                <Box 
                  key={rowIndex}
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                    gap: 2,
                    mb: 2,
                    backgroundColor: rowIndex % 2 === 0 ? '#f8f9fa' : 'white',
                    padding: '8px'
                  }}
                >
                  <Typography>{row[0].label}</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].tonsToPurchase}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].costOfCommodity}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].costOfTrucking}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].totalCost}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                </Box>
              ))}
            </div>
          ))}
        </Box>

        {/* Grown Forage Trucking Costs Section */}
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 600 }}>
          Grown Forage Trucking Costs
        </Typography>
        <Box sx={{ width: '100%' }}>
          {purchasedFeedFields.grownForageTrucking.map((section, index) => (
            <div key={index}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr',
                gap: 2,
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #f0f0f0'
              }}>
                {section.headers.map((header, headerIndex) => (
                  <Typography key={headerIndex} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {header}
                  </Typography>
                ))}
              </Box>
              {section.rows.map((row, rowIndex) => (
                <Box 
                  key={rowIndex}
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: 2,
                    mb: 2,
                    backgroundColor: rowIndex % 2 === 0 ? '#f8f9fa' : 'white',
                    padding: '8px'
                  }}
                >
                  <Typography>{row[0].label}</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row[0].truckingCost}
                    InputProps={{
                      readOnly: true,
                      sx: { backgroundColor: '#f5f5f5' }
                    }}
                  />
                </Box>
              ))}
            </div>
          ))}
        </Box>

        <CombinedInputDialog 
          open={open} 
          handleClose={() => setOpen(false)} 
          handleSubmit={handleSubmit} 
        />
      </Container>
    </div>
  )
}

export default FeedRequirements
