import React, { useEffect, useState, useRef  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Phaser from "phaser";
import GameScene from "../components/Scenes/GameScene"
import InGameUI from "../components/UserInterface/InGameUI";
import Auth from "../utils/auth";
import { SAVE_SCORE } from "../utils/mutations";
import { useMutation } from "@apollo/client";

// component for rendering game scene
const GameComp = () => {

  // set up hooks for game ui
  const {level} = useParams();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [pauseButton, setPauseButton] = useState(false);
  const [gameOverState, setGameOverState] = useState(false);
  const gameRef = useRef(null);
  const [saveScore, {error, data}] = useMutation(SAVE_SCORE);
  
// configuration for phaser game engine
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 1024,
    height: 576,
    scene: [new GameScene(level)],
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
        // debug: true,
      },
    },
  };
  
// render the game ui properties in use effect
  useEffect(() => {
    const game = new Phaser.Game(config);
    gameRef.current = game;

    // store level data into event
    game.events.emit('currentLevel', level);

    // listen to stored score event and use hook to set score
    game.events.on('storedScore', (data) => {
      setScore(data);
    });

    // listen to stored time event and use hook to set time
    game.events.on('storeRemainingTime', (data) => {
      setTime(data);
    });

    // listen to stored gamestate event and set to gameover state
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
  // handle onclick events for buttons
  const handlePauseButton = () => setPauseButton((prevButton) => !prevButton);
  const handleRetryButton = () => window.location.reload() ;
  const handleExitGame = () => {
    handleSaveScore();
    navigate('/gamelevels')
  };

  // use effect for pause and resuming the game
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
  
  // handle saving score after game is over
  const handleSaveScore = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const gameData = {
      maxLevel: parseInt(level) + 1,
      level: parseInt(level),
      highScore: score,
      unlocked: true,
    }

    if (!token) {
      navigate('/')
    }
    try {
      await saveScore({
        variables: {...gameData},
      });
    } catch (err) {
      console.error(err);
    }

  }

  // render game ui
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
  );
};

export default GameComp;