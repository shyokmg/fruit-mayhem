import React, { useState } from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const LevelCards = ({level, highscore, isUnlocked}) => {

    const gridStyle = {
        // width: '70%',
        textAlign: 'center'
    };
 
  return (
    <Card.Grid>

<Card
    hoverable={isUnlocked}
    style={gridStyle}
    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title={`Level: ${level}`} description={`Highscore: ${highscore}`} />
  </Card>
    </Card.Grid>
  );
};

export default LevelCards;
