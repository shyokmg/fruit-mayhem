import { Layout } from "antd";
const { Header } = Layout;

// component for header
const HeaderComp = () => {
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
      };

    return (
        <Header className="game-header" style={headerStyle}>
            <h1 className="ingame-text" style={{ padding: '294px'}}>FRUIT MAYHEM</h1>
        </Header>
    );
}

export default HeaderComp