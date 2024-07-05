// Manages the BMI calculation state.
// Passes functions (`onCalculate` and `onReset`) and state (`bmi`) as props to child components (`BMIForm` and `BMIResult`).
import { useState } from "react";
import BMIForm from "./components/BMIForm";
import BMIResult from "./components/BMIResult";
import BMIIndicator from './components/BMIIndicator'; 
import "./App.css";

const App = () => {
  // State Initialization
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    setBmi(bmi);
  };

  const resetBMI = () => {
    setBmi(null);
  };

  return (
    <>
      <div className="container-fluid w-100">
        <div className="row">
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
          <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 d-flex justify-content-center align-items-center">
            <div className="App">
              <h1>BMI Calculator</h1>

              {/* Props Sent to "BMIForm" */}
              <BMIForm onCalculate={calculateBMI} onReset={resetBMI}/>

              {/* Conditionally renders the BMIResult component if bmi is calculated. */}
              {/* Props Sent to "BMIResult" */}
              {/* The calculated BMI value passed to `BMIResult` to display the result. */}
              {bmi && <BMIResult bmi={bmi} />}
              <BMIIndicator bmi={bmi} />
            </div>
          </div>
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
        </div>
      </div>
    </>
  );
};

export default App;
