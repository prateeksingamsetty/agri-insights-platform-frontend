'use client'

import { Container, TextField, Typography, Button, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputDialog from './InputDialog'
import { useAuth } from 'src/context/AuthContext'

interface OperatingCostsType {
  totalFeedCost: number
  totalRaisedForageCost: number
  totalPurchasedFeedCost: number
  dairyOperatingCosts: number
  dairyPayroll: number
  additionalManagementCosts: number
  totalOperatingCosts: number
}

interface UserInputs {
  haulingFees: number
  organizationalFees: number
  dhiaFees: number
  vetExpenses: number
  insurance: number
  utilities: number
  inseminationSexedFees: number
  inseminationConventionalFees: number
  inseminationConventionalBeefFees: number
  wasteManagement: number
  bedding: number
  raisedForageCost: number
  purchasedFeedCost: number
  additionalManagementCostsPercentage: number
  estimatedLabourCost: number
}

const OperatingCosts = () => {
  const { email, loggedIn } = useAuth()

  const [operatingCosts, setOperatingCosts] = useState<OperatingCostsType>({
    totalFeedCost: 0,
    totalRaisedForageCost: 0,
    totalPurchasedFeedCost: 0,
    dairyOperatingCosts: 0,
    dairyPayroll: 0,
    additionalManagementCosts: 0,
    totalOperatingCosts: 0
  })

  const [openOperatingCost, setOpenOperatingCost] = useState(false)
  const [previoudDetailsFound, setDetailsFound] = useState(false)

  useEffect(() => {
    checkProductionDetailsPresent()
    if (loggedIn && email != null) {
      fetchOperatingCosts()
    } else {
      console.log('User not logged in')
    }
  }, [loggedIn, email])

  const checkProductionDetailsPresent = async (): Promise<void> => {
    console.log("Checking if production inputs filled....")
    try {
      if (loggedIn && email != null) {
        const response_productiondetails = await axios.get(
          `http://localhost:3001/production-details/outputDetails/${email}`
        )
        const response_recipts_input = await axios.get(
          `http://localhost:3001/receipts/outputDetails/${email}`)
          if (response_productiondetails?.data && response_recipts_input?.data) {
            setDetailsFound(true)
          }
        } else {
          const storedProductiondetailsInputs = localStorage.getItem('productionInputs')
          const storedReciptsInputs = localStorage.getItem('ReciptsInputs')
          console.log(storedProductiondetailsInputs)
          console.log(storedReciptsInputs)
          if (storedReciptsInputs) {
            console.log('Receipts Inputs:', JSON.parse(storedReciptsInputs));
          } else {
            console.warn('Receipts Inputs not found in local storage');
          }
          if (storedProductiondetailsInputs && storedReciptsInputs) {
            console.log("I am HEREEEEE")
            
            setDetailsFound(true)
          }
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          
          console.warn('No production details found for the given email')
        } else {
          console.error('Error checking production details:', error)
        }
      }
    }
  
    const fetchOperatingCosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/operating-costs/operatingCostoutputDetails/${email}`
        )
        if (response && response.data) {
          setOperatingCosts(response.data)
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.warn('No operating costs record found for the given email')
        } else {
          console.error('Error fetching operating costs:', error)
        }
      }
    }
  
    const handleDialogOpenOperatingCost = () => {
      checkProductionDetailsPresent()
      setOpenOperatingCost(true)
    }
    const handleDialogCloseOperatingCost = () => setOpenOperatingCost(false)
  
    const handleSubmitOperatingCost = async (userInputs: UserInputs, useDetailedLaborCost: boolean) => {
      try {
       
        let response;
        const transformedInputs = {
          haulingFees: Number(userInputs.haulingFees),
          organizationalFees: Number(userInputs.organizationalFees),
          dhiaFees: Number(userInputs.dhiaFees),
          vetExpenses: Number(userInputs.vetExpenses),
          insurance: Number(userInputs.insurance),
          utilities: Number(userInputs.utilities),
          inseminationSexedFees: Number(userInputs.inseminationSexedFees),
          inseminationConventionalFees: Number(userInputs.inseminationConventionalFees),
          inseminationConventionalBeefFees: Number(userInputs.inseminationConventionalBeefFees),
          wasteManagement: Number(userInputs.wasteManagement),
          bedding: Number(userInputs.bedding),
          raisedForageCost: Number(userInputs.raisedForageCost),
          purchasedFeedCost: Number(userInputs.purchasedFeedCost),
          additionalManagementCostsPercentage: Number(userInputs.additionalManagementCostsPercentage),
          estimatedLabourCost: Number(userInputs.estimatedLabourCost),
          useDetailedLaborCost: useDetailedLaborCost
        };
        

        console.log("This are the operating cost inputs:", transformedInputs)
        if (loggedIn && email != null) {
          response = await axios.patch(
            `http://localhost:3001/operating-costs/updateInput/${email}`,
            transformedInputs
          )
        } else {
          const storedProductiondetailsInputs = localStorage.getItem('productionInputs');
          const storedReciptsInputs = localStorage.getItem('ReciptsInputs');
          const storedLabourInputs = localStorage.getItem('laborCostInputs');
          let reciptsInputs;
          let receiptsTransformedInputs;
          let productionDetails; 
          let productionDetailTransformedInput;
          let labourInputs;
          let labourTransformedInputs;
          if (storedProductiondetailsInputs !== null && storedReciptsInputs !== null) {
            try {
              productionDetails = JSON.parse(storedProductiondetailsInputs);
              reciptsInputs = JSON.parse(storedReciptsInputs);
              if(storedLabourInputs!=null){
                labourInputs= JSON.parse(storedLabourInputs);
              }
              else{
                labourInputs=null;
              }

              

              console.log("here are productiondetails : productionDetails")
              
              receiptsTransformedInputs = {
                milkPrice: Number(reciptsInputs.milkPrice),
                cullCowsPrice: Number(reciptsInputs.cullCowsPrice),
                heifersPrice: Number(reciptsInputs.heifersPrice),
                bullCalvesPrice: Number(reciptsInputs.bullCalvesPrice),
                beefCrossPrice: Number(reciptsInputs.beefCrossPrice),
                otherIncome1: Number(reciptsInputs.otherIncome1),
                otherIncome2: Number(reciptsInputs.otherIncome2)
              }
              if (labourInputs!==null){
                labourTransformedInputs={
                  numberOfOwners: Number(labourInputs.numberOfOwners),
                  ownerSalary: Number(labourInputs.ownerSalary),
                  ownerBenefits: Number(labourInputs.ownerBenefits),
                  numberOfManagers: Number(labourInputs.numberOfManagers),
                  managerSalary: Number(labourInputs.managerSalary),
                  managerBenefits: Number(labourInputs.managerBenefits),
                  numberOfHerdHealthEmployees: Number(labourInputs.numberOfHerdHealthEmployees),
                  herdHealthEmployeeTime: Number(labourInputs.herdHealthEmployeeTime),
                  herdHealthEmployeeWage: Number(labourInputs.herdHealthEmployeeWage),
                  herdHealthEmployeeBenefits: Number(labourInputs.herdHealthEmployeeBenefits),
                  numberOfFeederEmployees: Number(labourInputs.numberOfFeederEmployees),
                  feederEmployeeTime: Number(labourInputs.feederEmployeeTime),
                  feederEmployeeWage: Number(labourInputs.feederEmployeeWage),
                  feederEmployeeBenefits: Number(labourInputs.feederEmployeeBenefits),
                  numberOfCropEmployees: Number(labourInputs.numberOfCropEmployees),
                  cropEmployeeTime: Number(labourInputs.cropEmployeeTime),
                  cropEmployeeWage: Number(labourInputs.cropEmployeeWage),
                  cropEmployeeBenefits: Number(labourInputs.cropEmployeeBenefits),
                  numberOfMilkerEmployees: Number(labourInputs.numberOfMilkerEmployees),
                  milkerEmployeeTime: Number(labourInputs.milkerEmployeeTime),
                  milkerEmployeeWage: Number(labourInputs.milkerEmployeeWage),
                  milkerEmployeeBenefits: Number(labourInputs.milkerEmployeeBenefits),
                  replacementEmployees: Number(labourInputs.replacementEmployees),
                  replacementEmployeeTime: Number(labourInputs.replacementEmployeeTime),
                  replacementEmployeeWage: Number(labourInputs.replacementEmployeeWage),
                  replacementEmployeeBenefits: Number(labourInputs.replacementEmployeeBenefits),
                  facilitiesEmployees: Number(labourInputs.facilitiesEmployees),
                  facilitiesEmployeeTime: Number(labourInputs.facilitiesEmployeeTime),
                  facilitiesEmployeeWage: Number(labourInputs.facilitiesEmployeeWage),
                  facilitiesEmployeeBenefits: Number(labourInputs.facilitiesEmployeeBenefits),
                  otherEmployees: Number(labourInputs.otherEmployees),
                  otherEmployeeTime: Number(labourInputs.otherEmployeeTime),
                  otherEmployeeWage: Number(labourInputs.otherEmployeeWage),
                  otherEmployeeBenefits: Number(labourInputs.otherEmployeeBenefits)
              }
              
              }
              else{
                labourTransformedInputs=null;
              }
              
              productionDetailTransformedInput = {
                milkProduction: {
                  totalNumberOfCows: productionDetails.totalNumberOfCows,
                  calvingInterval: productionDetails.calvingInterval,
                  expectedMilkProduction: productionDetails.expectedMilkProduction
                },
                heiferProduction: {
                  cullingRate: productionDetails.cullingRate,
                  cowDeathLossRate: productionDetails.cowDeathLossRate,
                  heiferRaisingDeathLossRate: productionDetails.heiferRaisingDeathLossRate,
                  numberOfHeifersRaised: productionDetails.numberOfHeifersRaised,
                  bullCalfDeath: productionDetails.bullCalfDeath,
                  expectedPercentMaleWithSexedSemen: productionDetails.expectedPercentMaleWithSexedSemen,
                  expectedPercentMaleWithConventional: productionDetails.expectedPercentMaleWithConventional
                },
                beefCrossDetails: {
                  beefCrossPercent: productionDetails.beefCrossPercent,
                  beefCrossDeathRate: productionDetails.beefCrossDeathRate
                }
              }
            } catch (error) {
              console.error('Failed to parse storedInputs as JSON:', error);
            }
          }
  
          response = await axios.post(
            `http://localhost:3001/operating-costs/calculateOperatingCost`,
            {
              inputs: transformedInputs,
              productionDetails: productionDetailTransformedInput,
              reciptsInputs: receiptsTransformedInputs,
              labourInputs:labourTransformedInputs
            }
          )
        }
  
        if (response && response.data) {
          setOperatingCosts(response.data)
        }
      } catch (error) {
        console.error('Error updating operating costs:', error)
      }
    }
  
    const textFields = [
      { label: 'Total Feed Cost($)', value: operatingCosts.totalFeedCost },
      { label: 'Raised Feed Cost($)', value: operatingCosts.totalRaisedForageCost },
      { label: 'Purchased Feed Cost($)', value: operatingCosts.totalPurchasedFeedCost },
      { label: 'Dairy Operating Cost($)', value: operatingCosts.dairyOperatingCosts },
      { label: 'Dairy Payroll($)', value: operatingCosts.dairyPayroll },
      { label: 'Additional Management Costs($)', value: operatingCosts.additionalManagementCosts },
      { label: 'Total Operating Costs($)', value: operatingCosts.totalOperatingCosts }
    ]
  
    return (
      <div>
        <Typography
          className='mt-5 text-center'
          variant='h4'
          sx={{ color: '#c8102e', fontWeight: 'bold' }}
        >
          Operating Costs
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
              onClick={handleDialogOpenOperatingCost}
            >
              Input Operating Costs
            </Button>
          </Box>
        </Container>
        <InputDialog
          previoudDetailsFound={previoudDetailsFound}
          open={openOperatingCost}
          handleClose={handleDialogCloseOperatingCost}
          handleSubmit={handleSubmitOperatingCost}
        />
      </div>
    )
  }
  
  export default OperatingCosts