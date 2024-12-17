import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile.jsx";
import ABlock from "../components/saloons/ABlock.jsx";
import BBlock from "../components/saloons/BBlock.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/ablock" element={<ABlock />} />
            <Route path="/bblock" element={<BBlock />} />
        </Routes>
    )
}

export default AppRoutes;