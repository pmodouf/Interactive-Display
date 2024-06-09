
import QRCode from 'qrcode.react';

const QRCodeComponent = () => {
    const url = 'http://192.168.0.5:8080/admin/info'; // Your URL here
    return <QRCode value={url} />;
};

export default QRCodeComponent;
