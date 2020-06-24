import React, { useState } from 'react';
import axios from 'axios/index';

const Chatbot = (props) => {
    const [messages, setMessages] = useState([]);

    const df_text_query = async (text) => {
        let says = {
            speaks: 'me',
            message: {
                text: {
                    text: text
                }
            }
        };

        setMessages([...messages, says,]);

        const response = await axios.post('/api/df_text_query', { text });

        for (let message of response.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                message: message
            };

            setMessages([...messages, says]);
        }
    };

    const df_event_query = async (event) => {
        const response = await axios.post('/api/df_event_query', { event });

        for (let message of response.data.fullfillmentMessages) {
            let says = {
                speaks: 'bot',
                message: message
            };

            setMessages([...messages,says]);
        }
    };

    return (
        <div style={{ height: 400, width: 400, float: 'right' }}>
            <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                <h2>Chatbot</h2>
                <input type="text" />
            </div>
        </div>
    );
}

export default Chatbot;