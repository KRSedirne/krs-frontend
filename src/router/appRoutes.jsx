import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile.jsx";
import ABlock from "../components/saloons/ABlock.jsx";
import BBlock from "../components/saloons/BBlock.jsx";
import Login from "../components/auth/Login.jsx";
import Register from "../components/auth/Register.jsx";
import LockerPage from "../pages/LockerPage.jsx";
import QRPage from "../pages/QRPage.jsx";
import QRPageAdmin from "../pages/QRPageAdmin.jsx";
import LockerPageAdmin from "../pages/LockerPageAdmin.jsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ablock" element={<ABlock />} />
            <Route path="/bblock" element={<BBlock />} />
            <Route path="/locker" element={<LockerPage/>}/>
            <Route path="/qr" element={<QRPage/>}/>
            <Route path="/qrAdmin" element={<QRPageAdmin/>}/>
            <Route path="/lockerAdmin" element={<LockerPageAdmin/>}/>
        </Routes>
    )
}

export default AppRoutes;