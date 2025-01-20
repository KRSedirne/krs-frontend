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
          sx: { border: "5px solid #6587AD",color:"#FDFDF8" },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor:"#6587AD",color:"#FDFDF8",fontWeight:"bold" }}>
          REZERVASYON İÇİN DETAYLAR
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="alert-dialog-description"
          sx={{
            color:"rgb(42, 60, 80)"
          }}
          >
            Dolap Numarası: {lockerNumber}
          </DialogContentText>
          <DialogContentText className="alert-dialog-description"
          sx={{
            color:"rgb(42, 60, 80)"
          }}
          >
            Dolabı Kiralayan Kişinin E-posta Adresi: {userEmail}
          </DialogContentText>
          <DialogContentText className="alert-dialog-description"
          sx={{
            color:"rgb(42, 60, 80)"
          }}
          >
            Rezervasyonun Bitiş Tarihi: {formattedDate}
          </DialogContentText>
          <DialogContentText className="alert-dialog-description"
      sx={{
            color:"rgb(42, 60, 80)"
          }}>
            Anahtarı görevliden alabilir, iade tarihine kadar geri
            verebilirsiniz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} autoFocus
          sx={{
            color:"rgb(42, 60, 80)"
          }}
          >
            Rezervasyonu İptal Et
          </Button>
          <Button onClick={handleExpand}
          sx={{
            backgroundColor:"#6587AD",
            color:"#FDFDF8",
            fontWeight:"bold"
          }}
          >Rezervasyon Süresini Uzat</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
