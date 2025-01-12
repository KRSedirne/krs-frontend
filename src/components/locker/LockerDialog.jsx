import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LockerDialog(props) {

  const {
    handleClose,
    handleClosebySubmit,
    expaireDate, 
    open, 
  } = props;
  const dateString = expaireDate;
  const date = new Date(dateString);
  date.setDate(date.getDate() + 5);
  const formattedDate = date.toLocaleDateString("tr-TR");
  console.log("5 gün sonrası (TR):", formattedDate);
  return (
    <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{justifyContent:"center"}}>
          {"Rezervasyon için Detaylar"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="alert-dialog-description">
            {"Rezervasyonunuz " + formattedDate + " tarihine kadardır."}
          </DialogContentText>
          <DialogContentText className="alert-dialog-description">
          {"Anahtarı görevliden alabilir, iade tarihine kadar geri verebilirsiniz."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleClosebySubmit} autoFocus>
            Onayla
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
