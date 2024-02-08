import React, { useState } from 'react'
import { Button, Flex } from 'antd';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { FaPlayCircle } from "react-icons/fa";
import { SiGamebanana } from "react-icons/si";

// component for main menu buttons
const MainMenu = () => {
    const navigate = useNavigate();

    // on click event when play button is pressed
    const handleStartGame = () => { navigate('/gamelevels') };
 
  return (
    <div>

<h1 className="game-title">FRUIT MAYHEM<SiGamebanana/></h1>
    <div style={{ margin: "73px" }}>
<Flex justify="center" align="center" gap="middle" vertical>

<Button onClick={handleStartGame} className="main-button" type="link">PLAY<FaPlayCircle/></Button>
{/* <Button className="main-button" type="link">HIGHSCORES</Button> */}
<Button onClick={Auth.logout} className="main-button" type="link">LOGOUT</Button>
</Flex>
</div>
    </div>

  );
};

export default MainMenu;
