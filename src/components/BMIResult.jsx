// Receives the calculated BMI as a prop (`bmi`) and displays it.
// This component displays the BMI result and its category.
import PropTypes from "prop-types";
import "../BMIResult.css";

// Receiving Props
const BMIResult = ({ bmi }) => {
  let category = "";
  let backgroundColor = "";

  if (bmi < 18.5) {
    category = "Underweight";
    backgroundColor = "blue";
  } else if (bmi < 25) {
    category = "Normal weight";
    backgroundColor = "green";
  } else if (bmi < 30) {
    category = "Overweight";
    backgroundColor = "orange";
  } else {
    category = "Obese";
    backgroundColor = "red";
  }

  return (
    <div className="bmi-result d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor, color: 'white', padding: '10px', borderRadius: '5px' }}>
      <h2>Your BMI: {bmi.toFixed(2)}</h2>
      <p>Category: {category}</p>
    </div>
  );
};

// PropTypes validation
BMIResult.propTypes = {
  bmi: PropTypes.number.isRequired,
};

export default BMIResult;
