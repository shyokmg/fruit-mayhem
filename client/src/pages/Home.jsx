// import { useQuery } from '@apollo/client';
import { useState } from "react";
import { Flex, Layout, Button, theme } from "antd";
const { Header, Content, Footer } = Layout;
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import LoginCard from "../components/LoginCard";

// import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
    const [startGamePressed, setStartGamePressed] = useState(false);

  const handleStartGame = () => {
    setStartGamePressed(true);
    // Add any additional logic or functionality here when the "Start Game" button is pressed
  };
  return (
    <main>
        <Flex justify="center" align="center">

      <Layout
        style={{
          background: "yellow",
          width: 1024,
          height: 560,
        }}
      >
      
        <Content>
            {Auth.loggedIn() ? (
                <div style={{
                    margin: '200px'
                  }}>
                <Flex justify="center" align="center" gap='middle' vertical>
                {startGamePressed ? (
                  <p>Game started! Here is the game content.</p>
                ) : (
                  <>
                  
                  <Button onClick={handleStartGame}>Start Game</Button>
                  <Button>Options</Button>
                  <Button onClick={Auth.logout}>logout</Button>
                  </>
                )}
              </Flex>

                </div>
            ) : (
                <Flex justify="center" align="center">
                    <LoginCard />
                </Flex>
            )}
        </Content>
      </Layout>
        </Flex>
    </main>
  );
};

export default Home;
