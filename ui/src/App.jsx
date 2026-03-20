import { useState } from 'react';
import './App.css';
import GameCanvas from './GameHandler';
import sprites from './utils/assets';
import { useGameEngine } from './hook/useGameEngine';

function App() {
  // --- 1. STATES MUST LIVE HERE (Top level of component) ---
  const [currentScreen, setCurrentScreen] = useState('TITLE');
  const [HP, setHP] = useState(4);
  const [round, setRound] = useState(1);
  const [musicVol, setMusicVol] = useState(50);
  const [SFXVol, setSFXVol] = useState(50);
  const [isEndless, setIsEndless] = useState(false);
  const [score, setScore] = useState(0);
  const isReady = useGameEngine();
  const [page, setPage] = useState(0);
  const microGamesPerPage = 6;
  const [selectedGame, setSelectedGame] = useState(0);

  const microGames = [
    {id: 1, title: 'Game1'},
    {id: 2, title: 'Game2'},
    {id: 3, title: 'Game3'},
    {id: 4, title: 'Game4'},
    {id: 5, title: 'Game5'},
    {id: 6, title: 'Game6'},
    {id: 7, title: 'Game7'},
  ]

  return (
    <div>
      {currentScreen === 'TITLE' && (
        <div className="titleScreen">
          <img className = "logo" src = {sprites.Logo} alt = "The logo"/>
          <button onClick={() => { setIsEndless(false); setCurrentScreen('SELECTION'); }}>Microgames</button>
          <button onClick={() => { setIsEndless(true); setCurrentScreen('INTERMISSION'); }}>Endless</button>
          <button onClick={() => setCurrentScreen('SETTINGS')}>Settings</button>
          <button onClick = {() => setCurrentScreen('CREDITS')}>Credits</button>
        </div>
      )}

      {currentScreen === 'SETTINGS' && (
        <div className="settingsScreen">
          <h2>Settings</h2>
          <label>Music: {musicVol}</label>
          <input type="range" value={musicVol} onChange={(e) => setMusicVol(e.target.value)} />
          <label>SFX: {SFXVol}</label>
          <input type="range" value={SFXVol} onChange={(e) => setSFXVol(e.target.value)} />
          <button className = "back" onClick={() => setCurrentScreen('TITLE')}/>
        </div>
      )}

      {currentScreen === 'SELECTION' && (
        <div className="selectionScreen">
          <h2>Select Microgame</h2>
          <div className="gameGrid">
            {microGames.slice(page * microGamesPerPage, (page + 1) * microGamesPerPage).map((game) => (
              <button key = {game.id} onClick = {() => {setSelectedGame(game.id); setCurrentScreen('INTERMISSION');}}>
                {game.title}
              </button>
            ))}
          </div>
          <div className = "pageControl">
            {page > 0 && (<button className = "prev" onClick={() => setPage (page - 1)}/>)}
            {(page +  1) * microGamesPerPage < microGames.length && (<button className = "next" onClick={() => setPage(page + 1)}/>)}
          </div>
          <button className = "back" onClick={() => {setCurrentScreen('TITLE'); setPage(0);}}/>
        </div>
      )}

      {currentScreen === 'INTERMISSION' && (
        <div className="intermissionScreen">
          <h3>Round {round}</h3>
          <div className = "hp">📶 {HP} bars</div>
          <div className = "score">Score: {score}</div>
          <button onClick={() => setCurrentScreen('GAMEON')}>GO!</button>
        </div>
      )}

      {currentScreen === 'GAMEON' && (
        <div className="playGame">
          <p>Playing Game...</p>
          <button onClick={() => setCurrentScreen('SUCCESS')}>Win</button>
          <button onClick={() => setCurrentScreen('FAILURE')}>Fail</button>
          <button className = "back" onClick={() => {
            setHP(4);
            setRound(1);
            setScore(0);
            {isEndless ? setCurrentScreen('TITLE') : setCurrentScreen('SELECTION')};
            }}/>
        </div>
      )}

      {(currentScreen === 'SUCCESS' || currentScreen === 'FAILURE') && (
        <div className={`result-screen ${currentScreen.toLowerCase()}`}>
          <h2>{currentScreen === 'SUCCESS' ? 'Great!' : 'Oops!'}</h2>
          <button onClick={() => {
            if (currentScreen === 'FAILURE' && HP <= 1) {
              setCurrentScreen('GAMEOVER');
            } else {
              if (currentScreen === 'FAILURE') {
              setHP(HP - 1);
              setRound(round + 1);
              setCurrentScreen('INTERMISSION');
              } else { 
                if(currentScreen === 'SUCCESS'){
                  setScore(score + 10);
                  setRound(round + 1);
                  setCurrentScreen('INTERMISSION');
                }
              }
            }
          }}>Next</button>
        </div>
      )}

      {currentScreen === 'GAMEOVER' && (
        <div className= "gameOverScreen">
          <h1>GGS!</h1>
          <button onClick={() => { 
            setHP(4); 
            setRound(1); 
            setScore(0);
            setCurrentScreen('INTERMISSION'); 
          }}>Play Again</button>
          <button onClick={() => { setCurrentScreen('TITLE') }}>Quit</button>
        </div>
      )}

      {currentScreen === 'CREDITS' && (
        <div className = "creditsScreen">
          <h1>Credits</h1>
          <p>All sprites and audio are done by me, Lucas De-Zarraga.</p>
          <p>Ready 2P font was from Google fonts.</p>
          <button className = "back" onClick={() => {setCurrentScreen('TITLE')}}/>
        </div>
      )}
    </div>
  );
}

export default App;