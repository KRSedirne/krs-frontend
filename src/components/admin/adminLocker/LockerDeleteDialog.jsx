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
        PaperProps={{ sx: { border: "5px solid rgb(42, 60, 80)" }, component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor:"rgb(42, 60, 80)",color: "#FDFDF8",fontWeight:"bold" }}>
         DOLABI SİL
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="alert-dialog-description" sx={{marginTop:"5px",color:"rgb(42, 60, 80)"}}>
          Numarası {lockerNumber} olan dolap silinecektir.
          </DialogContentText>
          <DialogContentText className="alert-dialog-description" sx={{color:"rgb(42, 60, 80)"}}>
          Silmek istediğinize emin misiniz?
          </DialogContentText>
          
         
         
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}
        sx={{color: "rgb(42, 60, 80)"}}
        autoFocus>
              İptal
          </Button>
          <Button type="submit" sx={{backgroundColor:"rgb(42, 60, 80)",color: "#FDFDF8"}}>Onayla</Button>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
