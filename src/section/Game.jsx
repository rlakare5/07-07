import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

const Game = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const conveyorRef = useRef(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameActive(true);
    setShowResult(false);
    
    // Reset animation
    if (conveyorRef.current) {
      conveyorRef.current.style.animation = 'none';
      setTimeout(() => {
        conveyorRef.current.style.animation = 'scroll 10s linear infinite';
      }, 10);
    }
  };

  const handleCanClick = (e) => {
    if (gameActive) {
      setScore(score + 1);
      e.target.classList.add('rotate');
      setTimeout(() => e.target.classList.remove('rotate'), 500);
      new Audio('/can-click.mp3').play().catch(e => console.log("Audio error:", e));
    }
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setShowResult(true);
      if (conveyorRef.current) conveyorRef.current.style.animation = 'none';
    }
  }, [timeLeft, gameActive]);

  return (
    <div className="game-wrapper">
      <div className="game-container">
        <h1>CLICK THE CAN!</h1>
        <p>Click as many cans as you can in 10 seconds!</p>

        {!gameActive && !showResult && (
          <button className="start-btn" onClick={startGame}>
            START GAME
          </button>
        )}

        {gameActive && (
          <div className="game-area">
            <div className="conveyor-track">
              <div className="conveyor" ref={conveyorRef}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="beer-can" onClick={handleCanClick}>
                    <img src="/can.png" alt="Beer Can" draggable="false" />
                  </div>
                ))}
              </div>
            </div>
            <div className="game-stats">
              <p>TIME LEFT: <span>{timeLeft}s</span></p>
              <p>SCORE: <span>{score}</span></p>
            </div>
          </div>
        )}

        {showResult && (
          <div className="result-screen">
            <h2>YOU CLICKED <span>{score}</span> CANS!</h2>
            <button className="restart-btn" onClick={startGame}>
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;