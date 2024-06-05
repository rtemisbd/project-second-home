import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserProvider";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./redux/store";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <UserProvider>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </UserProvider>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);
reportWebVitals();
