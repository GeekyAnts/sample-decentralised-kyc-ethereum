import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NativeBaseProvider, extendTheme } from "native-base";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth-context";

const theme = extendTheme({
  // colors:{
  //   themePrimary:""
  // },
  config: {
    initialColorMode: "light",
  },
});

// extend the theme

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <NativeBaseProvider theme={theme}>
          <App />
        </NativeBaseProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
