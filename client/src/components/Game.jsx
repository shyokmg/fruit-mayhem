import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'antd';
import Phaser from 'phaser';
import { useNavigate } from 'react-router-dom';

const Game = ({ config, level }) => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [pauseButton, setPauseButton] = useState(false);
  const [gameOverState, setGameOverState] = useState(false);
  const gameRef = useRef(null);

  useEffect(() => {
    const game = new Phaser.Game(config);
    gameRef.current = game;

    game.events.on('storedScore', (data) => {
      setScore(data);
    });

    game.events.on('storeRemainingTime', (data) => {
      setTime(data);
    });

    game.events.on('gameOver', (data) => {
      if (data) {
        game.pause(true);
        setGameOverState(true)
      }
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  const handlePauseButton = () => {
    setPauseButton((prevButton) => !prevButton);
  };
  
  const navigate = useNavigate();
  const handleRetryButton = () => {
    window.location.reload();
  };
  const handleExitGame = () => {
    navigate('/')
        //   setStartGamePressed(true);
      // Add any additional logic or functionality here when the "Start Game" button is pressed
    };

  useEffect(() => {
    const game = gameRef.current;
    if (game) {
      if (pauseButton) {
        game.pause();
      } else {
        game.resume();
      }
    }
  }, [pauseButton]);


  return (
    <div id="phaser-container">
      <div style={{ position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '0px', left: '480px', zIndex: 1 }}>Level: {level} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '850px', zIndex: 1 }}>Score: {score} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '50px', zIndex: 1 }}>Time: {time} </h1>
        {gameOverState ? (
        <>
        <Button onClick={handleRetryButton} style={{ position: 'absolute', top: '200px', left: '480px', zIndex: 1 }}>Retry</Button>
        <Button onClick={handleExitGame} style={{ position: 'absolute', top: '300px', left: '480px', zIndex: 1 }}>Exit </Button>
        </>
        )
        : (
        <Button onClick={handlePauseButton} style={{ position: 'absolute', top: '0px', left: '930px', zIndex: 1 }} >
          {pauseButton ? 'Resume' : 'Pause'}
        </Button>

        )}
      </div>
    </div>
  );
};

export default Game;