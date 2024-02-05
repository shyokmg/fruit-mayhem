import { useState } from "react";
import { Flex, Layout, Button, theme } from "antd";
const { Header, Content, Footer } = Layout;

const HeaderComp = () => {
    const headerStyle = {
        display: 'flex∂',
        alignItems: 'center',
        color: '#fff',
        // padding: '40px'
      };

    return (
        <Header className="game-header" style={headerStyle}>
            <h1 className="ingame-text" >FRUIT MAYHEM</h1>
        </Header>
    );
}

export default HeaderComp