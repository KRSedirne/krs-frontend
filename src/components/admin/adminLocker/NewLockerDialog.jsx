import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";

export default function NewLockerDialog(props) {
  const { handleClose, open, handleNewLockerNumber, existingLockers, onCreateNewLocker } = props;
  const [lockerNumber, setLockerNumber] = React.useState(""); // Controlled input state

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredLockerNumber = Number(lockerNumber);

    if (enteredLockerNumber <= 0) {
  <Alert variant="outlined" severity="warning">
  Lütfen geçerli bir dolap numarası giriniz
  </Alert> 
   return;
    }


 
    if (existingLockers.includes(enteredLockerNumber)) {
      <Alert variant="outlined" severity="warning">
Bu dolap numarsı kullanılmakta lütfen geçerli bir numara giriniz.</Alert>
      return;
    }

    handleNewLockerNumber(enteredLockerNumber); // Pass the new locker number
    onCreateNewLocker(enteredLockerNumber); // Create the new locker
    setLockerNumber(""); // Reset the input value after successful submission
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === "" || Number(value) >= 1) {
      setLockerNumber(value);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose }
    
    PaperProps={{
      component: 'form', onSubmit: handleSubmit,

      sx: {
        border: "5px solid rgb(28, 85, 123)", // Kenarlık
      },
    }}>
      <DialogTitle sx={{ color: "white", backgroundColor: "rgb(28, 85, 123)" }}>
        DOLAP EKLE
      </DialogTitle>
        <DialogContent sx={{ margin: "20px 0px 0px 0px" }}>
          <DialogContentText>Yeni dolap numarası giriniz (1'den büyük):</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="new"
            name="new"
            label="Dolap Numarası"
            type="number"
            fullWidth
            variant="standard"
            value={lockerNumber}
            onChange={handleInputChange} // Controlled input onChange handler
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button type="submit">Onayla</Button>
        </DialogActions>

    </Dialog>
  );
}
