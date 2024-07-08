// Receives the calculated BMI as a prop (`bmi`) and displays it.
// This component displays the BMI result and its category.
import PropTypes from "prop-types";
import "../BMIResult.css";

// Receiving Props
const BMIResult = ({ bmi }) => {
  let category = "";
  let backgroundColor = "";
  let message = "";
  console.log('BMI value:', bmi);

  if (isNaN(bmi) || bmi <= 0 || bmi == null || bmi == undefined || !isFinite(bmi)) {
    category = "Invalid";
    backgroundColor = "grey";
    message = "Invalid BMI value. Please enter valid weight and height.";
  } else if (bmi < 18.5) {
    category = "Underweight";
    backgroundColor = "blue";
    message =
      "You are underweight. Consider gaining some weight for better health.";
  } else if (bmi < 25) {
    category = "Normal weight";
    backgroundColor = "green";
    message = "You have a normal weight. Keep up the good work!";
  } else if (bmi < 30) {
    category = "Overweight";
    backgroundColor = "orange";
    message =
      "You are overweight. Consider managing your weight for better health.";
  } else {
    category = "Obese";
    backgroundColor = "red";
    message =
      "You are obese. It's important to work on reducing your weight for health benefits.";
  }

  return (
    <div
      className="bmi-result d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor,
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h2>Your BMI: {bmi.toFixed(2)}</h2>
      <p>Category: {category}</p>
      <p>{message}</p>
    </div>
  );
};

// PropTypes validation
BMIResult.propTypes = {
  bmi: PropTypes.number.isRequired,
};

export default BMIResult;
