import QRCode from "react-qr-code";


export default function QR(props) {
    return(
 
        <QRCode
        id={props.id}
        size={180}
        bgColordcolor="white"
        fgColor="black"
        value={props.value}/>
  );
}