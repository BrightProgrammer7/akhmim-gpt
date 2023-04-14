import React, { useEffect, useState } from 'react';
import './MutiModels.css';

function MultiModels() {
    const [prompt, setPrompt] = useState("");
    // const [loading, setLoading] = useState(false);
    const [chatLog, setChatLog] = useState([
        // {
        //     user: 'me',
        //     message: 'Need help'
        // },
        // {
        //     user: 'gpt',
        //     message: 'How can I help you today?'
        // }, {
        //     user: 'me',
        //     message: 'I want to use ChatGPT you today'
        // }, {
        //     user: 'gpt',
        //     message: 'Suggest something to do?'
        // }
    ]);
    const [models, setModels] = useState([]);
    const [currentModel, setCurrentModel] = useState('text-davinci-003');


    // Run one effect when app loads
    useEffect(() => {
        getEngines()
    }, [])


    // Clear Chats
    const clearChats = () => { setChatLog([]) };

    // Get Models
    function getEngines() {
        fetch('http://localhost:5000/models')
            .then((res) =>
                res.json()
            ).then((data) =>
                // console.log(data)
                setModels(data.models)
            )
        // .catch((err) => {
        //     console.log(err);
        // });
    };


    // Add Chat
    const generateChat = async (e) => {
        e.preventDefault();
        // setLoading(true);
        let newChat = [...chatLog, { user: 'me', message: `${prompt}` }];
        setPrompt('');
        setChatLog(newChat);


        // fetch response to api combining the chat log array of messages and seinding it as a message to localhost:3000 as a post
        const messages = newChat.map((msg) => msg.message).join('\n')

        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                // 'Authorization': 'Bearer ' + Open_AI_Key,
                // 'OpenAI-Organization': Org,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: messages,
                currentModel,
            })
        })
        const data = await response.json();
        // console.log(data.message);
        setChatLog([...newChat, { user: 'gpt', message: `${data.message}` }]);
        // setLoading(false)
    }

    return (
        <div className="ModelGenerator">
            <aside className='sideMenu'>
                <div className='sideButton' onClick={clearChats}>
                    <span>+</span>
                    {/* New Chat */}
                    <p>New Chat</p>
                </div>
                <div className="models">
                    <select name={currentModel} className='selectModel'
                        onChange={(e) => {
                            setCurrentModel(e.target.value);
                        }}>
                        {
                            models.map((model, index) => (
                                <option key={index} value={model.id}>
                                    {model.id}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </aside>

            <section className='chatBox'>
                <div className='chatLog'>
                    <div className="chatMsg gpt">
                        <div className="avatar gpt">
                            <img src="/gpt.png" alt="ai" />
                        </div>
                        <div className="chatRqs msg">
                            Hello I'm AkhmimGPT
                        </div>
                    </div>
                    {/* <div className="chatMsg me">
                        <div className="avatar me">
                            <img src="/me.png" alt="me" />
                        </div>
                        <div className="chatRps msg">
                            
                        </div>
                    </div> */}
                    {
                        // loading ? <ChatMsg msg={'loading...'} /> :
                        chatLog.map((message, index) => (<ChatMsg key={index} msg={message} />))
                    }

                </div>

                <div className="chatHolder">
                    <form onSubmit={generateChat}>
                        {/* <p className="">Hello Guest, How can I help you ?</p> */}
                        <input
                            aria-rowspan={1}
                            className="chatInput"
                            type="text"
                            value={prompt}
                            placeholder="Type something to generate a Text.. "
                            onChange={(e) => {
                                setPrompt(e.target.value);
                            }}
                        />
                        <button type="submit" className="btn" onClick={generateChat}>
                            <span>{`>`}</span>
                            <p>Submit</p>
                        </button>
                    </form>
                </div>

            </section>
        </div>
    )
}

const ChatMsg = ({ msg }) => {
    return (
        <div className={`chatMsg ${msg.user == 'gpt' && 'gpt'}`}>
            <div className={`avatar ${msg.user == 'gpt' && 'gpt'} `}>
                {msg.user == 'gpt' &&
                    <img src="/gpt.png" alt="gpt" />
                }
                {msg.user == 'me' &&
                    <img src="/me.png" alt="me" />
                }
            </div>
            <div className="msg">
                {/* Hello World */}
                {msg.message}
            </div>

        </div>
    );
}

export default MultiModels