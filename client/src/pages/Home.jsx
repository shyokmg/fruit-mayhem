// import { useQuery } from '@apollo/client';
import { useState } from "react";
import { Flex, Layout, Button, theme } from "antd";
const { Header, Content, Footer } = Layout;
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import LoginCard from "../components/Login/LoginCard";
import GameLevels from "./GameLevels";
import MainMenu from "../components/UserInterface/MainMenu";

// import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  return (
    <main style={{
      background: "black",
      width: 1024,
      height: 576,
    }}>
        <Content>
          {token ? (
            <div style={{ margin: "100px", }}>
              <Flex justify="center" align="center" gap="middle" vertical>
                <MainMenu />
              </Flex>
            </div>
          ) : (
            <Flex justify="center" align="center">
              <LoginCard />
            </Flex>
          )}
        </Content>
  </main>
    // <main>
    //   <Flex justify="center" align="center">
    //     <Layout
    //       style={{
    //         background: "yellow",
    //         width: 1024,
    //         height: 560,
    //       }}
    //     >
    //       <Content>
    //         {Auth.loggedIn() ? (
    //           <div style={{ margin: "100px", }}>
    //             <Flex justify="center" align="center" gap="middle" vertical>
    //               {startGamePressed ? (
    //                 <>
    //                   <p>Game started! Here is the game content.</p>
    //                   <GameLevels />
    //                 </>
    //               ) : (
    //                 <>
    //                   <Button onClick={handleStartGame}>Start Game</Button>
    //                   <Button>Options</Button>
    //                   <Button onClick={Auth.logout}>logout</Button>
    //                 </>
    //               )}
    //             </Flex>
    //           </div>
    //         ) : (
    //           <Flex justify="center" align="center">
    //             <LoginCard />
    //           </Flex>
    //         )}
    //       </Content>
    //     </Layout>
    //   </Flex>
    // </main>
  );
};

export default Home;
