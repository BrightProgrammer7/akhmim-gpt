// import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import "./ImageGenerator.css";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_KEY
  const orgKey = import.meta.env.VITE_ORGANIZATION_KEY

  // const configuration = new Configuration({
  //   organization: import.meta.env.VITE_ORGANIZATION_KEY,
  //   apiKey: import.meta.env.VITE_OPENAI_KEY,
  // });
  // const openai = new OpenAIApi(configuration);


  const img = document.querySelector('.img');
  function displayImage() {
    img.classList.remove('hide');
    img.classList.add('block');
  }

  const generateImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    displayImage()

    // const response = await openai.createImage({
    //   prompt: prompt,
    //   n: 1,
    //   size: "1024x1024",
    // });

    const apiRequestBody = {
      'prompt': prompt,
      'n': 1,
      'size': "1024x1024",
    }

    await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'OpenAI-Organization': orgKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody)
    }).then((res) => {
      return res.json();
    }).then((res) => {
      // console.log(data);
      const response = res.data[0].url;
      // console.log(response);
      // res.status(200).json({ msg: res.content })
      setImage(response);
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    })

  };
  return (
    <div className="imageGenerator">
      <form onSubmit={generateImage}>
        <p className="">Hello Guest, How can I help you ?</p>
        <input className="ipt"
          type="text"
          placeholder=" Type something to generate an Image..   "
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onSubmit={
            generateImage
          }
        />
      </form>
      <div>
        <button className="btn" onClick={generateImage}>Generate an Image</button>
      </div>
      <div className="img hide">
        {loading ? 'loading...' : <img src={image} />}
      </div>

    </div>
  );
}

export default ImageGenerator;
