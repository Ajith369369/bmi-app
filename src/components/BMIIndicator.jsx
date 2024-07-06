// This component visually represents the BMI (Body Mass Index) on a horizontal scale. It shows the BMI value as a small marker that moves along the scale according to the calculated BMI value. The scale is divided into categories: Underweight, Healthy, Overweight, and Obese.
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../BMIIndicator.css";

const BMIIndicator = ({ bmi }) => {
  // Holds the width of the indicator container. It helps calculate the position of the BMI indicator.
  // const [indicatorcontainer_width, setWidth_indicatorcontainer] = useState(0);

  // State Initialization
  const [formBMIIndicatorState, setformBMIIndicatorState] = useState({
    indicatorcontainer_width: 0,
    underweight_width: 0,
    healthy_width: 0,
    overweight_width: 0,
    obese_width: 0,
  });

  useEffect(() => {
    // Function to Update Widths
    const updateWidths = () => {
      const indicatorContainer = document.querySelector(".indicator-container");
      const underweightElement = document.querySelector(".underweight");
      const healthyElement = document.querySelector(".healthy");
      const overweightElement = document.querySelector(".overweight");
      const obeseElement = document.querySelector(".obese");

      setformBMIIndicatorState({
        indicatorcontainer_width: indicatorContainer
          ? indicatorContainer.offsetWidth
          : 0,
        underweight_width: underweightElement
          ? underweightElement.offsetWidth
          : 0,
        healthy_width: healthyElement ? healthyElement.offsetWidth : 0,
        overweight_width: overweightElement ? overweightElement.offsetWidth : 0,
        obese_width: obeseElement ? obeseElement.offsetWidth : 0,
      });
    };

    // Initial Width Update
    updateWidths();

    // Add Resize Event Listener
    window.addEventListener("resize", updateWidths);

    // Cleanup Event Listener on Unmount
    return () => {
      window.removeEventListener("resize", updateWidths);
    };
  }, []);

  /*  function useElementWidths(selectors) {
    const [widths, setWidths] = useState({});
  
    const updateWidths = useCallback(() => {
      const newWidths = {};
      selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          newWidths[selector] = element.offsetWidth;
        }
      });
      setWidths(newWidths);
    }, [selectors]);
  
    useEffect(() => {
      // Update widths on mount
      updateWidths();
  
      // Add resize event listener
      window.addEventListener('resize', updateWidths);
  
      // Cleanup event listener on unmount or when selectors change
      return () => {
        window.removeEventListener('resize', updateWidths);
      };
    }, [selectors, updateWidths]);
  
    return widths;
  }
 */

  // useEffect:
  // Runs after the component mounts and sets up an event listener for window resize to dynamically update the container width.
  // updateWidth: Gets the current width of the .indicator-container element and updates the width state.
  // Cleans up the event listener when the component unmounts to avoid memory leaks.
  /* useEffect(() => {
    const updateWidth_indicatorcontainer = () => {
      const containerWidth_indicatorcontainer = document.querySelector('.indicator-container').offsetWidth;
      setWidth_indicatorcontainer(containerWidth_indicatorcontainer);
    };
    updateWidth_indicatorcontainer();
    window.addEventListener('resize', updateWidth_indicatorcontainer);
    return () => window.removeEventListener('resize', updateWidth_indicatorcontainer);
  }, []);
  */

  // Track widths of the elements
  /* const widths = useElementWidths([
    ".indicator-container",
    ".underweight",
    ".healthy",
    ".overweight",
    ".obese",
  ]); */

  // Access specific widths
  var indicatorcontainerWidth =
    formBMIIndicatorState.indicatorcontainer_width || 0;
  console.log(`indicatorcontainerWidth = ${indicatorcontainerWidth}`);
  var underweightWidth = formBMIIndicatorState.underweight_width || 0;
  console.log(`underweightWidth = ${underweightWidth}`);
  var healthyWidth = formBMIIndicatorState.healthy_width || 0;
  console.log(`healthyWidth = ${healthyWidth}`);
  var overweightWidth = formBMIIndicatorState.overweight_width || 0;
  console.log(`overweightWidth = ${overweightWidth}`);
  var obeseWidth = formBMIIndicatorState.obese_width || 0;
  console.log(`obeseWidth = ${obeseWidth}`);

  let category;
  var calculatedPosition = 0;
  // var clampedBMI = 0;

  switch (true) {
    case bmi < 18.5:
      category = "Underweight";
      calculatedPosition = (bmi * underweightWidth) / 18.4 || 0;

      // Ensure calculatedPosition does not exceed container width
      calculatedPosition = Math.max(0, calculatedPosition);
      break;
    case bmi < 25:
      category = "Normal weight";
      calculatedPosition =
        underweightWidth + ((bmi - 18.4) * healthyWidth) / (24.9 - 18.5) || 0;
      break;
    case bmi < 30:
      category = "Overweight";
      calculatedPosition =
        underweightWidth +
          healthyWidth +
          ((bmi - 24.9) * overweightWidth) / (29.9 - 25) || 0;
      break;
    default:
      category = "Obesity";
      // clampedBMI = Math.min(40, Math.max(30, bmi));
      calculatedPosition =
        underweightWidth +
          healthyWidth +
          overweightWidth +
          ((bmi - 29.9) * obeseWidth) / (40 - 30) || 0;

      // Ensure calculatedPosition does not exceed container width
      calculatedPosition = Math.min(
        calculatedPosition,
        indicatorcontainerWidth
      );
  }

  // calculateXPosition:
  // Clamping BMI: Ensures the BMI is between 15 and 40 for positioning purposes.
  // Position Calculation: Calculates the left position of the indicator based on the clamped BMI value and the width of the container. Converts the position into pixels.
  // Returns '0px' if BMI is null, ensuring the indicator is positioned at the start if there's no valid BMI.
  /* const calculateXPosition = () => {
    if (bmi !== null) {
      const clampedBMI = Math.min(40, Math.max(15, bmi));
      const x = ((clampedBMI - 15) / (40 - 15)) * width || 0;
      return `${x}px`;
    }
    return "0px";
  }; */

  return (
    <div className="bmi-indicator-container">
      {/* bmi.toFixed(1) will round the BMI value to one decimal place and return it as a string. */}
      <div
        className="bmi-indicator"
        style={{ left: `${calculatedPosition}px` }}
      >
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
