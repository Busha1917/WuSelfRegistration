import React from 'react';

interface Step {
  label: string;
  optional?: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isComplete = idx < currentStep;
        return (
          <React.Fragment key={idx}>
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold flex-shrink-0 ${
                  isComplete
                    ? 'bg-success text-white'
                    : isActive
                    ? 'bg-wu-maroon text-white ring-4 ring-wu-maroon-100'
                    : 'bg-gray-200 text-neutral'
                }`}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              <span className={`text-sm font-medium truncate ${isActive ? 'text-wu-maroon' : isComplete ? 'text-success' : 'text-neutral'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${isComplete ? 'bg-success' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
