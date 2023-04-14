import React, { useEffect } from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./TextGenerator.css";
import Output from "./Output";


function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({  
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    organization: import.meta.env.VITE_ORGANIZATION_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Add Post
  const generateOutput = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 200,
      top_p: 1.0,
      n: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stream: false,
      // logprobs: null,
      // stop: ["\n"],
    });
    const res = response.data.choices[0].text;
    setOutput(res);
    setLoading(false)
    
    // e.target.reset()

  }


  // const data = new FormData(form) 
  //   const response = await fetch('/', {
  //     method: 'POST',
  //     headers: {
  //       // 'Authorization': 'Bearer ' + Open_AI_Key,
  //       // 'OpenAI-Organization': Org,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       // prompt: data.get('prompt') 
  //       prompt: prompt,
  //     })
  //   })
  //   if (response.ok) {
  //     const data = await response.json();
  //     const parsedData = data.bot.trim()
  //     console.log(parsedData);
  //     setOutput(parsedData)
  //   } else {
  //     const err = await response.text()
  //     setOutput('Something went wrong')
  //     console.log(err)
  //     // alert(err)
  //   }

  // communicate with API server
  // axios.post('http://localhost:5000/', { prompt }).then((res) => {
  //   setOutput(res.data)
  //   setLoading(false)
  // }).catch((err) => {
  //   console.log(err)
  // })


  return (
    <div className="TextGenerator">
      <form onSubmit={generateOutput}>
        <p className="">Hello Guest, How can I help you ?</p>
        <input
          className="ipt prompt"
          type="text"
          value={prompt}
          placeholder="Type something to generate a Text.. "
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button type="submit" className="btn" onClick={generateOutput}>
          Generate a Text
        </button>
      </form>

      <div className="generetedText">
        {loading ? 'loading...' : <Output response={output} />}
      </div>

    </div>
  );
}

export default TextGenerator;
