import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { SearchContextProvider } from "./contexts/SearchContext.jsx";
import { Provider } from "react-redux";
import { store2 } from "./redux/store2";
import { UserProvider } from "./contexts/UserProvider.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";

import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import "react-loading-skeleton/dist/skeleton.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store2}>
          <UserProvider>
            <SearchContextProvider>
              <div className=" mx-auto">
                <RouterProvider router={router} />
              </div>
            </SearchContextProvider>
          </UserProvider>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
