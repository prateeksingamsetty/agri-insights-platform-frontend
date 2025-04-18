import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Box,
  Tooltip
} from '@mui/material'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'

interface UserInputs {
  // Milking Herd
  milkingHerdCornSilageLbsAsFedPerDay: number
  milkingHerdCornSilageDaysOnFeed: number
  milkingHerdSorghumSilageLbsAsFedPerDay: number
  milkingHerdSorghumSilageDaysOnFeed: number
  milkingHerdSmallGrainSilageLbsAsFedPerDay: number
  milkingHerdSmallGrainSilageDaysOnFeed: number
  milkingHerdGrassHayLbsAsFedPerDay: number
  milkingHerdGrassHayDaysOnFeed: number
  milkingHerdAlfalfaHayLbsAsFedPerDay: number
  milkingHerdAlfalfaHayDaysOnFeed: number
  milkingHerdPeanutHullsLbsAsFedPerDay: number
  milkingHerdPeanutHullsDaysOnFeed: number
  milkingHerdApplePomaceNoHullsLbsAsFedPerDay: number
  milkingHerdApplePomaceNoHullsDaysOnFeed: number
  milkingHerdDistillersGrainWetLbsAsFedPerDay: number
  milkingHerdDistillersGrainWetDaysOnFeed: number
  milkingHerdBrewersGrainWetLbsAsFedPerDay: number
  milkingHerdBrewersGrainWetDaysOnFeed: number
  milkingHerdCitrusPulpDryLbsAsFedPerDay: number
  milkingHerdCitrusPulpDryDaysOnFeed: number
  milkingHerdCornGlutenFeedLbsAsFedPerDay: number
  milkingHerdCornGlutenFeedDaysOnFeed: number
  milkingHerdWholeCottonseedLbsAsFedPerDay: number
  milkingHerdWholeCottonseedDaysOnFeed: number
  milkingHerdCottonseedHullsLbsAsFedPerDay: number
  milkingHerdCottonseedHullsDaysOnFeed: number
  milkingHerdSoybeanMeal48LbsAsFedPerDay: number
  milkingHerdSoybeanMeal48DaysOnFeed: number
  milkingHerdSoyHullsLbsAsFedPerDay: number
  milkingHerdSoyHullsDaysOnFeed: number
  milkingHerdCustomGrainMixLbsAsFedPerDay: number
  milkingHerdCustomGrainMixDaysOnFeed: number

  // Dry Herd
  dryHerdCornSilageLbsAsFedPerDay: number
  dryHerdCornSilageDaysOnFeed: number
  dryHerdSorghumSilageLbsAsFedPerDay: number
  dryHerdSorghumSilageDaysOnFeed: number
  dryHerdSmallGrainSilageLbsAsFedPerDay: number
  dryHerdSmallGrainSilageDaysOnFeed: number
  dryHerdGrassHayLbsAsFedPerDay: number
  dryHerdGrassHayDaysOnFeed: number
  dryHerdAlfalfaHayLbsAsFedPerDay: number
  dryHerdAlfalfaHayDaysOnFeed: number
  dryHerdPeanutHullsLbsAsFedPerDay: number
  dryHerdPeanutHullsDaysOnFeed: number
  dryHerdApplePomaceNoHullsLbsAsFedPerDay: number
  dryHerdApplePomaceNoHullsDaysOnFeed: number
  dryHerdDistillersGrainWetLbsAsFedPerDay: number
  dryHerdDistillersGrainWetDaysOnFeed: number
  dryHerdBrewersGrainWetLbsAsFedPerDay: number
  dryHerdBrewersGrainWetDaysOnFeed: number
  dryHerdCitrusPulpDryLbsAsFedPerDay: number
  dryHerdCitrusPulpDryDaysOnFeed: number
  dryHerdCornGlutenFeedLbsAsFedPerDay: number
  dryHerdCornGlutenFeedDaysOnFeed: number
  dryHerdWholeCottonseedLbsAsFedPerDay: number
  dryHerdWholeCottonseedDaysOnFeed: number
  dryHerdCottonseedHullsLbsAsFedPerDay: number
  dryHerdCottonseedHullsDaysOnFeed: number
  dryHerdSoybeanMeal48LbsAsFedPerDay: number
  dryHerdSoybeanMeal48DaysOnFeed: number
  dryHerdSoyHullsLbsAsFedPerDay: number
  dryHerdSoyHullsDaysOnFeed: number
  dryHerdCustomGrainMixLbsAsFedPerDay: number
  dryHerdCustomGrainMixDaysOnFeed: number

  // Bred Heifers
  bredHeifersCornSilageLbsAsFedPerDay: number
  bredHeifersCornSilageDaysOnFeed: number
  bredHeifersSorghumSilageLbsAsFedPerDay: number
  bredHeifersSorghumSilageDaysOnFeed: number
  bredHeifersSmallGrainSilageLbsAsFedPerDay: number
  bredHeifersSmallGrainSilageDaysOnFeed: number
  bredHeifersGrassHayLbsAsFedPerDay: number
  bredHeifersGrassHayDaysOnFeed: number
  bredHeifersAlfalfaHayLbsAsFedPerDay: number
  bredHeifersAlfalfaHayDaysOnFeed: number
  bredHeifersPeanutHullsLbsAsFedPerDay: number
  bredHeifersPeanutHullsDaysOnFeed: number
  bredHeifersApplePomaceNoHullsLbsAsFedPerDay: number
  bredHeifersApplePomaceNoHullsDaysOnFeed: number
  bredHeifersDistillersGrainWetLbsAsFedPerDay: number
  bredHeifersDistillersGrainWetDaysOnFeed: number
  bredHeifersBrewersGrainWetLbsAsFedPerDay: number
  bredHeifersBrewersGrainWetDaysOnFeed: number
  bredHeifersCitrusPulpDryLbsAsFedPerDay: number
  bredHeifersCitrusPulpDryDaysOnFeed: number
  bredHeifersCornGlutenFeedLbsAsFedPerDay: number
  bredHeifersCornGlutenFeedDaysOnFeed: number
  bredHeifersWholeCottonseedLbsAsFedPerDay: number
  bredHeifersWholeCottonseedDaysOnFeed: number
  bredHeifersCottonseedHullsLbsAsFedPerDay: number
  bredHeifersCottonseedHullsDaysOnFeed: number
  bredHeifersSoybeanMeal48LbsAsFedPerDay: number
  bredHeifersSoybeanMeal48DaysOnFeed: number
  bredHeifersSoyHullsLbsAsFedPerDay: number
  bredHeifersSoyHullsDaysOnFeed: number
  bredHeifersCustomGrainMixLbsAsFedPerDay: number
  bredHeifersCustomGrainMixDaysOnFeed: number

