import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

// import "./css/index.css";
import "semantic-ui-css/semantic.min.css";
// import "semantic-ui-css/semantic.min.js";
// import "./css/theme.css";
// import "./css/inter.min.css";
// import "./css/new.min.css";
// import "./css/night.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App";
import store from "./store";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import { Provider } from "react-redux";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URI,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("jwtToken");

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
