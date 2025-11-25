// React imports
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

// Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

/**
 * ProtectedRoute component (HOC) that protects routes requiring authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The component(s) to render if user is authenticated
 * @returns {React.ReactNode} Either the protected children or a redirect to the main page
 */
const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);

  // If user is logged in, render the protected content
  // Otherwise, redirect to the main page
  return currentUser ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

