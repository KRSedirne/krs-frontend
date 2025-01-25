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
        }
    };

    const fetchLockerReservation = async () => {
        try {
            const response = await getCurrentLockerReservation();
            setLockerReservation(response.locker);
        } catch (error) {
        }
    };

    const handleCancelSeatReservation = (id) => {
        const cancelSeatReservation = async (id) => {
            try {
                const response = await cancelReservation(id);
                setSeatReservation(response.response);
                toast.success("Rezervasyon başarılı bir şekilde iptal edildi.");
            } catch (error) {
                toast.error("Rezervasyon iptal edilemedi.");
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
                toast.success("Koltuk süresi uzatıldı");
            } catch (error) {
                toast.error("Süre uzatılamadı.")
            }
        }
        remainSeatReservation(id);
        navigate(0);
       
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
                backgroundColor: 'rgba(251, 254, 252, 0.95)',
                border:"3px",
            }}
        >
            <CardContent>
                <Typography
                    variant="h4"
                    component="div"
                    align="center"
                    fontWeight="bold"
                    color="#2A3C50"
                >
                    Rezervasyonlar
                </Typography>

                <Grid container spacing={2} mt={2}>
                    {/* Seat Reservation */}
                    <Grid item xs={6}>
                        {seatReservation && !isLoading ? (
                             <Card
                             sx={{
                                 backgroundColor: 'rgba(242, 156, 19)',
                                 padding: 2,
                                 height: 216,
                                //  alignItems: 'center',
                                //  display: 'flex',
                             }}
                             >
                                 <Card
                             sx={{
                                 backgroundColor: '#2A3C50',
                                 padding: 2,
                                 height: 216,
                            
                             }}
                             >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="bold"
                                    align="center"
                                    color='rgb(251, 254, 252)'
                                    
                                >
                                    Koltuk No: {seatReservation ? seatReservation.seat : 'belirtilmemiş'}
                                </Typography>
                                <Box mt={2}>
                                    <Typography variant="body1" fontWeight="bold" color='rgb(251, 254, 252)'>
                                        Oluşturulma Tarihi
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" color='rgb(251, 254, 252)'>
                                        {seatReservation ? seatReservation.reservationDate: 'Belirtilmemiş'}
                                    </Typography>
                                </Box>
                                <Box mt={2}>
                                    <Typography variant="body1" fontWeight="bold" color='rgb(251, 254, 252)'>
                                        Sona Erme Tarihi
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" color='rgb(251, 254, 252)'>
                                        {seatReservation ? seatReservation.expireTime : 'Belirtilmemiş'}
                                    </Typography>
                                </Box>
                                <Box mt={2} display="flex" justifyContent="center" alignItems="center" color='rgb(251, 254, 252)'>
                                    <Button variant="contained" sx={{ borderRadius: '3px', margin: '5px', backgroundColor: 'rgb(159, 34, 15)',}} onClick={() => handleCancelSeatReservation(seatReservation.id)}>
                                        İptal
                                    </Button>    
                                    <Button variant="contained" sx={{ borderRadius: '3px', margin: '5px', backgroundColor: '#6587AD',}} onClick={handleOutReason}>
                                        Mola
                                    </Button>
                                    <Button variant="contained" sx={{ borderRadius: '3px', margin: '5px', backgroundColor: '#F29C13',}} onClick={() => handleRemainSeatReservation(seatReservation.id)}>
                                        Uzat
                                    </Button>
                                </Box>
                            </Card>
                            </Card>): (
                                <Card
                            sx={{
                                backgroundColor: 'rgba(242, 156, 19)',
                                padding: 2,
                                height: 216,
                                
                            }}
                            >
                                <Card
                            sx={{
                                backgroundColor: '#2A3C50',
                                padding: 2,
                                height: 216,
                               
                            }}
                            >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="bold"
                                    align="center"
                                    color='rgb(251, 254, 252)'
                                >
                                    Aktif koltuk Rezervasyonunuz Bulunmamaktadır
                                </Typography>

                            </Card>
                            </Card>
                            )}
                        
                    </Grid>

                    {/* Locker Reservation */}
                    <Grid item xs={6}>
                        {lockerReservation && !isLoading ? (
                            <Card
                            sx={{
                                backgroundColor: 'rgb(101,135,173)',
                                padding: 2,
                                height: 216,
                            }}
                        >
                            <Card
                            sx={{
                                backgroundColor: '#2A3C50',
                                padding: 2,
                                height: 216,
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                fontWeight="bold"
                                align="center"
                                color='rgb(251, 254, 252)'
                            >
                                Dolap No: {lockerReservation ? lockerReservation.lockerNumber : 'belirtilmemiş'}
                            </Typography>
                            <Box mt={2}>
                                <Typography variant="body1" fontWeight="bold" color='rgb(251, 254, 252)'>
                                    Oluşturulma Tarihi
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color='rgb(251, 254, 252)'>{lockerReservation ? lockerReservation.reservationDate : 'Belirtilmemiş'}</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="body1" fontWeight="bold" color='rgb(251, 254, 252)'>
                                    Sona Erme Tarihi
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color='rgb(251, 254, 252)'>{lockerReservation ? lockerReservation.expireDate : 'Belirtilmemiş'}</Typography>
                            </Box>
                            </Card>
                        </Card>
                        ): (
                            <Card
                            sx={{
                                backgroundColor: 'rgb(101,135,173)',
                                padding: 2,
                                height: 216,
                            }}
                        >
                            <Card
                            sx={{
                                backgroundColor: '#2A3C50',
                                padding: 2,
                                height: 216,
                            }}
                        >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="bold"
                                    align="center"
                                    color='rgb(251, 254, 252)'
                                >
                                    Aktif Dolap Rezervasyonunuz Bulunmamaktadır
                                </Typography>
                            </Card>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CurrentReservationItem;