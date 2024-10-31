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
  Box
} from '@mui/material'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'

interface UserInputs {
  // Corn Silage
  cornSilageExpectedYieldTonsPerAcre: number
  cornSilageHarvestedAcres: number
  cornSilageEstimatedTotalOperatingCost: number
  cornSilagePercentOfForageFixedCostAllocated: number
  cornSilageShrinkLossPercentage: number

  // Sorghum Silage
  sorghumSilageExpectedYieldTonsPerAcre: number
  sorghumSilageHarvestedAcres: number
  sorghumSilageEstimatedTotalOperatingCost: number
  sorghumSilagePercentOfForageFixedCostAllocated: number
  sorghumSilageShrinkLossPercentage: number

  // Small Grain Silage
  smallGrainSilageExpectedYieldTonsPerAcre: number
  smallGrainSilageHarvestedAcres: number
  smallGrainSilageEstimatedTotalOperatingCost: number
  smallGrainSilagePercentOfForageFixedCostAllocated: number
  smallGrainSilageShrinkLossPercentage: number

  // Grass Hay
  grassHayExpectedYieldTonsPerAcre: number
  grassHayHarvestedAcres: number
  grassHayEstimatedTotalOperatingCost: number
  grassHayPercentOfForageFixedCostAllocated: number
  grassHayShrinkLossPercentage: number

  // Alfalfa Hay Establishment
  alfalfaHayEstablishmentExpectedYieldTonsPerAcre: number
  alfalfaHayEstablishmentHarvestedAcres: number
  alfalfaHayEstablishmentEstimatedTotalOperatingCost: number
  alfalfaHayEstablishmentPercentOfForageFixedCostAllocated: number

  // Alfalfa Hay Stand
  alfalfaHayStandExpectedYieldTonsPerAcre: number
  alfalfaHayStandHarvestedAcres: number
  alfalfaHayStandEstimatedTotalOperatingCost: number
  alfalfaHayStandPercentOfForageFixedCostAllocated: number

  // Alfalfa Hay Shrink/Loss
  alfalfaHayShrinkLossPercentage: number
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

