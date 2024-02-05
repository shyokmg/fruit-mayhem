import React, { useState } from 'react'
import { Button, Flex } from 'antd';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { FaPause, FaPlayCircle } from "react-icons/fa";
// const { Meta } = Card;

const MainMenu = () => {
    const navigate = useNavigate();
    const handleStartGame = () => { navigate('/gamelevels') };
 
  return (
    <div style={{ margin: "73px" }}>
<Flex justify="center" align="center" gap="middle" vertical>

<Button onClick={handleStartGame} className="main-button" type="link">PLAY<FaPlayCircle/></Button>
<Button className="main-button" type="link">OPTIONS</Button>
<Button onClick={Auth.logout} className="main-button" type="link">LOGOUT</Button>
</Flex>


</div>

  );
};

export default MainMenu;
