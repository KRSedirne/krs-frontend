import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { getCurrentSeatReservation } from '../../api/reservation/reservation';
// import { getCurrentLockerReservation } from '../../api/locker/locker';

const CurrentReservationItem = (props) => {
    const [seatReservation, setSeatReservation] = useState({});
    // const [lockerReservation, setLockerReservation] = useState({});

    const fetchSeatReservation = async () => {
        try {
            const response = await getCurrentSeatReservation();
            setSeatReservation(response.response);
            console.log(response.response);
            if(response){
                props.exist=true;
                console.log(props.exist);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const fetchLockerReservation = async () => {
    //     try {
    //         const response = await getCurrentLockerReservation();
    //         setLockerReservation(response.response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        fetchSeatReservation();
    }, []);

    console.log(seatReservation);

    return (
        <Card
            sx={{
                maxWidth: 1000,
                margin: 'auto',
                mt: 4,
                padding: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    fontWeight="bold"
                    color="white"
                >
                    Reservations
                </Typography>

                <Grid container spacing={2} mt={2}>
                    {/* Seat Reservation */}
                    <Grid item xs={6}>
                        {seatReservation ? (
                            <Card
                            sx={{
                                backgroundColor: 'rgba(51, 107, 63, 0.57)',
                                padding: 2,
                            }}
                            >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="bold"
                                    align="center"
                                >
                                    Koltuk: {seatReservation ? seatReservation.seat : 'Boş'}
                                </Typography>
                                <Box mt={2}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Oluşturulma Tarihi
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {seatReservation ? seatReservation.reservationDate: 'Belirtilmemiş'}
                                    </Typography>
                                </Box>
                                <Box mt={2}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Sona Erme Tarihi
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {seatReservation ? seatReservation.expireTime : 'Belirtilmemiş'}
                                    </Typography>
                                </Box>
                            </Card>): (
                                <Card
                            sx={{
                                backgroundColor: 'rgba(51, 107, 63, 0.57)',
                                padding: 2,
                                height: 150,
                                alignItems: 'center',
                                display: 'flex',
                            }}
                            >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="bold"
                                    align="center"
                                >
                                    Aktif Rezervasyon Bulunmamaktadır
                                </Typography>

                            </Card>
                            )}
                        
                    </Grid>

                    {/* Locker Reservation */}
                    <Grid item xs={6}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(21, 87, 231, 0.5)',
                                padding: 2,
                                height: 192,
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                fontWeight="bold"
                                align="center"
                            >
                                Locker
                            </Typography>
                            <Box mt={2}>
                                <Typography variant="body1" fontWeight="bold">
                                    Oluşturulma Tarihi
                                </Typography>
                                <Typography variant="body2">13/01/2025 13.30</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="body1" fontWeight="bold">
                                    Sona Erme Tarihi
                                </Typography>
                                <Typography variant="body2">13/01/2025 15.00</Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CurrentReservationItem;