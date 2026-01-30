'use client';

type Step = 'org' | 'credentials' | 'signin';

interface Props {
  currentStep: Step;
}

export default function SetupStepIndicator({ currentStep }: Props) {
  const steps: Step[] = ['org', 'credentials', 'signin'];

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep === step
                ? 'bg-orange-500 text-white'
                : steps.indexOf(currentStep) > index
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
            }`}
          >
            {steps.indexOf(currentStep) > index ? '✓' : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-1 mx-1 ${
                steps.indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
