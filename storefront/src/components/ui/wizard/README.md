# Wizard Component

A generic, reusable wizard/stepper component for multi-step forms and workflows.

## Features

- **Compound Component Pattern**: Use `<Wizard>`, `<Wizard.Step>`, `<Wizard.Progress>`, and `<Wizard.Actions>` for clean, composable API
- **Context-based State Management**: Share wizard state across all child components
- **Flexible Navigation**: Support for step IDs, indices, next/previous navigation
- **URL Sync Support**: Easily integrate with URL query parameters
- **Render Props**: Access wizard state through render prop patterns for maximum flexibility

## Basic Usage

```tsx
import { Wizard } from '@/components/ui/wizard'

function MyWizard() {
  return (
    <Wizard initialStep="step1" onStepChange={(stepId) => console.log(stepId)}>
      <Wizard.Step id="step1">
        <h1>Step 1</h1>
        <Wizard.Actions>
          {({ nextStep }) => (
            <button onClick={nextStep}>Continue</button>
          )}
        </Wizard.Actions>
      </Wizard.Step>

      <Wizard.Step id="step2">
        <h1>Step 2</h1>
        <Wizard.Actions>
          {({ previousStep, nextStep }) => (
            <>
              <button onClick={previousStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </>
          )}
        </Wizard.Actions>
      </Wizard.Step>

      <Wizard.Step id="step3">
        <h1>Step 3 - Complete!</h1>
      </Wizard.Step>
    </Wizard>
  )
}
```

## With Progress Indicator

```tsx
<Wizard initialStep="step1">
  <Wizard.Progress>
    {({ currentStepIndex, totalSteps, steps }) => (
      <div>Step {currentStepIndex + 1} of {totalSteps}</div>
    )}
  </Wizard.Progress>

  <Wizard.Step id="step1">
    {/* Step content */}
  </Wizard.Step>
  
  {/* More steps... */}
</Wizard>
```

## URL Synchronization

```tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Wizard } from '@/components/ui/wizard'

function CheckoutWizard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStep = searchParams.get('step') || 'cart'

  const handleStepChange = (stepId: string) => {
    router.push(`/checkout?step=${stepId}`)
  }

  return (
    <Wizard initialStep={currentStep} onStepChange={handleStepChange}>
      {/* Wizard steps */}
    </Wizard>
  )
}
```

## API Reference

### `<Wizard>`

The root wizard component that provides context to all child components.

**Props:**
- `initialStep?: string` - The ID of the step to show initially
- `onStepChange?: (stepId: string) => void` - Callback fired when the current step changes
- `className?: string` - Additional CSS classes
- `children: React.ReactNode` - Wizard content

### `<Wizard.Step>`

Represents a single step in the wizard. Only the active step is rendered.

**Props:**
- `id: string` - Unique identifier for the step (required)
- `className?: string` - Additional CSS classes
- `children: React.ReactNode` - Step content

### `<Wizard.Progress>`

Render prop component for displaying progress indicators.

**Props:**
- `children: (props) => React.ReactNode` - Render function that receives:
  - `currentStepIndex: number` - Zero-based index of current step
  - `totalSteps: number` - Total number of steps
  - `steps: string[]` - Array of all step IDs
  - `goToStep: (stepId: string) => void` - Function to navigate to a specific step

### `<Wizard.Actions>`

Render prop component for accessing navigation functions.

**Props:**
- `children: (props) => React.ReactNode` - Render function that receives:
  - `nextStep: () => void` - Navigate to next step
  - `previousStep: () => void` - Navigate to previous step
  - `goToStep: (stepId: string) => void` - Navigate to specific step by ID
  - `isFirstStep: boolean` - Whether currently on first step
  - `isLastStep: boolean` - Whether currently on last step

### `useWizard()` Hook

Access wizard context directly from any component within a Wizard.

```tsx
import { useWizard } from '@/components/ui/wizard'

function MyComponent() {
  const {
    currentStepIndex,
    currentStepId,
    totalSteps,
    steps,
    nextStep,
    previousStep,
    goToStep,
    goToStepIndex,
    isFirstStep,
    isLastStep
  } = useWizard()

  return (
    <button onClick={nextStep} disabled={isLastStep}>
      Continue
    </button>
  )
}
```

## Advanced Examples

### Custom Progress Bar

```tsx
<Wizard.Progress>
  {({ currentStepIndex, totalSteps, steps, goToStep }) => (
    <div className="flex gap-2">
      {steps.map((stepId, index) => (
        <button
          key={stepId}
          onClick={() => goToStep(stepId)}
          className={index <= currentStepIndex ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )}
</Wizard.Progress>
```

### Conditional Steps

```tsx
<Wizard initialStep="step1">
  <Wizard.Step id="step1">
    <StepOne />
  </Wizard.Step>

  {showOptionalStep && (
    <Wizard.Step id="optional">
      <OptionalStep />
    </Wizard.Step>
  )}

  <Wizard.Step id="final">
    <FinalStep />
  </Wizard.Step>
</Wizard>
```

### Nested Wizard Actions

```tsx
<Wizard.Step id="checkout">
  <div className="container">
    <CheckoutForm />
    <Wizard.Actions>
      {({ nextStep, goToStep }) => (
        <div className="flex gap-4">
          <Button onClick={nextStep}>Complete Order</Button>
          <Button onClick={() => goToStep('cart')}>Back to Cart</Button>
        </div>
      )}
    </Wizard.Actions>
  </div>
</Wizard.Step>
```

## Notes

- Steps are automatically registered when they mount
- Only one step is rendered at a time
- Step order is determined by the order steps are registered (typically their order in JSX)
- The wizard maintains its own internal state, but can be controlled via `initialStep` and `onStepChange`
- Works seamlessly with Next.js App Router and URL synchronization
