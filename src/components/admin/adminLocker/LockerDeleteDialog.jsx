import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function LockerDeleteDialog(props) {
  const {
    handleClose,
    handleSubmit,
    open,
    lockerNumber,
  } = props;


  

  // `locker` ve `email` için varsayılan değerler
 
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { border: "5px solid rgb(28, 85, 123)" }, component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center",backgroundColor:"rgb(28, 85, 123)",color:"white" }}>
         DOLABI SİL
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="alert-dialog-description">
          Numarası {lockerNumber} olan dolap silinecektir.
          </DialogContentText>
          <DialogContentText className="alert-dialog-description">
          Silmek istediğinize emin misiniz?
          </DialogContentText>
          
         
         
        </DialogContent>
        <DialogActions>
        <Button type="submit">Onayla</Button>
        <Button onClick={handleClose} autoFocus>
              İptal
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
