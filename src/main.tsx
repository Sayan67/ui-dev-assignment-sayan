import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/provider/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Analytics />
    </ThemeProvider>
  </StrictMode>
);
