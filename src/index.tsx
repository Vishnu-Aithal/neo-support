import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ConditionalRouter } from "routes/ConditionalRouter";
import { Provider as StoreProvider } from "react-redux";
import { store } from "store/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLDivElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider store={store}>
                <ConditionalRouter />
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>
);
