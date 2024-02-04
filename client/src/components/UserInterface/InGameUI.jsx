import React, { useEffect, useState, useRef  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Phaser from "phaser";
import { Button } from 'antd';

const InGameUI = (props) => {

  return (
    <div style={{ position: 'relative' }}>
      <div id="phaser-container">
      <div style={{ position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '0px', left: '480px', zIndex: 1 }}>Level: {props.level} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '200px', zIndex: 1 }}>Score: {props.score} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '30px', zIndex: 1 }}>Time: {props.time} </h1>
        {props.gameOverState ? (
        <>
        <h1 style={{ position: 'absolute', top: '130px', left: '450px', zIndex: 1 }}>Game Over</h1>
        <h1 style={{ position: 'absolute', top: '180px', left: '425px', zIndex: 1 }}>Final Score: {props.score}</h1>
        
        <Button onClick={props.handleRetryButton} style={{ position: 'absolute', top: '240px', left: '420px', zIndex: 1 }}>Retry</Button>
        <Button onClick={props.handleExitGame} style={{ position: 'absolute', top: '240px', left: '560px', zIndex: 1 }}>Exit </Button>
        </>
        )
        : (
        <Button onClick={props.handlePauseButton} style={{ position: 'absolute', top: '0px', left: '930px', zIndex: 1 }} >
          {props.pauseButton ? 'Resume' : 'Pause'}
        </Button>

        )}
      </div>
    </div>
    </div>
  );
};

export default InGameUI;