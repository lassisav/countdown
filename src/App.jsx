import { useState } from 'react';
import './App.css'; 
import FrontPage from './FrontPage';
import Letters from './Letters';
import Numbers from './Numbers';

function App() {
  const [view, setView] = useState('front'); // Start with the front view

  return (
    <>
      {view === 'front' && <FrontPage setView={setView} />}
      {view === 'letters' && <Letters setView={setView} />}
      {view === 'numbers' && <Numbers setView={setView} />}
    </>
  );
}

export default App;
