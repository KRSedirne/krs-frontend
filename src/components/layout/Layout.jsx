import React from "react";
import Sidebar from "./sideBar.jsx";
import { useState } from "react";
import { Box } from "@mui/material";
import "../../pages/Home/HomePage.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };
  return (
    <div className="sideBar-container" sx={{ display: "flex" }}>
      <Sidebar onToggle={handleSidebarToggle} />
      <Box sx={{
        flexGrow: 1,
        transition: "margin-left 0.3s ease-in-out",
        marginLeft: isSidebarOpen ? "320px" : "64px",
        padding: "20px",
        overflow: "auto",
      }}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
