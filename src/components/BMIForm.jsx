// This component handles user input for weight and height.
import { useState } from 'react';

// Initializes a state object formState with weight and height properties set to empty strings. Uses a single state object for both weight and height in the BMIForm component.
const BMIForm = ({ onCalculate }) => {
  const [formState, setFormState] = useState({
    weight:"",
    height:""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {

    // Prevents form from reloading the page
    e.preventDefault();

    // Calls the parent function to calculate BMI
    onCalculate(formState.weight, formState.height);
  };

  return (
    <form onSubmit={handleSubmit} className="bmi-form">
      <div className="form-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          name="weight"
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
          value={formState.height}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Calculate BMI</button>
    </form>
  );
};

export default BMIForm;
