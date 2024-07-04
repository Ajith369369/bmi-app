// This component displays the BMI result and its category.
import PropTypes from 'prop-types';

const BMIResult = ({ bmi }) => {
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 24.9) category = 'Normal weight';
  else if (bmi < 29.9) category = 'Overweight';
  else category = 'Obesity';

  return (
    <div className="bmi-result">
      <h2>Your BMI: {bmi.toFixed(2)}</h2>
      <p>Category: {category}</p>
    </div>
  );
};

// PropTypes validation
BMIResult.propTypes = {
  bmi: PropTypes.number.isRequired
};

export default BMIResult;
