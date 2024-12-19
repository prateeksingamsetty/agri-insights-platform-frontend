import React, { useEffect, useState } from 'react'
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField, 
  Button, 
  Tooltip, 
  Box, 
  Tab, 
  Tabs, 
  Typography,
  Grid,
  Paper
} from '@mui/material'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'
import { ContactPageSharp } from '@mui/icons-material';

interface CombinedInputs {
  // Production Details
  // Corn Silage
  [key: string]: number;
  

  // Feed Details - Milking Herd
  milkingHerdCornSilageLbsAsFedPerDay: number;
  milkingHerdCornSilageDaysOnFeed: number;
  milkingHerdSorghumSilageLbsAsFedPerDay: number;
  milkingHerdSorghumSilageDaysOnFeed: number;
  milkingHerdSmallGrainSilageLbsAsFedPerDay: number;
  milkingHerdSmallGrainSilageDaysOnFeed: number;
  milkingHerdGrassHayLbsAsFedPerDay: number;
  milkingHerdGrassHayDaysOnFeed: number;
  milkingHerdAlfalfaHayLbsAsFedPerDay: number;
  milkingHerdAlfalfaHayDaysOnFeed: number;
  milkingHerdPeanutHullsLbsAsFedPerDay: number;
  milkingHerdPeanutHullsDaysOnFeed: number;
  milkingHerdApplePomaceNoHullsLbsAsFedPerDay: number;
  milkingHerdApplePomaceNoHullsDaysOnFeed: number;
  milkingHerdDistillersGrainWetLbsAsFedPerDay: number;
  milkingHerdDistillersGrainWetDaysOnFeed: number;
  milkingHerdBrewersGrainWetLbsAsFedPerDay: number;
  milkingHerdBrewersGrainWetDaysOnFeed: number;
  milkingHerdCitrusPulpDryLbsAsFedPerDay: number;
  milkingHerdCitrusPulpDryDaysOnFeed: number;
  milkingHerdCornGlutenFeedLbsAsFedPerDay: number;
  milkingHerdCornGlutenFeedDaysOnFeed: number;
  milkingHerdWholeCottonseedLbsAsFedPerDay: number;
  milkingHerdWholeCottonseedDaysOnFeed: number;
  milkingHerdCottonseedHullsLbsAsFedPerDay: number;
  milkingHerdCottonseedHullsDaysOnFeed: number;
  milkingHerdSoybeanMeal48LbsAsFedPerDay: number;
  milkingHerdSoybeanMeal48DaysOnFeed: number;
  milkingHerdCustomFeedMixLbsAsFedPerDay: number;
  milkingHerdCustomFeedMixDaysOnFeed: number;
  milkingHerdCustomMineralMixLbsAsFedPerDay: number;
  milkingHerdCustomMineralMixDaysOnFeed: number;

  // Feed Details - Dry Herd
  dryHerdCornSilageLbsAsFedPerDay: number;
  dryHerdCornSilageDaysOnFeed: number;
  dryHerdSorghumSilageLbsAsFedPerDay: number;
  dryHerdSorghumSilageDaysOnFeed: number;
  dryHerdSmallGrainSilageLbsAsFedPerDay: number;
  dryHerdSmallGrainSilageDaysOnFeed: number;
  dryHerdGrassHayLbsAsFedPerDay: number;
  dryHerdGrassHayDaysOnFeed: number;
  dryHerdAlfalfaHayLbsAsFedPerDay: number;
  dryHerdAlfalfaHayDaysOnFeed: number;
  dryHerdPeanutHullsLbsAsFedPerDay: number;
  dryHerdPeanutHullsDaysOnFeed: number;
  dryHerdApplePomaceNoHullsLbsAsFedPerDay: number;
  dryHerdApplePomaceNoHullsDaysOnFeed: number;
  dryHerdDistillersGrainWetLbsAsFedPerDay: number;
  dryHerdDistillersGrainWetDaysOnFeed: number;
  dryHerdBrewersGrainWetLbsAsFedPerDay: number;
  dryHerdBrewersGrainWetDaysOnFeed: number;
  dryHerdCitrusPulpDryLbsAsFedPerDay: number;
  dryHerdCitrusPulpDryDaysOnFeed: number;
  dryHerdCornGlutenFeedLbsAsFedPerDay: number;
  dryHerdCornGlutenFeedDaysOnFeed: number;
  dryHerdWholeCottonseedLbsAsFedPerDay: number;
  dryHerdWholeCottonseedDaysOnFeed: number;
  dryHerdCottonseedHullsLbsAsFedPerDay: number;
  dryHerdCottonseedHullsDaysOnFeed: number;
  dryHerdSoybeanMeal48LbsAsFedPerDay: number;
  dryHerdSoybeanMeal48DaysOnFeed: number;
  dryHerdCustomFeedMixLbsAsFedPerDay: number;
  dryHerdCustomFeedMixDaysOnFeed: number;
  dryHerdCustomMineralMixLbsAsFedPerDay: number;
  dryHerdCustomMineralMixDaysOnFeed: number;

