import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Alert, AlertTitle } from '@mui/material';
import { adminCheckInReservation } from '../../../api/admin/adminQR';

export default function CameraScanner() {
    const [scanResult, setScanResult] = useState('');
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const capitalize=(str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    // QR kodunu gönderme ve kullanıcıyı almayı sağlayan fonksiyon
    const handleCheckIn = async (qrCode) => {
        try {
            const userData = await adminCheckInReservation(qrCode); // adminCheckInReservation fonksiyonunu çağır
            console.log(userData);
            if (userData) {
                setUser({name:userData.data.name,lastname:userData.data.lastname}); // Gelen kullanıcı verisini set et
                console.log(user);
            }
        } catch (err) {
            console.error("QR kodu işlenirken hata oluştu:", err);
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    // Scan işlemi tamamlandığında çalışacak fonksiyon
    const handleScan = (result) => {
        console.log(result); // Tarama sonucunu konsola yazdır
        if (result && result[0].rawValue) {
            setScanResult(result[0].rawValue);  // QR kodu değerini kaydet
        } else {
            setScanResult('');
        }
    };

    // QR kod tarandığında hemen backend'e gönderme
    useEffect(() => {
        if (scanResult) {
            handleCheckIn(scanResult);  // QR kodunu backend'e gönder ve kullanıcıyı al
        }
    }, [scanResult]);  // scanResult değiştiğinde çağrılır

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>QR Kod Tarayıcı</h1>
            
            <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
                <Scanner
                    onScan={handleScan}
                    onError={(error) => console.error(error)}
                    style={{ width: '100%', height: '100%' }} // Scanner'ı saran div'in boyutuna göre ayar
                />
            </div>
            
            <p style={{ fontSize: '1.2rem' }}>QR kodunuzu buraya okutunuz.</p>

            {user && user.name && user.lastname && (
                <Alert severity="success">
                    <AlertTitle>Hoşgeldiniz</AlertTitle>
                    {`${capitalize(user.name)} ${capitalize(user.lastname)}`}
                </Alert>
            )}

            {/* Hata mesajı */}
            {error && (
                <Alert severity="error">
                    <AlertTitle>Hata</AlertTitle>
                    {error}
                </Alert>
            )}
        </div>
    );
}
