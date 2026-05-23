import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="768792569540-figjod3g9ibuki0frhh8irvm0q5mlmg1.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
  </React.StrictMode>
)