  // Feed Details - Bred Heifers
  bredHeifersCornSilageLbsAsFedPerDay: number;
  bredHeifersCornSilageDaysOnFeed: number;
  bredHeifersSorghumSilageLbsAsFedPerDay: number;
  bredHeifersSorghumSilageDaysOnFeed: number;
  bredHeifersSmallGrainSilageLbsAsFedPerDay: number;
  bredHeifersSmallGrainSilageDaysOnFeed: number;
  bredHeifersGrassHayLbsAsFedPerDay: number;
  bredHeifersGrassHayDaysOnFeed: number;
  bredHeifersAlfalfaHayLbsAsFedPerDay: number;
  bredHeifersAlfalfaHayDaysOnFeed: number;
  bredHeifersPeanutHullsLbsAsFedPerDay: number;
  bredHeifersPeanutHullsDaysOnFeed: number;
  bredHeifersApplePomaceNoHullsLbsAsFedPerDay: number;
  bredHeifersApplePomaceNoHullsDaysOnFeed: number;
  bredHeifersDistillersGrainWetLbsAsFedPerDay: number;
  bredHeifersDistillersGrainWetDaysOnFeed: number;
  bredHeifersBrewersGrainWetLbsAsFedPerDay: number;
  bredHeifersBrewersGrainWetDaysOnFeed: number;
  bredHeifersCitrusPulpDryLbsAsFedPerDay: number;
  bredHeifersCitrusPulpDryDaysOnFeed: number;
  bredHeifersCornGlutenFeedLbsAsFedPerDay: number;
  bredHeifersCornGlutenFeedDaysOnFeed: number;
  bredHeifersWholeCottonseedLbsAsFedPerDay: number;
  bredHeifersWholeCottonseedDaysOnFeed: number;
  bredHeifersCottonseedHullsLbsAsFedPerDay: number;
  bredHeifersCottonseedHullsDaysOnFeed: number;
  bredHeifersSoybeanMeal48LbsAsFedPerDay: number;
  bredHeifersSoybeanMeal48DaysOnFeed: number;
  bredHeifersCustomFeedMixLbsAsFedPerDay: number;
  bredHeifersCustomFeedMixDaysOnFeed: number;
  bredHeifersCustomMineralMixLbsAsFedPerDay: number;
  bredHeifersCustomMineralMixDaysOnFeed: number;

  // Feed Details - Young Heifers
  youngHeifersCornSilageLbsAsFedPerDay: number;
  youngHeifersCornSilageDaysOnFeed: number;
  youngHeifersSorghumSilageLbsAsFedPerDay: number;
  youngHeifersSorghumSilageDaysOnFeed: number;
  youngHeifersSmallGrainSilageLbsAsFedPerDay: number;
  youngHeifersSmallGrainSilageDaysOnFeed: number;
  youngHeifersGrassHayLbsAsFedPerDay: number;
  youngHeifersGrassHayDaysOnFeed: number;
  youngHeifersAlfalfaHayLbsAsFedPerDay: number;
  youngHeifersAlfalfaHayDaysOnFeed: number;
  youngHeifersPeanutHullsLbsAsFedPerDay: number;
  youngHeifersPeanutHullsDaysOnFeed: number;
  youngHeifersApplePomaceNoHullsLbsAsFedPerDay: number;
  youngHeifersApplePomaceNoHullsDaysOnFeed: number;
  youngHeifersDistillersGrainWetLbsAsFedPerDay: number;
  youngHeifersDistillersGrainWetDaysOnFeed: number;
  youngHeifersBrewersGrainWetLbsAsFedPerDay: number;
  youngHeifersBrewersGrainWetDaysOnFeed: number;
  youngHeifersCitrusPulpDryLbsAsFedPerDay: number;
  youngHeifersCitrusPulpDryDaysOnFeed: number;
  youngHeifersCornGlutenFeedLbsAsFedPerDay: number;
  youngHeifersCornGlutenFeedDaysOnFeed: number;
  youngHeifersWholeCottonseedLbsAsFedPerDay: number;
  youngHeifersWholeCottonseedDaysOnFeed: number;
  youngHeifersCottonseedHullsLbsAsFedPerDay: number;
  youngHeifersCottonseedHullsDaysOnFeed: number;
  youngHeifersSoybeanMeal48LbsAsFedPerDay: number;
  youngHeifersSoybeanMeal48DaysOnFeed: number;
  youngHeifersCustomFeedMixLbsAsFedPerDay: number;
  youngHeifersCustomFeedMixDaysOnFeed: number;
  youngHeifersCustomMineralMixLbsAsFedPerDay: number;
  youngHeifersCustomMineralMixDaysOnFeed: number;

  // Feed Details - Calves
  calvesMilkReplacerLbsAsFedPerDay: number;
  calvesMilkReplacerDaysOnFeed: number;
  calvesRaisedMilkUsedForCalvesLbsAsFedPerDay: number;
  calvesRaisedMilkUsedForCalvesDaysOnFeed: number;
  calvesCalfStarterFeedLbsAsFedPerDay: number;
  calvesCalfStarterFeedDaysOnFeed: number;


  cornSilageExpectedYieldTonsPerAcre: number;
  cornSilageHarvestedAcres: number;
  cornSilageEstimatedTotalOperatingCost: number;
  cornSilagePercentOfForageFixedCostAllocated: number;
  cornSilageShrinkLossPercentage: number;

  // Sorghum Silage
  sorghumSilageExpectedYieldTonsPerAcre: number;
  sorghumSilageHarvestedAcres: number;
  sorghumSilageEstimatedTotalOperatingCost: number;
  sorghumSilagePercentOfForageFixedCostAllocated: number;
  sorghumSilageShrinkLossPercentage: number;

  // Small Grain Silage
  smallGrainSilageExpectedYieldTonsPerAcre: number;
  smallGrainSilageHarvestedAcres: number;
  smallGrainSilageEstimatedTotalOperatingCost: number;
  smallGrainSilagePercentOfForageFixedCostAllocated: number;
  smallGrainSilageShrinkLossPercentage: number;

  // Grass Hay
  grassHayExpectedYieldTonsPerAcre: number;
  grassHayHarvestedAcres: number;
  grassHayEstimatedTotalOperatingCost: number;
  grassHayPercentOfForageFixedCostAllocated: number;
  grassHayShrinkLossPercentage: number;

