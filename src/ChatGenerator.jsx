import {
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import './ChatGenerator.css'




function ChatGenerator() {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am SurfGPT, How can I assist you today ? ",
            sentTime: "just now",
            sender: "ChatGPT",
        },
    ])

    


    const apiKey = import.meta.env.VITE_OPENAI_KEY
    const orgKey = import.meta.env.VITE_ORGANIZATION_KEY

    // const configuration = new Configuration({
    //     // apiKey: import.meta.env.VITE_OPENAI_KEY,
    //     // organization: import.meta.env.VITE_ORGANIZATION_KEY,
    // });
    // const openai = new OpenAIApi(configuration);

    const generateChat = async (message) => {
        // e.preventDefault();
        const newMessage = {
            message: message,
            sender: "UserGPT",
            direction: "outgoing",
        };
        // post all the old Messages & new Message
        const newMessages = [...messages, newMessage];

        // update our messages state
        setMessages(newMessages)

        // set a typing indicator for chatgpt is typing
        setTyping(true)

        // process message to chatgpt: send it over and see the response
        await sendMessage(newMessages)
    };

    async function sendMessage(chatMessages) {
        // chatMessages = {sender: 'UserGPT' or "ChatGPT" , message: chatMessage}
        // apiMessages = {role: 'user' or 'assistant', content: chatMessage}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = ''
            if (messageObject.sender === 'ChatGPT') {
                // response from chatGPT
                role = 'assistant'
            } else {
                // request from user
                role = 'user'
            }
            return { role: role, content: messageObject.message }
        })
        const systemMessage = {
            // define how chatgpt talks in initial message
            role: "system",
            content: 'Explain all concepts like I am 20 years old',
            // content: 'Speak like a Pirate'
        }

        const apiRequestBody = {
            // 'model': "gpt-3.5-turbo",
            'model': "gpt-3.5-turbo",
            'messages': [
                systemMessage,
                ...apiMessages
                // [msg1, msg2, ..., msg]
            ],
            "temperature": 0.7,
        }
        // const res = systemMessages
        // // Empty request
        // if (!messages.message) {
        //     // res.status(400).json({ answer: 'Provide a prompt' })
        //     return;
        // }


        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'OpenAI-Organization': orgKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            // console.log(data);
            const response = data.choices[0].message.content;
            // console.log(response);
            // res.status(200).json({ msg: res.content })
            setMessages(
                [...chatMessages, {
                    message: response, sender: 'ChatGPT'
                }]
            );
            setTyping(false)
        })
        // .catch((error) => {
        //     // console.error(error);
        //     console.log(error.message)
        // });
    }

    return (
        <div className="ChatGenerator" style={{ position: "relative", height: '100vh', width: '100vw' }} >
            <MainContainer>
                <ChatContainer >
                    <MessageList 
                        scrollBehavior="smooth"
                        typingIndicator={typing ? <TypingIndicator content='SurfGPT is typing' /> : null}
                    >
                        {messages.map((message, i) => {
                            return <Message key={i} model={message} />;
                        })}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={generateChat} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default ChatGenerator;
