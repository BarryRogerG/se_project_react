import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import "./index.css";

console.log('main.jsx: React version', React.version);
console.log('main.jsx: Starting React app...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('main.jsx: Root element not found!');
} else {
  console.log('main.jsx: Root element found', rootElement);
}

const root = ReactDOM.createRoot(rootElement);
console.log('main.jsx: React root created', root);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

console.log('main.jsx: React app rendered');
