import React from 'react'
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';


const CurrentReservationItem = () => {
    return (
        <Card sx={{ maxWidth: 1000, margin: 'auto', mt: 4, padding: 2, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <CardContent>
                <Typography variant="h5" component="div" align="center" fontWeight="bold"> 
                Reservations
                </Typography>

                <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <Card sx={{ backgroundColor: "rgba(51, 107, 63, 0.57)", padding: 2 }}>
                    <Typography variant="h6" component="div" fontWeight="bold" align="center">
                        Seat
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

                <Grid item xs={6}>
                    <Card sx={{ backgroundColor: "rgba(21, 87, 231, 0.5)", padding: 2 }}>
                    <Typography variant="h6" component="div" fontWeight="bold" align="center">
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
    )
}

export default CurrentReservationItem