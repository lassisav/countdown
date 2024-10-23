import React, { useState, useEffect } from 'react';

// Create an array to represent the tiles for vowels
const initialVowelsBag = [
  ...Array(15).fill('A'),  // 15 "A" tiles
  ...Array(21).fill('E'),  // 21 "E" tiles
  ...Array(13).fill('I'),  // 13 "I" tiles
  ...Array(13).fill('O'),  // 13 "O" tiles
  ...Array(5).fill('U')     // 5 "U" tiles
];

// Create an array to represent the tiles for consonants
const initialConsonantsBag = [
  ...Array(2).fill('B'),   // 2 "B" tiles
  ...Array(3).fill('C'),   // 3 "C" tiles
  ...Array(6).fill('D'),   // 6 "D" tiles
  ...Array(2).fill('F'),   // 2 "F" tiles
  ...Array(3).fill('G'),   // 3 "G" tiles
  ...Array(2).fill('H'),   // 2 "H" tiles
  ...Array(1).fill('J'),   // 1 "J" tile
  ...Array(1).fill('K'),   // 1 "K" tile
  ...Array(5).fill('L'),   // 5 "L" tiles
  ...Array(4).fill('M'),   // 4 "M" tiles
  ...Array(8).fill('N'),   // 8 "N" tiles
  ...Array(4).fill('P'),   // 4 "P" tiles
  ...Array(1).fill('Q'),   // 1 "Q" tile
  ...Array(9).fill('R'),   // 9 "R" tiles
  ...Array(9).fill('S'),   // 9 "S" tiles
  ...Array(9).fill('T'),   // 9 "T" tiles
  ...Array(1).fill('V'),   // 1 "V" tile
  ...Array(1).fill('W'),   // 1 "W" tile
  ...Array(1).fill('X'),   // 1 "X" tile
  ...Array(1).fill('Y'),   // 1 "Y" tile
  ...Array(1).fill('Z')    // 1 "Z" tile
];

const Letters = ({ setView }) => {
  const [text, setText] = useState("");
  const [drawCount, setDrawCount] = useState(0); // Track the number of letters drawn
  const [vowelsBag, setVowelsBag] = useState(initialVowelsBag);
  const [consonantsBag, setConsonantsBag] = useState(initialConsonantsBag);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(30); // Default time of 30 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Control timer state

  // Function to get a random vowel from the vowelsBag
  const getRandomVowel = () => {
    if (vowelsBag.length === 0) {
      return null;  // No vowels left in the bag
    }

    const randomIndex = Math.floor(Math.random() * vowelsBag.length);
    const drawnVowel = vowelsBag[randomIndex];

    // Remove the drawn vowel from the bag
    const newVowelsBag = vowelsBag.filter((_, index) => index !== randomIndex);
    setVowelsBag(newVowelsBag);

    return drawnVowel;
  };

  // Function to get a random consonant from the consonantsBag
  const getRandomConsonant = () => {
    if (consonantsBag.length === 0) {
      return null;  // No consonants left in the bag
    }

    const randomIndex = Math.floor(Math.random() * consonantsBag.length);
    const drawnConsonant = consonantsBag[randomIndex];

    // Remove the drawn consonant from the bag
    const newConsonantsBag = consonantsBag.filter((_, index) => index !== randomIndex);
    setConsonantsBag(newConsonantsBag);

    return drawnConsonant;
  };

  // Handler for when the Consonant button is clicked
  const handleConsonantClick = () => {
    if (drawCount >= 9) {
      alert("You can only draw a total of 9 letters!");
      return;
    }
    
    const consonant = getRandomConsonant();
    if (consonant) {
      setText(text + consonant);
      setDrawCount(drawCount + 1); // Increment the draw count
    } else {
      alert("No consonants left in the bag!");
    }
  };

  // Handler for when the Vowel button is clicked
  const handleVowelClick = () => {
    if (drawCount >= 9) {
      alert("You can only draw a total of 9 letters!");
      return;
    }

    const vowel = getRandomVowel();
    if (vowel) {
      setText(text + vowel);
      setDrawCount(drawCount + 1); // Increment the draw count
    } else {
      alert("No vowels left in the bag!");
    }
  };

  // Start the timer automatically when 9 letters are drawn
  useEffect(() => {
    if (drawCount === 9) {
      setIsTimerRunning(true);
    }
  }, [drawCount]);

  // Handler for the Reset button
  const handleReset = () => {
    setText("");                  // Clear the generated text
    setDrawCount(0);             // Reset the draw count
    setVowelsBag(initialVowelsBag);      // Reset the vowels bag to its initial state
    setConsonantsBag(initialConsonantsBag); // Reset the consonants bag to its initial state
    setTimeLeft(30);             // Reset timer
    setIsTimerRunning(false);    // Stop the timer
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

  // Handler for the start button
  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={() => setView('front')} style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' }}>Front Page</button>
      <button onClick={() => setView('numbers')} style={{ position: 'absolute', top: 10, left: 10 }}>Numbers</button>
      <h1>Letters game</h1>
      <div>
        <button onClick={handleConsonantClick}>Consonant</button>
        <button onClick={handleVowelClick} style={{ marginLeft: '10px' }}>Vowel</button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
      <p className="text-display">{text}</p>

      {/* Timer display */}
      <div style={{ marginTop: '20px' }}>
        <h2>Time Left: {timeLeft} seconds</h2>
        {!isTimerRunning && drawCount < 9 && (
          <button onClick={handleStartTimer}>Start</button>
        )}
      </div>
    </div>
  );
};

export default Letters;