  // Young Heifers
  youngHeifersCornSilageLbsAsFedPerDay: number
  youngHeifersCornSilageDaysOnFeed: number
  youngHeifersSorghumSilageLbsAsFedPerDay: number
  youngHeifersSorghumSilageDaysOnFeed: number
  youngHeifersSmallGrainSilageLbsAsFedPerDay: number
  youngHeifersSmallGrainSilageDaysOnFeed: number
  youngHeifersGrassHayLbsAsFedPerDay: number
  youngHeifersGrassHayDaysOnFeed: number
  youngHeifersAlfalfaHayLbsAsFedPerDay: number
  youngHeifersAlfalfaHayDaysOnFeed: number
  youngHeifersPeanutHullsLbsAsFedPerDay: number
  youngHeifersPeanutHullsDaysOnFeed: number
  youngHeifersApplePomaceNoHullsLbsAsFedPerDay: number
  youngHeifersApplePomaceNoHullsDaysOnFeed: number
  youngHeifersDistillersGrainWetLbsAsFedPerDay: number
  youngHeifersDistillersGrainWetDaysOnFeed: number
  youngHeifersBrewersGrainWetLbsAsFedPerDay: number
  youngHeifersBrewersGrainWetDaysOnFeed: number
  youngHeifersCitrusPulpDryLbsAsFedPerDay: number
  youngHeifersCitrusPulpDryDaysOnFeed: number
  youngHeifersCornGlutenFeedLbsAsFedPerDay: number
  youngHeifersCornGlutenFeedDaysOnFeed: number
  youngHeifersWholeCottonseedLbsAsFedPerDay: number
  youngHeifersWholeCottonseedDaysOnFeed: number
  youngHeifersCottonseedHullsLbsAsFedPerDay: number
  youngHeifersCottonseedHullsDaysOnFeed: number
  youngHeifersSoybeanMeal48LbsAsFedPerDay: number
  youngHeifersSoybeanMeal48DaysOnFeed: number
  youngHeifersSoyHullsLbsAsFedPerDay: number
  youngHeifersSoyHullsDaysOnFeed: number
  youngHeifersCustomGrainMixLbsAsFedPerDay: number
  youngHeifersCustomGrainMixDaysOnFeed: number

  // Calves
  calvesMilkReplacerLbsAsFedPerDay: number
  calvesMilkReplacerDaysOnFeed: number
  calvesRaisedMilkUsedForCalvesLbsAsFedPerDay: number
  calvesRaisedMilkUsedForCalvesDaysOnFeed: number
  calvesCalfStarterFeedLbsAsFedPerDay: number
  calvesCalfStarterFeedDaysOnFeed: number
}

