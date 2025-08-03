import { Terminal } from "react";

import { useState } from "react";
import Step1StartProject from "../../components/CreateTravel/CreateTravel"
import Step2AddParticipants from "../../components/StandardCreatePage/AddParticipants";
import Step3SelectDate from "../../components/CreateTravel/TravelSelectDate"
import Step4SelectPlace from "../../components/CreateTravel/TravelSelectPlace"
import Step5CreatePlanner from "../../components/CreateTravel/TravelCreatePlanner"

const TravelCreatePage = () =>{
    const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    startDate: null,
    endDate: null,
    // 다른 스텝에서 입력될 데이터들도 미리 여기에 포함
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    console.log(newData);
    
  };

  return (
    <div>
        
      {step === 1 && (
        <Step1StartProject
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <div>
        <Step2AddParticipants 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        
        </div>
      )}
      {step === 3 && (
        <Step3SelectDate 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <Step4SelectPlace 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
     {step === 5 && (
        <Step5CreatePlanner 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      
    </div>
  )
}

export default TravelCreatePage