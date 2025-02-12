import { useState } from "react";

interface TutorialProps {
  onClose: () => void;
}

const Tutorial = ({ onClose }: TutorialProps) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">
              Чекор 1: Додај акаунт
            </h2>
            <p className="text-gray-500">
              Креирај нов акаунт за следење на вашите финансии.
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">
              Чекор 2: Постави буџет
            </h2>
            <p className="text-gray-500">
              Одреди месечен буџет за различни категории.
            </p>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">
              Чекор 3: Додај трансакции
            </h2>
            <p className="text-gray-500">
              Следи ги вашите приходи и трошоци за подобро управување.
            </p>
          </>
        )}

        <button
          onClick={nextStep}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {step < 3 ? "Следно" : "Затвори"}
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
