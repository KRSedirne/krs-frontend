import QRCode from "react-qr-code";

export default function QR(props) {
  const creme="#FDFDF8";
  const darkBlue="#2A3C50";
    return(
 
        <QRCode
        id={props.id}
        size={250}
        value={props.value}/>
  );
}