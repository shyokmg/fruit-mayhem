import { useState } from "react";
import { Flex, Layout, Button, theme } from "antd";
const { Header, Content, Footer } = Layout;

const HeaderComp = () => {
    const headerStyle = {
        display: 'flex',
          alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
      };

    return (
        <Header style={headerStyle}>
            <h1>GAME TITLE - FRUIT MAYHEM</h1>
        </Header>
    );
}

export default HeaderComp