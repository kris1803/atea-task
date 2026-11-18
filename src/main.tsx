import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./lib/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
