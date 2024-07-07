// Manages form input state (`formState`).
// Calls the parent-provided `onCalculate` function to calculate BMI.
// Calls the parent-provided `onReset` function to reset BMI.
// This component handles user input for weight and height.
import { useState } from "react";
import PropTypes from "prop-types";
import "../BMIForm.css";

// Initializes a state object formState with weight and height properties set to empty strings. Uses a single state object for both weight and height in the BMIForm component.
// Receiving Props
const BMIForm = ({ onCalculate, onReset }) => {

  // State Initialization
  const [formState, setFormState] = useState({
    weight: "",
    height: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevents form from reloading the page
    e.preventDefault();
    console.log(formState);

    // Check if weight or height is zero
    // if (formState.weight === "" || formState.height === "") {
    /* if (!formState.weight || !formState.height) {
      alert("Please fill the form with valid values.");
    } else {) */

    // Calls the parent function to calculate BMI
    onCalculate(formState.weight, formState.height);
    

  };

  const handleReset = () => {
    setFormState({ weight: "", height: "" });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="bmi-form">
      <div className="form-group">
        <label>Weight (kg):</label>
        
        {/* Setting min="0" in the input tag helps prevent users from entering values less than zero. */}
        <input
          type="number"
          name="weight"
          min="1"
          value={formState.weight}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Height (cm):</label>
        <input
          type="number"
          name="height"
          min="1"
          value={formState.height}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleReset}
        >
          Reset
        </button>
        <button type="submit" className="btn btn-primary">
          Calculate BMI
        </button>
      </div>
    </form>
  );
};

// PropTypes validation
BMIForm.propTypes = {
  onCalculate: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default BMIForm;
