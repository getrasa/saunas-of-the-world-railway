'use client'

import React from 'react'
import { WizardProvider, useWizard } from './wizard-context'
import { cn } from '@lib/lib/utils'

interface WizardProps {
  children: React.ReactNode
  initialStep?: string
  onStepChange?: (stepId: string) => void
  className?: string
}

interface WizardStepProps {
  id: string
  children: React.ReactNode
  className?: string
}

interface WizardProgressProps {
  children: (props: {
    currentStepIndex: number
    totalSteps: number
    steps: string[]
    currentStepId: string
    goToStep: (stepId: string) => void
  }) => React.ReactNode
}

interface WizardActionsProps {
  children: (props: {
    nextStep: () => void
    previousStep: () => void
    goToStep: (stepId: string) => void
    isFirstStep: boolean
    isLastStep: boolean
  }) => React.ReactNode
}

function WizardRoot({ children, initialStep, onStepChange, className }: WizardProps) {
  return (
    <WizardProvider initialStep={initialStep} onStepChange={onStepChange}>
      <div className={cn('wizard', className)}>
        {children}
      </div>
    </WizardProvider>
  )
}

function WizardStep({ id, children, className }: WizardStepProps) {
  const { currentStepId, registerStep } = useWizard()

  React.useEffect(() => {
    registerStep(id)
  }, [id, registerStep])

  if (currentStepId !== id) {
    return null
  }

  return (
    <div className={cn('wizard-step', className)}>
      {children}
    </div>
  )
}

function WizardProgress({ children }: WizardProgressProps) {
  const { currentStepIndex, totalSteps, steps, currentStepId, goToStep } = useWizard()

  return (
    <>
      {children({ currentStepIndex, totalSteps, steps, currentStepId, goToStep })}
    </>
  )
}

function WizardActions({ children }: WizardActionsProps) {
  const { nextStep, previousStep, goToStep, isFirstStep, isLastStep } = useWizard()

  return (
    <>
      {children({ nextStep, previousStep, goToStep, isFirstStep, isLastStep })}
    </>
  )
}

export const Wizard = Object.assign(WizardRoot, {
  Step: WizardStep,
  Progress: WizardProgress,
  Actions: WizardActions
})
