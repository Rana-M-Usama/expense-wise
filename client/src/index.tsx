import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "App";
import reportWebVitals from "reportWebVitals";
import { store } from "app/store";

import "index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const google_id: string = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

root.render(
  <GoogleOAuthProvider clientId={google_id}>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);

reportWebVitals();
