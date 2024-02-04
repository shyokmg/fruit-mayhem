import React, { useEffect, useState, useRef  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { FaPause, FaPlay } from "react-icons/fa";
import { MdOutlineReplay, MdExitToApp } from "react-icons/md";
import Phaser from "phaser";
import { Button } from 'antd';

const InGameUI = (props) => {

  return (
    <div style={{ position: 'relative' }}>
      <div id="phaser-container">
      <div style={{ position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '0px', left: '480px', zIndex: 1 }}>Level: {props.level} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '800px', zIndex: 1 }}>Score: {props.score} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '30px', zIndex: 1 }}>Time: {props.time} </h1>
        {props.gameOverState ? (
        <>
        <h1 style={{ position: 'absolute', top: '130px', left: '450px', zIndex: 1 }}>Game Over</h1>
        <h1 style={{ position: 'absolute', top: '180px', left: '425px', zIndex: 1 }}>Final Score: {props.score}</h1>
        <Button onClick={props.handleRetryButton} className="custom-button" type="link" style={{ position: 'absolute', top: '240px', left: '420px', zIndex: 1 }}><MdOutlineReplay /></Button>
        <Button onClick={props.handleExitGame} className="custom-button" type="link" style={{ position: 'absolute', top: '240px', left: '560px', zIndex: 1 }}><MdExitToApp /> </Button>
        </>
        )
        : (
        <Button onClick={props.handlePauseButton} className="custom-button" type="link" style={{ position: 'absolute', top: '10px', left: '950px', zIndex: 1 }} >
          {props.pauseButton ? <FaPlay/> : <FaPause/>}
        </Button>

        )}
      </div>
    </div>
    </div>
  );
};

export default InGameUI;