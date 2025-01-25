import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog(props) {
    const {
        handleClose,
        handleSubmit,
        open,
        title,
        text,
        backgroundColor
    } = props;

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
                PaperProps={{ sx: { border: `5px solid ${backgroundColor}` }, component: 'form', onSubmit: handleSubmit}}
            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: `${backgroundColor}`, color: "#FDFDF8", fontWeight: "bold" }}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="alert-dialog-description" sx={{ marginTop: "5px", color: "rgb(42, 60, 80)" }}>
                        {text}
                    </DialogContentText>
                    <DialogContentText className="alert-dialog-description" sx={{ color: "rgb(42, 60, 80)" }}>
                        Silmek istediğinize emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        sx={{ color: "rgb(42, 60, 80)" }}
                        autoFocus>
                        İptal
                    </Button>
                    <Button type="submit" sx={{ backgroundColor: `${backgroundColor}` , color: "#FDFDF8" }}>Onayla</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
