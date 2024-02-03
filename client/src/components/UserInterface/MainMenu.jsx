import React, { useState } from 'react';

import { Button } from 'antd';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
// const { Meta } = Card;

const MainMenu = () => {

    const gridStyle = {
        // width: '70%',
        textAlign: 'center'
    };

    const [startGamePressed, setStartGamePressed] = useState(false);
    const navigate = useNavigate();

    const handleStartGame = () => { navigate('/gamelevels') };
 
  return (
    < >
    <Button onClick={handleStartGame}>Start Game </Button>
    <Button>Options</Button>
    <Button onClick={Auth.logout}>logout</Button>
    </>
  );
};

export default MainMenu;
