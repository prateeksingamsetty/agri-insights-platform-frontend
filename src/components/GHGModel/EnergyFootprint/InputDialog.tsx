'use client'

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
    Typography
} from '@mui/material'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'

interface EnergyFootprintInputs {
    annualEnergyUse: {
        electric: number
        diesel: number
        gasoline: number
        propane: number
        naturalGas: number
        fuelOil: number
        biodiesel: number
    }
    dairyOperationsEnergyUse: {
        electric: number
        diesel: number
        gasoline: number
        propane: number
        naturalGas: number
        fuelOil: number
        biodiesel: number
    }
}

interface InputDialogProps {
    open: boolean
    handleClose: () => void
    handleSubmit: (inputs: EnergyFootprintInputs) => void
}

const InputDialog: React.FC<InputDialogProps> = ({
    open,
    handleClose,
    handleSubmit
}) => {
    const { email, loggedIn } = useAuth()

    const defaultInputs: EnergyFootprintInputs = {
        annualEnergyUse: {
        electric: 0,
        diesel: 0,
        gasoline: 0,
        propane: 0,
        naturalGas: 0,
        fuelOil: 0,
        biodiesel: 0
        },
        dairyOperationsEnergyUse: {
        electric: 0,
        diesel: 0,
        gasoline: 0,
        propane: 0,
        naturalGas: 0,
        fuelOil: 0,
        biodiesel: 0
        }
  }

    const [inputs, setInputs] = useState<EnergyFootprintInputs>(defaultInputs)

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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/energy-footprint/inputDetails/${email}`
        )
        if (response && response.data) {
            setInputs({
            annualEnergyUse: {
                electric: response.data.annualEnergyUse.electric,
                diesel: response.data.annualEnergyUse.diesel,
                gasoline: response.data.annualEnergyUse.gasoline,
                propane: response.data.annualEnergyUse.propane,
                naturalGas: response.data.annualEnergyUse.naturalGas,
                fuelOil: response.data.annualEnergyUse.fuelOil,
                biodiesel: response.data.annualEnergyUse.biodiesel
            },
            dairyOperationsEnergyUse: {
                electric: response.data.dairyOperationsEnergyUse.electric,
                diesel: response.data.dairyOperationsEnergyUse.diesel,
                gasoline: response.data.dairyOperationsEnergyUse.gasoline,
                propane: response.data.dairyOperationsEnergyUse.propane,
                naturalGas: response.data.dairyOperationsEnergyUse.naturalGas,
                fuelOil: response.data.dairyOperationsEnergyUse.fuelOil,
                biodiesel: response.data.dairyOperationsEnergyUse.biodiesel
            }
            })
        }
        } catch (error) {
        console.error('Error fetching energy footprint input record:', error)
        setInputs(defaultInputs)
        }
    }

    const loadFromSessionStorage = () => {
        const storedInputs = localStorage.getItem('energyFootprintInputs')
        if (storedInputs) {
        setInputs(JSON.parse(storedInputs))
        } else {
        setInputs(defaultInputs)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        section: 'annualEnergyUse' | 'dairyOperationsEnergyUse'
    ) => {
        const { name, value } = e.target
        setInputs((prev) => ({
        ...prev,
        [section]: {
            ...prev[section],
            // If value is empty, keep it as an empty string; otherwise, convert to a number
            [name]: value === '' ? '' : Number(value)
        }
        }))
    }
  
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleSubmit(inputs)
        handleClose()
    }

    const annualEnergyFields = [
        { name: 'electric', label: 'Electric (kWh)' },
        { name: 'diesel', label: 'Diesel (gallons)' },
        { name: 'gasoline', label: 'Gasoline (gallons)' },
        { name: 'propane', label: 'Propane (gallons)' },
        { name: 'naturalGas', label: 'Natural Gas (Therms)' },
        { name: 'fuelOil', label: 'Fuel Oil (gallons)' },
        { name: 'biodiesel', label: 'Biodiesel (gallons)' }
    ]

    const dairyOperationsFields = [
        { name: 'electric', label: 'Electric (% Used for Dairy)' },
        { name: 'diesel', label: 'Diesel (% Used for Dairy)' },
        { name: 'gasoline', label: 'Gasoline (% Used for Dairy)' },
        { name: 'propane', label: 'Propane (% Used for Dairy)' },
        { name: 'naturalGas', label: 'Natural Gas (% Used for Dairy)' },
        { name: 'fuelOil', label: 'Fuel Oil (% Used for Dairy)' },
        { name: 'biodiesel', label: 'Biodiesel (% Used for Dairy)' }
    ]

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="energy-footprint-input-dialog-title"
        maxWidth="sm"
        fullWidth
        >
        <DialogTitle
            id="energy-footprint-input-dialog-title"
            sx={{ bgcolor: '#c8102e', color: 'white' }}
        >
            Enter Your Energy Footprint Inputs
        </DialogTitle>
        <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
            Please enter your inputs for the Energy Footprint Model.
            </DialogContentText>
            <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
            <Typography variant="h6" sx={{ mt: 2 }}>
                Annual Energy Use Inputs
            </Typography>
            {annualEnergyFields.map((field) => (
                <TextField
                key={`annual-${field.name}`}
                margin="dense"
                name={field.name}
                label={field.label}
                type="number"
                fullWidth
                required
                value={
                    inputs.annualEnergyUse[
                    field.name as keyof EnergyFootprintInputs['annualEnergyUse']
                    ]
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'annualEnergyUse')}
                />
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>
                Dairy Operations Energy Use Inputs
            </Typography>
            {dairyOperationsFields.map((field) => (
                <TextField
                key={`dairy-${field.name}`}
                margin="dense"
                name={field.name}
                label={field.label}
                type="number"
                fullWidth
                required
                value={
                    inputs.dairyOperationsEnergyUse[
                    field.name as keyof EnergyFootprintInputs['dairyOperationsEnergyUse']
                    ]
                }

                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'dairyOperationsEnergyUse')}
                inputProps={{ min: 0, max: 100 }}
                />
            ))}
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#c8102e' }}>
                Cancel
                </Button>
                <Button type="submit" sx={{ color: '#c8102e' }}>
                Submit
                </Button>
            </DialogActions>
            </form>
        </DialogContent>
        </Dialog>
    )
}

export default InputDialog