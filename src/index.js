import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ConditionalRouter } from "routes/ConditionalRouter";
import { AuthProvider } from "contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ConditionalRouter />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
