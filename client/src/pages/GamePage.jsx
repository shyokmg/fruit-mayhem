import React, { useEffect, useState, useRef  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Phaser from "phaser";
import { Button } from 'antd';
import GameScene from "../components/Scenes/GameScene"
import InGameUI from "../components/UserInterface/InGameUI";

const GameComp = () => {
  const {level} = useParams();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [pauseButton, setPauseButton] = useState(false);
  const [gameOverState, setGameOverState] = useState(false);
  const gameRef = useRef(null);

  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 1024,
    height: 576,
    scene: [GameScene],
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
        debug: true,
      },
    },
  };
  

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

  const navigate = useNavigate();
  const handlePauseButton = () => setPauseButton((prevButton) => !prevButton);
  const handleRetryButton = () => window.location.reload() ;
  const handleExitGame = () => navigate('/');

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

    <InGameUI 
      level ={level}
      score={score}
      time={time}
      pauseButton={pauseButton}
      gameOverState={gameOverState}
      handlePauseButton={handlePauseButton}
      handleRetryButton={handleRetryButton}
      handleExitGame={handleExitGame}
    />
    // <div style={{ position: 'relative' }}>
    //   <div id="phaser-container">
    //   <div style={{ position: 'relative' }}>
    //     <h1 style={{ position: 'absolute', top: '0px', left: '480px', zIndex: 1 }}>Level: {level} </h1>
    //     <h1 style={{ position: 'absolute', top: '0px', left: '850px', zIndex: 1 }}>Score: {score} </h1>
    //     <h1 style={{ position: 'absolute', top: '0px', left: '50px', zIndex: 1 }}>Time: {time} </h1>
    //     {gameOverState ? (
    //     <>
    //     <Button onClick={handleRetryButton} style={{ position: 'absolute', top: '200px', left: '480px', zIndex: 1 }}>Retry</Button>
    //     <Button onClick={handleExitGame} style={{ position: 'absolute', top: '300px', left: '480px', zIndex: 1 }}>Exit </Button>
    //     </>
    //     )
    //     : (
    //     <Button onClick={handlePauseButton} style={{ position: 'absolute', top: '0px', left: '930px', zIndex: 1 }} >
    //       {pauseButton ? 'Resume' : 'Pause'}
    //     </Button>

    //     )}
    //   </div>
    // </div>
    // </div>
  );
};

export default GameComp;