import React, { useState } from 'react'
import { Button, Flex } from 'antd';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
// const { Meta } = Card;

const MainMenu = () => {
    const navigate = useNavigate();
    const handleStartGame = () => { navigate('/gamelevels') };
 
  return (
    <div style={{ margin: "73px" }}>
<Flex justify="center" align="center" gap="middle" vertical>

<Button onClick={handleStartGame}>Start Game </Button>
<Button>Options</Button>
<Button onClick={Auth.logout}>logout</Button>
</Flex>


</div>

  );
};

export default MainMenu;
