import React from 'react'
import './TranscriptionGenerator.css'
import Output from './Output';
import { useState, useRef, useEffect } from 'react';
// import { Configuration, OpenAIApi } from 'openai';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function SpeechGenerator() {
    const [files, setFile] = useState();
    const [audio, setAudio] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    // const { audio, setAudio } = useForm();
    const { form, setForm } = useForm();

    const apiKey = import.meta.env.VITE_OPENAI_KEY
    const orgKey = import.meta.env.VITE_ORGANIZATION_KEY

    // const formRef = useRef();
    // const audioRef = useRef();


    // Add Transcription
    const generateTranscript = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fileName = files ? files.name : 'File Uploaded';
        // const fileName = files?.name ?? 'defaultName';

        setAudio(fileName)

        const model = 'whisper-1'
        const formData = new FormData();
        formData.append('model', model)
        formData.append('file', files)


        // communicate with API server
        axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'OpenAI-Organization': orgKey,
                'Content-Type': `multipart/form-data: boundary=${formData._boundary}`,
            }
        }).then((res) => {
            // console.log(res.data)
            setOutput(res.data.text)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="transcriptionGenerator">
            {/* <form ref={form} onSubmit={setForm(generateTranscript)}> */}
            <form className="form" ref={form}>
                <p className="welcome">Hello Guest, Choose a audio file to transcribe it</p>
                <div className="file">
                    <label htmlFor="speech" className='lbl'>Pick a file</label>
                    <input
                        className="ipt prompt"
                        type="file"
                        name='audio_file'
                        // ref={audio}
                        onChange={(e) => {
                            setFile(e.target.files[0])
                            setAudio(e.target.files[0].name)
                        }}
                        id="speech" />
                    <div className='audioName'>
                        <Output response={audio} />
                    </div>
                    <button type="submit" className="btn" onClick={generateTranscript}>
                        Generate a Text
                    </button>
                </div>


            </form>

            <div className="generetedTranscript">
                {loading ? 'loading...' : <Output response={output} />}
            </div>
        </div>
    )
}

export default SpeechGenerator