interface InputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: UserInputs) => void
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  handleClose,
  handleSubmit
}) => {
  const { email, loggedIn } = useAuth()

  const defaultInputs: UserInputs = {
    // Milking Herd
    milkingHerdCornSilageLbsAsFedPerDay: 0,
    milkingHerdCornSilageDaysOnFeed: 0,
    milkingHerdSorghumSilageLbsAsFedPerDay: 0,
    milkingHerdSorghumSilageDaysOnFeed: 0,
    milkingHerdSmallGrainSilageLbsAsFedPerDay: 0,
    milkingHerdSmallGrainSilageDaysOnFeed: 0,
    milkingHerdGrassHayLbsAsFedPerDay: 0,
    milkingHerdGrassHayDaysOnFeed: 0,
    milkingHerdAlfalfaHayLbsAsFedPerDay: 0,
    milkingHerdAlfalfaHayDaysOnFeed: 0,
    milkingHerdPeanutHullsLbsAsFedPerDay: 0,
    milkingHerdPeanutHullsDaysOnFeed: 0,
    milkingHerdApplePomaceNoHullsLbsAsFedPerDay: 0,
    milkingHerdApplePomaceNoHullsDaysOnFeed: 0,
    milkingHerdDistillersGrainWetLbsAsFedPerDay: 0,
    milkingHerdDistillersGrainWetDaysOnFeed: 0,
    milkingHerdBrewersGrainWetLbsAsFedPerDay: 0,
    milkingHerdBrewersGrainWetDaysOnFeed: 0,
    milkingHerdCitrusPulpDryLbsAsFedPerDay: 0,
    milkingHerdCitrusPulpDryDaysOnFeed: 0,
    milkingHerdCornGlutenFeedLbsAsFedPerDay: 0,
    milkingHerdCornGlutenFeedDaysOnFeed: 0,
    milkingHerdWholeCottonseedLbsAsFedPerDay: 0,
    milkingHerdWholeCottonseedDaysOnFeed: 0,
    milkingHerdCottonseedHullsLbsAsFedPerDay: 0,
    milkingHerdCottonseedHullsDaysOnFeed: 0,
    milkingHerdSoybeanMeal48LbsAsFedPerDay: 0,
    milkingHerdSoybeanMeal48DaysOnFeed: 0,
    milkingHerdSoyHullsLbsAsFedPerDay: 0,
    milkingHerdSoyHullsDaysOnFeed: 0,
    milkingHerdCustomGrainMixLbsAsFedPerDay: 0,
    milkingHerdCustomGrainMixDaysOnFeed: 0,

    // Dry Herd
    dryHerdCornSilageLbsAsFedPerDay: 0,
    dryHerdCornSilageDaysOnFeed: 0,
    dryHerdSorghumSilageLbsAsFedPerDay: 0,
    dryHerdSorghumSilageDaysOnFeed: 0,
    dryHerdSmallGrainSilageLbsAsFedPerDay: 0,
    dryHerdSmallGrainSilageDaysOnFeed: 0,
    dryHerdGrassHayLbsAsFedPerDay: 0,
    dryHerdGrassHayDaysOnFeed: 0,
    dryHerdAlfalfaHayLbsAsFedPerDay: 0,
    dryHerdAlfalfaHayDaysOnFeed: 0,
    dryHerdPeanutHullsLbsAsFedPerDay: 0,
    dryHerdPeanutHullsDaysOnFeed: 0,
    dryHerdApplePomaceNoHullsLbsAsFedPerDay: 0,
    dryHerdApplePomaceNoHullsDaysOnFeed: 0,
    dryHerdDistillersGrainWetLbsAsFedPerDay: 0,
    dryHerdDistillersGrainWetDaysOnFeed: 0,
    dryHerdBrewersGrainWetLbsAsFedPerDay: 0,
    dryHerdBrewersGrainWetDaysOnFeed: 0,
    dryHerdCitrusPulpDryLbsAsFedPerDay: 0,
    dryHerdCitrusPulpDryDaysOnFeed: 0,
    dryHerdCornGlutenFeedLbsAsFedPerDay: 0,
    dryHerdCornGlutenFeedDaysOnFeed: 0,
    dryHerdWholeCottonseedLbsAsFedPerDay: 0,
    dryHerdWholeCottonseedDaysOnFeed: 0,
    dryHerdCottonseedHullsLbsAsFedPerDay: 0,
    dryHerdCottonseedHullsDaysOnFeed: 0,
    dryHerdSoybeanMeal48LbsAsFedPerDay: 0,
    dryHerdSoybeanMeal48DaysOnFeed: 0,
    dryHerdSoyHullsLbsAsFedPerDay: 0,
    dryHerdSoyHullsDaysOnFeed: 0,
    dryHerdCustomGrainMixLbsAsFedPerDay: 0,
    dryHerdCustomGrainMixDaysOnFeed: 0,

    // Bred Heifers
    bredHeifersCornSilageLbsAsFedPerDay: 0,
    bredHeifersCornSilageDaysOnFeed: 0,
    bredHeifersSorghumSilageLbsAsFedPerDay: 0,
    bredHeifersSorghumSilageDaysOnFeed: 0,
    bredHeifersSmallGrainSilageLbsAsFedPerDay: 0,
    bredHeifersSmallGrainSilageDaysOnFeed: 0,
    bredHeifersGrassHayLbsAsFedPerDay: 0,
    bredHeifersGrassHayDaysOnFeed: 0,
    bredHeifersAlfalfaHayLbsAsFedPerDay: 0,
    bredHeifersAlfalfaHayDaysOnFeed: 0,
    bredHeifersPeanutHullsLbsAsFedPerDay: 0,
    bredHeifersPeanutHullsDaysOnFeed: 0,
    bredHeifersApplePomaceNoHullsLbsAsFedPerDay: 0,
    bredHeifersApplePomaceNoHullsDaysOnFeed: 0,
    bredHeifersDistillersGrainWetLbsAsFedPerDay: 0,
    bredHeifersDistillersGrainWetDaysOnFeed: 0,
    bredHeifersBrewersGrainWetLbsAsFedPerDay: 0,
    bredHeifersBrewersGrainWetDaysOnFeed: 0,
    bredHeifersCitrusPulpDryLbsAsFedPerDay: 0,
    bredHeifersCitrusPulpDryDaysOnFeed: 0,
    bredHeifersCornGlutenFeedLbsAsFedPerDay: 0,
    bredHeifersCornGlutenFeedDaysOnFeed: 0,
    bredHeifersWholeCottonseedLbsAsFedPerDay: 0,
    bredHeifersWholeCottonseedDaysOnFeed: 0,
    bredHeifersCottonseedHullsLbsAsFedPerDay: 0,
    bredHeifersCottonseedHullsDaysOnFeed: 0,
    bredHeifersSoybeanMeal48LbsAsFedPerDay: 0,
    bredHeifersSoybeanMeal48DaysOnFeed: 0,
    bredHeifersSoyHullsLbsAsFedPerDay: 0,
    bredHeifersSoyHullsDaysOnFeed: 0,
    bredHeifersCustomGrainMixLbsAsFedPerDay: 0,
    bredHeifersCustomGrainMixDaysOnFeed: 0,

    // Young Heifers
    youngHeifersCornSilageLbsAsFedPerDay: 0,
    youngHeifersCornSilageDaysOnFeed: 0,
    youngHeifersSorghumSilageLbsAsFedPerDay: 0,
    youngHeifersSorghumSilageDaysOnFeed: 0,
    youngHeifersSmallGrainSilageLbsAsFedPerDay: 0,
    youngHeifersSmallGrainSilageDaysOnFeed: 0,
    youngHeifersGrassHayLbsAsFedPerDay: 0,
    youngHeifersGrassHayDaysOnFeed: 0,
    youngHeifersAlfalfaHayLbsAsFedPerDay: 0,
    youngHeifersAlfalfaHayDaysOnFeed: 0,
    youngHeifersPeanutHullsLbsAsFedPerDay: 0,
    youngHeifersPeanutHullsDaysOnFeed: 0,
    youngHeifersApplePomaceNoHullsLbsAsFedPerDay: 0,
    youngHeifersApplePomaceNoHullsDaysOnFeed: 0,
    youngHeifersDistillersGrainWetLbsAsFedPerDay: 0,
    youngHeifersDistillersGrainWetDaysOnFeed: 0,
    youngHeifersBrewersGrainWetLbsAsFedPerDay: 0,
    youngHeifersBrewersGrainWetDaysOnFeed: 0,
    youngHeifersCitrusPulpDryLbsAsFedPerDay: 0,
    youngHeifersCitrusPulpDryDaysOnFeed: 0,
    youngHeifersCornGlutenFeedLbsAsFedPerDay: 0,
    youngHeifersCornGlutenFeedDaysOnFeed: 0,
    youngHeifersWholeCottonseedLbsAsFedPerDay: 0,
    youngHeifersWholeCottonseedDaysOnFeed: 0,
    youngHeifersCottonseedHullsLbsAsFedPerDay: 0,
    youngHeifersCottonseedHullsDaysOnFeed: 0,
    youngHeifersSoybeanMeal48LbsAsFedPerDay: 0,
    youngHeifersSoybeanMeal48DaysOnFeed: 0,
    youngHeifersSoyHullsLbsAsFedPerDay: 0,
    youngHeifersSoyHullsDaysOnFeed: 0,
    youngHeifersCustomGrainMixLbsAsFedPerDay: 0,
    youngHeifersCustomGrainMixDaysOnFeed: 0,

    // Calves
    calvesMilkReplacerLbsAsFedPerDay: 0,
    calvesMilkReplacerDaysOnFeed: 0,
    calvesRaisedMilkUsedForCalvesLbsAsFedPerDay: 0,
    calvesRaisedMilkUsedForCalvesDaysOnFeed: 0,
    calvesCalfStarterFeedLbsAsFedPerDay: 0,
    calvesCalfStarterFeedDaysOnFeed: 0
  }

  const [userInputs, setUserInputs] = useState<UserInputs>(defaultInputs)

  useEffect(() => {
    if (!open) return

    if (loggedIn) {
      fetchUserInputRecord()
    } else {
      loadFromSessionStorage()
    }
  }, [email, open, loggedIn])

  const fetchUserInputRecord = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed-details/inputDetails/${email}`
      )
      console.log('response in feed details ', response)

      if (response && response.data) {
        console.log('Entereddd')
        setUserInputs({
          // Milking Herd Variables
          milkingHerdCornSilageLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdCornSilageLbsAsFedPerDay,
          milkingHerdCornSilageDaysOnFeed:
            response.data.feedDetails.milkingHerdCornSilageDaysOnFeed,
          milkingHerdSorghumSilageLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdSorghumSilageLbsAsFedPerDay,
          milkingHerdSorghumSilageDaysOnFeed:
            response.data.feedDetails.milkingHerdSorghumSilageDaysOnFeed,
          milkingHerdSmallGrainSilageLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdSmallGrainSilageLbsAsFedPerDay,
          milkingHerdSmallGrainSilageDaysOnFeed:
            response.data.feedDetails.milkingHerdSmallGrainSilageDaysOnFeed,
          milkingHerdGrassHayLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdGrassHayLbsAsFedPerDay,
          milkingHerdGrassHayDaysOnFeed:
            response.data.feedDetails.milkingHerdGrassHayDaysOnFeed,
          milkingHerdAlfalfaHayLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdAlfalfaHayLbsAsFedPerDay,
          milkingHerdAlfalfaHayDaysOnFeed:
            response.data.feedDetails.milkingHerdAlfalfaHayDaysOnFeed,
          milkingHerdPeanutHullsLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdPeanutHullsLbsAsFedPerDay,
          milkingHerdPeanutHullsDaysOnFeed:
            response.data.feedDetails.milkingHerdPeanutHullsDaysOnFeed,
          milkingHerdApplePomaceNoHullsLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdApplePomaceNoHullsLbsAsFedPerDay,
          milkingHerdApplePomaceNoHullsDaysOnFeed:
            response.data.feedDetails.milkingHerdApplePomaceNoHullsDaysOnFeed,
          milkingHerdDistillersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdDistillersGrainLbsAsFedPerDay,
          milkingHerdDistillersGrainWetDaysOnFeed:
            response.data.feedDetails.milkingHerdDistillersGrainDaysOnFeed,
          milkingHerdBrewersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdBrewersGrainLbsAsFedPerDay,
          milkingHerdBrewersGrainWetDaysOnFeed:
            response.data.feedDetails.milkingHerdBrewersGrainDaysOnFeed,
          milkingHerdCitrusPulpDryLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdCitrusPulpLbsAsFedPerDay,
          milkingHerdCitrusPulpDryDaysOnFeed:
            response.data.feedDetails.milkingHerdCitrusPulpDaysOnFeed,
          milkingHerdCornGlutenFeedLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdCornGlutenLbsAsFedPerDay,
          milkingHerdCornGlutenFeedDaysOnFeed:
            response.data.feedDetails.milkingHerdCornGlutenDaysOnFeed,
          milkingHerdWholeCottonseedLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdWholeCottonseedLbsAsFedPerDay,
          milkingHerdWholeCottonseedDaysOnFeed:
            response.data.feedDetails.milkingHerdWholeCottonseedDaysOnFeed,
          milkingHerdCottonseedHullsLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdCottonseedHullsLbsAsFedPerDay,
          milkingHerdCottonseedHullsDaysOnFeed:
            response.data.feedDetails.milkingHerdCottonseedHullsDaysOnFeed,
          milkingHerdSoybeanMeal48LbsAsFedPerDay:
            response.data.feedDetails.milkingHerdSoybeanMeal48LbsAsFedPerDay,
          milkingHerdSoybeanMeal48DaysOnFeed:
            response.data.feedDetails.milkingHerdSoybeanMeal48DaysOnFeed,
          milkingHerdSoyHullsLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdSoyHullsLbsAsFedPerDay,
          milkingHerdSoyHullsDaysOnFeed:
            response.data.feedDetails.milkingHerdSoyHullsDaysOnFeed,
          milkingHerdCustomGrainMixLbsAsFedPerDay:
            response.data.feedDetails.milkingHerdCustomGrainMixLbsAsFedPerDay,
          milkingHerdCustomGrainMixDaysOnFeed:
            response.data.feedDetails.milkingHerdCustomGrainMixDaysOnFeed,

          // Dry Herd Variables
          dryHerdCornSilageLbsAsFedPerDay:
            response.data.feedDetails.dryHerdCornSilageLbsAsFedPerDay,
          dryHerdCornSilageDaysOnFeed:
            response.data.feedDetails.dryHerdCornSilageDaysOnFeed,
          dryHerdSorghumSilageLbsAsFedPerDay:
            response.data.feedDetails.dryHerdSorghumSilageLbsAsFedPerDay,
          dryHerdSorghumSilageDaysOnFeed:
            response.data.feedDetails.dryHerdSorghumSilageDaysOnFeed,
          dryHerdSmallGrainSilageLbsAsFedPerDay:
            response.data.feedDetails.dryHerdSmallGrainSilageLbsAsFedPerDay,
          dryHerdSmallGrainSilageDaysOnFeed:
            response.data.feedDetails.dryHerdSmallGrainSilageDaysOnFeed,
          dryHerdGrassHayLbsAsFedPerDay:
            response.data.feedDetails.dryHerdGrassHayLbsAsFedPerDay,
          dryHerdGrassHayDaysOnFeed:
            response.data.feedDetails.dryHerdGrassHayDaysOnFeed,
          dryHerdAlfalfaHayLbsAsFedPerDay:
            response.data.feedDetails.dryHerdAlfalfaHayLbsAsFedPerDay,
          dryHerdAlfalfaHayDaysOnFeed:
            response.data.feedDetails.dryHerdAlfalfaHayDaysOnFeed,
          dryHerdPeanutHullsLbsAsFedPerDay:
            response.data.feedDetails.dryHerdPeanutHullsLbsAsFedPerDay,
          dryHerdPeanutHullsDaysOnFeed:
            response.data.feedDetails.dryHerdPeanutHullsDaysOnFeed,
          dryHerdApplePomaceNoHullsLbsAsFedPerDay:
            response.data.feedDetails.dryHerdApplePomaceLbsAsFedPerDay,
          dryHerdApplePomaceNoHullsDaysOnFeed:
            response.data.feedDetails.dryHerdApplePomaceDaysOnFeed,
          dryHerdDistillersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.dryHerdDistillersGrainLbsAsFedPerDay,
          dryHerdDistillersGrainWetDaysOnFeed:
            response.data.feedDetails.dryHerdDistillersGrainDaysOnFeed,
          dryHerdBrewersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.dryHerdBrewersGrainLbsAsFedPerDay,
          dryHerdBrewersGrainWetDaysOnFeed:
            response.data.feedDetails.dryHerdBrewersGrainDaysOnFeed,
          dryHerdCitrusPulpDryLbsAsFedPerDay:
            response.data.feedDetails.dryHerdCitrusPulpLbsAsFedPerDay,
          dryHerdCitrusPulpDryDaysOnFeed:
            response.data.feedDetails.dryHerdCitrusPulpDaysOnFeed,
          dryHerdCornGlutenFeedLbsAsFedPerDay:
            response.data.feedDetails.dryHerdCornGlutenLbsAsFedPerDay,
          dryHerdCornGlutenFeedDaysOnFeed:
            response.data.feedDetails.dryHerdCornGlutenDaysOnFeed,
          dryHerdWholeCottonseedLbsAsFedPerDay:
            response.data.feedDetails.dryHerdWholeCottonseedLbsAsFedPerDay,
          dryHerdWholeCottonseedDaysOnFeed:
            response.data.feedDetails.dryHerdWholeCottonseedDaysOnFeed,
          dryHerdCottonseedHullsLbsAsFedPerDay:
            response.data.feedDetails.dryHerdCottonseedHullsLbsAsFedPerDay,
          dryHerdCottonseedHullsDaysOnFeed:
            response.data.feedDetails.dryHerdCottonseedHullsDaysOnFeed,
          dryHerdSoybeanMeal48LbsAsFedPerDay:
            response.data.feedDetails.dryHerdSoybeanMeal48LbsAsFedPerDay,
          dryHerdSoybeanMeal48DaysOnFeed:
            response.data.feedDetails.dryHerdSoybeanMeal48DaysOnFeed,
          dryHerdSoyHullsLbsAsFedPerDay:
            response.data.feedDetails.dryHerdSoyHullsLbsAsFedPerDay,
          dryHerdSoyHullsDaysOnFeed:
            response.data.feedDetails.dryHerdSoyHullsDaysOnFeed,
          dryHerdCustomGrainMixLbsAsFedPerDay:
            response.data.feedDetails.dryHerdCustomGrainMixLbsAsFedPerDay,
          dryHerdCustomGrainMixDaysOnFeed:
            response.data.feedDetails.dryHerdCustomGrainMixDaysOnFeed,

          // Bred Heifers Variables
          bredHeifersCornSilageLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersCornSilageLbsAsFedPerDay,
          bredHeifersCornSilageDaysOnFeed:
            response.data.feedDetails.bredHeifersCornSilageDaysOnFeed,
          bredHeifersSorghumSilageLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersSorghumSilageLbsAsFedPerDay,
          bredHeifersSorghumSilageDaysOnFeed:
            response.data.feedDetails.bredHeifersSorghumSilageDaysOnFeed,
          bredHeifersSmallGrainSilageLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersSmallGrainSilageLbsAsFedPerDay,
          bredHeifersSmallGrainSilageDaysOnFeed:
            response.data.feedDetails.bredHeifersSmallGrainSilageDaysOnFeed,
          bredHeifersGrassHayLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersGrassHayLbsAsFedPerDay,
          bredHeifersGrassHayDaysOnFeed:
            response.data.feedDetails.bredHeifersGrassHayDaysOnFeed,
          bredHeifersAlfalfaHayLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersAlfalfaHayLbsAsFedPerDay,
          bredHeifersAlfalfaHayDaysOnFeed:
            response.data.feedDetails.bredHeifersAlfalfaHayDaysOnFeed,
          bredHeifersPeanutHullsLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersPeanutHullsLbsAsFedPerDay,
          bredHeifersPeanutHullsDaysOnFeed:
            response.data.feedDetails.bredHeifersPeanutHullsDaysOnFeed,
          bredHeifersApplePomaceNoHullsLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersApplePomaceLbsAsFedPerDay,
          bredHeifersApplePomaceNoHullsDaysOnFeed:
            response.data.feedDetails.bredHeifersApplePomaceDaysOnFeed,
          bredHeifersDistillersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersDistillersGrainLbsAsFedPerDay,
          bredHeifersDistillersGrainWetDaysOnFeed:
            response.data.feedDetails.bredHeifersDistillersGrainDaysOnFeed,
          bredHeifersBrewersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersBrewersGrainLbsAsFedPerDay,
          bredHeifersBrewersGrainWetDaysOnFeed:
            response.data.feedDetails.bredHeifersBrewersGrainDaysOnFeed,
          bredHeifersCitrusPulpDryLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersCitrusPulpLbsAsFedPerDay,
          bredHeifersCitrusPulpDryDaysOnFeed:
            response.data.feedDetails.bredHeifersCitrusPulpDaysOnFeed,
          bredHeifersCornGlutenFeedLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersCornGlutenLbsAsFedPerDay,
          bredHeifersCornGlutenFeedDaysOnFeed:
            response.data.feedDetails.bredHeifersCornGlutenDaysOnFeed,
          bredHeifersWholeCottonseedLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersWholeCottonseedLbsAsFedPerDay,
          bredHeifersWholeCottonseedDaysOnFeed:
            response.data.feedDetails.bredHeifersWholeCottonseedDaysOnFeed,
          bredHeifersCottonseedHullsLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersCottonseedHullsLbsAsFedPerDay,
          bredHeifersCottonseedHullsDaysOnFeed:
            response.data.feedDetails.bredHeifersCottonseedHullsDaysOnFeed,
          bredHeifersSoybeanMeal48LbsAsFedPerDay:
            response.data.feedDetails.bredHeifersSoybeanMeal48LbsAsFedPerDay,
          bredHeifersSoybeanMeal48DaysOnFeed:
            response.data.feedDetails.bredHeifersSoybeanMeal48DaysOnFeed,
          bredHeifersSoyHullsLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersSoyHullsLbsAsFedPerDay,
          bredHeifersSoyHullsDaysOnFeed:
            response.data.feedDetails.bredHeifersSoyHullsDaysOnFeed,
          bredHeifersCustomGrainMixLbsAsFedPerDay:
            response.data.feedDetails.bredHeifersCustomGrainMixLbsAsFedPerDay,
          bredHeifersCustomGrainMixDaysOnFeed:
            response.data.feedDetails.bredHeifersCustomGrainMixDaysOnFeed,

          // Young Heifers Variables
          youngHeifersCornSilageLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersCornSilageLbsAsFedPerDay,
          youngHeifersCornSilageDaysOnFeed:
            response.data.feedDetails.youngHeifersCornSilageDaysOnFeed,
          youngHeifersSorghumSilageLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersSorghumSilageLbsAsFedPerDay,
          youngHeifersSorghumSilageDaysOnFeed:
            response.data.feedDetails.youngHeifersSorghumSilageDaysOnFeed,
          youngHeifersSmallGrainSilageLbsAsFedPerDay:
            response.data.feedDetails
              .youngHeifersSmallGrainSilageLbsAsFedPerDay,
          youngHeifersSmallGrainSilageDaysOnFeed:
            response.data.feedDetails.youngHeifersSmallGrainSilageDaysOnFeed,
          youngHeifersGrassHayLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersGrassHayLbsAsFedPerDay,
          youngHeifersGrassHayDaysOnFeed:
            response.data.feedDetails.youngHeifersGrassHayDaysOnFeed,
          youngHeifersAlfalfaHayLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersAlfalfaHayLbsAsFedPerDay,
          youngHeifersAlfalfaHayDaysOnFeed:
            response.data.feedDetails.youngHeifersAlfalfaHayDaysOnFeed,
          youngHeifersPeanutHullsLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersPeanutHullsLbsAsFedPerDay,
          youngHeifersPeanutHullsDaysOnFeed:
            response.data.feedDetails.youngHeifersPeanutHullsDaysOnFeed,
          youngHeifersApplePomaceNoHullsLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersApplePomaceLbsAsFedPerDay,
          youngHeifersApplePomaceNoHullsDaysOnFeed:
            response.data.feedDetails.youngHeifersApplePomaceDaysOnFeed,
          youngHeifersDistillersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersDistillersGrainLbsAsFedPerDay,
          youngHeifersDistillersGrainWetDaysOnFeed:
            response.data.feedDetails.youngHeifersDistillersGrainDaysOnFeed,
          youngHeifersBrewersGrainWetLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersBrewersGrainLbsAsFedPerDay,
          youngHeifersBrewersGrainWetDaysOnFeed:
            response.data.feedDetails.youngHeifersBrewersGrainDaysOnFeed,
          youngHeifersCitrusPulpDryLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersCitrusPulpLbsAsFedPerDay,
          youngHeifersCitrusPulpDryDaysOnFeed:
            response.data.feedDetails.youngHeifersCitrusPulpDaysOnFeed,
          youngHeifersCornGlutenFeedLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersCornGlutenLbsAsFedPerDay,
          youngHeifersCornGlutenFeedDaysOnFeed:
            response.data.feedDetails.youngHeifersCornGlutenDaysOnFeed,
          youngHeifersWholeCottonseedLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersWholeCottonseedLbsAsFedPerDay,
          youngHeifersWholeCottonseedDaysOnFeed:
            response.data.feedDetails.youngHeifersWholeCottonseedDaysOnFeed,
          youngHeifersCottonseedHullsLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersCottonseedHullsLbsAsFedPerDay,
          youngHeifersCottonseedHullsDaysOnFeed:
            response.data.feedDetails.youngHeifersCottonseedHullsDaysOnFeed,
          youngHeifersSoybeanMeal48LbsAsFedPerDay:
            response.data.feedDetails.youngHeifersSoybeanMeal48LbsAsFedPerDay,
          youngHeifersSoybeanMeal48DaysOnFeed:
            response.data.feedDetails.youngHeifersSoybeanMeal48DaysOnFeed,
          youngHeifersSoyHullsLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersSoyHullsLbsAsFedPerDay,
          youngHeifersSoyHullsDaysOnFeed:
            response.data.feedDetails.youngHeifersSoyHullsDaysOnFeed,
          youngHeifersCustomGrainMixLbsAsFedPerDay:
            response.data.feedDetails.youngHeifersCustomGrainMixLbsAsFedPerDay,
          youngHeifersCustomGrainMixDaysOnFeed:
            response.data.feedDetails.youngHeifersCustomGrainMixDaysOnFeed,

          // Calves variables
          calvesMilkReplacerLbsAsFedPerDay:
            response.data.feedDetails.calvesMilkReplacerLbsAsFedPerDay,
          calvesMilkReplacerDaysOnFeed:
            response.data.feedDetails.calvesMilkReplacerDaysOnFeed,
          calvesRaisedMilkUsedForCalvesLbsAsFedPerDay:
            response.data.feedDetails
              .calvesRaisedMilkUsedForCalvesLbsAsFedPerDay,
          calvesRaisedMilkUsedForCalvesDaysOnFeed:
            response.data.feedDetails.calvesRaisedMilkUsedForCalvesDaysOnFeed,
          calvesCalfStarterFeedLbsAsFedPerDay:
            response.data.feedDetails.calvesCalfStarterFeedLbsAsFedPerDay,
          calvesCalfStarterFeedDaysOnFeed:
            response.data.feedDetails.calvesCalfStarterFeedDaysOnFeed
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn('No user input record found for the given email')
      } else {
        console.error('Error fetching user input record:', error)
      }
      setUserInputs(defaultInputs)
    }
  }

  const loadFromSessionStorage = () => {
    const storedInputs = localStorage.getItem('productionInputs')
    if (storedInputs) {
      setUserInputs(JSON.parse(storedInputs))
    } else {
      setUserInputs(defaultInputs)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Called Feed INput File");
    
    const { name, value } = e.target
    setUserInputs(prev => {
      const newInputs = {
        ...prev,
        [name]: value
      }
      if (!loggedIn) {
        localStorage.setItem('productionInputs', JSON.stringify(newInputs))
      }
      return newInputs
    })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(userInputs)
    handleClose()
  }

  const textFields = [
    // Milking Herd Fields
    [
      {
        name: 'milkingHerdCornSilageLbsAsFedPerDay',
        label: 'Milking Herd Corn Silage Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdCornSilageDaysOnFeed',
        label: 'Milking Herd Corn Silage Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdSorghumSilageLbsAsFedPerDay',
        label: 'Milking Herd Sorghum Silage Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdSorghumSilageDaysOnFeed',
        label: 'Milking Herd Sorghum Silage Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdSmallGrainSilageLbsAsFedPerDay',
        label: 'Milking Herd Small Grain Silage Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdSmallGrainSilageDaysOnFeed',
        label: 'Milking Herd Small Grain Silage Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdGrassHayLbsAsFedPerDay',
        label: 'Milking Herd Grass Hay Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdGrassHayDaysOnFeed',
        label: 'Milking Herd Grass Hay Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdAlfalfaHayLbsAsFedPerDay',
        label: 'Milking Herd Alfalfa Hay Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdAlfalfaHayDaysOnFeed',
        label: 'Milking Herd Alfalfa Hay Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdPeanutHullsLbsAsFedPerDay',
        label: 'Milking Herd Peanut Hulls Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdPeanutHullsDaysOnFeed',
        label: 'Milking Herd Peanut Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdApplePomaceNoHullsLbsAsFedPerDay',
        label: 'Milking Herd Apple Pomace (No Hulls) Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdApplePomaceNoHullsDaysOnFeed',
        label: 'Milking Herd Apple Pomace (No Hulls) Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdDistillersGrainWetLbsAsFedPerDay',
        label: 'Milking Herd Distillers Grain (Wet) Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdDistillersGrainWetDaysOnFeed',
        label: 'Milking Herd Distillers Grain (Wet) Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdBrewersGrainWetLbsAsFedPerDay',
        label: "Milking Herd Brewer's Grain (Wet) Lbs. as-fed per day"
      },
      {
        name: 'milkingHerdBrewersGrainWetDaysOnFeed',
        label: "Milking Herd Brewer's Grain (Wet) Days on Feed"
      }
    ],
    [
      {
        name: 'milkingHerdCitrusPulpDryLbsAsFedPerDay',
        label: 'Milking Herd Citrus Pulp (Dry) Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdCitrusPulpDryDaysOnFeed',
        label: 'Milking Herd Citrus Pulp (Dry) Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdCornGlutenFeedLbsAsFedPerDay',
        label: 'Milking Herd Corn Gluten (Feed) Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdCornGlutenFeedDaysOnFeed',
        label: 'Milking Herd Corn Gluten (Feed) Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdWholeCottonseedLbsAsFedPerDay',
        label: 'Milking Herd Whole Cottonseed Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdWholeCottonseedDaysOnFeed',
        label: 'Milking Herd Whole Cottonseed Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdCottonseedHullsLbsAsFedPerDay',
        label: 'Milking Herd Cottonseed Hulls Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdCottonseedHullsDaysOnFeed',
        label: 'Milking Herd Cottonseed Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdSoybeanMeal48LbsAsFedPerDay',
        label: 'Milking Herd Soybean Meal 48 Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdSoybeanMeal48DaysOnFeed',
        label: 'Milking Herd Soybean Meal 48 Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdSoyHullsLbsAsFedPerDay',
        label: 'Milking Herd Soy Hulls Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdSoyHullsDaysOnFeed',
        label: 'Milking Herd Soy Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'milkingHerdCustomGrainMixLbsAsFedPerDay',
        label: 'Milking Herd Custom Grain Mix Lbs. as-fed per day'
      },
      {
        name: 'milkingHerdCustomGrainMixDaysOnFeed',
        label: 'Milking Herd Custom Grain Mix Days on Feed'
      }
    ],

    // Dry Herd Fields
    [
      {
        name: 'dryHerdCornSilageLbsAsFedPerDay',
        label: 'Dry Herd Corn Silage Lbs. as-fed per day'
      },
      {
        name: 'dryHerdCornSilageDaysOnFeed',
        label: 'Dry Herd Corn Silage Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdSorghumSilageLbsAsFedPerDay',
        label: 'Dry Herd Sorghum Silage Lbs. as-fed per day'
      },
      {
        name: 'dryHerdSorghumSilageDaysOnFeed',
        label: 'Dry Herd Sorghum Silage Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdSmallGrainSilageLbsAsFedPerDay',
        label: 'Dry Herd Small Grain Silage Lbs. as-fed per day'
      },
      {
        name: 'dryHerdSmallGrainSilageDaysOnFeed',
        label: 'Dry Herd Small Grain Silage Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdGrassHayLbsAsFedPerDay',
        label: 'Dry Herd Grass Hay Lbs. as-fed per day'
      },
      {
        name: 'dryHerdGrassHayDaysOnFeed',
        label: 'Dry Herd Grass Hay Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdAlfalfaHayLbsAsFedPerDay',
        label: 'Dry Herd Alfalfa Hay Lbs. as-fed per day'
      },
      {
        name: 'dryHerdAlfalfaHayDaysOnFeed',
        label: 'Dry Herd Alfalfa Hay Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdPeanutHullsLbsAsFedPerDay',
        label: 'Dry Herd Peanut Hulls Lbs. as-fed per day'
      },
      {
        name: 'dryHerdPeanutHullsDaysOnFeed',
        label: 'Dry Herd Peanut Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdApplePomaceNoHullsLbsAsFedPerDay',
        label: 'Dry Herd Apple Pomace (No Hulls) Lbs. as-fed per day'
      },
      {
        name: 'dryHerdApplePomaceNoHullsDaysOnFeed',
        label: 'Dry Herd Apple Pomace (No Hulls) Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdDistillersGrainWetLbsAsFedPerDay',
        label: 'Dry Herd Distillers Grain (Wet) Lbs. as-fed per day'
      },
      {
        name: 'dryHerdDistillersGrainWetDaysOnFeed',
        label: 'Dry Herd Distillers Grain (Wet) Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdBrewersGrainWetLbsAsFedPerDay',
        label: "Dry Herd Brewer's Grain (Wet) Lbs. as-fed per day"
      },
      {
        name: 'dryHerdBrewersGrainWetDaysOnFeed',
        label: "Dry Herd Brewer's Grain (Wet) Days on Feed"
      }
    ],
    [
      {
        name: 'dryHerdCitrusPulpDryLbsAsFedPerDay',
        label: 'Dry Herd Citrus Pulp (Dry) Lbs. as-fed per day'
      },
      {
        name: 'dryHerdCitrusPulpDryDaysOnFeed',
        label: 'Dry Herd Citrus Pulp (Dry) Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdCornGlutenFeedLbsAsFedPerDay',
        label: 'Dry Herd Corn Gluten (Feed) Lbs. as-fed per day'
      },
      {
        name: 'dryHerdCornGlutenFeedDaysOnFeed',
        label: 'Dry Herd Corn Gluten (Feed) Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdWholeCottonseedLbsAsFedPerDay',
        label: 'Dry Herd Whole Cottonseed Lbs. as-fed per day'
      },
      {
        name: 'dryHerdWholeCottonseedDaysOnFeed',
        label: 'Dry Herd Whole Cottonseed Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdCottonseedHullsLbsAsFedPerDay',
        label: 'Dry Herd Cottonseed Hulls Lbs. as-fed per day'
      },
      {
        name: 'dryHerdCottonseedHullsDaysOnFeed',
        label: 'Dry Herd Cottonseed Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdSoybeanMeal48LbsAsFedPerDay',
        label: 'Dry Herd Soybean Meal 48 Lbs. as-fed per day'
      },
      {
        name: 'dryHerdSoybeanMeal48DaysOnFeed',
        label: 'Dry Herd Soybean Meal 48 Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdSoyHullsLbsAsFedPerDay',
        label: 'Dry Herd Soy Hulls Lbs. as-fed per day'
      },
      {
        name: 'dryHerdSoyHullsDaysOnFeed',
        label: 'Dry Herd Soy Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'dryHerdCustomGrainMixLbsAsFedPerDay',
        label: 'Dry Herd Custom Grain Mix Lbs. as-fed per day'
      },
      {
        name: 'dryHerdCustomGrainMixDaysOnFeed',
        label: 'Dry Herd Custom Grain Mix Days on Feed'
      }
    ],

    // Bred Heifers Fields
    [
      {
        name: 'bredHeifersCornSilageLbsAsFedPerDay',
        label: 'Bred Heifers Corn Silage Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersCornSilageDaysOnFeed',
        label: 'Bred Heifers Corn Silage Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersSorghumSilageLbsAsFedPerDay',
        label: 'Bred Heifers Sorghum Silage Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersSorghumSilageDaysOnFeed',
        label: 'Bred Heifers Sorghum Silage Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersSmallGrainSilageLbsAsFedPerDay',
        label: 'Bred Heifers Small Grain Silage Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersSmallGrainSilageDaysOnFeed',
        label: 'Bred Heifers Small Grain Silage Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersGrassHayLbsAsFedPerDay',
        label: 'Bred Heifers Grass Hay Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersGrassHayDaysOnFeed',
        label: 'Bred Heifers Grass Hay Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersAlfalfaHayLbsAsFedPerDay',
        label: 'Bred Heifers Alfalfa Hay Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersAlfalfaHayDaysOnFeed',
        label: 'Bred Heifers Alfalfa Hay Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersPeanutHullsLbsAsFedPerDay',
        label: 'Bred Heifers Peanut Hulls Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersPeanutHullsDaysOnFeed',
        label: 'Bred Heifers Peanut Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersApplePomaceNoHullsLbsAsFedPerDay',
        label: 'Bred Heifers Apple Pomace (No Hulls) Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersApplePomaceNoHullsDaysOnFeed',
        label: 'Bred Heifers Apple Pomace (No Hulls) Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersDistillersGrainWetLbsAsFedPerDay',
        label: "Bred Heifers Distiller's Grain (Wet) Lbs. as-fed per day"
      },
      {
        name: 'bredHeifersDistillersGrainWetDaysOnFeed',
        label: "Bred Heifers Distiller's Grain (Wet) Days on Feed"
      }
    ],
    [
      {
        name: 'bredHeifersBrewersGrainWetLbsAsFedPerDay',
        label: "Bred Heifers Brewer's Grain (Wet) Lbs. as-fed per day"
      },
      {
        name: 'bredHeifersBrewersGrainWetDaysOnFeed',
        label: "Bred Heifers Brewer's Grain (Wet) Days on Feed"
      }
    ],
    [
      {
        name: 'bredHeifersCitrusPulpDryLbsAsFedPerDay',
        label: 'Bred Heifers Citrus Pulp (Dry) Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersCitrusPulpDryDaysOnFeed',
        label: 'Bred Heifers Citrus Pulp (Dry) Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersCornGlutenFeedLbsAsFedPerDay',
        label: 'Bred Heifers Corn Gluten (Feed) Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersCornGlutenFeedDaysOnFeed',
        label: 'Bred Heifers Corn Gluten (Feed) Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersWholeCottonseedLbsAsFedPerDay',
        label: 'Bred Heifers Whole Cottonseed Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersWholeCottonseedDaysOnFeed',
        label: 'Bred Heifers Whole Cottonseed Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersCottonseedHullsLbsAsFedPerDay',
        label: 'Bred Heifers Cottonseed Hulls Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersCottonseedHullsDaysOnFeed',
        label: 'Bred Heifers Cottonseed Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersSoybeanMeal48LbsAsFedPerDay',
        label: 'Bred Heifers Soybean Meal 48 Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersSoybeanMeal48DaysOnFeed',
        label: 'Bred Heifers Soybean Meal 48 Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersSoyHullsLbsAsFedPerDay',
        label: 'Bred Heifers Soy Hulls Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersSoyHullsDaysOnFeed',
        label: 'Bred Heifers Soy Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'bredHeifersCustomGrainMixLbsAsFedPerDay',
        label: 'Bred Heifers Custom Grain Mix Lbs. as-fed per day'
      },
      {
        name: 'bredHeifersCustomGrainMixDaysOnFeed',
        label: 'Bred Heifers Custom Grain Mix Days on Feed'
      }
    ],

    // Young Heifers Fields
    [
      {
        name: 'youngHeifersCornSilageLbsAsFedPerDay',
        label: 'Young Heifers Corn Silage Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersCornSilageDaysOnFeed',
        label: 'Young Heifers Corn Silage Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersSorghumSilageLbsAsFedPerDay',
        label: 'Young Heifers Sorghum Silage Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersSorghumSilageDaysOnFeed',
        label: 'Young Heifers Sorghum Silage Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersSmallGrainSilageLbsAsFedPerDay',
        label: 'Young Heifers Small Grain Silage Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersSmallGrainSilageDaysOnFeed',
        label: 'Young Heifers Small Grain Silage Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersGrassHayLbsAsFedPerDay',
        label: 'Young Heifers Grass Hay Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersGrassHayDaysOnFeed',
        label: 'Young Heifers Grass Hay Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersAlfalfaHayLbsAsFedPerDay',
        label: 'Young Heifers Alfalfa Hay Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersAlfalfaHayDaysOnFeed',
        label: 'Young Heifers Alfalfa Hay Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersPeanutHullsLbsAsFedPerDay',
        label: 'Young Heifers Peanut Hulls Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersPeanutHullsDaysOnFeed',
        label: 'Young Heifers Peanut Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersApplePomaceNoHullsLbsAsFedPerDay',
        label: 'Young Heifers Apple Pomace (No Hulls) Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersApplePomaceNoHullsDaysOnFeed',
        label: 'Young Heifers Apple Pomace (No Hulls) Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersDistillersGrainWetLbsAsFedPerDay',
        label: "Young Heifers Distiller's Grain (Wet) Lbs. as-fed per day"
      },
      {
        name: 'youngHeifersDistillersGrainWetDaysOnFeed',
        label: "Young Heifers Distiller's Grain (Wet) Days on Feed"
      }
    ],
    [
      {
        name: 'youngHeifersBrewersGrainWetLbsAsFedPerDay',
        label: "Young Heifers Brewer's Grain (Wet) Lbs. as-fed per day"
      },
      {
        name: 'youngHeifersBrewersGrainWetDaysOnFeed',
        label: "Young Heifers Brewer's Grain (Wet) Days on Feed"
      }
    ],
    [
      {
        name: 'youngHeifersCitrusPulpDryLbsAsFedPerDay',
        label: 'Young Heifers Citrus Pulp (Dry) Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersCitrusPulpDryDaysOnFeed',
        label: 'Young Heifers Citrus Pulp (Dry) Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersCornGlutenFeedLbsAsFedPerDay',
        label: 'Young Heifers Corn Gluten (Feed) Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersCornGlutenFeedDaysOnFeed',
        label: 'Young Heifers Corn Gluten (Feed) Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersWholeCottonseedLbsAsFedPerDay',
        label: 'Young Heifers Whole Cottonseed Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersWholeCottonseedDaysOnFeed',
        label: 'Young Heifers Whole Cottonseed Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersCottonseedHullsLbsAsFedPerDay',
        label: 'Young Heifers Cottonseed Hulls Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersCottonseedHullsDaysOnFeed',
        label: 'Young Heifers Cottonseed Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersSoybeanMeal48LbsAsFedPerDay',
        label: 'Young Heifers Soybean Meal 48 Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersSoybeanMeal48DaysOnFeed',
        label: 'Young Heifers Soybean Meal 48 Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersSoyHullsLbsAsFedPerDay',
        label: 'Young Heifers Soy Hulls Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersSoyHullsDaysOnFeed',
        label: 'Young Heifers Soy Hulls Days on Feed'
      }
    ],
    [
      {
        name: 'youngHeifersCustomGrainMixLbsAsFedPerDay',
        label: 'Young Heifers Custom Grain Mix Lbs. as-fed per day'
      },
      {
        name: 'youngHeifersCustomGrainMixDaysOnFeed',
        label: 'Young Heifers Custom Grain Mix Days on Feed'
      }
    ],

    // Calves Fields
    [
      {
        name: 'calvesMilkReplacerLbsAsFedPerDay',
        label: 'Calves Milk Replacer Lbs. as-fed per day'
      },
      {
        name: 'calvesMilkReplacerDaysOnFeed',
        label: 'Calves Milk Replacer Days on Feed'
      }
    ],
    [
      {
        name: 'calvesRaisedMilkUsedForCalvesLbsAsFedPerDay',
        label: 'Calves Raised Milk Used for Calves Lbs. as-fed per day'
      },
      {
        name: 'calvesRaisedMilkUsedForCalvesDaysOnFeed',
        label: 'Calves Raised Milk Used for Calves Days on Feed'
      }
    ],
    [
      {
        name: 'calvesCalfStarterFeedLbsAsFedPerDay',
        label: 'Calves Calf Starter Feed Lbs. as-fed per day'
      },
      {
        name: 'calvesCalfStarterFeedDaysOnFeed',
        label: 'Calves Calf Starter Feed Days on Feed'
      }
    ]
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle
        id='form-dialog-title'
        sx={{ bgcolor: '#c8102e', color: 'white' }}
      >
        Enter Your Inputs
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Please enter your inputs for the Dairy Feed Model.
        </DialogContentText>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {textFields.map((fieldGroup, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                width: '100%'
              }}
            >
              {fieldGroup.map(field => (
                <Tooltip key={field.name} title={field.label} placement='top'>
                  <TextField
                    margin='dense'
                    name={field.name}
                    label={field.label}
                    type='number'
                    fullWidth
                    required
                    value={userInputs[field.name as keyof UserInputs]}
                    onChange={handleChange}
                  />
                </Tooltip>
              ))}
            </Box>
          ))}

          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#c8102e' }}>
              Cancel
            </Button>
            <Button type='submit' sx={{ color: '#c8102e' }}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InputDialog
