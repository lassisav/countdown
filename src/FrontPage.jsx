import React from 'react';

const FrontPage = ({ setView }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Countdown app</h1>
      <button onClick={() => setView('letters')} style={{ margin: '10px' }}>Letters</button>
      <button onClick={() => setView('numbers')} style={{ margin: '10px' }}>Numbers</button>
    </div>
  );
};

export default FrontPage;
