import express, { json } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";

// initialize dotenv with configuration
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_KEY,
  organization: process.env.VITE_ORGANIZATION_KEY,
});

// console.log(configuration);

const openai = new OpenAIApi(configuration);

// initialize Express server
const app = express();
// parse json request from frontend to backend
app.use(bodyParser.json());
// set up cors middle from frontend
app.use(cors());
// app.use(express.json());

// create domain object routes

// Create a payload object
app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  try {

  const response = await openai.createCompletion({
    // model: 'text-davinci-003',
    model: `${currentModel}`,
    prompt: `${message}`,
    temperature: 0.5,
    max_tokens: 100,
  });
  // res.status(200).send({
  //   message: "HELLO from AkhmimGPT",
  // })

  res.json({
    message: response.data.choices[0].text,
  });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error })
  }
});

// Receive data from frontend
app.get("/models", async (_req, res) => {
  // const { message } = req.body;
  // try {
  const response = await openai.listModels();
  // console.log(response.data.data);
  res.json({
    models: response.data.data,
  });

  // } 
  // catch (error) {
  //   console.log(error);
  //   res.status(500).send({ error })
  // }
});


// handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke! ERROR from AkhmimGPT');
})

// ansure server response to request
const PORT = 5000
app.listen(PORT, () => console.log(' Server is running on port  http://localhost:5000/models ')); 