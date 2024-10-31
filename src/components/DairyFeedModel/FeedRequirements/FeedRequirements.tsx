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
import InputDialog from './InputDialog'

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

  // Soybean Meal 48
  soybeanMeal48TonsRequired: number

  // Custom Feed Mix
  customFeedMixTonsRequired: number

  // Custom Mineral Mix
  customMineralMixTonsRequired: number
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

    // Soybean Meal 48
    soybeanMeal48TonsRequired: 0,

    // Custom Feed Mix
    customFeedMixTonsRequired: 0,

    // Custom Mineral Mix
    customMineralMixTonsRequired: 0
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
        }
        // Add additional sections for `bredHeifers`, `youngHeifers`, and `calves` following the same structure...
      }

      let response
      if (loggedIn && email) {
        console.log('Entered this too')

        response = await axios.patch(
          `${BASE_URL}/feed-details/updateInput/${email}`,
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
    // Additional groups for other feeds (Brewer's Grain, Citrus Pulp, etc.) can follow the same format.
  ]

  return (
    <div>
      <Typography
        className='mt-5 text-center'
        variant='h4'
        sx={{ color: '#c8102e', fontWeight: 'bold' }}
      >
        Feed Requirements
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
            Input Feed Requirements
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

export default FeedRequirements