  // Alfalfa Hay Establishment
  alfalfaHayEstablishmentExpectedYieldTonsPerAcre: number;
  alfalfaHayEstablishmentHarvestedAcres: number;
  alfalfaHayEstablishmentEstimatedTotalOperatingCost: number;
  alfalfaHayEstablishmentPercentOfForageFixedCostAllocated: number;

  // Alfalfa Hay Stand
  alfalfaHayStandExpectedYieldTonsPerAcre: number;
  alfalfaHayStandHarvestedAcres: number;
  alfalfaHayStandEstimatedTotalOperatingCost: number;
  alfalfaHayStandPercentOfForageFixedCostAllocated: number;
  alfalfaHayShrinkLossPercentage: number;



  // Commodity and Trucking Details
averageCostOfTruckingPerTonMile: number;

// Corn Silage
cornSilageCostOfCommodityPerTon: number;
cornSilageAvgPurchasedFeedMilesTruckedToDairy: number;
cornSilageAvgGrownForageMilesTruckedToDairy: number;

// Sorghum Silage
sorghumSilageCostOfCommodityPerTon: number;
sorghumSilageAvgPurchasedFeedMilesTruckedToDairy: number;
sorghumSilageAvgGrownForageMilesTruckedToDairy: number;

// Small Grain Silage
smallGrainSilageCostOfCommodityPerTon: number;
smallGrainSilageAvgPurchasedFeedMilesTruckedToDairy: number;
smallGrainSilageAvgGrownForageMilesTruckedToDairy: number;

// Grass Hay
grassHayCostOfCommodityPerTon: number;
grassHayAvgPurchasedFeedMilesTruckedToDairy: number;
grassHayAvgGrownForageMilesTruckedToDairy: number;

// Alfalfa Hay
alfalfaHayCostOfCommodityPerTon: number;
alfalfaHayAvgPurchasedFeedMilesTruckedToDairy: number;
alfalfaHayAvgGrownForageMilesTruckedToDairy: number;

// Peanut Hulls
peanutHullsCostOfCommodityPerTon: number;
peanutHullsAvgPurchasedFeedMilesTruckedToDairy: number;
peanutHullsAvgGrownForageMilesTruckedToDairy: number;

// Apple Pomace
applePomaceCostOfCommodityPerTon: number;
applePomaceAvgPurchasedFeedMilesTruckedToDairy: number;
applePomaceAvgGrownForageMilesTruckedToDairy: number;

// Brewers Grain
brewersGrainCostOfCommodityPerTon: number;
brewersGrainAvgPurchasedFeedMilesTruckedToDairy: number;
brewersGrainAvgGrownForageMilesTruckedToDairy: number;

// Citrus Pulp
citrusPulpCostOfCommodityPerTon: number;
citrusPulpAvgPurchasedFeedMilesTruckedToDairy: number;
citrusPulpAvgGrownForageMilesTruckedToDairy: number;

// Corn Gluten
cornGlutenCostOfCommodityPerTon: number;
cornGlutenAvgPurchasedFeedMilesTruckedToDairy: number;
cornGlutenAvgGrownForageMilesTruckedToDairy: number;

// Whole Cottonseed
wholeCottonseedCostOfCommodityPerTon: number;
wholeCottonseedAvgPurchasedFeedMilesTruckedToDairy: number;
wholeCottonseedAvgGrownForageMilesTruckedToDairy: number;

// Cottonseed Hulls
cottonseedHullsCostOfCommodityPerTon: number;
cottonseedHullsAvgPurchasedFeedMilesTruckedToDairy: number;
cottonseedHullsAvgGrownForageMilesTruckedToDairy: number;

// Soybean Meal
soybeanMealCostOfCommodityPerTon: number;
soybeanMealAvgPurchasedFeedMilesTruckedToDairy: number;
soybeanMealAvgGrownForageMilesTruckedToDairy: number;

// Custom Feed Mix
customFeedMixCostOfCommodityPerTon: number;
customFeedMixAvgPurchasedFeedMilesTruckedToDairy: number;
customFeedMixAvgGrownForageMilesTruckedToDairy: number;

// Custom Mineral Mix
customMineralMixCostOfCommodityPerTon: number;
customMineralMixAvgPurchasedFeedMilesTruckedToDairy: number;
customMineralMixAvgGrownForageMilesTruckedToDairy: number;

}


