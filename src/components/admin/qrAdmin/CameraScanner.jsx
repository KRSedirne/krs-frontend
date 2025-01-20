import React, { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Alert, AlertTitle } from "@mui/material";
import { adminCheckInReservation } from "../../../api/admin/adminQR";

export default function CameraScanner({ onUserUpdate }) {
    const [scanResult, setScanResult] = useState("");
    const [error, setError] = useState(null);

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleCheckIn = async (qrCode) => {
        try {
            const userData = await adminCheckInReservation(qrCode);
            if (userData) {
                const user = {
                    name: capitalize(userData.data.name),
                    lastname: capitalize(userData.data.lastname),
                };

                onUserUpdate(user); // User bilgisini parent component'e gönderiyoruz.
                setError(null); // Hata mesajını temizle
            }
        } catch (err) {
            console.error("QR kodu işlenirken hata oluştu:", err);
            setError(err.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    const handleScan = (result) => {
        if (result && result[0]?.rawValue && result[0]?.rawValue !== scanResult) {
            setScanResult(result[0].rawValue);
        } else if (!result) {
            setError("Geçersiz QR kodu. Lütfen tekrar deneyin.");
        }
    };

    useEffect(() => {
        if (scanResult) {
            handleCheckIn(scanResult);
        }
    }, [scanResult]);

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{"color":"#2A3C50",
                border:"1px solid #2A3C50",
                borderRadius:"2px"
            }}>QR KOD TARAYICI</h1>

            <div style={{ width: "53vh", height: "53vh", margin: "auto" }}>
                <Scanner
                    onScan={handleScan}
                    onError={(error) => console.error("Tarayıcı hatası:", error)}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            <p style={{ fontSize: "1.2rem" }}>QR kodunuzu buraya okutunuz.</p>

            {error && (
                <Alert severity="error">
                    <AlertTitle>Hata</AlertTitle>
                    {error}
                </Alert>
            )}
        </div>
    );
}
