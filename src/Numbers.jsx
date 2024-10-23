import React, { useState, useEffect } from 'react';

const initialLargeNumbersBag = [25, 50, 75, 100]; // Large numbers
const initialSmallNumbersBag = Array.from({ length: 10 }, (_, i) => i + 1).flatMap(num => [num, num]); // 2 of each from 1 to 10

const Numbers = ({ setView }) => {
  const [largeNumbersBag, setLargeNumbersBag] = useState(initialLargeNumbersBag);
  const [smallNumbersBag, setSmallNumbersBag] = useState(initialSmallNumbersBag);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [targetNumber, setTargetNumber] = useState(null); // State for target number

  // Timer state
  const [timeLeft, setTimeLeft] = useState(30); // Default time of 30 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Control timer state

  // Function to generate a random target number between 101 and 999
  const generateRandomTargetNumber = () => {
    return Math.floor(Math.random() * 899) + 101;
  };

  // Function to draw numbers based on the button pressed
  const handleNumberClick = (number) => {
    // Start the timer if it's not already running
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    // Generate the target number if it's not already set
    if (!targetNumber) {
      setTargetNumber(generateRandomTargetNumber());
    }

    // Check if already drawn
    if (drawnNumbers.length + number > 6) {
      return; // Prevent drawing more than 6 numbers total
    }

    // Draw large numbers
    const drawnLargeNumbers = [];
    const tempLargeNumbersBag = [...largeNumbersBag]; // Create a copy of the bag

    for (let i = 0; i < number; i++) {
      if (tempLargeNumbersBag.length === 0) break; // No more large numbers left
      const randomIndex = Math.floor(Math.random() * tempLargeNumbersBag.length);
      drawnLargeNumbers.push(tempLargeNumbersBag[randomIndex]);
      // Remove the drawn large number from the temporary bag
      tempLargeNumbersBag.splice(randomIndex, 1);
    }

    // Draw small numbers
    const drawnSmallNumbers = [];
    const tempSmallNumbersBag = [...smallNumbersBag]; // Create a copy of the small numbers bag

    while (drawnSmallNumbers.length < (6 - drawnLargeNumbers.length) && tempSmallNumbersBag.length > 0) {
      const randomIndex = Math.floor(Math.random() * tempSmallNumbersBag.length);
      drawnSmallNumbers.push(tempSmallNumbersBag[randomIndex]);
      // Remove the drawn small number from the temporary bag
      tempSmallNumbersBag.splice(randomIndex, 1);
    }

    // Combine drawn numbers and update the state
    const allDrawnNumbers = [...drawnLargeNumbers, ...drawnSmallNumbers];
    setDrawnNumbers(prev => [...prev, ...allDrawnNumbers]);

    // Update largeNumbersBag with the remaining large numbers
    setLargeNumbersBag(prev => prev.filter(num => !drawnLargeNumbers.includes(num)));

    // Update smallNumbersBag to reflect the drawn numbers
    setSmallNumbersBag(prev => prev.filter(num => !drawnSmallNumbers.includes(num)));
  };

  // Handler for the Reset button
  const handleReset = () => {
    setLargeNumbersBag(initialLargeNumbersBag); // Reset the large numbers bag
    setSmallNumbersBag(initialSmallNumbersBag); // Reset the small numbers bag
    setDrawnNumbers([]); // Reset drawn numbers
    setTimeLeft(30); // Reset the timer
    setIsTimerRunning(false); // Stop the timer
    setTargetNumber(null); // Reset the target number
  };

  // useEffect to handle the countdown logic
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [isTimerRunning, timeLeft]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={() => setView('front')} style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' }}>Front Page</button>
      <button onClick={() => setView('letters')} style={{ position: 'absolute', top: 10, left: 10 }}>Letters</button>
      <h1>Random Number Generator</h1>

      {/* Display the target number */}
      {targetNumber !== null && (
        <h2>Target Number: {targetNumber}</h2>
      )}

      <div>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button onClick={() => handleNumberClick(4)}>4</button>
      </div>
      <h2>{drawnNumbers.join(', ')}</h2>

      {/* Timer display */}
      <div style={{ marginTop: '20px' }}>
        <h2>Time Left: {timeLeft} seconds</h2>
      </div>

      <button onClick={handleReset} style={{ marginTop: '20px' }}>Reset</button>
    </div>
  );
};

export default Numbers;
