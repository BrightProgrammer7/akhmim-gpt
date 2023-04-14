import React, { useRef, useState } from "react";

import emailjs from "@emailjs/browser";

import { Configuration, OpenAIApi } from "openai";
import "./EmailGenerator.css";

function EmailGenerator() {
    // const apiKey = import.meta.env.VITE_OPENAI_KEY;
    // const orgKey = import.meta.env.VITE_ORGANIZATION_KEY;

    const srvKey = import.meta.env.VITE_SERVICE_ID;
    const tmpKey = import.meta.env.VITE_TEMPLATE_ID;
    const pubKey = import.meta.env.VITE_PUBLIC_KEY;

    const [prompt, setPrompt] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useRef();

    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        organization: import.meta.env.VITE_ORGANIZATION_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // Add Post
    const generateEmail = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt} email`,
            temperature: 0.5,
            max_tokens: 200,
            top_p: 1.0,
            n: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        const res = response.data.choices[0].text;
        setOutput(res);

        if (output != '') {
            emailjs.sendForm(srvKey, tmpKey, form.current, pubKey).then(
                (result) => {
                    console.log(result.text);
                    setLoading(false);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        } else {
            setLoading(false);
        }
        // e.target.reset()
        // form.reset()
    };

    return (
        <div className="EmailGenerator">
            <form className="frm" ref={form} onSubmit={generateEmail}>
                <p className="welcome">Hello Guest, Which type of e-mail do you want today ?</p>
                <div className="row pt-5 mx-auto">
                    <div className="col-8 form-group mx-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                        />
                    </div>
                    <div className="col-8 form-group pt-2 mx-auto">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            name="email"
                        />
                    </div>
                    <div className="col-8 form-group pt-2 mx-auto">
                        <input
                            type="text"
                            className="form-control"
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value);
                            }}
                            placeholder="Subject"
                            name="subject"
                        />
                    </div>
                    <div className="col-8 pt-3 mx-auto">
                        <input
                            type="submit"
                            className="btn btn-info"
                            value="Send Message"
                            onClick={generateEmail}
                        />
                    </div>
                    <div className="generetedEmail col-8 form-group pt-2 mx-auto">
                        {loading ? "loading..." :
                            <textarea
                                className="form-control"
                                id=""
                                cols="30"
                                value={output}
                                onChange={(e) => {
                                    setOutput(e.target.value);
                                }}
                                rows="8"
                                placeholder="Your message"
                                name="message"
                            >
                                {output}
                            </textarea>
                        }
                    </div>
                </div>
            </form>

        </div>
    );
}

export default EmailGenerator;
