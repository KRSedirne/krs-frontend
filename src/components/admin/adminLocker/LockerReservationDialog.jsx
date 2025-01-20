import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LockerReservationDialog(props) {
    const { handleClose, handleClosebySubmit,dialogText,dialogTitle, open } = props;
    const [email, setEmail] = React.useState(""); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClosebySubmit(email);  
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { border: "5px solid #5D4038" }, component: 'form', onSubmit: handleSubmit }}>
            <DialogTitle sx={{ color: "#FDFDF8", backgroundColor: "#5D4038",fontWeight:"bold" }}>
                {dialogTitle}
                </DialogTitle>
            <DialogContent sx={{ margin: "20px 0px 0px 0px" }}>
                <DialogContentText
                sx={{
                    color:"rgb(42, 60, 80)"
                }}
                >
                    {dialogText}
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={handleEmailChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}
                sx={{
                    color:"#5D4038"
                }}
                >İptal</Button>
                <Button type="submit"
                sx={{
                    backgroundColor:"#5D4038",
                    color:"#FDFDF8"
                }}
                >Onayla</Button>
            </DialogActions>
        </Dialog>
    );
}
