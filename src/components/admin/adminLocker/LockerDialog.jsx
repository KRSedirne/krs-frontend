import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function LockerDialog(props) {
  const {
    handleClose,
    handleCancel,
    handleExpand,
    expaireDate,
    open,
    locker,
    email,
  } = props;

  // Rezervasyon bitiş tarihini hesapla
  console.log(locker);
  const formattedDate = React.useMemo(() => {
    if (!expaireDate) return "Belirtilmemiş";
    try {
      const date = new Date(expaireDate);
      date.setDate(date.getDate() + 5); // 5 gün ekle
      return date.toLocaleDateString("tr-TR");
    } catch {
      return "Geçersiz tarih";
    }
  }, [expaireDate]);

  // `locker` ve `email` için varsayılan değerler
  const lockerNumber = locker?.lockerNumber || "Belirtilmemiş";
  const userEmail = email || "Bilgi yok";

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { border: "5px solid rgb(28, 85, 123)" },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center",backgroundColor:"rgb(28, 85, 123)",color:"white" }}>
          REZERVASYON İÇİN DETAYLAR
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="alert-dialog-description">
            Dolap Numarası: {lockerNumber}
          </DialogContentText>
          <DialogContentText className="alert-dialog-description">
            Dolabı Kiralayan Kişinin E-posta Adresi: {userEmail}
          </DialogContentText>
          <DialogContentText className="alert-dialog-description">
            Rezervasyonun Bitiş Tarihi: {formattedDate}
          </DialogContentText>
          <DialogContentText className="alert-dialog-description">
            Anahtarı görevliden alabilir, iade tarihine kadar geri
            verebilirsiniz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExpand}>Rezervasyon Süresini Uzat</Button>
          <Button onClick={handleCancel} autoFocus>
            Rezervasyonu İptal Et
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
