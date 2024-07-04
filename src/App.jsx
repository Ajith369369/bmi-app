import { useState } from "react";
import BMIForm from "./components/BMIForm";
import BMIResult from "./components/BMIResult";
import "./App.css";

const App = () => {
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
              <BMIForm onCalculate={calculateBMI} onReset={resetBMI}/>

              {/* Conditionally renders the BMIResult component if bmi is calculated. */}
              {bmi && <BMIResult bmi={bmi} />}
            </div>
          </div>
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
        </div>
      </div>
    </>
  );
};

export default App;