    // Alfalfa Hay Shrink/Loss
    alfalfaHayShrinkLossPercentage: 0
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/production-details/inputDetails/${email}`
      )
      console.log('response in prod details ', response)

      if (response && response.data) {
        console.log('Entereddd')
        setUserInputs({
          // Corn Silage
          cornSilageExpectedYieldTonsPerAcre:
            response.data.cornSilage.expectedYieldTonsPerAcre,
          cornSilageHarvestedAcres: response.data.cornSilage.harvestedAcres,
          cornSilageEstimatedTotalOperatingCost:
            response.data.cornSilage.estimatedTotalOperatingCost,
          cornSilagePercentOfForageFixedCostAllocated:
            response.data.cornSilage.percentOfForageFixedCostAllocated,
          cornSilageShrinkLossPercentage:
            response.data.cornSilage.shrinkLossPercentage,

          // Sorghum Silage
          sorghumSilageExpectedYieldTonsPerAcre:
            response.data.sorghumSilage.expectedYieldTonsPerAcre,
          sorghumSilageHarvestedAcres:
            response.data.sorghumSilage.harvestedAcres,
          sorghumSilageEstimatedTotalOperatingCost:
            response.data.sorghumSilage.estimatedTotalOperatingCost,
          sorghumSilagePercentOfForageFixedCostAllocated:
            response.data.sorghumSilage.percentOfForageFixedCostAllocated,
          sorghumSilageShrinkLossPercentage:
            response.data.sorghumSilage.shrinkLossPercentage,

          // Small Grain Silage
          smallGrainSilageExpectedYieldTonsPerAcre:
            response.data.smallGrainSilage.expectedYieldTonsPerAcre,
          smallGrainSilageHarvestedAcres:
            response.data.smallGrainSilage.harvestedAcres,
          smallGrainSilageEstimatedTotalOperatingCost:
            response.data.smallGrainSilage.estimatedTotalOperatingCost,
          smallGrainSilagePercentOfForageFixedCostAllocated:
            response.data.smallGrainSilage.percentOfForageFixedCostAllocated,
          smallGrainSilageShrinkLossPercentage:
            response.data.smallGrainSilage.shrinkLossPercentage,

          // Grass Hay
          grassHayExpectedYieldTonsPerAcre:
            response.data.grassHay.expectedYieldTonsPerAcre,
          grassHayHarvestedAcres: response.data.grassHay.harvestedAcres,
          grassHayEstimatedTotalOperatingCost:
            response.data.grassHay.estimatedTotalOperatingCost,
          grassHayPercentOfForageFixedCostAllocated:
            response.data.grassHay.percentOfForageFixedCostAllocated,
          grassHayShrinkLossPercentage:
            response.data.grassHay.shrinkLossPercentage,

          // Alfalfa Hay Establishment
          alfalfaHayEstablishmentExpectedYieldTonsPerAcre:
            response.data.alfalfaHayEstablishment.expectedYieldTonsPerAcre,
          alfalfaHayEstablishmentHarvestedAcres:
            response.data.alfalfaHayEstablishment.harvestedAcres,
          alfalfaHayEstablishmentEstimatedTotalOperatingCost:
            response.data.alfalfaHayEstablishment.estimatedTotalOperatingCost,
          alfalfaHayEstablishmentPercentOfForageFixedCostAllocated:
            response.data.alfalfaHayEstablishment
              .percentOfForageFixedCostAllocated,

          // Alfalfa Hay Stand
          alfalfaHayStandExpectedYieldTonsPerAcre:
            response.data.alfalfaHayStand.expectedYieldTonsPerAcre,
          alfalfaHayStandHarvestedAcres:
            response.data.alfalfaHayStand.harvestedAcres,
          alfalfaHayStandEstimatedTotalOperatingCost:
            response.data.alfalfaHayStand.estimatedTotalOperatingCost,
          alfalfaHayStandPercentOfForageFixedCostAllocated:
            response.data.alfalfaHayStand.percentOfForageFixedCostAllocated,

          // Alfalfa Hay Shrink/Loss
          alfalfaHayShrinkLossPercentage:
            response.data.alfalfaHayStand.shrinkLossPercentage
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
    console.log('Atleast called this')

    handleSubmit(userInputs)
    handleClose()
  }

  const textFields = [
    // Corn Silage
    [
      {
        name: 'cornSilageExpectedYieldTonsPerAcre',
        label: 'Corn Silage Expected Yield (Tons/Acre)'
      },
      {
        name: 'cornSilageHarvestedAcres',
        label: 'Corn Silage Harvested Acres'
      },
      {
        name: 'cornSilageEstimatedTotalOperatingCost',
        label: 'Corn Silage Estimated Total Operating Cost'
      },
      {
        name: 'cornSilagePercentOfForageFixedCostAllocated',
        label: 'Corn Silage Percent of Forage Fixed Cost Allocated'
      },
      {
        name: 'cornSilageShrinkLossPercentage',
        label: 'Corn Silage Shrink/Loss Percentage'
      }
    ],

    // Sorghum Silage
    [
      {
        name: 'sorghumSilageExpectedYieldTonsPerAcre',
        label: 'Sorghum Silage Expected Yield (Tons/Acre)'
      },
      {
        name: 'sorghumSilageHarvestedAcres',
        label: 'Sorghum Silage Harvested Acres'
      },
      {
        name: 'sorghumSilageEstimatedTotalOperatingCost',
        label: 'Sorghum Silage Estimated Total Operating Cost'
      },
      {
        name: 'sorghumSilagePercentOfForageFixedCostAllocated',
        label: 'Sorghum Silage Percent of Forage Fixed Cost Allocated'
      },
      {
        name: 'sorghumSilageShrinkLossPercentage',
        label: 'Sorghum Silage Shrink/Loss Percentage'
      }
    ],

    // Small Grain Silage
    [
      {
        name: 'smallGrainSilageExpectedYieldTonsPerAcre',
        label: 'Small Grain Silage Expected Yield (Tons/Acre)'
      },
      {
        name: 'smallGrainSilageHarvestedAcres',
        label: 'Small Grain Silage Harvested Acres'
      },
      {
        name: 'smallGrainSilageEstimatedTotalOperatingCost',
        label: 'Small Grain Silage Estimated Total Operating Cost'
      },
      {
        name: 'smallGrainSilagePercentOfForageFixedCostAllocated',
        label: 'Small Grain Silage Percent of Forage Fixed Cost Allocated'
      },
      {
        name: 'smallGrainSilageShrinkLossPercentage',
        label: 'Small Grain Silage Shrink/Loss Percentage'
      }
    ],

    // Grass Hay
    [
      {
        name: 'grassHayExpectedYieldTonsPerAcre',
        label: 'Grass Hay Expected Yield (Tons/Acre)'
      },
      { name: 'grassHayHarvestedAcres', label: 'Grass Hay Harvested Acres' },
      {
        name: 'grassHayEstimatedTotalOperatingCost',
        label: 'Grass Hay Estimated Total Operating Cost'
      },
      {
        name: 'grassHayPercentOfForageFixedCostAllocated',
        label: 'Grass Hay Percent of Forage Fixed Cost Allocated'
      },
      {
        name: 'grassHayShrinkLossPercentage',
        label: 'Grass Hay Shrink/Loss Percentage'
      }
    ],

    // Alfalfa Hay Establishment
    [
      {
        name: 'alfalfaHayEstablishmentExpectedYieldTonsPerAcre',
        label: 'Alfalfa Hay Establishment Expected Yield (Tons/Acre)'
      },
      {
        name: 'alfalfaHayEstablishmentHarvestedAcres',
        label: 'Alfalfa Hay Establishment Harvested Acres'
      },
      {
        name: 'alfalfaHayEstablishmentEstimatedTotalOperatingCost',
        label: 'Alfalfa Hay Establishment Estimated Total Operating Cost'
      },
      {
        name: 'alfalfaHayEstablishmentPercentOfForageFixedCostAllocated',
        label:
          'Alfalfa Hay Establishment Percent of Forage Fixed Cost Allocated'
      },
      {
        name: 'alfalfaHayShrinkLossPercentage',
        label: 'Alfalfa Hay Shrink/Loss Percentage'
      }
    ],

    // Alfalfa Hay Stand
    [
      {
        name: 'alfalfaHayStandExpectedYieldTonsPerAcre',
        label: 'Alfalfa Hay Stand Expected Yield (Tons/Acre)'
      },
      {
        name: 'alfalfaHayStandHarvestedAcres',
        label: 'Alfalfa Hay Stand Harvested Acres'
      },
      {
        name: 'alfalfaHayStandEstimatedTotalOperatingCost',
        label: 'Alfalfa Hay Stand Estimated Total Operating Cost'
      },
      {
        name: 'alfalfaHayStandPercentOfForageFixedCostAllocated',
        label: 'Alfalfa Hay Stand Percent of Forage Fixed Cost Allocated'
      },
      {
        name: 'alfalfaHayShrinkLossPercentage',
        label: 'Alfalfa Hay Shrink/Loss Percentage'
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
          Please enter your inputs for the Dairy Enterprise Budget Model.
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
