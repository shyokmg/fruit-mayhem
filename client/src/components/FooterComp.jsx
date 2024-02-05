import { useState } from "react";
import { Flex, Layout, Button, theme } from "antd";
const { Header, Content, Footer } = Layout;

const FooterComp = () => {
    return (
       <Footer className="game-footer">
        <h3 className="ingame-text" >Developed by Shoyo &copy; 2024. All rights reserved</h3>
       </Footer>
    );
}

export default FooterComp