interface InputDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (inputs: CombinedInputs) => void
}



  const CombinedInputDialog: React.FC<InputDialogProps> = ({ open, handleClose, handleSubmit }) => {
    const { email, loggedIn } = useAuth()
    const [tabValue, setTabValue] = useState(0)

    const defaultInputs: CombinedInputs = {
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
      milkingHerdCustomFeedMixLbsAsFedPerDay: 0,
      milkingHerdCustomFeedMixDaysOnFeed: 0,
      milkingHerdCustomMineralMixLbsAsFedPerDay: 0,
      milkingHerdCustomMineralMixDaysOnFeed: 0,
    
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
      dryHerdCustomFeedMixLbsAsFedPerDay: 0,
      dryHerdCustomFeedMixDaysOnFeed: 0,
      dryHerdCustomMineralMixLbsAsFedPerDay: 0,
      dryHerdCustomMineralMixDaysOnFeed: 0,
    
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
      bredHeifersCustomFeedMixLbsAsFedPerDay: 0,
      bredHeifersCustomFeedMixDaysOnFeed: 0,
      bredHeifersCustomMineralMixLbsAsFedPerDay: 0,
      bredHeifersCustomMineralMixDaysOnFeed: 0,
    
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
      youngHeifersCustomFeedMixLbsAsFedPerDay: 0,
      youngHeifersCustomFeedMixDaysOnFeed: 0,
      youngHeifersCustomMineralMixLbsAsFedPerDay: 0,
      youngHeifersCustomMineralMixDaysOnFeed: 0,
    
      // Calves
      calvesMilkReplacerLbsAsFedPerDay: 0,
      calvesMilkReplacerDaysOnFeed: 0,
      calvesRaisedMilkUsedForCalvesLbsAsFedPerDay: 0,
      calvesRaisedMilkUsedForCalvesDaysOnFeed: 0,
      calvesCalfStarterFeedLbsAsFedPerDay: 0,
      calvesCalfStarterFeedDaysOnFeed: 0,
    
      // Corn Silage
      cornSilageExpectedYieldTonsPerAcre: 0,
      cornSilageHarvestedAcres: 0,
      cornSilageEstimatedTotalOperatingCost: 0,
      cornSilagePercentOfForageFixedCostAllocated: 0,
      cornSilageShrinkLossPercentage: 0,
    
      // Sorghum Silage
      sorghumSilageExpectedYieldTonsPerAcre: 0,
      sorghumSilageHarvestedAcres: 0,
      sorghumSilageEstimatedTotalOperatingCost: 0,
      sorghumSilagePercentOfForageFixedCostAllocated: 0,
      sorghumSilageShrinkLossPercentage: 0,
    
      // Small Grain Silage
      smallGrainSilageExpectedYieldTonsPerAcre: 0,
      smallGrainSilageHarvestedAcres: 0,
      smallGrainSilageEstimatedTotalOperatingCost: 0,
      smallGrainSilagePercentOfForageFixedCostAllocated: 0,
      smallGrainSilageShrinkLossPercentage: 0,
    
      // Grass Hay
      grassHayExpectedYieldTonsPerAcre: 0,
      grassHayHarvestedAcres: 0,
      grassHayEstimatedTotalOperatingCost: 0,
      grassHayPercentOfForageFixedCostAllocated: 0,
      grassHayShrinkLossPercentage: 0,
    
      // Alfalfa Hay Establishment
      alfalfaHayEstablishmentExpectedYieldTonsPerAcre: 0,
      alfalfaHayEstablishmentHarvestedAcres: 0,
      alfalfaHayEstablishmentEstimatedTotalOperatingCost: 0,
      alfalfaHayEstablishmentPercentOfForageFixedCostAllocated: 0,
    
      // Alfalfa Hay Stand
      alfalfaHayStandExpectedYieldTonsPerAcre: 0,
      alfalfaHayStandHarvestedAcres: 0,
      alfalfaHayStandEstimatedTotalOperatingCost: 0,
      alfalfaHayStandPercentOfForageFixedCostAllocated: 0,
      alfalfaHayShrinkLossPercentage: 0,

averageCostOfTruckingPerTonMile: 0,

// Corn Silage
cornSilageCostOfCommodityPerTon: 0,
cornSilageAvgPurchasedFeedMilesTruckedToDairy: 0,
cornSilageAvgGrownForageMilesTruckedToDairy: 0,

// Sorghum Silage
sorghumSilageCostOfCommodityPerTon: 0,
sorghumSilageAvgPurchasedFeedMilesTruckedToDairy: 0,
sorghumSilageAvgGrownForageMilesTruckedToDairy: 0,

// Small Grain Silage
smallGrainSilageCostOfCommodityPerTon: 0,
smallGrainSilageAvgPurchasedFeedMilesTruckedToDairy: 0,
smallGrainSilageAvgGrownForageMilesTruckedToDairy: 0,

// Grass Hay
grassHayCostOfCommodityPerTon: 0,
grassHayAvgPurchasedFeedMilesTruckedToDairy: 0,
grassHayAvgGrownForageMilesTruckedToDairy: 0,

// Alfalfa Hay
alfalfaHayCostOfCommodityPerTon: 0,
alfalfaHayAvgPurchasedFeedMilesTruckedToDairy: 0,
alfalfaHayAvgGrownForageMilesTruckedToDairy: 0,

// Peanut Hulls
peanutHullsCostOfCommodityPerTon: 0,
peanutHullsAvgPurchasedFeedMilesTruckedToDairy: 0,
peanutHullsAvgGrownForageMilesTruckedToDairy: 0,

// Apple Pomace
applePomaceCostOfCommodityPerTon: 0,
applePomaceAvgPurchasedFeedMilesTruckedToDairy: 0,
applePomaceAvgGrownForageMilesTruckedToDairy: 0,

// Brewers Grain
brewersGrainCostOfCommodityPerTon: 0,
brewersGrainAvgPurchasedFeedMilesTruckedToDairy: 0,
brewersGrainAvgGrownForageMilesTruckedToDairy: 0,

// Citrus Pulp
citrusPulpCostOfCommodityPerTon: 0,
citrusPulpAvgPurchasedFeedMilesTruckedToDairy: 0,
citrusPulpAvgGrownForageMilesTruckedToDairy: 0,

// Corn Gluten
cornGlutenCostOfCommodityPerTon: 0,
cornGlutenAvgPurchasedFeedMilesTruckedToDairy: 0,
cornGlutenAvgGrownForageMilesTruckedToDairy: 0,

// Whole Cottonseed
wholeCottonseedCostOfCommodityPerTon: 0,
wholeCottonseedAvgPurchasedFeedMilesTruckedToDairy: 0,
wholeCottonseedAvgGrownForageMilesTruckedToDairy: 0,

// Cottonseed Hulls
cottonseedHullsCostOfCommodityPerTon: 0,
cottonseedHullsAvgPurchasedFeedMilesTruckedToDairy: 0,
cottonseedHullsAvgGrownForageMilesTruckedToDairy: 0,

// Soybean Meal
soybeanMealCostOfCommodityPerTon: 0,
soybeanMealAvgPurchasedFeedMilesTruckedToDairy: 0,
soybeanMealAvgGrownForageMilesTruckedToDairy: 0,

// Custom Feed Mix
customFeedMixCostOfCommodityPerTon: 0,
customFeedMixAvgPurchasedFeedMilesTruckedToDairy: 0,
customFeedMixAvgGrownForageMilesTruckedToDairy: 0,

// Custom Mineral Mix
customMineralMixCostOfCommodityPerTon: 0,
customMineralMixAvgPurchasedFeedMilesTruckedToDairy: 0,
customMineralMixAvgGrownForageMilesTruckedToDairy: 0,

    };

    
    const [userInputs, setUserInputs] = useState<CombinedInputs>(defaultInputs);
  
    // Feed sections definition for the UI organization
    const feedSections = {
      milkingHerd: {
        title: 'Milking Herd',
        feeds: [
          { name: 'CornSilage', label: 'Corn Silage' },
          { name: 'SorghumSilage', label: 'Sorghum Silage' },
          { name: 'SmallGrainSilage', label: 'Small Grain Silage' },
          { name: 'GrassHay', label: 'Grass Hay' },
          { name: 'AlfalfaHay', label: 'Alfalfa Hay' },
          { name: 'PeanutHulls', label: 'Peanut Hulls' },
          { name: 'PpplePomaceNoHulls', label: 'Apple Pomace (No Hulls)' },
          { name: 'DistillersGrainWet', label: 'Distillers Grain (Wet)' },
          { name: 'BrewersGrainWet', label: "Brewer's Grain (Wet)" },
          { name: 'CitrusPulpDry', label: 'Citrus Pulp (Dry)' },
          { name: 'CornGlutenFeed', label: 'Corn Gluten Feed' },
          { name: 'WholeCottonseed', label: 'Whole Cottonseed' },
          { name: 'CottonseedHulls', label: 'Cottonseed Hulls' },
          { name: 'SoybeanMeal48', label: 'Soybean Meal 48' },
          { name: 'CustomFeedMix', label: 'Custom Feed Mix' },
          { name: 'CustomMineralMix', label: 'Custom Mineral Mix' }
        ]
      },
      dryHerd: {
        title: 'Dry Herd',
        feeds: [
          { name: 'CornSilage', label: 'Corn Silage' },
          { name: 'SorghumSilage', label: 'Sorghum Silage' },
          { name: 'SmallGrainSilage', label: 'Small Grain Silage' },
          { name: 'GrassHay', label: 'Grass Hay' },
          { name: 'AlfalfaHay', label: 'Alfalfa Hay' },
          { name: 'PeanutHulls', label: 'Peanut Hulls' },
          { name: 'PpplePomaceNoHulls', label: 'Apple Pomace (No Hulls)' },
          { name: 'DistillersGrainWet', label: 'Distillers Grain (Wet)' },
          { name: 'BrewersGrainWet', label: "Brewer's Grain (Wet)" },
          { name: 'CitrusPulpDry', label: 'Citrus Pulp (Dry)' },
          { name: 'CornGlutenFeed', label: 'Corn Gluten Feed' },
          { name: 'WholeCottonseed', label: 'Whole Cottonseed' },
          { name: 'CottonseedHulls', label: 'Cottonseed Hulls' },
          { name: 'SoybeanMeal48', label: 'Soybean Meal 48' },
          { name: 'CustomFeedMix', label: 'Custom Feed Mix' },
          { name: 'CustomMineralMix', label: 'Custom Mineral Mix' }
        ]
      },
      bredHeifers: {
        title: 'Bred Heifers (12-24 Months)',
        feeds: [
          { name: 'CornSilage', label: 'Corn Silage' },
          { name: 'SorghumSilage', label: 'Sorghum Silage' },
          { name: 'SmallGrainSilage', label: 'Small Grain Silage' },
          { name: 'GrassHay', label: 'Grass Hay' },
          { name: 'AlfalfaHay', label: 'Alfalfa Hay' },
          { name: 'PeanutHulls', label: 'Peanut Hulls' },
          { name: 'PpplePomaceNoHulls', label: 'Apple Pomace (No Hulls)' },
          { name: 'DistillersGrainWet', label: 'Distillers Grain (Wet)' },
          { name: 'BrewersGrainWet', label: "Brewer's Grain (Wet)" },
          { name: 'CitrusPulpDry', label: 'Citrus Pulp (Dry)' },
          { name: 'CornGlutenFeed', label: 'Corn Gluten Feed' },
          { name: 'WholeCottonseed', label: 'Whole Cottonseed' },
          { name: 'CottonseedHulls', label: 'Cottonseed Hulls' },
          { name: 'SoybeanMeal48', label: 'Soybean Meal 48' },
          { name: 'CustomFeedMix', label: 'Custom Feed Mix' },
          { name: 'CustomMineralMix', label: 'Custom Mineral Mix' }
        ]
      },
      youngHeifers: {
        title: 'Young Heifers (3-12 Months)',
        feeds: [
          { name: 'CornSilage', label: 'Corn Silage' },
          { name: 'SorghumSilage', label: 'Sorghum Silage' },
          { name: 'SmallGrainSilage', label: 'Small Grain Silage' },
          { name: 'GrassHay', label: 'Grass Hay' },
          { name: 'AlfalfaHay', label: 'Alfalfa Hay' },
          { name: 'PeanutHulls', label: 'Peanut Hulls' },
          { name: 'PpplePomaceNoHulls', label: 'Apple Pomace (No Hulls)' },
          { name: 'DistillersGrainWet', label: 'Distillers Grain (Wet)' },
          { name: 'BrewersGrainWet', label: "Brewer's Grain (Wet)" },
          { name: 'CitrusPulpDry', label: 'Citrus Pulp (Dry)' },
          { name: 'CornGlutenFeed', label: 'Corn Gluten Feed' },
          { name: 'WholeCottonseed', label: 'Whole Cottonseed' },
          { name: 'CottonseedHulls', label: 'Cottonseed Hulls' },
          { name: 'SoybeanMeal48', label: 'Soybean Meal 48' },
          { name: 'CustomFeedMix', label: 'Custom Feed Mix' },
          { name: 'CustomMineralMix', label: 'Custom Mineral Mix' }
        ]
      },
      calves: {
        title: 'Calves (0-3 Months)',
        feeds: [
          { name: 'MilkReplacer', label: 'Milk Replacer' },
          { name: 'RaisedMilkUsedForCalves', label: 'Raised Milk Used for Calves' },
          { name: 'CalfStarterFeed', label: 'Calf Starter Feed' }
        ]
      }
    };
    
    const productionSections = [
      {
        title: 'Corn Silage',
        fields: [
          {
            name: 'cornSilageExpectedYieldTonsPerAcre',
            label: 'Expected Yield (Tons/Acre)'
          },
          {
            name: 'cornSilageHarvestedAcres',
            label: 'Harvested Acres'
          },
          {
            name: 'cornSilageEstimatedTotalOperatingCost',
            label: 'Estimated Total Operating Cost'
          },
          {
            name: 'cornSilagePercentOfForageFixedCostAllocated',
            label: 'Percent of Fixed Cost Allocated'
          },
          {
            name: 'cornSilageShrinkLossPercentage',
            label: 'Shrink/Loss Percentage'
          }
        ]
      },
      {
        title: 'Sorghum Silage',
        fields: [
          {
            name: 'sorghumSilageExpectedYieldTonsPerAcre',
            label: 'Expected Yield (Tons/Acre)'
          },
          {
            name: 'sorghumSilageHarvestedAcres',
            label: 'Harvested Acres'
          },
          {
            name: 'sorghumSilageEstimatedTotalOperatingCost',
            label: 'Estimated Total Operating Cost'
          },
          {
            name: 'sorghumSilagePercentOfForageFixedCostAllocated',
            label: 'Percent of Fixed Cost Allocated'
          },
          {
            name: 'sorghumSilageShrinkLossPercentage',
            label: 'Shrink/Loss Percentage'
          }
        ]
      },
      {
        title: 'Small Grain Silage',
        fields: [
          {
            name: 'smallGrainSilageExpectedYieldTonsPerAcre',
            label: 'Expected Yield (Tons/Acre)'
          },
          {
            name: 'smallGrainSilageHarvestedAcres',
            label: 'Harvested Acres'
          },
          {
            name: 'smallGrainSilageEstimatedTotalOperatingCost',
            label: 'Estimated Total Operating Cost'
          },
          {
            name: 'smallGrainSilagePercentOfForageFixedCostAllocated',
            label: 'Percent of Fixed Cost Allocated'
          },
          {
            name: 'smallGrainSilageShrinkLossPercentage',
            label: 'Shrink/Loss Percentage'
          }
        ]
      },
      {
        title: 'Grass Hay',
        fields: [
          {
            name: 'grassHayExpectedYieldTonsPerAcre',
            label: 'Expected Yield (Tons/Acre)'
          },
          {
            name: 'grassHayHarvestedAcres',
            label: 'Harvested Acres'
          },
          {
            name: 'grassHayEstimatedTotalOperatingCost',
            label: 'Estimated Total Operating Cost'
          },
          {
            name: 'grassHayPercentOfForageFixedCostAllocated',
            label: 'Percent of Fixed Cost Allocated'
          },
          {
            name: 'grassHayShrinkLossPercentage',
            label: 'Shrink/Loss Percentage'
          }
        ]
      },
      {
        title: 'Alfalfa Hay Establishment',
        fields: [
          {
            name: 'alfalfaHayEstablishmentExpectedYieldTonsPerAcre',
            label: 'Expected Yield (Tons/Acre)'
          },
          {
            name: 'alfalfaHayEstablishmentHarvestedAcres',
            label: 'Harvested Acres'
          },
          {
            name: 'alfalfaHayEstablishmentEstimatedTotalOperatingCost',
            label: 'Estimated Total Operating Cost'
          },
          {
            name: 'alfalfaHayEstablishmentPercentOfForageFixedCostAllocated',
            label: 'Percent of Fixed Cost Allocated'
          }
        ]
      },
      {
        title: 'Alfalfa Hay Stand',
        fields: [
          {
            name: 'alfalfaHayStandExpectedYieldTonsPerAcre',
            label: 'Expected Yield (Tons/Acre)'
          },
          {
            name: 'alfalfaHayStandHarvestedAcres',
            label: 'Harvested Acres'
          },
          {
            name: 'alfalfaHayStandEstimatedTotalOperatingCost',
            label: 'Estimated Total Operating Cost'
          },
          {
            name: 'alfalfaHayStandPercentOfForageFixedCostAllocated',
            label: 'Percent of Fixed Cost Allocated'
          },
          {
            name: 'alfalfaHayShrinkLossPercentage',
            label: 'Shrink/Loss Percentage'
          }
        ]
      }
    ];

    const commodityAndTruckingSection = {
      title: 'Commodity and Trucking Details',
      fields: [
        {
          name: 'averageCostOfTruckingPerTonMile',
          label: 'Average Cost of Trucking per Ton-Mile'
        }
      ],
      commodities: [
        {
          title: 'Corn Silage',
          fields: [
            { name: 'cornSilageCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'cornSilageAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'cornSilageAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Sorghum Silage',
          fields: [
            { name: 'sorghumSilageCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'sorghumSilageAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'sorghumSilageAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Small Grain Silage',
          fields: [
            { name: 'smallGrainSilageCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'smallGrainSilageAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'smallGrainSilageAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Grass Hay',
          fields: [
            { name: 'grassHayCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'grassHayAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'grassHayAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Alfalfa Hay',
          fields: [
            { name: 'alfalfaHayCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'alfalfaHayAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'alfalfaHayAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Peanut Hulls',
          fields: [
            { name: 'peanutHullsCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'peanutHullsAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'peanutHullsAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Apple Pomace',
          fields: [
            { name: 'applePomaceCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'applePomaceAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'applePomaceAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: "Brewers Grain",
          fields: [
            { name: 'brewersGrainCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'brewersGrainAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'brewersGrainAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Citrus Pulp',
          fields: [
            { name: 'citrusPulpCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'citrusPulpAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'citrusPulpAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Corn Gluten',
          fields: [
            { name: 'cornGlutenCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'cornGlutenAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'cornGlutenAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Whole Cottonseed',
          fields: [
            { name: 'wholeCottonseedCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'wholeCottonseedAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'wholeCottonseedAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Cottonseed Hulls',
          fields: [
            { name: 'cottonseedHullsCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'cottonseedHullsAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'cottonseedHullsAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Soybean Meal',
          fields: [
            { name: 'soybeanMealCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'soybeanMealAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'soybeanMealAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Custom Feed Mix',
          fields: [
            { name: 'customFeedMixCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'customFeedMixAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'customFeedMixAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        },
        {
          title: 'Custom Mineral Mix',
          fields: [
            { name: 'customMineralMixCostOfCommodityPerTon', label: 'Cost of Commodity Per Ton' },
            { name: 'customMineralMixAvgPurchasedFeedMilesTruckedToDairy', label: 'Avg Purchased Feed Miles Trucked to Dairy' },
            { name: 'customMineralMixAvgGrownForageMilesTruckedToDairy', label: 'Avg Grown Forage Miles Trucked to Dairy' }
          ]
        }
      ]
    };

    useEffect(() => {
      if (!open) return
      if (loggedIn) {
        fetchUserInputRecords()
      } else {
        loadFromSessionStorage()
      }
    }, [email, open, loggedIn])
  
    const fetchUserInputRecords = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed-details/inputDetails/${email}`
        );
    
        if (response.data) {
          const transformedData: CombinedInputs = {} as CombinedInputs;
          
          // Transform herd data
          const herds = ['milkingHerd', 'dryHerd', 'bredHeifers', 'youngHeifers', 'calves'];
          herds.forEach(herd => {
            if (response.data[herd]) {
              Object.entries(response.data[herd]).forEach(([key, value]) => {
                transformedData[key] = value as number;
              });
            }
          });
          
          // Transform raised forage data
          const forageInputs = [
            'cornSilage',
            'sorghumSilage',
            'smallGrainSilage',
            'grassHay',
            'alfalfaHayEstablishment',
            'alfalfaHayStand'
          ];
          
          forageInputs.forEach(section => {
            if (response.data[section]) {
              Object.entries(response.data[section]).forEach(([key, value]) => {
                transformedData[key] = value as number;
              });
            }
          });
    
          // Transform transport and cost inputs
          transformedData.averageCostOfTruckingPerTonMile = response.data.averageCostOfTruckingPerTonMile;
    
          const transportAndCostSections = [
            'cornSilageTransportAndCost',
            'sorghumSilageTransportAndCost',
            'smallGrainSilageTransportAndCost',
            'grassHayTransportAndCost',
            'alfalfaHayTransportAndCost',
            'peanutHullsTransportAndCost',
            'applePomaceTransportAndCost',
            'brewersGrainTransportAndCost',
            'citrusPulpTransportAndCost',
            'cornGlutenTransportAndCost',
            'wholeCottonseedTransportAndCost',
            'cottonseedHullsTransportAndCost',
            'soybeanMealTransportAndCost',
            'customFeedMixTransportAndCost',
            'customMineralMixTransportAndCost'
          ];
    
          transportAndCostSections.forEach(section => {
            if (response.data[section]) {
              const {
                costOfCommodityPerTon,
                avgPurchasedFeedMilesTruckedToDairy,
                avgGrownForageMilesTruckedToDairy
              } = response.data[section];
    
              const baseKey = section.replace('TransportAndCost', '');
              transformedData[`${baseKey}CostOfCommodityPerTon`] = costOfCommodityPerTon;
              transformedData[`${baseKey}AvgPurchasedFeedMilesTruckedToDairy`] = avgPurchasedFeedMilesTruckedToDairy;
              transformedData[`${baseKey}AvgGrownForageMilesTruckedToDairy`] = avgGrownForageMilesTruckedToDairy;
            }
          });
    
          // Handle alfalfa hay shrink loss
          if (response.data.alfalfaHayShrinkLoss) {
            transformedData.alfalfaHayShrinkLossPercentage = 
              response.data.alfalfaHayShrinkLoss.alfalfaHayShrinkLossPercentage;
          }
          console.log(transformedData)
          setUserInputs((prev) => ({
            ...defaultInputs,
            ...prev,
            ...transformedData,
          }));
        }
      } catch (error) {
        console.error('Error fetching user input records:', error);
      }
    };
  
    const loadFromSessionStorage = () => {
      const storedInputs = localStorage.getItem('combinedInputs')
      if (storedInputs) {
        setUserInputs(JSON.parse(storedInputs))
      }
    }
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numValue = value === '' ? 0 : parseFloat(value);
    
      setUserInputs((prev) => {
        const updatedInputs = {
          ...prev, // Preserve existing inputs
          [name]: numValue, // Update the specific input dynamically
        };
    
        console.log('Updated Inputs:', updatedInputs);
        console.log('here i am,')
        console.log(updatedInputs.milkingHerdCornSilageLbsAsFedPerDay) // Debugging logs
        return updatedInputs;
      });
    
      if (!loggedIn) {
        // Store updated inputs in localStorage for non-logged-in users
        const updatedLocalStorage = {
          ...userInputs,
          [name]: numValue,
        };
        localStorage.setItem('combinedInputs', JSON.stringify(updatedLocalStorage));
      }
    };
      
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log('Final Inputs:', userInputs);
     
      handleSubmit(userInputs)
      handleClose()
    }
  

      

    return (
      <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
        <DialogTitle sx={{ bgcolor: '#c8102e', color: 'white' }}>
          Enter Feed and Production Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter your inputs for the Dairy Enterprise Budget Model.
          </DialogContentText>
          
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              mb: 2, 
              '& .MuiTab-root.Mui-selected': { 
                color: '#c8102e' 
              }, 
              '& .MuiTabs-indicator': { 
                backgroundColor: '#c8102e' 
              } 
            }}
          >
            <Tab label="Feed Details" />
            <Tab label="Production Details" />
            <Tab label="Commodity and Trucking" />
          </Tabs>
    
          <form onSubmit={onSubmit}>
            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', p: 2 }}>
              {/* Feed Details Tab */}
              {tabValue === 0 && (
                <Box>
                  {Object.entries(feedSections).map(([sectionKey, section]) => (
                    <Paper key={sectionKey} elevation={2} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ mb: 3, color: '#c8102e' }}>
                        {section.title}
                      </Typography>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Feed Type
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Lbs. as fed per day
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Days on feed
                          </Typography>
                        </Grid>
                        {section.feeds.map(feed => (
                          <React.Fragment key={feed.name}>
                            <Grid item xs={4}>
                              <Typography sx={{ py: 2 }}>{feed.label}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                margin='dense'
                                name={`${sectionKey}${feed.name}LbsAsFedPerDay`}
                                type='number'
                                fullWidth
                                required
                                value={userInputs[`${sectionKey}${feed.name}LbsAsFedPerDay` as keyof CombinedInputs] || ''}
                                onChange={handleChange}
                                inputProps={{ step: 'any' }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#c8102e'
                                    }
                                  }
                                }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                margin='dense'
                                name={`${sectionKey}${feed.name}DaysOnFeed`}
                                type='number'
                                fullWidth
                                required
                                value={userInputs[`${sectionKey}${feed.name}DaysOnFeed` as keyof CombinedInputs] || ''}
                                onChange={handleChange}
                                inputProps={{ step: 'any' }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#c8102e'
                                    }
                                  }
                                }}
                              />
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Paper>
                  ))}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button onClick={() => setTabValue(2)} variant="outlined" sx={{ color: '#c8102e', borderColor: '#c8102e' }}>
                      ← Back to Commodity Details
                    </Button>
                    <Button onClick={() => setTabValue(1)} variant="contained" sx={{ backgroundColor: '#c8102e' }}>
                      Next: Production Details →
                    </Button>
                  </Box>
                </Box>
              )}
    
              {/* Production Details Tab */}
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#c8102e' }}>
                    Forage Production Details
                  </Typography>
                  {productionSections.map((section, index) => (
                    <Paper key={index} elevation={2} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {section.title}
                      </Typography>
                      <Grid container spacing={3}>
                        {section.fields.map(field => (
                          <Grid item xs={12} sm={6} md={4} key={field.name}>
                            <TextField
                              margin='dense'
                              name={field.name}
                              label={field.label}
                              type='number'
                              fullWidth
                              required
                              value={userInputs[field.name as keyof CombinedInputs] || ''}
                              onChange={handleChange}
                              inputProps={{ step: 'any' }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#c8102e'
                                  }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                  color: '#c8102e'
                                }
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  ))}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button onClick={() => setTabValue(0)} variant="outlined" sx={{ color: '#c8102e', borderColor: '#c8102e' }}>
                      ← Back to Feed Details
                    </Button>
                    <Button onClick={() => setTabValue(2)} variant="contained" sx={{ backgroundColor: '#c8102e' }}>
                      Next: Commodity Details →
                    </Button>
                  </Box>
                </Box>
              )}
    
              {/* Commodity and Trucking Tab */}
              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#c8102e' }}>
                    Commodity and Trucking Details
                  </Typography>
                  
                  <Paper elevation={2} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
                    <TextField
                      margin='dense'
                      name="averageCostOfTruckingPerTonMile"
                      label="Average Cost of Trucking per Ton-Mile"
                      type='number'
                      fullWidth
                      required
                      value={userInputs.averageCostOfTruckingPerTonMile || ''}
                      onChange={handleChange}
                      inputProps={{ step: 'any' }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#c8102e'
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#c8102e'
                        }
                      }}
                    />
                  </Paper>
    
                  {commodityAndTruckingSection.commodities.map((commodity) => (
                    <Paper key={commodity.title} elevation={2} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {commodity.title}
                      </Typography>
                      <Grid container spacing={3}>
                        {commodity.fields.map(field => (
                          <Grid item xs={12} sm={6} md={4} key={field.name}>
                            <TextField
                              margin='dense'
                              name={field.name}
                              label={field.label}
                              type='number'
                              fullWidth
                              required
                              value={userInputs[field.name as keyof CombinedInputs] || ''}
                              onChange={handleChange}
                              inputProps={{ step: 'any' }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#c8102e'
                                  }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                  color: '#c8102e'
                                }
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  ))}
    
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button onClick={() => setTabValue(1)} variant="outlined" sx={{ color: '#c8102e', borderColor: '#c8102e' }}>
                      ← Back to Production Details
                    </Button>
                    <Box>
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{
                          mr: 2,
                          color: '#c8102e',
                          borderColor: '#c8102e'
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: '#c8102e'
                        }}
                      >
                        Submit All Details
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
export default CombinedInputDialog
    