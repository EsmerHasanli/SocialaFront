import React, { useState } from 'react';

function AudioRecorder() {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [recording, setRecording] = useState(false);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.addEventListener('dataavailable', event => {
            setAudioChunks([...audioChunks, event.data]);
        });

        recorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            console.log(audioBlob)
            formData.append('audio', audioBlob);

        }); 

        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        setRecording(false);
    };

    return (
        <div>
            {recording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
        </div>
    );
}

export default AudioRecorder;
