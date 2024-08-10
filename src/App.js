import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const App = () => {
    const [nama, setNama] = useState('');
    const webcamRef = useRef(null);

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const file = dataURLtoFile(imageSrc, `${nama}.png`);

        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('photo', file);

        axios.post('http://localhost:3010/submit-absensi', formData)
            .then(response => {
                alert('Absensi berhasil dikirim!');
            })
            .catch(error => {
                console.error('Ada kesalahan:', error);
            });
    };

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h1>Presensi Sekolah Minggu</h1>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                width="100%"
            />
            <input
                type="text"
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholder="Nama Anak"
                style={{ marginTop: '10px', width: '100%', padding: '8px' }}
            />
            <button onClick={handleCapture} style={{ marginTop: '10px', padding: '10px 20px' }}>
                Hadir
            </button>
        </div>
    );
};

export default App;
