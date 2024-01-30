import React, { useRef, useEffect } from 'react';
import { Flex, Layout, Button, theme } from "antd";
const { Header, Content, Footer } = Layout;

const MainGame = () => {
    const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 1024
    canvas.height = 576

    // Use the context to draw on the canvas
    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return <canvas ref={canvasRef} />;
};


export default MainGame