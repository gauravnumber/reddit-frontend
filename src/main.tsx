import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "semantic-ui-css/semantic.min.css";
// import "semantic-ui-css/semantic.min.js";
// import "./css/theme.css";
// import "./css/inter.min.css";
// import "./css/new.min.css";
// import "./css/night.css";

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
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
