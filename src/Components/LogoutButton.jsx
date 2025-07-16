import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./LogoutButton.css";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userLoggedIn");
      onLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      LOGOUT
    </button>
  );
};

export default LogoutButton;
