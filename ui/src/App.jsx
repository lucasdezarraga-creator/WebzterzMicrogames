import { useState } from 'react';
/* global Module */ 

function App() {
  // --- 1. STATES MUST LIVE HERE (Top level of component) ---
  const [currentScreen, setCurrentScreen] = useState('TITLE');
  const [HP, setHP] = useState(4);
  const [round, setRound] = useState(1);
  const [musicVol, setMusicVol] = useState(50);
  const [SFXVol, setSFXVol] = useState(50);
  const [isEndless, setIsEndless] = useState(false);

  // --- 2. THE RENDER LOGIC ---
  return (
    <div className="gameWrapper">
      {/* Change 'screen' to 'currentScreen' everywhere below */}
      
      {currentScreen === 'TITLE' && (
        <div className="titleScreen">
          <h1>Webzterz Microgames</h1>
          <button onClick={() => { setIsEndless(false); setCurrentScreen('SELECTION'); }}>Microgames</button>
          <button onClick={() => { setIsEndless(true); setCurrentScreen('INTERMISSION'); }}>Endless</button>
          <button className="settings-btn" onClick={() => setCurrentScreen('SETTINGS')}>⚙️</button>
        </div>
      )}

      {currentScreen === 'SETTINGS' && (
        <div className="settingsScreen">
          <h2>Settings</h2>
          <label>Music: {musicVol}</label>
          <input type="range" value={musicVol} onChange={(e) => setMusicVol(e.target.value)} />
          <label>SFX: {SFXVol}</label>
          <input type="range" value={SFXVol} onChange={(e) => setSFXVol(e.target.value)} />
          <button onClick={() => setCurrentScreen('TITLE')}>Back</button>
        </div>
      )}

      {currentScreen === 'SELECTION' && (
        <div className="selectrionScreen">
          <h2>Select Microgame</h2>
          <div className="game-grid">
            <button onClick={() => setCurrentScreen('INTERMISSION')}>Game 1</button>
          </div>
          <button onClick={() => setCurrentScreen('TITLE')}>Back</button>
        </div>
      )}

      {currentScreen === 'INTERMISSION' && (
        <div className="intermissionScreen">
          <h3>Round {round}</h3>
          <div className="wifi-meter">📶 {HP} bars</div>
          <button onClick={() => setCurrentScreen('GAMEON')}>GO!</button>
        </div>
      )}

      {currentScreen === 'GAMEON' && (
        <div className="playGame">
          <div className="game-canvas">
            <p>Playing Game...</p>
          </div>
          <button onClick={() => setCurrentScreen('SUCCESS')}>Win</button>
          <button onClick={() => setCurrentScreen('FAILURE')}>Fail</button>
          <button onClick={() => setCurrentScreen('TITLE')}>Back</button>
        </div>
      )}

      {(currentScreen === 'SUCCESS' || currentScreen === 'FAILURE') && (
        <div className={`result-screen ${currentScreen.toLowerCase()}`}>
          <h2>{currentScreen === 'SUCCESS' ? 'Great!' : 'Oops!'}</h2>
          <button onClick={() => {
            if (currentScreen === 'FAILURE' && HP <= 1) {
              setCurrentScreen('GAMEOVER');
            } else {
              if (currentScreen === 'FAILURE') setHP(HP - 1);
              setRound(round + 1);
              setCurrentScreen('INTERMISSION');
            }
          }}>Next</button>
        </div>
      )}

      {currentScreen === 'GAMEOVER' && (
        <div className="gameOverScreen">
          <h1>GGS!</h1>
          <button onClick={() => { 
            setHP(4); 
            setRound(1); 
            setCurrentScreen('INTERMISSION'); 
          }}>Play Again</button>
          <button onClick={() => { setCurrentScreen('TITLE') }}>Quit</button>
        </div>
      )}
    </div>
  );
}

export default App;