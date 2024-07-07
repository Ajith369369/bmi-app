// Manages form input state (`formState`).
// Calls the parent-provided `onCalculate` function to calculate BMI.
// Calls the parent-provided `onReset` function to reset BMI.
// This component handles user input for weight and height.
import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../BMIForm.css";

// Initializes a state object formState with weight and height properties set to empty strings. Uses a single state object for both weight and height in the BMIForm component.
// Receiving Props
const BMIForm = ({ onCalculate, onReset }) => {
  // State Initialization
  const [formState, setFormState] = useState({
    weight: "",
    height: "",
    isweight: true,
    isheight: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (e) => {
    const data = e.target.value;
    const name = e.target.name;

    /* !!data.match(/^[0-9]*$/) ? (
      setWeight(data),
      setIsweight(true)
    ) : name === 'height' ? (
      setHeight(data),
      setIsheight(true)
    ) : null; */

    if (data.match(/^[0-9]*$/)) {
      if (name == "weight") {
        handleChange(e);
        setFormState((prevState) => ({
          ...prevState,
          isweight: true,
        }));
      } else {
        handleChange(e);
        setFormState((prevState) => ({
          ...prevState,
          isheight: true,
        }));
      }
    } else {
      if (name == "weight") {
        handleChange(e);
        setFormState((prevState) => ({
          ...prevState,
          isweight: false,
        }));
      } else {
        handleChange(e);
        setFormState((prevState) => ({
          ...prevState,
          isheight: false,
        }));
      }
    }
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
    setFormState({ weight: "", height: "", isweight: true, isheight: true });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="bmi-form">
      <div className="form-group">
        <TextField
          name="weight"
          value={formState.weight}
          onChange={validate}
          className="w-100"
          id="outlined-basic"
          label="Weight (kg):"
          variant="outlined"
          sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
              color: "#000000",
              fontFamily: "Arial",
              fontWeight: "bold",
              height: "60px",
              alignItems: "center",
              paddingLeft: "5px",
              // Class for the border around the input field
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000",
                borderWidth: "1px",
              },
            },
            // Class for the label of the input field
            "& .MuiInputLabel-outlined": {
              color: "black",
              fontSize: "16px",
            },
          }}
        />
        {!formState.isweight && (
          <p className="fw-bold fs-5 me-auto">*Invalid Input</p>
        )}

        {/* <label>Weight (kg):</label>
        Setting min="0" in the input tag helps prevent users from entering values less than zero.
        <input
          type="number"
          name="weight"
          min="1"
          value={formState.weight}
          onChange={handleChange}
          required
        /> */}
      </div>
      <div className="form-group">
        <TextField
          name="height"
          value={formState.height}
          onChange={validate}
          className="w-100"
          id="outlined-basic"
          label="Height (cm):"
          variant="outlined"
          sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
              color: "#000000",
              fontFamily: "Arial",
              fontWeight: "bold",
              height: "60px",
              alignItems: "center",
              paddingLeft: "5px",
              // Class for the border around the input field
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000",
                borderWidth: "1px",
              },
            },
            // Class for the label of the input field
            "& .MuiInputLabel-outlined": {
              color: "black",
              fontSize: "16px",
            },
          }}
        />
        {!formState.isheight && (
          <p className="fw-bold fs-5 me-auto">*Invalid Input</p>
        )}

        {/* <label>Height (cm):</label>
        Setting min="0" in the input tag helps prevent users from entering values less than zero.
        <input
          type="number"
          name="height"
          min="1"
          value={formState.height}
          onChange={handleChange}
          required
        /> */}
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <button type="button" className="btn btn-warning" onClick={handleReset}>
          Reset
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formState.isweight && formState.isheight ? false : true}
        >
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
