
import { Flex, Layout } from "antd";
const { Content } = Layout;
import Auth from "../utils/auth";
import LoginCard from "../components/Login/LoginCard";
import MainMenu from "../components/UserInterface/MainMenu";

const Home = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // render main menu or login
  return (
    <main>
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
  );
};

export default Home;
