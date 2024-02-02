import React, { useState } from 'react';
import { Flex, Card, Row, Col, Button } from 'antd';
import LevelCards from '../components/GameUI/LevelCards';
import { useNavigate } from 'react-router-dom';

const GameLevels = () => {
 const sampleData = [
    {
        level: 1,
        highscore: 100,
        isUnlocked: true,
    },
    {
        level: 2,
        highscore: 100,
        isUnlocked: true,
    },
    {
        level: 3,
        highscore: 0,
        isUnlocked: true,
    },
    {
        level: 4,
        highscore: 0,
        isUnlocked: false,
    },
    {
        level: 5,
        highscore: 0,
        isUnlocked: false,
    },
    {
        level: 6,
        highscore: 0,
        isUnlocked: false,
    }
 ]
 const navigate = useNavigate();

 const handleBackButton = () => {
 navigate('/')
     //   setStartGamePressed(true);
   // Add any additional logic or functionality here when the "Start Game" button is pressed
 };
 
  return (

<div style={{ margin: "100px", }}>
<Flex justify="center" align="center" gap="middle" vertical>

    <Button onClick={handleBackButton}>Back</Button>
<Row gutter={[16, 32]}>

{sampleData.map((levels) => (
    <Col span={8}>
    <LevelCards 
        key={levels.level}
        level={levels.level}
        highscore={levels.highscore}
        isUnlocked={levels.isUnlocked}
    />
    </Col>
))}
</Row>
</Flex>
</div>


  );
};

export default GameLevels;
