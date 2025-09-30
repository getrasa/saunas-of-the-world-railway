'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface WizardContextValue {
  currentStepIndex: number
  totalSteps: number
  steps: string[]
  goToStep: (stepId: string) => void
  goToStepIndex: (index: number) => void
  nextStep: () => void
  previousStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStepId: string
  registerStep: (stepId: string) => void
}

const WizardContext = createContext<WizardContextValue | undefined>(undefined)

export function useWizard() {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within a Wizard component')
  }
  return context
}

interface WizardProviderProps {
  children: React.ReactNode
  initialStep?: string
  onStepChange?: (stepId: string) => void
}

export function WizardProvider({
  children,
  initialStep,
  onStepChange
}: WizardProviderProps) {
  const [steps, setSteps] = useState<string[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // Register a step
  const registerStep = useCallback((stepId: string) => {
    setSteps(prev => {
      if (prev.includes(stepId)) return prev
      return [...prev, stepId]
    })
  }, [])

  // Update current step index when initialStep changes
  React.useEffect(() => {
    if (initialStep && steps.length > 0) {
      const index = steps.indexOf(initialStep)
      if (index !== -1 && index !== currentStepIndex) {
        setCurrentStepIndex(index)
      }
    }
  }, [initialStep, steps, currentStepIndex])

  const goToStep = useCallback((stepId: string) => {
    const index = steps.indexOf(stepId)
    if (index !== -1) {
      setCurrentStepIndex(index)
      onStepChange?.(stepId)
    }
  }, [steps, onStepChange])

  const goToStepIndex = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index)
      onStepChange?.(steps[index])
    }
  }, [steps, onStepChange])

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1
      setCurrentStepIndex(newIndex)
      onStepChange?.(steps[newIndex])
    }
  }, [currentStepIndex, steps, onStepChange])

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1
      setCurrentStepIndex(newIndex)
      onStepChange?.(steps[newIndex])
    }
  }, [currentStepIndex, steps, onStepChange])

  const value: WizardContextValue = {
    currentStepIndex,
    totalSteps: steps.length,
    steps,
    goToStep,
    goToStepIndex,
    nextStep,
    previousStep,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    currentStepId: steps[currentStepIndex] || '',
    registerStep
  }

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  )
}
