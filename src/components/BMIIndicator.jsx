// This component visually represents the BMI (Body Mass Index) on a horizontal scale. It shows the BMI value as a small marker that moves along the scale according to the calculated BMI value. The scale is divided into categories: Underweight, Healthy, Overweight, and Obese.
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../BMIIndicator.css';

const BMIIndicator = ({ bmi }) => {
  // Holds the width of the indicator container. It helps calculate the position of the BMI indicator.
  const [width, setWidth] = useState(0);

  // useEffect:
  // Runs after the component mounts and sets up an event listener for window resize to dynamically update the container width.
  // updateWidth: Gets the current width of the .indicator-container element and updates the width state.
  // Cleans up the event listener when the component unmounts to avoid memory leaks.
  useEffect(() => {
    const updateWidth = () => {
      const containerWidth = document.querySelector('.indicator-container').offsetWidth;
      setWidth(containerWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // calculateXPosition:
  // Clamping BMI: Ensures the BMI is between 15 and 40 for positioning purposes.
  // Position Calculation: Calculates the left position of the indicator based on the clamped BMI value and the width of the container. Converts the position into pixels.
  // Returns '0px' if BMI is null, ensuring the indicator is positioned at the start if there's no valid BMI.
  const calculateXPosition = () => {
    if (bmi !== null) {
      const clampedBMI = Math.min(40, Math.max(15, bmi));
      const x = ((clampedBMI - 15) / (40 - 15)) * width || 0;
      return `${x}px`;
    }
    return '0px';
  };

  return (
    <div className="bmi-indicator-container">
      <div className="bmi-indicator" style={{ left: calculateXPosition() }}>
        {bmi && bmi.toFixed(1)}
      </div>
      <div className="bmi-categories">
        <div className="category underweight">Underweight</div>
        <div className="category healthy">Healthy</div>
        <div className="category overweight">Overweight</div>
        <div className="category obese">Obese</div>
      </div>
      <div className="indicator-container"></div>
    </div>
  );
};

// PropTypes validation
// Validates that the bmi prop passed to the BMIIndicator component is a number. If no prop is passed, it allows null.
BMIIndicator.propTypes = {
  bmi: PropTypes.number,
};

export default BMIIndicator;
