import { useState } from "react";
import { Flex, Layout, Button, theme } from "antd";
const { Header, Content, Footer } = Layout;

const FooterComp = () => {
    return (
       <Footer className="game-footer">
        <h1 className="ingame-text" >FOOTER</h1>
       </Footer>
    );
}

export default FooterComp