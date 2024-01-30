import React, { useState } from 'react';
import { Card } from 'antd';
const { Meta } = Card;
import { useNavigate } from 'react-router-dom';

const LevelCards = ({level, highscore, isUnlocked}) => {

    const gridStyle = {
        // width: '70%',
        textAlign: 'center'
    };
    const navigate = useNavigate();
    const handleCardClick = () => {
      if (isUnlocked) {
          // Add any logic or functionality you want to perform when the card is clicked
          console.log(`Level ${level} card clicked`);
          navigate(`/gamepage/${level}`)
      }
  };
 
  return (
    <Card.Grid>

<Card
    hoverable={isUnlocked}
    style={gridStyle}
    onClick={handleCardClick}
    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title={`Level: ${level}`} description={`Highscore: ${highscore}`} />
  </Card>
    </Card.Grid>
  );
};

export default LevelCards;
