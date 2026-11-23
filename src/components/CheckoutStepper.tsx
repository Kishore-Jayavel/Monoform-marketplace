import React from 'react';
import { CheckoutStep } from '../types';

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  onStepClick: (step: CheckoutStep) => void;
  completedSteps: CheckoutStep[];
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
  currentStep,
  onStepClick,
  completedSteps
}) => {
  const steps: { key: CheckoutStep; number: string; title: string }[] = [
    { key: 'cart', number: '01', title: 'Bag Review' },
    { key: 'delivery', number: '02', title: 'Delivery Info' },
    { key: 'options', number: '03', title: 'Dispatch Speed' },
    { key: 'payment', number: '04', title: 'Payment Method' },
    { key: 'review', number: '05', title: 'Final Review' }
  ];

  return (
    <nav className="checkout-stepper" aria-label="Checkout Progress">
      <ol className="stepper-list">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.key;
          const isCompleted = completedSteps.includes(step.key);

          return (
            <li key={step.key} className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onStepClick(step.key)}
                aria-current={isActive ? 'step' : undefined}
                data-testid={`stepper-step-${step.key}`}
              >
                <span className="stepper-circle">
                  {isCompleted ? '&check;' : step.number}
                </span>
                <span className="stepper-title">{step.title}</span>
              </button>
              {idx < steps.length - 1 && <span className="stepper-connector" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
