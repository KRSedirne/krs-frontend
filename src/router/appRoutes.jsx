import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile/Profile.jsx";
import Login from "../components/auth/Login.jsx";
import Register from "../components/auth/Register.jsx";
import QRPage from "../pages/QR/QRPage.jsx";
import Saloon from "../pages/Saloon/Saloon.jsx";
import CreateReservationModal from "../components/modals/CreateReservationModal.jsx";
import Layout from "../components/layout/Layout.jsx";
import Home from "../pages/Home/HomePage.jsx";
import AdminSaloon from "../pages/admin/AdminSaloon.jsx";
import AdminCreateSaloonModal from "../components/admin/adminModals/AdminCreateSaloonModal.jsx";
import AdminSuspended from "../pages/admin/AdminSuspended.jsx";
import SaloonPlan from "../components/saloon/SaloonPlan.jsx";
import LockerPage from "../pages/Locker/LockerPage.jsx";
import AdminQR from "../pages/admin/AdminQRPage.jsx";
import AdminLockerPage from "../pages/admin/AdminLockerPage.jsx";
import ForgetPasswordPage from "../components/auth/ForgetPassword.jsx";


const AppRoutes = () => {
    return (
        <Routes> 
            <Route index element={<Login />} />
            <Route path="/home" element={<Layout><Home/></Layout>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/qrpage" element={<Layout><QRPage /></Layout>}/>
            <Route path="/saloon" element={<Layout><Saloon /></Layout>}/>
            <Route path="/res" element={<CreateReservationModal/>} />
            <Route path="/locker" element={<Layout><LockerPage/></Layout>}/>
            <Route path="/saloon" element={<Layout><Saloon /></Layout>}/>
            <Route path="/qr" element={<Layout><QRPage/></Layout>}/>
            <Route path="/reset-password/:id" element={<ForgetPasswordPage/>}/>


            {/* admin routes */}
            <Route path="/adminSaloon" element={<Layout><AdminSaloon/></Layout>} />
            <Route path="/adminres" elemnent={<Layout><AdminCreateSaloonModal/></Layout>} />
            <Route path="/adminSuspended" element={<Layout><AdminSuspended/></Layout>} />
            <Route path="/saloonImage" element={<Layout><SaloonPlan/></Layout>} />
            <Route path="/adminQR" element={<Layout><AdminQR/></Layout>}/>
            <Route path="/adminLocker" element={<Layout><AdminLockerPage/></Layout>}/>
        </Routes>
    )
}

export default AppRoutes;