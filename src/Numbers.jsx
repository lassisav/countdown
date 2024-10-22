import React, { useState } from 'react';

const initialLargeNumbersBag = [25, 50, 75, 100]; // Large numbers
const initialSmallNumbersBag = Array.from({ length: 10 }, (_, i) => i + 1).flatMap(num => [num, num]); // 2 of each from 1 to 10

const Numbers = ({ setView }) => {
  const [largeNumbersBag, setLargeNumbersBag] = useState(initialLargeNumbersBag);
  const [smallNumbersBag, setSmallNumbersBag] = useState(initialSmallNumbersBag);
  const [drawnNumbers, setDrawnNumbers] = useState([]);

  // Function to draw numbers based on the button pressed
  const handleNumberClick = (number) => {
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
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={() => setView('front')} style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' }}>Front Page</button>
      <button onClick={() => setView('letters')} style={{ position: 'absolute', top: 10, left: 10 }}>Letters</button>
      <h1>Random Number Generator</h1>
      <div>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button onClick={() => handleNumberClick(4)}>4</button>
      </div>
      <p>{drawnNumbers.join(', ')}</p>
      <button onClick={handleReset} style={{ marginTop: '20px' }}>Reset</button>
    </div>
  );
};

export default Numbers;
