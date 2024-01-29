import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import LevelCards from './LevelCards';

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
        isUnlocked: false,
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

 
  return (
<>
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
</>
  );
};

export default GameLevels;
