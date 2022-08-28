import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { offsetLimitPagination } from "@apollo/client/utilities";
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
  // from,
  concat,
} from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
import { Provider } from "react-redux";

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_BACKEND_URI,
});

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

// console.log(`uploadLink`, uploadLink);
// console.log(`authLink.concat(httpLink)`, authLink.concat(httpLink));
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getRecentPosts: offsetLimitPagination(),
        getSubredditPost: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: concat(authLink, httpLink, uploadLink),
  // cache: new InMemoryCache(),
  // link: authLink.concat(uploadLink),
  // link: authLink.concat(httpLink),
  // link: from([authLink, httpLink, uploadLink]),
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
