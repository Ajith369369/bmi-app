// This component visually represents the BMI (Body Mass Index) on a horizontal scale. It shows the BMI value as a small marker that moves along the scale according to the calculated BMI value. The scale is divided into categories: Underweight, Healthy, Overweight, and Obese.
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../BMIIndicator.css';

const BMIIndicator = ({ bmi }) => {
  // Holds the width of the indicator container. It helps calculate the position of the BMI indicator.
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const containerWidth = document.querySelector('.indicator-container').offsetWidth;
      setWidth(containerWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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
BMIIndicator.propTypes = {
  bmi: PropTypes.number,
};

export default BMIIndicator;
