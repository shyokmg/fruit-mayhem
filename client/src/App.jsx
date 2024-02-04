import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp";
import { Outlet } from "react-router-dom";
import { Flex, Layout, Button, theme } from "antd";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <GamePage />

    //  create an Apollo Provider to make every request work with the Apollo Server.

    <ApolloProvider client={client}>
      <Flex gap="middle" wrap="wrap">
        <Layout className="main-background"
          style={{
            
            width: 1024,
            height: 576,
          }}
        >
          <HeaderComp />
          <Outlet />
      <FooterComp />
        </Layout>
      </Flex>
    </ApolloProvider>
  );
}

export default App;
