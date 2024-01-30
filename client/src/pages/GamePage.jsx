import React, { useState } from 'react';
import { Flex, Card, Row, Col, Button } from 'antd';
import MainGame from '../components/MainGame';
import { useNavigate, useParams } from 'react-router-dom';

const GamePage = () => {

 const navigate = useNavigate();
 const { level } = useParams();

 const handleExitButton = () => {
 navigate('/gamelevels')
     //   setStartGamePressed(true);
   // Add any additional logic or functionality here when the "Start Game" button is pressed
 };
 
  return (
    // <>
    //   <Button onClick={handleExitButton}>Exit</Button>
    //   <MainGame>
    //   <h1>MAIN GAME DO SOMETHING</h1>
    //   <h1>LEVEL: {level}</h1>
    //   </MainGame>
    // </>

<div style={{ position: 'relative' }}>
      {/* <h1>MAIN GAME DO SOMETHING</h1>
      <h1>LEVEL: {level}</h1> */}
      <Button onClick={handleExitButton} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>Exit</Button>
      <MainGame style={{ position: 'absolute', top: 0, left: 0 }} >
      </MainGame>
    </div>

  );
};

export default GamePage;
