import React, { useEffect, useState, useRef  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { FaPause, FaPlay } from "react-icons/fa";
import { MdOutlineReplayCircleFilled, MdExitToApp } from "react-icons/md";
import { BiSolidExit } from "react-icons/bi";
import Phaser from "phaser";
import { Button } from 'antd';

const InGameUI = (props) => {

  return (
    <div style={{ position: 'relative' }}>
      <div id="phaser-container">
      <div className="ingame-text" style={{ position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '0px', left: '0px', zIndex: 1 }}>Time: {props.time} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '400px', zIndex: 1 }}>Level {props.level} </h1>
        <h1 style={{ position: 'absolute', top: '0px', left: '640px', zIndex: 1 }}>Score: {props.score} </h1>
        {props.gameOverState ? (
        <>
        <h1 style={{ position: 'absolute', top: '130px', left: '450px', zIndex: 1 }}>Game Over</h1>
        <h1 style={{ position: 'absolute', top: '180px', left: '425px', zIndex: 1 }}>Final Score: {props.score}</h1>
        <Button onClick={props.handleRetryButton} className="gameover-button" type="link" style={{ position: 'absolute', top: '240px', left: '420px', zIndex: 1 }}><MdOutlineReplayCircleFilled /></Button>
        <Button onClick={props.handleExitGame} className="gameover-button" type="link" style={{ position: 'absolute', top: '240px', left: '560px', zIndex: 1 }}><BiSolidExit /> </Button>
        </>
        )
        : (
          <>
          {props.pauseButton ? (
            <>
              <Button onClick={props.handlePauseButton} className="ingame-button" type="link" style={{ position: 'absolute', top: '150px', left: '410px', zIndex: 1 }} >RESUME <FaPlay/></Button>
              <Button onClick={props.handleRetryButton} className="ingame-button" type="link" style={{ position: 'absolute', top: '200px', left: '410px', zIndex: 1 }} >REPLAY <MdOutlineReplayCircleFilled/></Button>
              <Button onClick={props.handleExitGame} className="ingame-button" type="link" style={{ position: 'absolute', top: '250px', left: '430px', zIndex: 1 }} >EXIT <BiSolidExit/></Button>
            </>

          ) : <Button onClick={props.handlePauseButton} className="ingame-button" type="link" style={{ position: 'absolute', top: '0px', left: '950px', zIndex: 1 }} ><FaPause/></Button>}
        {/* <Button onClick={props.handlePauseButton} className="ingame-button" type="link" style={{ position: 'absolute', top: '0px', left: '950px', zIndex: 1 }} >
          {props.pauseButton ? <FaPlay/> : <FaPause/>}
        </Button> */}
          </>

        )}
      </div>
    </div>
    </div>
  );
};

export default InGameUI;