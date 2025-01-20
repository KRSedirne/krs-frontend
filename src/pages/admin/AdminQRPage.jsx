import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import ColumnOne from "../../components/admin/adminQr/ColumnOne";
import ColumnTwo from "../../components/admin/adminQr/ColumnTwo";
import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import ManuelEntryDialog from "../../components/admin/adminQr/ManuelEnteryDialog";
import { adminCheckInReservationManually } from "../../api/admin/adminQR";

export default function QRPageAdmin() {
    let boxsx = {
        border: '2px solid #ddd',
        borderRadius: '5px',
        padding: '16px',
        backgroundColor: '#FDFDF8',
        boxShadow: '0 2px 4px rgba(93, 64, 56, 0.2)',
        alignItems: 'center',
        margin: "12px"
    };

    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserUpdate = (userData) => {
        setUser({ name: capitalize(userData.data.name), lastname: capitalize(userData.data.lastname) });
        console.log(user);
    };

    const handleManuelCheckIn = async (data) => {
        console.log("data:", data);
        const user = await adminCheckInReservationManually(data);
        handleUserUpdate(user);
        handleClose();
    };

    // Alert'i 10 saniye sonra kapatma
    useEffect(() => {
        if (user) {
            const timer = setTimeout(() => {
                setUser(null); // Kullanıcıyı sıfırlayarak Alert'i kapat
            }, 10000);

            return () => clearTimeout(timer); // Bileşen yeniden render edilirse timer'ı temizle
        }
    }, [user]);

    return (
        <>
            <ManuelEntryDialog
                handleClose={handleClose}
                open={open}
                handleClosebySubmit={handleManuelCheckIn} />
            {user && user.name && user.lastname && (
                <Alert severity="success">
                    <AlertTitle>Hoşgeldiniz</AlertTitle>
                    {`${user.name} ${user.lastname}`}
                </Alert>
            )}
            <Box
                sx={{ flexGrow: 1, ...boxsx ,height: "80vh"}}
            >
                <Grid container sx={{ justifyContent: "space-evenly" }}>
                    <Grid size={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box sx={boxsx}><ColumnOne onOpenManuelDialog={handleOpen} sx={{}} /></Box>
                    </Grid>
                    <Grid size={9}>
                        <Box sx={boxsx}><ColumnTwo onUserUpdate={handleUserUpdate} sx={{}} /></Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
