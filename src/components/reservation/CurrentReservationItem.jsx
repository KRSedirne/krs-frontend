/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { cancelReservation, getCurrentSeatReservation, remainReservation } from '../../api/reservation/reservation';
import { getCurrentLockerReservation } from '../../api/locker/locker';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CurrentReservationItem = ({setIsShowCreateOutreasonModal, setSeatReservationId}) => {
    const [seatReservation, setSeatReservation] = useState({});
    const [lockerReservation, setLockerReservation] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    const fetchSeatReservation = async () => {
        try {
            const response = await getCurrentSeatReservation();
            setSeatReservation(response.response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLockerReservation = async () => {
        try {
            const response = await getCurrentLockerReservation();
            setLockerReservation(response.locker);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelSeatReservation = (id) => {
        const cancelSeatReservation = async (id) => {
            try {
                const response = await cancelReservation(id);
                setSeatReservation(response.response);
                toast.success(response.message);
            } catch (error) {
                console.log(error);
            }
        }
        cancelSeatReservation(id);
        fetchSeatReservation();
    };

    const handleRemainSeatReservation = (id) => {
        const remainSeatReservation = async (id) => {
            try {
                const response = await remainReservation(id);
                setSeatReservation(response.reservation);
                toast.success(response.message);
            } catch (error) {
                console.log(error);
            }
        }
        remainSeatReservation(id);
        navigate(0);
        toast.success("Koltuk süresi uzatıldı");
    };

    const handleOutReason = () => {
        setIsShowCreateOutreasonModal(true)
        setSeatReservationId(seatReservation.id)
    };

    useEffect(() => {
        fetchSeatReservation();
        fetchLockerReservation();
        setIsLoading(false);
    }, []);

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
                        {seatReservation && !isLoading ? (
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
                                    Koltuk No: {seatReservation ? seatReservation.seat : 'belirtilmemiş'}
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
                                <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                                    <Button variant="contained" sx={{ borderRadius: '3px', margin: '5px', backgroundColor: 'rgba(255, 0, 0, 0.65)',}} onClick={() => handleCancelSeatReservation(seatReservation.id)}>
                                        İptal
                                    </Button>    
                                    <Button variant="contained" sx={{ borderRadius: '3px', margin: '5px', backgroundColor: 'rgba(0, 17, 255, 0.73)',}} onClick={handleOutReason}>
                                        Mola
                                    </Button>
                                    <Button variant="contained" sx={{ borderRadius: '3px', margin: '5px', backgroundColor: 'rgba(12, 255, 4, 0.65)',}} onClick={() => handleRemainSeatReservation(seatReservation.id)}>
                                        Uzat
                                    </Button>
                                </Box>
                            </Card>): (
                                <Card
                            sx={{
                                backgroundColor: 'rgba(51, 107, 63, 0.57)',
                                padding: 2,
                                height: 192,
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
                                    Aktif koltuk Rezervasyonunuz Bulunmamaktadır
                                </Typography>

                            </Card>
                            )}
                        
                    </Grid>

                    {/* Locker Reservation */}
                    <Grid item xs={6}>
                        {lockerReservation && !isLoading ? (
                            <Card
                            sx={{
                                backgroundColor: 'rgba(21, 87, 231, 0.5)',
                                padding: 2,
                                height: 255,
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                fontWeight="bold"
                                align="center"
                            >
                                Dolap No: {lockerReservation ? lockerReservation.lockerNumber : 'belirtilmemiş'}
                            </Typography>
                            <Box mt={2}>
                                <Typography variant="body1" fontWeight="bold">
                                    Oluşturulma Tarihi
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">{lockerReservation ? lockerReservation.reservationDate : 'Belirtilmemiş'}</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="body1" fontWeight="bold">
                                    Sona Erme Tarihi
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">{lockerReservation ? lockerReservation.expireDate : 'Belirtilmemiş'}</Typography>
                            </Box>
                        </Card>
                        ): (
                            <Card
                            sx={{
                                backgroundColor: 'rgba(21, 87, 231, 0.5)',
                                padding: 2,
                                height: 192,
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
                                    Aktif Dolap Rezervasyonunuz Bulunmamaktadır
                                </Typography>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CurrentReservationItem;