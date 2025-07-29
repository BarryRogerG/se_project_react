import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>My React App</h1>
      </header>
      <main className="layout-content">{children}</main>
      <footer className="layout-footer">
        <p>© {new Date().getFullYear()} My App</p>
      </footer>
    </div>
  );
};

export default Layout;
